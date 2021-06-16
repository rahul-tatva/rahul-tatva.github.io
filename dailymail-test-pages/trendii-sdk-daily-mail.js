const MOBILE_WIDTH = 480;
const TRENDII_NATIVE_ADS_CDN = "https://cdn.trendii.com/native-ads-sdk/assets";
const AD_PRODUCTS_CONTAINER = "trendii-sdk-ad-products-container";
const PUBLISHER_NAME = "DAILY_MAIL";
const RETAILER_LOGO_ID = "retailer-logo";

// ad by default to below this class element
const DESKTOP_DAILY_MAIL_IMAGE_SELECTOR_CLASS = ".blkBorder.img-share";
const DESKTOP_DAILY_MAIL_LOADED_IMAGE_SELECTOR_CLASS = ".blkBorder.img-share.b-loaded";

const MOBILE_DAILY_MAIL_IMAGE_SELECTOR_CLASS = ".img-share";
const MOBILE_DAILY_MAIL_LOADED_IMAGE_SELECTOR_CLASS = ".img-share.b-loaded";

const DESKTOP_IMAGE_GROUP_PARENT_DIV_CLASS = ".mol-img-group";
const MOBILE_IMAGE_GROUP_PARENT_TAG = "figure";

const DESKTOP_DAILY_MAIL_IMAGE_CAPTION_CLASS = 'imageCaption';
const MOBILE_DAILY_MAIL_IMAGE_CAPTION_TAG = 'figcaption';

const RETAILER_NAME_TO_REPLACE_WITH = "{{RETAILER_NAME}}";
const SLIDER_CLASS_TO_REPLACE_WITH = "trendiiSliderUniqueString";
const SCRIPT_ID_TO_REPLACE = "trendiiSliderUniqueString-script";
var intersectionObserver;

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
 *
 *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 */
