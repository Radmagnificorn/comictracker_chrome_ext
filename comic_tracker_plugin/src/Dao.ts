
import Series = require("Series");
import SaveData = require("SaveData");
import DataAdapters = require("DataAdapters");

class Dao {

    private dataSource: DataAdapters.IDataAdapter;

    constructor(dataSource: DataAdapters.IDataAdapter) {
        this.dataSource = dataSource;
    }

    saveSeriesDataList(seriesDataList: Series[]) {
        var saveDataList = seriesDataList.map(seriesData => seriesData.getSaveData());
        var saveDataString = JSON.stringify(saveDataList);
        this.dataSource.saveData(saveDataString);
    }

    loadSeriesDataList(): Series[] {
        var seriesRawData = this.dataSource.loadData();
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

    static mapRawToSaveData(rawObject: any): SaveData {
        return new SaveData(
            rawObject.title,
            rawObject.lastUrl,
            rawObject.seriesIdentifier,
            rawObject.pageIdentifier
        );
    }


}

export = Dao;



