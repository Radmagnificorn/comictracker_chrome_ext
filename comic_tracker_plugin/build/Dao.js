/// <reference path="../Scripts/typings/es6-promise/es6-promise.d.ts"/>
define(["require", "exports", "Series", "SaveData"], function(require, exports, Series, SaveData) {
    var Dao = (function () {
        function Dao(dataSource) {
            this.dataSource = dataSource;
        }
        Dao.prototype.saveSeriesDataList = function (seriesDataList) {
            var saveDataList = seriesDataList.map(function (seriesData) {
                return seriesData.getSaveData();
            });
            var saveDataString = JSON.stringify(saveDataList);
            this.dataSource.saveData(saveDataString);

            var promise = new Promise(function (resolve, reject) {
                resolve();
            });

            return promise;
        };

        Dao.prototype.loadSeriesDataList = function () {
            var seriesRawData = this.dataSource.loadData();
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

            var promise = new Promise(function (resolve, reject) {
                resolve(sDataList);
            });

            return promise;
        };

        Dao.mapRawToSaveData = function (rawObject) {
            return new SaveData(rawObject.title, rawObject.lastUrl, rawObject.seriesIdentifier, rawObject.pageIdentifier);
        };
        return Dao;
    })();

    
    return Dao;
});
