
import Series = require("Series");
import SeriesData = require("SaveData");

class Dao {

    static saveSeriesDataList(seriesDataList: Series[]) {
        var saveDataList = seriesDataList.map(seriesData => seriesData.getSaveData());
        var saveDataString = JSON.stringify(saveDataList);
        localStorage.setItem("seriesList", saveDataString);
    }

    static loadSeriesDataList(): Series[] {
        var seriesRawData = localStorage.getItem("seriesList");
        var sDataList = [];
        if (seriesRawData) {
            try {
                var loadDataList = JSON.parse(seriesRawData);
                sDataList = loadDataList.map(loadData => new Series(Dao.mapRawToSaveData(loadData)));

            } catch (e) {
                alert(e);
            }
        }

        return sDataList;
    }

    static mapRawToSaveData(rawObject: any): SeriesData {
        return new SeriesData(
            rawObject.title,
            rawObject.lastUrl,
            rawObject.seriesIdentifier,
            rawObject.pageIdentifier,
            rawObject.seriesSearchString
        );
    }


}

export = Dao;

