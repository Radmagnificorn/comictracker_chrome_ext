define(["require", "exports", "Series", "SaveData"], function(require, exports, Series, SeriesData) {
    var Dao = (function () {
        function Dao() {
        }
        Dao.saveSeriesDataList = function (seriesDataList) {
            var saveDataList = seriesDataList.map(function (seriesData) {
                return seriesData.getSaveData();
            });
            var saveDataString = JSON.stringify(saveDataList);
            localStorage.setItem("seriesList", saveDataString);
        };

        Dao.loadSeriesDataList = function () {
            var seriesRawData = localStorage.getItem("seriesList");
            var sDataList = [];
            if (seriesRawData) {
                try  {
                    var loadDataList = JSON.parse(seriesRawData);
                    sDataList = loadDataList.map(function (loadData) {
                        return new Series(Dao.mapRawToSaveData(loadData));
                    });
                } catch (e) {
                    alert(e);
                }
            }

            return sDataList;
        };

        Dao.mapRawToSaveData = function (rawObject) {
            return new SeriesData(rawObject.title, rawObject.lastUrl, rawObject.seriesIdentifier, rawObject.pageIdentifier, rawObject.seriesSearchString);
        };
        return Dao;
    })();

    
    return Dao;
});
//# sourceMappingURL=Dao.js.map
