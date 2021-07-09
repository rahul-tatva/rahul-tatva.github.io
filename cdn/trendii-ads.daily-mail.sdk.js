var trendiiInstaller = {};

trendiiInstaller.appendJavacriptToHead = function(publisher, publisherClientId) {
    try {
        const trendiiScripts = `(function () {
            const trendiiIinitInterval = setInterval(() => {
                if(window.top.document.body.querySelectorAll('[data-trendii-init-div=true]').length > 0) {
                    clearInterval(trendiiIinitInterval);
                    eval('trendii.init(${JSON.stringify(publisher)}, "${publisherClientId}")');
                }
              }, 500);
          }());`;
        const script = trendiiInstaller.adsDOM.createElement("script");
        script.type = "text/javascript";
        script.innerHTML = trendiiScripts;
        trendiiInstaller.adsDOM.getElementsByTagName("head")[0].appendChild(script);
    } catch (err) {
        console.error("[Trendii.SDK] ==>", err);
    }
};

trendiiInstaller.isURLWhiteListed = function() {
    let isWhiteListed = true;
    if (trendiiInstaller.blacklistedUrls && trendiiInstaller.blacklistedUrls.length > 0) {
        const urls = trendiiInstaller.blacklistedUrls;
        for (let i = 0; i < urls.length; i++) {
            if (window.top.location.href.indexOf(urls[i]) >= 0) {
                isWhiteListed = false;
                break;
            }
        }
    }
    return isWhiteListed;
};

trendiiInstaller.init = function() {
    try {
        trendiiInstaller.publisherClientId = "60e4489b6ca932e0a4f54184";
        const host = "https://beeswaxcreatives.trendii.com";
        fetch(`${host}/publishers?domain=${window.top.location.host || window.location.host}&publisherClientId=${trendiiInstaller.publisherClientId}`).then(response => response.json()).then(response => {
            if (!(response !== "" && response.success && response.success === true)) {
                console.log("[Trendii.SDK] ==>", "Publisher not found.");
                return;
            }
            trendiiInstaller.publisher = response.payload;
            if (trendiiInstaller.publisher !== undefined) {
                trendiiInstaller.blacklistedUrls = trendiiInstaller.publisher.blacklistedUrls;
                if (!trendiiInstaller.isURLWhiteListed()) {
                    return;
                }
                trendiiInstaller.sdkUrl = trendiiInstaller.publisher.sdkFile;
                trendiiInstaller.adsWindow = window.top;
                trendiiInstaller.adsDOM = trendiiInstaller.adsWindow.document;
                trendiiInstaller.adsDOM.head.appendChild(trendiiInstaller.adsDOM.createElement("script")).src = trendiiInstaller.sdkUrl;
                if (trendiiInstaller.adsDOM.readyState === "complete" || trendiiInstaller.adsDOM.readyState === "interactive") {
                    trendiiInstaller.appendJavacriptToHead(trendiiInstaller.publisher, trendiiInstaller.publisherClientId);
                } else {
                    trendiiInstaller.adsDOM.addEventListener("DOMContentLoaded", () => {
                        trendiiInstaller.appendJavacriptToHead(trendiiInstaller.publisher, trendiiInstaller.publisherClientId);
                    });
                }
            }
        });
    } catch (err) {
        console.error(err);
    }
};

trendiiInstaller.init();