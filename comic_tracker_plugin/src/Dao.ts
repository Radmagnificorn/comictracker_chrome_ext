/// <reference path="../Scripts/typings/es6-promise/es6-promise.d.ts"/>

import Series = require("Series");
import SaveData = require("SaveData");
import DataAdapters = require("DataAdapters");

class Dao {

    private dataSource: DataAdapters.IDataAdapter;

    constructor(dataSource: DataAdapters.IDataAdapter) {
        this.dataSource = dataSource;
    }

    saveSeriesDataList(seriesDataList: Series[]): Promise<void> {
        var saveDataList = seriesDataList.map(seriesData => seriesData.getSaveData());
        var saveDataString = JSON.stringify(saveDataList);

        var promise = new Promise<void>((resolve, reject) => {
            this.dataSource.saveData(saveDataString).then(
                () => resolve(),
                err => reject(err)
             );       
            
        });

        return promise;
    }

    loadSeriesDataList(): Promise<Series[]> {
        var promise = new Promise<Series[]>((resolve, reject) => {
            this.dataSource.loadData().then(seriesRawData => {
                var sDataList = [];
                if (seriesRawData) {
                    try {
                        var loadDataList = JSON.parse(seriesRawData);
                        sDataList = loadDataList.map(loadData => new Series(Dao.mapRawToSaveData(loadData)));
                        resolve(sDataList);
                    } catch (err) {
                        reject(err);
                    }
                }
            }, err => reject(err));
           
        });
        
        return promise;
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



