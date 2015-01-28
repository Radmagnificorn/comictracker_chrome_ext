import Dao = require("Dao");
import SaveData = require("SaveData");

export class LSAdapter implements IDataAdapter {
    loadData(): string {
        return localStorage.getItem("seriesList");
    }

    saveData(data: string) {
        localStorage.setItem("seriesList", data);
    }
}
/*
export class RemoteLSAdapter implements IDataAdapter {
    loadData(): string {
        
    }

    saveData(data: string) {
        
    }
}
*/
export interface IDataAdapter {
    loadData: () => string;
    saveData: (string) => void;
}