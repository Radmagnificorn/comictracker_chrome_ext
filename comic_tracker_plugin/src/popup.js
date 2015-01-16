/// <reference path="../Scripts/typings/chrome/chrome-app.d.ts"/>
/// <reference path="../Scripts/typings/chrome/chrome.d.ts"/>
define(["require", "exports", "Series", "SeriesList", "UrlData", "VisualUrl"], function(require, exports, Series, SeriesList, UrlData, VisualUrl) {
    var Popup = (function () {
        function Popup() {
        }
        Popup.init = function () {
            this.newComic = new Series();

            this.slContainer.innerHTML = this.seriesList.generateUi();

            this.createStep1();
        };

        Popup.createStep1 = function () {
            var _this = this;
            var addButton = document.getElementById("addComic");
            var nextButton = document.getElementById("saveTitle");
            var titleInput = document.getElementById("comicTitle");

            addButton.addEventListener("click", function () {
                _this.step1.classList.add("show");
            });

            nextButton.addEventListener("click", function () {
                _this.newComic.title = titleInput.value;
                chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
                    var pageUrl = new UrlData(tabs[0].url);
                    _this.newComic.lastUrl = pageUrl;
                    _this.createStep2(pageUrl);
                    _this.step2.classList.add("show");
                });
            });
        };

        Popup.createStep2 = function (pageUrl) {
            var _this = this;
            var urlContainer = document.getElementById("urlselector");

            var vurl = new VisualUrl(pageUrl);
            vurl.addOnSelectionListener(function () {
                _this.newComic.seriesIdentifier = vurl.selection;
                _this.createStep3(pageUrl);
            });

            urlContainer.appendChild(vurl.render());
        };

        Popup.createStep3 = function (pageUrl) {
            var _this = this;
            var pageContainer = document.getElementById("pageselector");

            var vurl = new VisualUrl(pageUrl);
            vurl.addOnSelectionListener(function () {
                _this.newComic.pageIdentifier = vurl.selection;
                _this.seriesList.addSeries(_this.newComic);
                _this.seriesList.save();
                _this.hideAddComic();
                _this.slContainer.innerHTML = _this.seriesList.generateUi();
            });

            pageContainer.appendChild(vurl.render());

            this.step3.classList.add("show");
        };

        Popup.hideAddComic = function () {
            this.step1.classList.remove("show");
            this.step2.classList.remove("show");
            this.step3.classList.remove("show");
        };
        Popup.step1 = document.getElementById("step1");
        Popup.step2 = document.getElementById("step2");
        Popup.step3 = document.getElementById("step3");
        Popup.slContainer = document.getElementById("seriesList");

        Popup.seriesList = new SeriesList();
        return Popup;
    })();

    Popup.init();
});
//# sourceMappingURL=C:/Users/Stephen/Documents/comic_tracker_plugin/comic_tracker_plugin/build/srcmaps/popup.js.map
