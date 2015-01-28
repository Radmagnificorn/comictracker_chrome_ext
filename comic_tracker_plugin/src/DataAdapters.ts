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

export interface IDataAdapter {
    loadData: () => string;
    saveData: (string) => void;
}