(function () {
  'use strict';

  // Exit early if we're not running in a browser.
  if (typeof window !== 'object') {
    return;
  }

  // Exit early if all IntersectionObserver and IntersectionObserverEntry
  // features are natively supported.
  if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

    // Minimal polyfill for Edge 15's lack of `isIntersecting`
    // See: https://github.com/w3c/IntersectionObserver/issues/211
    if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
      Object.defineProperty(window.IntersectionObserverEntry.prototype,
        'isIntersecting', {
        get: function () {
          return this.intersectionRatio > 0;
        }
      });
    }
    return;
  }

  /**
   * Returns the embedding frame element, if any.
   * @param {!Document} doc
   * @return {!Element}
   */
  function getFrameElement(doc) {
    try {
      return doc.defaultView && doc.defaultView.frameElement || null;
    } catch (e) {
      // Ignore the error.
      return null;
    }
  }

  /**
   * A local reference to the root document.
   */
  var document = (function (startDoc) {
    var doc = startDoc;
    var frame = getFrameElement(doc);
    while (frame) {
      doc = frame.ownerDocument;
      frame = getFrameElement(doc);
    }
    return doc;
  })(window.document);

  /**
   * An IntersectionObserver registry. This registry exists to hold a strong
   * reference to IntersectionObserver instances currently observing a target
   * element. Without this registry, instances without another reference may be
   * garbage collected.
   */
  var registry = [];

  /**
   * The signal updater for cross-origin intersection. When not null, it means
   * that the polyfill is configured to work in a cross-origin mode.
   * @type {function(DOMRect|ClientRect, DOMRect|ClientRect)}
   */
  var crossOriginUpdater = null;

  /**
   * The current cross-origin intersection. Only used in the cross-origin mode.
   * @type {DOMRect|ClientRect}
   */
  var crossOriginRect = null;


  /**
   * Creates the global IntersectionObserverEntry constructor.
   * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
   * @param {Object} entry A dictionary of instance properties.
   * @constructor
   */
  function IntersectionObserverEntryV1(entry) {
    this.time = entry.time;
    this.target = entry.target;
    this.rootBounds = ensureDOMRect(entry.rootBounds);
    this.boundingClientRect = ensureDOMRect(entry.boundingClientRect);
    this.intersectionRect = ensureDOMRect(entry.intersectionRect || getEmptyRect());
    this.isIntersecting = !!entry.intersectionRect;

    // Calculates the intersection ratio.
    var targetRect = this.boundingClientRect;
    var targetArea = targetRect.width * targetRect.height;
    var intersectionRect = this.intersectionRect;
    var intersectionArea = intersectionRect.width * intersectionRect.height;

    // Sets intersection ratio.
    if (targetArea) {
      // Round the intersection ratio to avoid floating point math issues:
      // https://github.com/w3c/IntersectionObserver/issues/324
      this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
    } else {
      // If area is zero and is intersecting, sets to 1, otherwise to 0
      this.intersectionRatio = this.isIntersecting ? 1 : 0;
    }
  }


  /**
   * Creates the global IntersectionObserver constructor.
   * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
   * @param {Function} callback The function to be invoked after intersection
   *     changes have queued. The function is not invoked if the queue has
   *     been emptied by calling the `takeRecords` method.
   * @param {Object=} opt_options Optional configuration options.
   * @constructor
   */
  function IntersectionObserverV1(callback, opt_options) {

    var options = opt_options || {};

    if (typeof callback != 'function') {
      throw new Error('callback must be a function');
    }

    if (
      options.root &&
      options.root.nodeType != 1 &&
      options.root.nodeType != 9
    ) {
      throw new Error('root must be a Document or Element');
    }

    // Binds and throttles `this._checkForIntersections`.
    this._checkForIntersections = throttle(
      this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

    // Private properties.
    this._callback = callback;
    this._observationTargets = [];
    this._queuedEntries = [];
    this._rootMarginValues = this._parseRootMargin(options.rootMargin);

    // Public properties.
    this.thresholds = this._initThresholds(options.threshold);
    this.root = options.root || null;
    this.rootMargin = this._rootMarginValues.map(function (margin) {
      return margin.value + margin.unit;
    }).join(' ');

    /** @private @const {!Array<!Document>} */
    this._monitoringDocuments = [];
    /** @private @const {!Array<function()>} */
    this._monitoringUnsubscribes = [];
  }


  /**
   * The minimum interval within which the document will be checked for
   * intersection changes.
   */
  IntersectionObserverV1.prototype.THROTTLE_TIMEOUT = 100;


  /**
   * The frequency in which the polyfill polls for intersection changes.
   * this can be updated on a per instance basis and must be set prior to
   * calling `observe` on the first target.
   */
  IntersectionObserverV1.prototype.POLL_INTERVAL = null;

  /**
   * Use a mutation observer on the root element
   * to detect intersection changes.
   */
  IntersectionObserverV1.prototype.USE_MUTATION_OBSERVER = true;


  /**
   * Sets up the polyfill in the cross-origin mode. The result is the
   * updater function that accepts two arguments: `boundingClientRect` and
   * `intersectionRect` - just as these fields would be available to the
   * parent via `IntersectionObserverEntry`. This function should be called
   * each time the iframe receives intersection information from the parent
   * window, e.g. via messaging.
   * @return {function(DOMRect|ClientRect, DOMRect|ClientRect)}
   */
  IntersectionObserverV1._setupCrossOriginUpdater = function () {
    if (!crossOriginUpdater) {
      /**
       * @param {DOMRect|ClientRect} boundingClientRect
       * @param {DOMRect|ClientRect} intersectionRect
       */
      crossOriginUpdater = function (boundingClientRect, intersectionRect) {
        if (!boundingClientRect || !intersectionRect) {
          crossOriginRect = getEmptyRect();
        } else {
          crossOriginRect = convertFromParentRect(boundingClientRect, intersectionRect);
        }
        registry.forEach(function (observer) {
          observer._checkForIntersections();
        });
      };
    }
    return crossOriginUpdater;
  };


  /**
   * Resets the cross-origin mode.
   */
  IntersectionObserverV1._resetCrossOriginUpdater = function () {
    crossOriginUpdater = null;
    crossOriginRect = null;
  };


  /**
   * Starts observing a target element for intersection changes based on
   * the thresholds values.
   * @param {Element} target The DOM element to observe.
   */
  IntersectionObserverV1.prototype.observe = function (target) {
    var isTargetAlreadyObserved = this._observationTargets.some(function (item) {
      return item.element == target;
    });

    if (isTargetAlreadyObserved) {
      return;
    }

    if (!(target && target.nodeType == 1)) {
      throw new Error('target must be an Element');
    }

    this._registerInstance();
    this._observationTargets.push({ element: target, entry: null });
    this._monitorIntersections(target.ownerDocument);
    this._checkForIntersections();
  };


  /**
   * Stops observing a target element for intersection changes.
   * @param {Element} target The DOM element to observe.
   */
  IntersectionObserverV1.prototype.unobserve = function (target) {
    this._observationTargets =
      this._observationTargets.filter(function (item) {
        return item.element != target;
      });
    this._unmonitorIntersections(target.ownerDocument);
    if (this._observationTargets.length == 0) {
      this._unregisterInstance();
    }
  };


  /**
   * Stops observing all target elements for intersection changes.
   */
  IntersectionObserverV1.prototype.disconnect = function () {
    this._observationTargets = [];
    this._unmonitorAllIntersections();
    this._unregisterInstance();
  };


  /**
   * Returns any queue entries that have not yet been reported to the
   * callback and clears the queue. This can be used in conjunction with the
   * callback to obtain the absolute most up-to-date intersection information.
   * @return {Array} The currently queued entries.
   */
  IntersectionObserverV1.prototype.takeRecords = function () {
    var records = this._queuedEntries.slice();
    this._queuedEntries = [];
    return records;
  };


  /**
   * Accepts the threshold value from the user configuration object and
   * returns a sorted array of unique threshold values. If a value is not
   * between 0 and 1 and error is thrown.
   * @private
   * @param {Array|number=} opt_threshold An optional threshold value or
   *     a list of threshold values, defaulting to [0].
   * @return {Array} A sorted list of unique and valid threshold values.
   */
  IntersectionObserverV1.prototype._initThresholds = function (opt_threshold) {
    var threshold = opt_threshold || [0];
    if (!Array.isArray(threshold)) threshold = [threshold];

    return threshold.sort().filter(function (t, i, a) {
      if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
        throw new Error('threshold must be a number between 0 and 1 inclusively');
      }
      return t !== a[i - 1];
    });
  };


  /**
   * Accepts the rootMargin value from the user configuration object
   * and returns an array of the four margin values as an object containing
   * the value and unit properties. If any of the values are not properly
   * formatted or use a unit other than px or %, and error is thrown.
   * @private
   * @param {string=} opt_rootMargin An optional rootMargin value,
   *     defaulting to '0px'.
   * @return {Array<Object>} An array of margin objects with the keys
   *     value and unit.
   */
  IntersectionObserverV1.prototype._parseRootMargin = function (opt_rootMargin) {
    var marginString = opt_rootMargin || '0px';
    var margins = marginString.split(/\s+/).map(function (margin) {
      var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
      if (!parts) {
        throw new Error('rootMargin must be specified in pixels or percent');
      }
      return { value: parseFloat(parts[1]), unit: parts[2] };
    });

    // Handles shorthand.
    margins[1] = margins[1] || margins[0];
    margins[2] = margins[2] || margins[0];
    margins[3] = margins[3] || margins[1];

    return margins;
  };


  /**
   * Starts polling for intersection changes if the polling is not already
   * happening, and if the page's visibility state is visible.
   * @param {!Document} doc
   * @private
   */
  IntersectionObserverV1.prototype._monitorIntersections = function (doc) {
    var win = doc.defaultView;
    if (!win) {
      // Already destroyed.
      return;
    }
    if (this._monitoringDocuments.indexOf(doc) != -1) {
      // Already monitoring.
      return;
    }

    // Private state for monitoring.
    var callback = this._checkForIntersections;
    var monitoringInterval = null;
    var domObserver = null;

    // If a poll interval is set, use polling instead of listening to
    // resize and scroll events or DOM mutations.
    if (this.POLL_INTERVAL) {
      monitoringInterval = win.setInterval(callback, this.POLL_INTERVAL);
    } else {
      addEvent(win, 'resize', callback, true);
      addEvent(doc, 'scroll', callback, true);
      if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in win) {
        domObserver = new win.MutationObserver(callback);
        domObserver.observe(doc, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      }
    }

    this._monitoringDocuments.push(doc);
    this._monitoringUnsubscribes.push(function () {
      // Get the window object again. When a friendly iframe is destroyed, it
      // will be null.
      var win = doc.defaultView;

      if (win) {
        if (monitoringInterval) {
          win.clearInterval(monitoringInterval);
        }
        removeEvent(win, 'resize', callback, true);
      }

      removeEvent(doc, 'scroll', callback, true);
      if (domObserver) {
        domObserver.disconnect();
      }
    });

    // Also monitor the parent.
    var rootDoc =
      (this.root && (this.root.ownerDocument || this.root)) || document;
    if (doc != rootDoc) {
      var frame = getFrameElement(doc);
      if (frame) {
        this._monitorIntersections(frame.ownerDocument);
      }
    }
  };


  /**
   * Stops polling for intersection changes.
   * @param {!Document} doc
   * @private
   */
  IntersectionObserverV1.prototype._unmonitorIntersections = function (doc) {
    var index = this._monitoringDocuments.indexOf(doc);
    if (index == -1) {
      return;
    }

    var rootDoc =
      (this.root && (this.root.ownerDocument || this.root)) || document;

    // Check if any dependent targets are still remaining.
    var hasDependentTargets =
      this._observationTargets.some(function (item) {
        var itemDoc = item.element.ownerDocument;
        // Target is in this context.
        if (itemDoc == doc) {
          return true;
        }
        // Target is nested in this context.
        while (itemDoc && itemDoc != rootDoc) {
          var frame = getFrameElement(itemDoc);
          itemDoc = frame && frame.ownerDocument;
          if (itemDoc == doc) {
            return true;
          }
        }
        return false;
      });
    if (hasDependentTargets) {
      return;
    }

    // Unsubscribe.
    var unsubscribe = this._monitoringUnsubscribes[index];
    this._monitoringDocuments.splice(index, 1);
    this._monitoringUnsubscribes.splice(index, 1);
    unsubscribe();

    // Also unmonitor the parent.
    if (doc != rootDoc) {
      var frame = getFrameElement(doc);
      if (frame) {
        this._unmonitorIntersections(frame.ownerDocument);
      }
    }
  };


  /**
   * Stops polling for intersection changes.
   * @param {!Document} doc
   * @private
   */
  IntersectionObserverV1.prototype._unmonitorAllIntersections = function () {
    var unsubscribes = this._monitoringUnsubscribes.slice(0);
    this._monitoringDocuments.length = 0;
    this._monitoringUnsubscribes.length = 0;
    for (var i = 0; i < unsubscribes.length; i++) {
      unsubscribes[i]();
    }
  };


  /**
   * Scans each observation target for intersection changes and adds them
   * to the internal entries queue. If new entries are found, it
   * schedules the callback to be invoked.
   * @private
   */
  IntersectionObserverV1.prototype._checkForIntersections = function () {
    if (!this.root && crossOriginUpdater && !crossOriginRect) {
      // Cross origin monitoring, but no initial data available yet.
      return;
    }

    var rootIsInDom = this._rootIsInDom();
    var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

    for (let index = 0; index < this._observationTargets.length; index++) {
      const item = this._observationTargets[index];
      var target = item.element;
      var targetRect = getBoundingClientRect(target);
      var rootContainsTarget = this._rootContainsTarget(target);
      var oldEntry = item.entry;
      var intersectionRect = rootIsInDom && rootContainsTarget &&
        this._computeTargetAndRootIntersection(target, targetRect, rootRect);

      var rootBounds = null;
      if (!this._rootContainsTarget(target)) {
        rootBounds = getEmptyRect();
      } else if (!crossOriginUpdater || this.root) {
        rootBounds = rootRect;
      }

      var newEntry = item.entry = new IntersectionObserverEntryV1({
        time: now(),
        target: target,
        boundingClientRect: targetRect,
        rootBounds: rootBounds,
        intersectionRect: intersectionRect
      });

      if (!oldEntry) {
        this._queuedEntries.push(newEntry);
      } else if (rootIsInDom && rootContainsTarget) {
        // If the new entry intersection ratio has crossed any of the
        // thresholds, add a new entry.
        if (this._hasCrossedThreshold(oldEntry, newEntry)) {
          this._queuedEntries.push(newEntry);
        }
      } else {
        // If the root is not in the DOM or target is not contained within
        // root but the previous entry for this target had an intersection,
        // add a new record indicating removal.
        if (oldEntry && oldEntry.isIntersecting) {
          this._queuedEntries.push(newEntry);
        }
      }
    }
    if (this._queuedEntries.length) {
      this._callback(this.takeRecords(), this);
    }
  };


  /**
   * Accepts a target and root rect computes the intersection between then
   * following the algorithm in the spec.
   * TODO(philipwalton): at this time clip-path is not considered.
   * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
   * @param {Element} target The target DOM element
   * @param {Object} targetRect The bounding rect of the target.
   * @param {Object} rootRect The bounding rect of the root after being
   *     expanded by the rootMargin value.
   * @return {?Object} The final intersection rect object or undefined if no
   *     intersection is found.
   * @private
   */
  IntersectionObserverV1.prototype._computeTargetAndRootIntersection =
    function (target, targetRect, rootRect) {
      // If the element isn't displayed, an intersection can't happen.
      if (window.getComputedStyle(target).display == 'none') return;

      var intersectionRect = targetRect;
      var parent = getParentNode(target);
      var atRoot = false;

      while (!atRoot && parent) {
        var parentRect = null;
        var parentComputedStyle = parent.nodeType == 1 ?
          window.getComputedStyle(parent) : {};

        // If the parent isn't displayed, an intersection can't happen.
        if (parentComputedStyle.display == 'none') return null;

        if (parent == this.root || parent.nodeType == /* DOCUMENT */ 9) {
          atRoot = true;
          if (parent == this.root || parent == document) {
            if (crossOriginUpdater && !this.root) {
              if (!crossOriginRect ||
                crossOriginRect.width == 0 && crossOriginRect.height == 0) {
                // A 0-size cross-origin intersection means no-intersection.
                parent = null;
                parentRect = null;
                intersectionRect = null;
              } else {
                parentRect = crossOriginRect;
              }
            } else {
              parentRect = rootRect;
            }
          } else {
            // Check if there's a frame that can be navigated to.
            var frame = getParentNode(parent);
            var frameRect = frame && getBoundingClientRect(frame);
            var frameIntersect =
              frame &&
              this._computeTargetAndRootIntersection(frame, frameRect, rootRect);
            if (frameRect && frameIntersect) {
              parent = frame;
              parentRect = convertFromParentRect(frameRect, frameIntersect);
            } else {
              parent = null;
              intersectionRect = null;
            }
          }
        } else {
          // If the element has a non-visible overflow, and it's not the <body>
          // or <html> element, update the intersection rect.
          // Note: <body> and <html> cannot be clipped to a rect that's not also
          // the document rect, so no need to compute a new intersection.
          var doc = parent.ownerDocument;
          if (parent != doc.body &&
            parent != doc.documentElement &&
            parentComputedStyle.overflow != 'visible') {
            parentRect = getBoundingClientRect(parent);
          }
        }

        // If either of the above conditionals set a new parentRect,
        // calculate new intersection data.
        if (parentRect) {
          intersectionRect = computeRectIntersection(parentRect, intersectionRect);
        }
        if (!intersectionRect) break;
        parent = parent && getParentNode(parent);
      }
      return intersectionRect;
    };


  /**
   * Returns the root rect after being expanded by the rootMargin value.
   * @return {ClientRect} The expanded root rect.
   * @private
   */
  IntersectionObserverV1.prototype._getRootRect = function () {
    var rootRect;
    if (this.root && !isDoc(this.root)) {
      rootRect = getBoundingClientRect(this.root);
    } else {
      // Use <html>/<body> instead of window since scroll bars affect size.
      var doc = isDoc(this.root) ? this.root : document;
      var html = doc.documentElement;
      var body = doc.body;
      rootRect = {
        top: 0,
        left: 0,
        right: html.clientWidth || body.clientWidth,
        width: html.clientWidth || body.clientWidth,
        bottom: html.clientHeight || body.clientHeight,
        height: html.clientHeight || body.clientHeight
      };
    }
    return this._expandRectByRootMargin(rootRect);
  };


  /**
   * Accepts a rect and expands it by the rootMargin value.
   * @param {DOMRect|ClientRect} rect The rect object to expand.
   * @return {ClientRect} The expanded rect.
   * @private
   */
  IntersectionObserverV1.prototype._expandRectByRootMargin = function (rect) {
    var margins = this._rootMarginValues.map(function (margin, i) {
      return margin.unit == 'px' ? margin.value :
        margin.value * (i % 2 ? rect.width : rect.height) / 100;
    });
    var newRect = {
      top: rect.top - margins[0],
      right: rect.right + margins[1],
      bottom: rect.bottom + margins[2],
      left: rect.left - margins[3]
    };
    newRect.width = newRect.right - newRect.left;
    newRect.height = newRect.bottom - newRect.top;

    return newRect;
  };


  /**
   * Accepts an old and new entry and returns true if at least one of the
   * threshold values has been crossed.
   * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
   *    particular target element or null if no previous entry exists.
   * @param {IntersectionObserverEntry} newEntry The current entry for a
   *    particular target element.
   * @return {boolean} Returns true if a any threshold has been crossed.
   * @private
   */
  IntersectionObserverV1.prototype._hasCrossedThreshold =
    function (oldEntry, newEntry) {

      // To make comparing easier, an entry that has a ratio of 0
      // but does not actually intersect is given a value of -1
      var oldRatio = oldEntry && oldEntry.isIntersecting ?
        oldEntry.intersectionRatio || 0 : -1;
      var newRatio = newEntry.isIntersecting ?
        newEntry.intersectionRatio || 0 : -1;

      // Ignore unchanged ratios
      if (oldRatio === newRatio) return;

      for (var i = 0; i < this.thresholds.length; i++) {
        var threshold = this.thresholds[i];

        // Return true if an entry matches a threshold or if the new ratio
        // and the old ratio are on the opposite sides of a threshold.
        if (threshold == oldRatio || threshold == newRatio ||
          threshold < oldRatio !== threshold < newRatio) {
          return true;
        }
      }
    };


  /**
   * Returns whether or not the root element is an element and is in the DOM.
   * @return {boolean} True if the root element is an element and is in the DOM.
   * @private
   */
  IntersectionObserverV1.prototype._rootIsInDom = function () {
    return !this.root || containsDeep(document, this.root);
  };


  /**
   * Returns whether or not the target element is a child of root.
   * @param {Element} target The target element to check.
   * @return {boolean} True if the target element is a child of root.
   * @private
   */
  IntersectionObserverV1.prototype._rootContainsTarget = function (target) {
    var rootDoc =
      (this.root && (this.root.ownerDocument || this.root)) || document;
    return (
      containsDeep(rootDoc, target) &&
      (!this.root || rootDoc == target.ownerDocument)
    );
  };


  /**
   * Adds the instance to the global IntersectionObserver registry if it isn't
   * already present.
   * @private
   */
  IntersectionObserverV1.prototype._registerInstance = function () {
    if (registry.indexOf(this) < 0) {
      registry.push(this);
    }
  };


  /**
   * Removes the instance from the global IntersectionObserver registry.
   * @private
   */
  IntersectionObserverV1.prototype._unregisterInstance = function () {
    var index = registry.indexOf(this);
    if (index != -1) registry.splice(index, 1);
  };


  /**
   * Returns the result of the performance.now() method or null in browsers
   * that don't support the API.
   * @return {number} The elapsed time since the page was requested.
   */
  function now() {
    return window.performance && performance.now && performance.now();
  }


  /**
   * Throttles a function and delays its execution, so it's only called at most
   * once within a given time period.
   * @param {Function} fn The function to throttle.
   * @param {number} timeout The amount of time that must pass before the
   *     function can be called again.
   * @return {Function} The throttled function.
   */
  function throttle(fn, timeout) {
    var timer = null;
    return function () {
      if (!timer) {
        timer = setTimeout(function () {
          fn();
          timer = null;
        }, timeout);
      }
    };
  }


  /**
   * Adds an event handler to a DOM node ensuring cross-browser compatibility.
   * @param {Node} node The DOM node to add the event handler to.
   * @param {string} event The event name.
   * @param {Function} fn The event handler to add.
   * @param {boolean} opt_useCapture Optionally adds the even to the capture
   *     phase. Note: this only works in modern browsers.
   */
  function addEvent(node, event, fn, opt_useCapture) {
    if (typeof node.addEventListener == 'function') {
      node.addEventListener(event, fn, opt_useCapture || false);
    }
    else if (typeof node.attachEvent == 'function') {
      node.attachEvent('on' + event, fn);
    }
  }


  /**
   * Removes a previously added event handler from a DOM node.
   * @param {Node} node The DOM node to remove the event handler from.
   * @param {string} event The event name.
   * @param {Function} fn The event handler to remove.
   * @param {boolean} opt_useCapture If the event handler was added with this
   *     flag set to true, it should be set to true here in order to remove it.
   */
  function removeEvent(node, event, fn, opt_useCapture) {
    if (typeof node.removeEventListener == 'function') {
      node.removeEventListener(event, fn, opt_useCapture || false);
    }
    else if (typeof node.detatchEvent == 'function') {
      node.detatchEvent('on' + event, fn);
    }
  }


  /**
   * Returns the intersection between two rect objects.
   * @param {Object} rect1 The first rect.
   * @param {Object} rect2 The second rect.
   * @return {?Object|?ClientRect} The intersection rect or undefined if no
   *     intersection is found.
   */
  function computeRectIntersection(rect1, rect2) {
    var top = Math.max(rect1.top, rect2.top);
    var bottom = Math.min(rect1.bottom, rect2.bottom);
    var left = Math.max(rect1.left, rect2.left);
    var right = Math.min(rect1.right, rect2.right);
    var width = right - left;
    var height = bottom - top;

    return (width >= 0 && height >= 0) && {
      top: top,
      bottom: bottom,
      left: left,
      right: right,
      width: width,
      height: height
    } || null;
  }


  /**
   * Shims the native getBoundingClientRect for compatibility with older IE.
   * @param {Element} el The element whose bounding rect to get.
   * @return {DOMRect|ClientRect} The (possibly shimmed) rect of the element.
   */
  function getBoundingClientRect(el) {
    var rect;

    try {
      rect = el.getBoundingClientRect();
    } catch (err) {
      // Ignore Windows 7 IE11 "Unspecified error"
      // https://github.com/w3c/IntersectionObserver/pull/205
    }

    if (!rect) return getEmptyRect();

    // Older IE
    if (!(rect.width && rect.height)) {
      rect = {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top
      };
    }
    return rect;
  }


  /**
   * Returns an empty rect object. An empty rect is returned when an element
   * is not in the DOM.
   * @return {ClientRect} The empty rect.
   */
  function getEmptyRect() {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0
    };
  }


  /**
   * Ensure that the result has all of the necessary fields of the DOMRect.
   * Specifically this ensures that `x` and `y` fields are set.
   *
   * @param {?DOMRect|?ClientRect} rect
   * @return {?DOMRect}
   */
  function ensureDOMRect(rect) {
    // A `DOMRect` object has `x` and `y` fields.
    if (!rect || 'x' in rect) {
      return rect;
    }
    // A IE's `ClientRect` type does not have `x` and `y`. The same is the case
    // for internally calculated Rect objects. For the purposes of
    // `IntersectionObserver`, it's sufficient to simply mirror `left` and `top`
    // for these fields.
    return {
      top: rect.top,
      y: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      x: rect.left,
      right: rect.right,
      width: rect.width,
      height: rect.height
    };
  }


  /**
   * Inverts the intersection and bounding rect from the parent (frame) BCR to
   * the local BCR space.
   * @param {DOMRect|ClientRect} parentBoundingRect The parent's bound client rect.
   * @param {DOMRect|ClientRect} parentIntersectionRect The parent's own intersection rect.
   * @return {ClientRect} The local root bounding rect for the parent's children.
   */
  function convertFromParentRect(parentBoundingRect, parentIntersectionRect) {
    var top = parentIntersectionRect.top - parentBoundingRect.top;
    var left = parentIntersectionRect.left - parentBoundingRect.left;
    return {
      top: top,
      left: left,
      height: parentIntersectionRect.height,
      width: parentIntersectionRect.width,
      bottom: top + parentIntersectionRect.height,
      right: left + parentIntersectionRect.width
    };
  }


  /**
   * Checks to see if a parent element contains a child element (including inside
   * shadow DOM).
   * @param {Node} parent The parent element.
   * @param {Node} child The child element.
   * @return {boolean} True if the parent node contains the child node.
   */
  function containsDeep(parent, child) {
    var node = child;
    while (node) {
      if (node == parent) return true;

      node = getParentNode(node);
    }
    return false;
  }


  /**
   * Gets the parent node of an element or its host element if the parent node
   * is a shadow root.
   * @param {Node} node The node whose parent to get.
   * @return {Node|null} The parent node or null if no parent exists.
   */
  function getParentNode(node) {
    var parent = node.parentNode;

    if (node.nodeType == /* DOCUMENT */ 9 && node != document) {
      // If this node is a document node, look for the embedding frame.
      return getFrameElement(node);
    }

    // If the parent has element that is assigned through shadow root slot
    if (parent && parent.assignedSlot) {
      parent = parent.assignedSlot.parentNode;
    }

    if (parent && parent.nodeType == 11 && parent.host) {
      // If the parent is a shadow root, return the host element.
      return parent.host;
    }

    return parent;
  }

  /**
   * Returns true if `node` is a Document.
   * @param {!Node} node
   * @returns {boolean}
   */
  function isDoc(node) {
    return node && node.nodeType === 9;
  }


  // Exposes the constructors globally.
  window.IntersectionObserverV1 = IntersectionObserverV1;
  window.IntersectionObserverEntryV1 = IntersectionObserverEntryV1;

}());


