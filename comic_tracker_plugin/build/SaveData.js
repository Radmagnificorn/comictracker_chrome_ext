define(["require", "exports"], function(require, exports) {
    var SaveData = (function () {
        function SaveData(title, lastUrl, seriesIdentifier, pageIdentifier, seriesSearchString) {
            this.title = title;
            this.lastUrl = lastUrl;
            this.seriesIdentifier = seriesIdentifier;
            this.pageIdentifier = pageIdentifier;
            this.seriesSearchString = seriesSearchString;
        }
        return SaveData;
    })();

    
    return SaveData;
});
//# sourceMappingURL=SaveData.js.map