var IntersectionObserverV1 = window.IntersectionObserverV1;

class TRENDiiAd {
  constructor(options) {
    //debugger;
    // this.loadScriptIntoHead("https://cdn.trendii.com/native-ads-sdk/intersection-observer.min.js");
    this.loadScriptIntoHead("https://cdn.trendii.com/assets/splide.min.js");
    // this.loadScript("https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js");

    this.loadStyleSheetIntoHead("https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css");
    this.loadStyleSheetIntoHead("https://cdn.trendii.com/assets/splide-core.min.css");
    this.loadStyleSheetIntoHead("https://cdn.trendii.com/native-ads-sdk/trendii-sdk-daily-mail-slider.css");
    this.loadStyleSheetIntoHead("https://cdn.trendii.com/native-ads-sdk/trendii-sdk-daily-mail-all-product.css");
    console.log("sdk constructor initialized");
    // this.loadStyleSheet("https://cdn.trendii.com/native-ads-sdk/Products-Silder.css");
    // this.loadScript("https://unpkg.com/axios/dist/axios.min.js");
    // <link rel="stylesheet" href="./sdk-html-templates/trendii-sdk-daily-mail-slider.css"></link>

    // variable needed to store some data and info
    this.feedProducts = [];
    this.intersectionObserver;
    // this.feedProductsWithGeneratedAds = [];

    // native ads constants
    this.API_GET_NATIVE_AD_SLIDER_TEMPLATE = `https://cdn.trendii.com/native-ads-sdk/Products-Slider-dynamic.html`;
    this.API_GET_NATIVE_AD_SIMPLE_TEMPLATE = `https://cdn.trendii.com/native-ads-sdk/Products-728X90-all-product-dynamic.html`;
    this.HTML_TEMPLATE_SIMPLE_CONTAINER_ID = "trendii-products-container-728X90";
    this.nativeAdSimpleTemplateHTMLString = null;

    this.nativeAdSliderTemplateHTMLString = null;
    this.API_GET_NATIVE_AD_PRODUCT = `https://beeswaxcreatives.trendii.com/img-creatives`;
    this.HTML_TEMPLATE_AD_WRAPPER_ID = "trendii-native-ad-wrapper";
    this.HTML_TEMPLATE_SLIDER_CONTAINER_ID = "trendii-sdk-ad-products-container";
    this.slidersAppendedArray = [];
    this.sliderCount = 0;
    //NATIVE AD CODE START
    // document.addEventListener("DOMContentLoaded", this.handleDOMLoaded.bind(this));
    window.addEventListener("load", () => {
      // document.addEventListener("DOMContentLoaded", () => {
      console.log("DOM is ready");
      // this.getAllDailyMailBlogImagesFromDOM();
      // const requestOptionsTemplates = { method: "GET" };
      Promise.all([
        fetch(this.API_GET_NATIVE_AD_SLIDER_TEMPLATE).then((response) => response.text()),
        fetch(this.API_GET_NATIVE_AD_SIMPLE_TEMPLATE).then((response) => response.text()),
      ])
        .then(allResponses => {
          this.nativeAdSliderTemplateHTMLString = allResponses[0];
          this.nativeAdSimpleTemplateHTMLString = allResponses[1];

          // this.initializeIntersectionObserver();
          // let intersectionObserver;
          const options = {
            // root: document.body,
            rootMargin: "0px",
            threshold: 0.2,
          };

          if (window.IntersectionObserverV1) {
            intersectionObserver = new IntersectionObserverV1(
              this.handleIntersectionEntries.bind(this),
              options
            );
          } else {
            intersectionObserver = new IntersectionObserver(
              this.handleIntersectionEntries.bind(this),
              options
            );
          }

          let allParentEls;
          if (window.innerWidth <= MOBILE_WIDTH) {
            allParentEls = Array.from(document.querySelectorAll(MOBILE_IMAGE_GROUP_PARENT_TAG));
          } else {
            allParentEls = Array.from(document.querySelectorAll(DESKTOP_IMAGE_GROUP_PARENT_DIV_CLASS));
          }
          // start observing them
          allParentEls.forEach((parentEl) => {
            intersectionObserver.observe(parentEl);
          });
          this.log(this.feedProducts);
        });
    });
  }
  loadStyleSheetIntoHead(url) {
    var styles = document.createElement('link');
    styles.type = "text/css";
    styles.rel = "stylesheet";
    styles.href = url;
    document.head.appendChild(styles);
  }
  loadScript(url) {
    document.body.appendChild(document.createElement("script")).src = url;
  }
  loadScriptIntoHead(url) {
    document.head.appendChild(document.createElement("script")).src = url;
  }
  handleIntersectionEntries(entries, observer) {
    // // debugger;
    entries.forEach((entry) => {
      // console.log(entry);
      // check if image el is visible in screen/window
      // if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
      if (entry.isIntersecting) {
        const visibleParentEl = entry.target;
        // console.log(visibleParentEl);
        // this.log(visibleParentEl.getElementsByTagName('img'));
        const imageElsInsideSameParent = Array.from(visibleParentEl.getElementsByTagName('img'));
        const imagesPresentInSameParent = imageElsInsideSameParent.map(img => img.getAttribute("src"))
          // filter null values or undefined
          .filter(x => x);
        // call the apis here
        const requestBody = {
          webpageUrl: window.location.href,
          imageUrls: imagesPresentInSameParent,
          publisherId: 1,
        };
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const raw = JSON.stringify(requestBody);
        const requestOptions = {
          method: "POST",
          headers,
          body: raw,
        };
        fetch(this.API_GET_NATIVE_AD_PRODUCT, requestOptions)
          .then((response) => response.json())
          .then((response) => {
            // if feed does not deliver an empty response
            if (response !== "") {
              if (response.success && response.success === true) {
                const adProductsData = response;
                let foundImageData = null, foundImageElement = null, foundIndex = null;
                // find any one image from the parent to render ad
                for (let i = 0; i < imageElsInsideSameParent.length; i++) {
                  const currentImageEle = imageElsInsideSameParent[i];
                  const imageSrcToShowAd = currentImageEle.src;
                  const imageDataSrcToShowAd = currentImageEle.getAttribute("data-src");
                  foundIndex = adProductsData.payload
                    .findIndex((imageData) => imageData.imageUrl === imageSrcToShowAd || imageDataSrcToShowAd);
                  foundImageData = adProductsData.payload[foundIndex];
                  // check if event the first image have ad products
                  // just stop finding for other images
                  if (foundImageData.products && foundImageData.products.length > 0) {
                    foundImageElement = currentImageEle;
                    break;
                  }
                }
                if (foundImageData.products && foundImageData.products.length > 0) {
                  // this.sliderCount;
                  // generate the ad on the go
                  // and then just append to the this parent
                  this.generatedAdForSingleImage(foundImageData, this.sliderCount);
                  this.sliderCount++;
                  if (foundImageData.generatedAdHTML) {
                    // handle the mobile version
                    if (window.innerWidth <= MOBILE_WIDTH) {
                      // append the found ad just after the image caption
                      const titleOfImageGroup = visibleParentEl
                        .getElementsByTagName(MOBILE_DAILY_MAIL_IMAGE_CAPTION_TAG)[0];
                      if (titleOfImageGroup) {
                        titleOfImageGroup.after(foundImageData.generatedAdHTML);
                      }
                      // just to handle the image without caption for mobile
                      else {
                        visibleParentEl.appendChild(foundImageData.generatedAdHTML);
                      }
                    }
                    // desktop version
                    else {
                      // append the found ad just after the image caption
                      visibleParentEl
                        .getElementsByClassName(DESKTOP_DAILY_MAIL_IMAGE_CAPTION_CLASS)[0]
                        .after(foundImageData.generatedAdHTML);
                      foundImageData.isAdGenerated = true;
                      console.log("ad rendered for ", visibleParentEl);
                      // once ad is rendered no need to observe this parent element any more
                      // deregister intersection observer apis

                    }

                    const identifier = foundImageData.sliderId;
                    const sliderIdSelector = `#${identifier}`;
                    // console.log(identifier);
                    if (foundImageData.isSliderTemplate) {
                      this.slidersAppendedArray.push(foundImageData.sliderId);
                      console.log(window.Splide);
                      if (window.Splide) {
                        const testSlider = new Splide(sliderIdSelector, {
                          type: 'loop',
                          pagination: false,
                          gap: 10,
                          autoWidth: true,
                          autoHeight: true,
                        }).mount();
                        const adProductsSliderContainer = document.getElementById(identifier);
                        adProductsSliderContainer.style.display = "block";
                        const adWrapper = foundImageData.generatedAdHTML;
                        adWrapper.setAttribute("data-slider-appended", "true");
                        adWrapper.style.display = "block";
                        this.log("slider appended");
                        testSlider.on('mounted', function () {
                          console.log("mounted");
                          // This will be executed.
                        });
                      }
                    }

                    observer.unobserve(entry.target);
                    console.log("observer unregistered for ", visibleParentEl);
                  }
                }
              }
            } else {
              // empty response from feed
              this.log("empty feed response");
            }
          })
          .catch((error) => {
            console.error(error);
            typeof onErrorCallback === "function" && onErrorCallback(error);
          });
      }
    });
  }
  // getAllDailyMailBlogImagesFromDOM() {
  //   //debugger;
  //   // TO DO throw error if image selector not present
  //   // this.allImageElements = document.querySelectorAll(this.options.adImagesSelector);
  //   this.allValidImageSrcArray = [];
  //   if (window.innerWidth <= MOBILE_WIDTH) {

  //     const alreadyLoadedImagesArray = Array.from(document.querySelectorAll(MOBILE_DAILY_MAIL_LOADED_IMAGE_SELECTOR_CLASS))
  //       .map(img => img.getAttribute("src"));
  //     this.allValidImageSrcArray.push(...alreadyLoadedImagesArray);

  //     // async loadable images
  //     const imagesWhichAreYetToBeLoaded = Array.from(document.querySelectorAll(MOBILE_DAILY_MAIL_IMAGE_SELECTOR_CLASS))
  //       .map(img => img.getAttribute("data-src"))
  //       // filter null values or undefined
  //       .filter(x => x);
  //     this.allValidImageSrcArray.push(...imagesWhichAreYetToBeLoaded);
  //   } else {
  //     // consider desktop view
  //     const alreadyLoadedImagesArray = Array.from(document.querySelectorAll(DESKTOP_DAILY_MAIL_LOADED_IMAGE_SELECTOR_CLASS))
  //       .map(img => img.getAttribute("src"));
  //     this.allValidImageSrcArray.push(...alreadyLoadedImagesArray);

  //     // async loadable images
  //     const imagesWhichAreYetToBeLoaded = Array.from(document.querySelectorAll(DESKTOP_DAILY_MAIL_IMAGE_SELECTOR_CLASS))
  //       .map(img => img.getAttribute("data-src"))
  //       // filter null values or undefined
  //       .filter(x => x);
  //     this.allValidImageSrcArray.push(...imagesWhichAreYetToBeLoaded);
  //   }
  //   this.log(this.allValidImageSrcArray);
  // };
  generatedAdForSingleImage(imageData, foundIndex) {
    const generatedAd = this.createAdsForAllProductsInAdvance(imageData, foundIndex);
    imageData.generatedAdHTML = generatedAd;
  }
  createAdTemplatesForAllProducts() {
    this.feedProducts.payload.map((imageData, index) => {
      if (imageData.products && imageData.products.length > 0) {
        const generatedAd = this.createAdsForAllProductsInAdvance(imageData, index);
        imageData.generatedAdHTML = generatedAd;
        // imageData.generatedAdString = generatedAd.innerHTML;
      }
    });
  }
  createAdsForAllProductsInAdvance(imageData, index) {
    //debugger;
    const imageUrl = imageData.imageUrl;
    const BRAND_NAME = imageData.advertiserName;
    let products = imageData.products;
    // to test 1-2-3-4 products case
    // const products = imageData.products.slice(0, (index % 2 === 0 ? 2 : 1));
    // for 3 and 4 products
    // const products = imageData.products.slice(0, (index % 2 === 0 ? 3 : 4));
    if (window.innerWidth > MOBILE_WIDTH) {
      products = imageData.products.slice(0, 4);
    }
    const advertiserName = imageData.advertiserName;
    const identifier = `splide${index}`;
    imageData.sliderId = identifier;
    switch (products.length) {
      case 1:
      case 2:
      case 3:
      case 4: {
        imageData.isSliderTemplate = false;
        // const newDOM = this.nativeAdSimpleTemplateHTMLString
        //   .replaceAll(SLIDER_CLASS_TO_REPLACE_WITH, identifier);

        const domParser = new DOMParser();
        const simpleTemplateDOM = domParser.parseFromString(this.nativeAdSimpleTemplateHTMLString, "text/html");

        // dynamic logo for the advertiser
        const logoUrl = `${TRENDII_NATIVE_ADS_CDN}/${advertiserName.toLowerCase()}.png`;
        const retailerLogoEl = simpleTemplateDOM.getElementById(RETAILER_LOGO_ID);
        retailerLogoEl.title = advertiserName;
        // when the logo is used as the image tag
        retailerLogoEl.src = logoUrl;

        const productsContainerEl = simpleTemplateDOM.getElementById(
          this.HTML_TEMPLATE_SIMPLE_CONTAINER_ID
        );
        productsContainerEl.innerHTML = "";

        // const logo = document.getElementById("logo");
        // logo.addEventListener("click", function () {
        //   window.open(feedProducts[0].url, "_blank");
        // });
        initializeRenderingProductsBasedOnCount(products, productsContainerEl);
        const resultantAdWrapper = simpleTemplateDOM.getElementById(this.HTML_TEMPLATE_AD_WRAPPER_ID);
        return resultantAdWrapper;
      }
      // break;

      default: {
        imageData.isSliderTemplate = true;
        const newDOM = this.nativeAdSliderTemplateHTMLString
          .replaceAll(SLIDER_CLASS_TO_REPLACE_WITH, identifier);
        // .replaceAll(RETAILER_NAME_TO_REPLACE_WITH, advertiserName);

        const domParser = new DOMParser();
        const templatesDOM = domParser.parseFromString(newDOM, "text/html");

        // dynamic logo for the advertiser
        const logoUrl = `${TRENDII_NATIVE_ADS_CDN}/${advertiserName.toLowerCase()}.png`;
        const retailerLogoEl = templatesDOM.getElementById(RETAILER_LOGO_ID);
        retailerLogoEl.title = advertiserName;
        // when the logo is used as the image tag
        retailerLogoEl.src = logoUrl;

        // when the logo is used as the div tag
        // const newBackgroundStyle = 'url("' + logoUrl + '") no-repeat center center';
        // // retailerLogoEl.style.background = `url("${logoUrl}") no-repeat center center;`;
        // retailerLogoEl.style.background = newBackgroundStyle;
        // retailerLogoEl.style.backgroundSize = "contain";

        // to resolve the issue for the slider getting too much height while rendering
        const adProductsSliderContainer = templatesDOM.getElementById(identifier);
        adProductsSliderContainer.style.display = "none";


        let productsContainerEl = templatesDOM.getElementById(this.HTML_TEMPLATE_SLIDER_CONTAINER_ID);
        productsContainerEl.innerHTML = "";

        // create slider html template and append to the container
        products.forEach((product) => this.createSliderItemProduct(product, productsContainerEl));
        const resultantAdWrapper = templatesDOM.getElementById(this.HTML_TEMPLATE_AD_WRAPPER_ID);
        resultantAdWrapper.style.display = "none";
        return resultantAdWrapper;
      }
      // break;
    }
  }
  getAllParentImageGroupClassMobile() {
    let allParentElements;
    if (window.innerWidth <= MOBILE_WIDTH) {
      allParentElements = document.querySelectorAll(MOBILE_IMAGE_GROUP_PARENT_TAG);
    } else {
      allParentElements = document.querySelectorAll(DESKTOP_IMAGE_GROUP_PARENT_DIV_CLASS);
    }
    this.parentImageGroupElements = Array.from(allParentElements);
    this.log(this.parentImageGroupElements);
    // let isThereAnySliderAds = false;
    let foundImageData = null;
    let foundImageElement = null;
    this.parentImageGroupElements.forEach((parentEl, index) => {

      this.log(parentEl.getElementsByTagName('img'));
      const allImagesPresentInTheSameGroup = Array.from(parentEl.getElementsByTagName('img'));
      //debugger;

      for (let i = 0; i < allImagesPresentInTheSameGroup.length; i++) {
        const currentImageEle = allImagesPresentInTheSameGroup[i];
        const imageSrcToShowAd = currentImageEle.src;
        const imageDataSrcToShowAd = currentImageEle.getAttribute("data-src");
        foundImageData = this.feedProducts.payload
          .find((imageData) => imageData.imageUrl === imageSrcToShowAd || imageDataSrcToShowAd);
        if (foundImageData.generatedAdHTML) {
          foundImageElement = currentImageEle;
          break;
        }
      }
      // const currentImageEle = parentEl.getElementsByTagName('img')[0];
      // this.log(imageSrcToShowAd);
      // this.log(imageDataSrcToShowAd);
      // this.log(findImageData);

      if (foundImageData.generatedAdHTML) {
        // isThereAnySliderAds = true;
        const adContainer = document.createElement('div');
        adContainer.classList.add("adContainer");
        adContainer.style.background = "yellow";
        adContainer.style.maxHeight = "300px";
        // adContainer.appendChild(findImageData.generatedAdHTML);

        const adContainerMobile = document.createElement('div');
        adContainerMobile.classList.add("ads-inside-the-images");
        // adContainerMobile.style.background = "yellow";
        // adContainerMobile.style.height = "max-content";
        // adContainerMobile.appendChild(foundImageData.generatedAdHTML);
        // foundImageElement.after(adContainerMobile);

        // handle the mobile version
        if (window.innerWidth < MOBILE_WIDTH) {
          // append the found ad just after the image caption
          const titleOfImageGroup = parentEl
            .getElementsByTagName(MOBILE_DAILY_MAIL_IMAGE_CAPTION_TAG)[0];
          if (titleOfImageGroup) {
            titleOfImageGroup.after(foundImageData.generatedAdHTML);
          }
          else {
            parentEl.appendChild(foundImageData.generatedAdHTML);
          }
        }
        // desktop version
        else {
          // append the found ad just after the image caption
          parentEl
            .getElementsByClassName(DESKTOP_DAILY_MAIL_IMAGE_CAPTION_CLASS)[0]
            .after(foundImageData.generatedAdHTML);
          // parentEl
          //   .after(foundImageData.generatedAdHTML);
        }



        // //debugger;
        // const div = document.createElement('div');
        // div.style.background = "yellow";
        // div.style.height = "100px";
        // parentEl.getElementsByClassName(DAILY_MAIL_IMAGE_CAPTION_CLASS)[0].after(div);
        // if (index === (this.parentImageGroupElements.length - 1) && isThereAnySliderAds) { }
      }
    });
    // document.querySelectorAll(".mol-img-group")[0].getElementsByTagName('img');
    // document.querySelectorAll(".mol-img-group")[0].getElementsByClassName('imageCaption')[0];
    // document.querySelectorAll(".mol-img-group")[0].getElementsByClassName('imageCaption')[0].after(t);
  }
  getAllAdContainersFromDOM() {
    // this.allAdContainers = document.querySelectorAll(this.options.adContainer);
  }
  log(message) {
    console.log(message);
  }
  createSliderItemProduct(product, productsContainer) {
    // <li class="splide__slide">
    //     <div class="product-item-container">
    //         <div class="product-item"
    //             style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
    //             <span class="onsale">ON SALE</span>
    //             <div class="product-details-wrapper">
    //                 <b class="brand-name">TRENDii</b>
    //                 <p class="product-name">M2K tekno sneakers</p>
    //                 <span class="product-cashback-chip">2% Cashback</span>
    //                 <em class="product-price">$260</em>
    //             </div>
    //         </div>
    //     </div>
    // </li>
    const sliderItem = document.createElement("LI");
    sliderItem.classList.add("splide__slide");
    productsContainer.appendChild(sliderItem);

    const productItemRedirectContainer = document.createElement("A");
    productItemRedirectContainer.classList.add("product-redirection-link");
    productItemRedirectContainer.style = "text-decoration: none;";
    productItemRedirectContainer.href = product.url;
    productItemRedirectContainer.target = "_blank";
    sliderItem.appendChild(productItemRedirectContainer);

    const productItemContainer = document.createElement("DIV");
    productItemContainer.classList.add("product-item-container");
    productItemContainer.addEventListener("click", function () {
      window.open(product.url, "_blank");
    });
    productItemRedirectContainer.appendChild(productItemContainer);

    const productItem = document.createElement("DIV");
    productItem.classList.add("product-item");
    productItem.style.backgroundImage = `url(${product.image})`;
    productItemContainer.appendChild(productItem);

    if (product.sale) {
      const onSaleTag = document.createElement("SPAN");
      onSaleTag.classList.add("onsale");
      onSaleTag.innerHTML = "ON SALE";
      productItem.appendChild(onSaleTag);
    }

    const productDetailsWrapper = document.createElement("DIV");
    productDetailsWrapper.classList.add("product-details-wrapper");
    productItem.appendChild(productDetailsWrapper);
    productDetailsWrapper.addEventListener("click", function () {
      window.open(product.url, "_blank");
    });

    const productDetailsWrapperMobile = document.createElement("DIV");
    productDetailsWrapperMobile.classList.add("product-details-wrapper-mobile");
    productItemContainer.appendChild(productDetailsWrapperMobile);
    // productDetailsWrapperMobile.addEventListener("click", function () {
    //   window.open(product.url, "_blank");
    // });

    // const productName = document.createElement("B");
    // productName.classList.add("brand-name");
    // productName.innerHTML = this.brandName;
    // productDetailsWrapper.appendChild(productName);

    const productNameP = document.createElement("P");
    productNameP.classList.add("product-name");
    productNameP.innerHTML = product.name;
    productDetailsWrapper.appendChild(productNameP);

    const productNamePMobile = document.createElement("P");
    productNamePMobile.classList.add("product-name");
    productNamePMobile.innerHTML = product.name;
    productDetailsWrapperMobile.appendChild(productNamePMobile);

    // const productCashbackPercentage = document.createElement("SPAN");
    // productCashbackPercentage.classList.add("product-cashback-chip");
    // productCashbackPercentage.innerHTML = "4%" + " Cashback";
    // productDetailsWrapper.appendChild(productCashbackPercentage);

    const productPrice = document.createElement("EM");
    productPrice.classList.add("product-price");
    productPrice.innerHTML = product.currency + product.price;
    productDetailsWrapper.appendChild(productPrice);

    const productPriceMobile = document.createElement("EM");
    productPriceMobile.classList.add("product-price");
    productPriceMobile.innerHTML = product.currency + product.price;
    productDetailsWrapperMobile.appendChild(productPriceMobile);
  }
  /*
  getProductsForAllImages(onSuccessCallback) {
    //debugger;
    const requestBody = {
      "webpageUrl": window.location.href,
      "imageUrls": this.allValidImageSrcArray,
      "publisherId": 1,
    };
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const raw = JSON.stringify(requestBody);
    const requestOptions = {
      method: "POST",
      headers,
      body: raw,
    };
    fetch(this.API_GET_NATIVE_AD_PRODUCT, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        //debugger;
        // if feed does not deliver an empty response
        if (response !== "") {
          if (response.success && response.success === true) {
            //debugger;
            this.feedProducts = response;
            // this.log(response.data);
            // this.appendAdContainersToImages();
            // const domParser = new DOMParser();
            // const parsedHtmlDocumentEl = domParser.parseFromString(this.nativeAdHTMLString, "text/html");
            // // here the container id should be dynamic for each ads sizes
            // this.productsContainerEl = parsedHtmlDocumentEl.getElementById(
            //   this.NATIVE_AD_HTML_TEMPLATE_SLIDER_CONTAINER_ID
            // );
            // this.productsContainerEl.innerHTML = "";


            // for desktop cant use the same approach as of now for intersection apis
            // this.createAdTemplatesForAllProducts();

            // handle mobile version
            if (window.innerWidth <= 480) {
              this.createAdTemplatesForAllProducts();
              this.getAllParentImageGroupClassMobile();
            }
            // handle desktop version
            else {
              // this.initializeIntersectionObserver().bind(this);
              let allParentElements;
              // for mobile devices parents
              if (window.innerWidth <= MOBILE_WIDTH) {
                allParentElements = Array.from(document.querySelectorAll(MOBILE_IMAGE_GROUP_PARENT_TAG));
              } else {
                // for desktop devices parents
                allParentElements = Array.from(document.querySelectorAll(DESKTOP_IMAGE_GROUP_PARENT_DIV_CLASS));
              }
              allParentElements.forEach((parentEl) => {
                // // debugger;
                this.intersectionObserver.observe(parentEl);
              });
              this.log(this.feedProducts);
            }
          }
          // else {
          //   this.feedProducts = window.FEED_PRODUCTS;
          //   this.createAdTemplatesForAllProducts();
          //   this.getAllParentImageGroupClass();
          //   onSuccessCallback();
          //   this.log(this.feedProducts);
          // }
        } else {
          // empty response from feed
          this.log("empty feed response");
        }
      })
      .catch((error) => {
        console.error(error);
        typeof onErrorCallback === "function" && onErrorCallback(error);
      });
  }
  getProductsForVisibleImages(allVisibleImages, onSuccessCallback) {
    const requestBody = {
      "webpageUrl": window.location.href,
      "imageUrls": allVisibleImages,
      "publisherId": 1,
    };
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const raw = JSON.stringify(requestBody);
    const requestOptions = {
      method: "POST",
      headers,
      body: raw,
    };
    fetch(this.API_GET_NATIVE_AD_PRODUCT, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        // if feed does not deliver an empty response
        if (response !== "") {
          if (response.success && response.success === true) {
            // this.feedProducts = response;
            onSuccessCallback(response);
          }
        } else {
          // empty response from feed
          this.log("empty feed response");
        }
      })
      .catch((error) => {
        console.error(error);
        typeof onErrorCallback === "function" && onErrorCallback(error);
      });
  }
  */
};
(function () {
  // native ad options to implement
  // const options = {
  //   adImagesSelector: ".ad-image",
  //   isNativeAd: true,
  //   // adPosition: "bottom", // "bottom" || "left" || "right" || "top"
  //   brandName: "TRENDii"
  // };
  var myTrendii = new TRENDiiAd();
  myTrendii.log("initialize new instance");
})();

function initializeRenderingProductsBasedOnCount(adRenderingProducts, productsContainer) {
  switch (adRenderingProducts.length) {
    case 1: {
      // <div class="one-product-wrapper">
      //     <div class="product-item-container">
      //         <div class="product-item main-item"
      //             style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //         </div>
      //         <div class="product-details-wrapper">
      //             <b class="brand-name">MARCO POLO</b>
      //             <p class="product-name">M2K tekno sneakers sneakers sn eakers sneake rssneakerstekno tekno
      //                     tekno</p>
      //             <em class="product-price">$260</em>
      //         </div>
      //     </div>
      // </div>


      // <div class="one-product-wrapper">
      //   <div class="row">
      //     <div class="col-12">
      //       <div class="product-item-container">
      //         <div class="product-item">
      //           <div class="product-item-image"
      //             style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //             <span class="onsale">ON SALE</span>
      //           </div>
      //         </div>
      //         <div class="product-details-wrapper">
      //           <b class="brand-name">MARCO POLO POLO POLO POLOPOLOPOLO POLO POLO POLO vPOLO
      // 							POLO POLO POLO POLO POLO POLO POLO POLO POLO POLO POLO </b>
      //           <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v tekno v
      //           tekno tekno tekno v tekno v tekno tekno tekno v tekno v
      // 						</p>
      //           <em class="product-price">$260</em>
      // 					</div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      /*
      const product = adRenderingProducts[0];

      const productItemRedirectContainer = document.createElement("A");
      productItemRedirectContainer.classList.add("product-redirection-link");
      productItemRedirectContainer.style = "text-decoration: none;";
      productItemRedirectContainer.href = product.url;
      productItemRedirectContainer.target = "_blank";
      productsContainer.appendChild(productItemRedirectContainer);

      const oneProductWrapper = document.createElement("DIV");
      oneProductWrapper.classList.add("one-product-wrapper");
      productItemRedirectContainer.appendChild(oneProductWrapper);

      const productItemContainer = document.createElement("DIV");
      productItemContainer.classList.add("product-item-container");
      productItemContainer.addEventListener("click", function () {
        window.open(product.url, "_blank");
      });
      oneProductWrapper.appendChild(productItemContainer);

      const productItem = document.createElement("DIV");
      productItem.classList.add("product-item");
      productItem.classList.add("main-item");
      productItem.style.backgroundImage = `url(${product.image})`;
      productItemContainer.appendChild(productItem);

      if (product.sale) {
        const onSaleTag = document.createElement('SPAN');
        onSaleTag.classList.add("onsale");
        onSaleTag.innerHTML = "ON SALE";
        productItem.appendChild(onSaleTag);
      }

      const productDetailsWrapper = document.createElement("DIV");
      productDetailsWrapper.classList.add("product-details-wrapper");
      productItemContainer.appendChild(productDetailsWrapper);

      const productName = document.createElement("P");
      productName.classList.add("product-name");
      productName.innerHTML = product.name;
      productDetailsWrapper.appendChild(productName);

      const productPrice = document.createElement("EM");
      productPrice.classList.add("product-price");
      productPrice.innerHTML = product.currency + product.price;
      productDetailsWrapper.appendChild(productPrice);
      */


      // <div class="one-product-wrapper">
      //     <div class="row">
      //         <div class="col-12">
      //             <div class="product-item-container">
      //                 <div class="product-item">
      //                     <div class="product-item-image"
      //                         style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //                     </div>
      //                 </div>
      //                 <div class="product-details-wrapper">
      // 					   <b class="brand-name">MARCO POLO </b>
      //                     <p class="product-name">M2K tekno sneakers</p>
      //                     <em class="product-price">$260</em>
      //                 </div>
      //             </div>
      //         </div>
      //     </div>
      // </div>
      const product = adRenderingProducts[0];
      // const adWrapper = document.getElementsByClassName("block728X90-wrapper")[0];
      // adWrapper.addEventListener("click", function () {
      //   window.open(product.url, "_blank");
      // });
      // // to fix curser pointer issue
      // adWrapper.style.cursor = "pointer";

      const oneProductWrapper = document.createElement("DIV");
      oneProductWrapper.classList.add("one-product-wrapper");
      productsContainer.appendChild(oneProductWrapper);

      const row = document.createElement("DIV");
      row.classList.add("row");
      oneProductWrapper.appendChild(row);

      const col = document.createElement("DIV");
      col.classList.add("col-12");
      row.appendChild(col);

      const productItemRedirectContainer = document.createElement("A");
      productItemRedirectContainer.classList.add("product-redirection-link");
      productItemRedirectContainer.style = "text-decoration: none;";
      productItemRedirectContainer.href = product.url;
      productItemRedirectContainer.target = "_blank";
      col.appendChild(productItemRedirectContainer);

      const productItemContainer = document.createElement("DIV");
      productItemContainer.classList.add("product-item-container");
      productItemContainer.addEventListener("click", function () {
        window.open(product.url, "_blank");
      });
      productItemRedirectContainer.appendChild(productItemContainer);

      const productItem = document.createElement("DIV");
      productItem.classList.add("product-item");
      productItemContainer.appendChild(productItem);

      const productItemImage = document.createElement("DIV");
      productItemImage.classList.add("product-item-image");
      productItemImage.style.backgroundImage = `url(${product.image})`;
      productItem.appendChild(productItemImage);

      if (product.sale) {
        const onSaleTag = document.createElement('SPAN');
        onSaleTag.classList.add("onsale");
        onSaleTag.innerHTML = "ON SALE";
        productItemImage.appendChild(onSaleTag);
      }

      const productDetailsWrapper = document.createElement("DIV");
      productDetailsWrapper.classList.add("product-details-wrapper");
      productItemContainer.appendChild(productDetailsWrapper);

      const productName = document.createElement("P");
      productName.classList.add("product-name");
      productName.innerHTML = product.name;
      productDetailsWrapper.appendChild(productName);

      const productPrice = document.createElement("EM");
      productPrice.classList.add("product-price");
      productPrice.innerHTML = product.currency + product.price;
      productDetailsWrapper.appendChild(productPrice);
      break;
    }
    case 2: {
      // <div class="two-product-wrapper">
      //     <div class="row">
      //         <div class="col-6">
      //             <div class="product-item-container">
      //                 <div class="product-item">
      //                     <div class="product-item-image"
      //                         style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //                     </div>
      //                 </div>
      //                 <div class="product-details-wrapper">
      //                     <b class="brand-name">MARCO POLO POLO POLO POLO</b>
      //                     <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
      //                     <em class="product-price">$260</em>
      //                 </div>
      //             </div>
      //         </div>
      //         <div class="col-6">
      //             <div class="product-item-container">
      //                 <div class="product-item">
      //                     <div class="product-item-image"
      //                         style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //                     </div>
      //                 </div>
      //                 <div class="product-details-wrapper">
      //                     <b class="brand-name">MARCO POLO </b>
      //                     <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
      //                     <em class="product-price">$260</em>
      //                 </div>
      //             </div>
      //         </div>
      //     </div>
      // </div>
      const twoProductWrapper = document.createElement("DIV");
      twoProductWrapper.classList.add("two-product-wrapper");
      productsContainer.appendChild(twoProductWrapper);

      const row = document.createElement("DIV");
      row.classList.add("row");
      twoProductWrapper.appendChild(row);

      for (let i = 0; i <= 1; i++) {
        const product = adRenderingProducts[i];

        const col = document.createElement("DIV");
        col.classList.add("col-6");
        row.appendChild(col);

        const productItemContainer = document.createElement("DIV");
        productItemContainer.classList.add("product-item-container");
        productItemContainer.addEventListener("click", function () {
          window.open(product.url, "_blank");
        });
        col.appendChild(productItemContainer);

        const productItem = document.createElement("DIV");
        productItem.classList.add("product-item");
        productItemContainer.appendChild(productItem);

        const productItemImage = document.createElement("DIV");
        productItemImage.classList.add("product-item-image");
        productItemImage.style.backgroundImage = `url(${product.image})`;
        productItem.appendChild(productItemImage);

        const productDetailsWrapper = document.createElement("DIV");
        productDetailsWrapper.classList.add("product-details-wrapper");
        productItemContainer.appendChild(productDetailsWrapper);

        const productName = document.createElement("P");
        productName.classList.add("product-name");
        productName.innerHTML = product.name;
        productDetailsWrapper.appendChild(productName);

        const productPrice = document.createElement("EM");
        productPrice.classList.add("product-price");
        productPrice.innerHTML = product.currency + product.price;
        productDetailsWrapper.appendChild(productPrice);
      }
      break;
    }
    case 3: {
      // <div class="three-product-wrapper">
      //   <div class="row row-cols-3">
      //     <div class="col">
      //       <div class="product-item-container">
      //         <div class="product-item">
      //           <div class="product-item-image"
      //             style="background-image: url(https://cdn.trendii.com/assets/4.jpg)">
      //             <span class="onsale">ON SALE</span>
      //           </div>
      //         </div>
      //         <div class="product-details-wrapper">
      // 					 <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
      //           <em class="product-price">$260</em>
      //         </div>
      //         <div class="product-details-wrapper-mobile">
      //           <p class="product-name">Relaxed Stripe Dress</p>
      //           <em class="product-price">$119.00</em>
      //         </div>
      //       </div>
      //     </div>
      //     <div class="col">
      //       <div class="product-item-container">
      //         <div class="product-item">
      //           <div class="product-item-image"
      //             style="background-image: url(https://cdn.trendii.com/assets/4.jpg)">
      //             <span class="onsale">ON SALE</span>
      //           </div>
      //         </div>
      //         <div class="product-details-wrapper">
      // 					 <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
      //           <em class="product-price">$260</em>
      //         </div>
      //         <div class="product-details-wrapper-mobile">
      //           <p class="product-name">Relaxed Stripe Dress</p>
      //           <em class="product-price">$119.00</em>
      //         </div>
      //       </div>
      //     </div>
      //     <div class="col">
      //       <div class="product-item-container">
      //         <div class="product-item">
      //           <div class="product-item-image"
      //             style="background-image: url(https://cdn.trendii.com/assets/4.jpg)">
      //             <span class="onsale">ON SALE</span>
      //           </div>
      //         </div>
      //         <div class="product-details-wrapper">
      // 					 <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
      //           <em class="product-price">$260</em>
      //         </div>
      //         <div class="product-details-wrapper-mobile">
      //           <p class="product-name">Relaxed Stripe Dress</p>
      //           <em class="product-price">$119.00</em>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>;
      const threeProductWrapper = document.createElement("DIV");
      threeProductWrapper.classList.add("three-product-wrapper");
      productsContainer.appendChild(threeProductWrapper);

      const row = document.createElement("DIV");
      row.classList.add("row");
      row.classList.add("row-cols-3");
      threeProductWrapper.appendChild(row);

      for (let i = 0; i <= 2; i++) {
        const product = adRenderingProducts[i];

        const col = document.createElement("DIV");
        col.classList.add("col");
        row.appendChild(col);

        const productItemRedirectContainer = document.createElement("A");
        productItemRedirectContainer.classList.add("product-redirection-link");
        // productItemRedirectContainer.style = "text-decoration: none;";
        productItemRedirectContainer.href = product.url;
        productItemRedirectContainer.target = "_blank";
        col.appendChild(productItemRedirectContainer);

        const productItemContainer = document.createElement("DIV");
        productItemContainer.classList.add("product-item-container");
        productItemRedirectContainer.appendChild(productItemContainer);

        const productItem = document.createElement("DIV");
        productItem.classList.add("product-item");
        productItemContainer.appendChild(productItem);

        const productItemImage = document.createElement("DIV");
        productItemImage.classList.add("product-item-image");
        productItemImage.style.backgroundImage = `url(${product.image})`;
        productItem.appendChild(productItemImage);

        if (product.sale) {
          const onSaleTag = document.createElement('SPAN');
          onSaleTag.classList.add("onsale");
          onSaleTag.innerHTML = "ON SALE";
          productItemImage.appendChild(onSaleTag);
        }

        const productDetailsWrapper = document.createElement("DIV");
        productDetailsWrapper.classList.add("product-details-wrapper");
        productItemContainer.appendChild(productDetailsWrapper);

        // const brandName = document.createElement("B");
        // brandName.classList.add("brand-name");
        // brandName.innerHTML = BRAND_NAME;
        // productDetailsWrapper.appendChild(brandName);

        const productName = document.createElement("P");
        productName.classList.add("product-name");
        productName.innerHTML = product.name;
        productDetailsWrapper.appendChild(productName);

        const productPrice = document.createElement("EM");
        productPrice.classList.add("product-price");
        productPrice.innerHTML = product.currency + product.price;
        productDetailsWrapper.appendChild(productPrice);

        // mobile wrapper
        const productDetailsWrapperMobile = document.createElement("DIV");
        productDetailsWrapperMobile.classList.add("product-details-wrapper-mobile");
        productItemContainer.appendChild(productDetailsWrapperMobile);

        const productNameMobile = document.createElement("P");
        productNameMobile.classList.add("product-name");
        productNameMobile.innerHTML = product.name;
        productDetailsWrapperMobile.appendChild(productNameMobile);

        const productPriceMobile = document.createElement("EM");
        productPriceMobile.classList.add("product-price");
        productPriceMobile.innerHTML = product.currency + product.price;
        productDetailsWrapperMobile.appendChild(productPriceMobile);
      }
      break;
    }
    case 4: {
      // <div class="four-product-wrapper">
      //   <div class="row row-cols-4">
      //     <div class="col">
      //       <div class="product-item-container">
      //         <div class="product-item">
      //           <div class="product-item-image"
      //             style="background-image: url(https://cdn.trendii.com/assets/4.jpg)">
      //             <span class="onsale">ON SALE</span>
      //           </div>
      //           <div class="product-details-wrapper">
      //             <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
      //             <em class="product-price">$260</em>
      //           </div>
      //         </div>
      //         <div class="product-details-wrapper-mobile">
      //           <p class="product-name">Relaxed Stripe Dress</p>
      //           <em class="product-price">$119.00</em>
      //         </div>
      //       </div>
      //     </div>
      //     <div class="col">
      //       <div class="product-item-container">
      //         <div class="product-item">
      //           <div class="product-item-image"
      //             style="background-image: url(https://cdn.trendii.com/assets/4.jpg)">
      //             <span class="onsale">ON SALE</span>
      //           </div>
      //           <div class="product-details-wrapper">
      //             <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
      //             <em class="product-price">$260</em>
      //           </div>
      //         </div>

      //         <div class="product-details-wrapper-mobile">
      //           <p class="product-name">Relaxed Stripe Dress</p>
      //           <em class="product-price">$119.00</em>
      //         </div>
      //       </div>
      //     </div>
      //     <div class="col">
      //       <div class="product-item-container">
      //         <div class="product-item">
      //           <div class="product-item-image"
      //             style="background-image: url(https://cdn.trendii.com/assets/4.jpg)">
      //             <span class="onsale">ON SALE</span>
      //           </div>
      //           <div class="product-details-wrapper">
      //             <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
      //             <em class="product-price">$260</em>
      //           </div>
      //         </div>

      //         <div class="product-details-wrapper-mobile">
      //           <p class="product-name">Relaxed Stripe Dress</p>
      //           <em class="product-price">$119.00</em>
      //         </div>
      //       </div>
      //     </div>
      //     <div class="col">
      //       <div class="product-item-container">
      //         <div class="product-item">
      //           <div class="product-item-image"
      //             style="background-image: url(https://cdn.trendii.com/assets/4.jpg)">
      //             <span class="onsale">ON SALE</span>
      //           </div>
      //           <div class="product-details-wrapper">
      //             <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
      //             <em class="product-price">$260</em>
      //           </div>
      //         </div>

      //         <div class="product-details-wrapper-mobile">
      //           <p class="product-name">Relaxed Stripe Dress</p>
      //           <em class="product-price">$119.00</em>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>;
      const fourProductWrapper = document.createElement("DIV");
      fourProductWrapper.classList.add("four-product-wrapper");
      productsContainer.appendChild(fourProductWrapper);

      const row = document.createElement("DIV");
      row.classList.add("row");
      row.classList.add("row-cols-4");
      fourProductWrapper.appendChild(row);

      for (let i = 0; i <= 3; i++) {
        const product = adRenderingProducts[i];

        const col = document.createElement("DIV");
        col.classList.add("col");
        row.appendChild(col);

        const productItemRedirectContainer = document.createElement("A");
        productItemRedirectContainer.classList.add("product-redirection-link");
        // productItemRedirectContainer.style = "text-decoration: none;";
        productItemRedirectContainer.href = product.url;
        productItemRedirectContainer.target = "_blank";
        col.appendChild(productItemRedirectContainer);

        const productItemContainer = document.createElement("DIV");
        productItemContainer.classList.add("product-item-container");
        productItemRedirectContainer.appendChild(productItemContainer);

        const productItem = document.createElement("DIV");
        productItem.classList.add("product-item");
        productItemContainer.appendChild(productItem);

        const productItemImage = document.createElement("DIV");
        productItemImage.classList.add("product-item-image");
        productItemImage.style.backgroundImage = `url(${product.image})`;
        productItem.appendChild(productItemImage);

        if (product.sale) {
          const onSaleTag = document.createElement('SPAN');
          onSaleTag.classList.add("onsale");
          onSaleTag.innerHTML = "ON SALE";
          productItemImage.appendChild(onSaleTag);
        }

        const productDetailsWrapper = document.createElement("DIV");
        productDetailsWrapper.classList.add("product-details-wrapper");
        productItem.appendChild(productDetailsWrapper);

        // const brandName = document.createElement("B");
        // brandName.classList.add("brand-name");
        // brandName.innerHTML = BRAND_NAME;
        // productDetailsWrapper.appendChild(brandName);

        const productName = document.createElement("P");
        productName.classList.add("product-name");
        productName.innerHTML = product.name;
        productDetailsWrapper.appendChild(productName);

        const productPrice = document.createElement("EM");
        productPrice.classList.add("product-price");
        productPrice.innerHTML = product.currency + product.price;
        productDetailsWrapper.appendChild(productPrice);

        // mobile detailer wrapper
        const productDetailsWrapperMobile = document.createElement("DIV");
        productDetailsWrapperMobile.classList.add("product-details-wrapper-mobile");
        productItemContainer.appendChild(productDetailsWrapperMobile);

        const productNameMobile = document.createElement("P");
        productNameMobile.classList.add("product-name");
        productNameMobile.innerHTML = product.name;
        productDetailsWrapperMobile.appendChild(productNameMobile);

        const productPriceMobile = document.createElement("EM");
        productPriceMobile.classList.add("product-price");
        productPriceMobile.innerHTML = product.currency + product.price;
        productDetailsWrapperMobile.appendChild(productPriceMobile);
      }
      break;
    }
    case 5: {
      // <div class="five-product-wrapper">
      //     <div class="row">
      //         <div class="col">
      //             <div class="product-item-container">
      //                 <div class="product-item"
      //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //                     <span class="onsale">ON SALE</span>
      //                     <div class="product-details-wrapper">
      //                         <b>Nike</b>
      //                         <p>M2K tekno sneakers</p>
      //                         <em>$ 260</em>
      //                     </div>
      //                 </div>
      //             </div>
      //         </div>
      //     </div>
      //     <div class="row secondary-product-row">
      //         <div class="col-6">
      //             <div class="product-item-container">
      //                 <div class="product-item"
      //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //                     <span class="onsale">ON SALE</span>
      //                     <div class="product-details-wrapper">
      //                         <b>Nike</b>
      //                         <p>M2K tekno sneakers</p>
      //                         <em>$ 260</em>
      //                     </div>
      //                 </div>
      //             </div>
      //         </div>
      //         <div class="col-6">
      //             <div class="product-item-container">
      //                 <div class="product-item"
      //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //                     <span class="onsale">ON SALE</span>
      //                     <div class="product-details-wrapper">
      //                         <b>Nike</b>
      //                         <p>M2K tekno sneakers</p>
      //                         <em>$ 260</em>
      //                     </div>
      //                 </div>
      //             </div>
      //         </div>
      //     </div>
      //     <div class="row secondary-product-row">
      //         <div class="col-6">
      //             <div class="product-item-container">
      //                 <div class="product-item"
      //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //                     <span class="onsale">ON SALE</span>
      //                     <div class="product-details-wrapper">
      //                         <b>Nike</b>
      //                         <p>M2K tekno sneakers</p>
      //                         <em>$ 260</em>
      //                     </div>
      //                 </div>
      //             </div>
      //         </div>
      //         <div class="col-6">
      //             <div class="product-item-container">
      //                 <div class="product-item"
      //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //                     <span class="onsale">ON SALE</span>
      //                     <div class="product-details-wrapper">
      //                         <b>Nike</b>
      //                         <p>M2K tekno sneakers</p>
      //                         <em>$ 260</em>
      //                     </div>
      //                 </div>
      //             </div>
      //         </div>
      //     </div>
      // </div>
      const fiveProductWrapper = document.createElement("DIV");
      fiveProductWrapper.classList.add("five-product-wrapper");
      productsContainer.appendChild(fiveProductWrapper);

      const product = adRenderingProducts[0];

      const row = document.createElement("DIV");
      row.classList.add("row");
      fiveProductWrapper.appendChild(row);

      const col = document.createElement("DIV");
      col.classList.add("col");
      row.appendChild(col);

      const productItemRedirectContainer = document.createElement("A");
      productItemRedirectContainer.classList.add("product-redirection-link");
      productItemRedirectContainer.style = "text-decoration: none;";
      productItemRedirectContainer.href = product.url;
      productItemRedirectContainer.target = "_blank";
      col.appendChild(productItemRedirectContainer);

      const productItemContainer = document.createElement("DIV");
      productItemContainer.classList.add("product-item-container");
      productItemContainer.addEventListener("click", function () {
        window.open(product.url, "_blank");
      });
      productItemRedirectContainer.appendChild(productItemContainer);

      const productItem = document.createElement("DIV");
      productItem.classList.add("product-item");
      productItem.style.backgroundImage = `url(${product.image})`;
      productItemContainer.appendChild(productItem);

      if (product.sale) {
        const onSaleTag = document.createElement('SPAN');
        onSaleTag.classList.add("onsale");
        onSaleTag.innerHTML = "ON SALE";
        productItem.appendChild(onSaleTag);
      }

      const productDetailsWrapper = document.createElement("DIV");
      productDetailsWrapper.classList.add("product-details-wrapper");
      productItem.appendChild(productDetailsWrapper);

      const brandName = document.createElement("B");
      brandName.classList.add("brand-name");
      brandName.innerHTML = BRAND_NAME;
      productDetailsWrapper.appendChild(brandName);

      const productName = document.createElement("P");
      productName.classList.add("product-name");
      productName.innerHTML = product.name;
      productDetailsWrapper.appendChild(productName);

      const productPrice = document.createElement("EM");
      productPrice.classList.add("product-price");
      productPrice.innerHTML = product.currency + product.price;
      productDetailsWrapper.appendChild(productPrice);

      let countIndex = 1;
      for (let i = 1; i <= 2; i++) {
        const row = document.createElement("DIV");
        row.classList.add("row");
        row.classList.add("secondary-product-row");
        fiveProductWrapper.appendChild(row);

        for (let i = 1; i <= 2; i++) {
          const product = adRenderingProducts[countIndex];

          const col = document.createElement("DIV");
          col.classList.add("col-6");
          row.appendChild(col);

          const productItemRedirectContainer = document.createElement("A");
          productItemRedirectContainer.classList.add("product-redirection-link");
          productItemRedirectContainer.style = "text-decoration: none;";
          productItemRedirectContainer.href = product.url;
          productItemRedirectContainer.target = "_blank";
          col.appendChild(productItemRedirectContainer);

          const productItemContainer = document.createElement("DIV");
          productItemContainer.classList.add("product-item-container");
          productItemContainer.addEventListener("click", function () {
            window.open(product.url, "_blank");
          });
          productItemRedirectContainer.appendChild(productItemContainer);

          const productItem = document.createElement("DIV");
          productItem.classList.add("product-item");
          productItem.style.backgroundImage = `url(${product.image})`;
          productItemContainer.appendChild(productItem);

          if (product.sale) {
            const onSaleTag = document.createElement('SPAN');
            onSaleTag.classList.add("onsale");
            onSaleTag.innerHTML = "ON SALE";
            productItem.appendChild(onSaleTag);
          }

          const productDetailsWrapper = document.createElement("DIV");
          productDetailsWrapper.classList.add("product-details-wrapper");
          productItem.appendChild(productDetailsWrapper);

          const brandName = document.createElement("B");
          brandName.classList.add("brand-name");
          brandName.innerHTML = BRAND_NAME;
          productDetailsWrapper.appendChild(brandName);

          const productName = document.createElement("P");
          productName.classList.add("product-name");
          productName.innerHTML = product.name;
          productDetailsWrapper.appendChild(productName);

          const productPrice = document.createElement("EM");
          productPrice.classList.add("product-price");
          productPrice.innerHTML = product.currency + product.price;
          productDetailsWrapper.appendChild(productPrice);

          countIndex++;
        }
      }

      break;
    }
    case 6: {
      // <div class="six-product-wrapper">
      //     <div class="row secondary-product-row">
      //         <div class="col-6">
      //             <div class="product-item-container">
      //                 <div class="product-item"
      //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //                     <span class="onsale">ON SALE</span>
      //                     <div class="product-details-wrapper">
      //                         <b>Nike</b>
      //                         <p>M2K tekno sneakers</p>
      //                         <em>$ 260</em>
      //                     </div>
      //                 </div>
      //             </div>
      //         </div>
      //         <div class="col-6">
      //             <div class="product-item-container">
      //                 <div class="product-item"
      //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //                     <span class="onsale">ON SALE</span>
      //                     <div class="product-details-wrapper">
      //                         <b>Nike</b>
      //                         <p>M2K tekno sneakers</p>
      //                         <em>$ 260</em>
      //                     </div>
      //                 </div>
      //             </div>
      //         </div>
      //     </div>
      //     <div class="row secondary-product-row">
      //         <div class="col-6">
      //             <div class="product-item-container">
      //                 <div class="product-item"
      //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //                     <span class="onsale">ON SALE</span>
      //                     <div class="product-details-wrapper">
      //                         <b>Nike</b>
      //                         <p>M2K tekno sneakers</p>
      //                         <em>$ 260</em>
      //                     </div>
      //                 </div>
      //             </div>
      //         </div>
      //         <div class="col-6">
      //             <div class="product-item-container">
      //                 <div class="product-item"
      //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //                     <span class="onsale">ON SALE</span>
      //                     <div class="product-details-wrapper">
      //                         <b>Nike</b>
      //                         <p>M2K tekno sneakers</p>
      //                         <em>$ 260</em>
      //                     </div>
      //                 </div>
      //             </div>
      //         </div>
      //     </div>
      //     <div class="row secondary-product-row">
      //         <div class="col-6">
      //             <div class="product-item-container">
      //                 <div class="product-item"
      //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //                     <span class="onsale">ON SALE</span>
      //                     <div class="product-details-wrapper">
      //                         <b>Nike</b>
      //                         <p>M2K tekno sneakers</p>
      //                         <em>$ 260</em>
      //                     </div>
      //                 </div>
      //             </div>
      //         </div>
      //         <div class="col-6">
      //             <div class="product-item-container">
      //                 <div class="product-item"
      //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //                     <span class="onsale">ON SALE</span>
      //                     <div class="product-details-wrapper">
      //                         <b>Nike</b>
      //                         <p>M2K tekno sneakers</p>
      //                         <em>$ 260</em>
      //                     </div>
      //                 </div>
      //             </div>
      //         </div>
      //     </div>
      // </div>

      const sixProductWrapper = document.createElement("DIV");
      sixProductWrapper.classList.add("six-product-wrapper");
      productsContainer.appendChild(sixProductWrapper);

      let countIndex = 0;
      for (let index = 1; index <= 3; index++) {

        const row = document.createElement("DIV");
        row.classList.add("row");
        row.classList.add("secondary-product-row");
        sixProductWrapper.appendChild(row);

        for (let i = 1; i <= 2; i++) {
          const product = adRenderingProducts[countIndex];

          const col = document.createElement("DIV");
          col.classList.add("col-6");
          row.appendChild(col);

          const productItemRedirectContainer = document.createElement("A");
          productItemRedirectContainer.classList.add("product-redirection-link");
          productItemRedirectContainer.style = "text-decoration: none;";
          productItemRedirectContainer.href = product.url;
          productItemRedirectContainer.target = "_blank";
          col.appendChild(productItemRedirectContainer);

          const productItemContainer = document.createElement("DIV");
          productItemContainer.classList.add("product-item-container");
          productItemContainer.addEventListener("click", function () {
            window.open(product.url, "_blank");
          });
          productItemRedirectContainer.appendChild(productItemContainer);

          const productItem = document.createElement("DIV");
          productItem.classList.add("product-item");
          productItem.style.backgroundImage = `url(${product.image})`;
          productItemContainer.appendChild(productItem);

          if (product.sale) {
            const onSaleTag = document.createElement('SPAN');
            onSaleTag.classList.add("onsale");
            onSaleTag.innerHTML = "ON SALE";
            productItem.appendChild(onSaleTag);
          }

          const productDetailsWrapper = document.createElement("DIV");
          productDetailsWrapper.classList.add("product-details-wrapper");
          productItem.appendChild(productDetailsWrapper);

          const brandName = document.createElement("B");
          brandName.classList.add("brand-name");
          brandName.innerHTML = BRAND_NAME;
          productDetailsWrapper.appendChild(brandName);

          const productName = document.createElement("P");
          productName.classList.add("product-name");
          productName.innerHTML = product.name;
          productDetailsWrapper.appendChild(productName);

          const productPrice = document.createElement("EM");
          productPrice.classList.add("product-price");
          productPrice.innerHTML = product.currency + product.price;
          productDetailsWrapper.appendChild(productPrice);

          countIndex++;
        }
      }
      break;
    }
    default: {
      break;
    }
  }
}

