import Dao = require("Dao");
import Series = require("Series");

class SeriesList {
    seriesList: Series[];

    constructor() {
        this.seriesList = Dao.loadSeriesDataList();
    }

    save(): void {
        Dao.saveSeriesDataList(this.seriesList);
    }

    addSeries(series: Series): void {
        this.seriesList.push(series);
        this.save();
    }

    removeSeries(index: number): void {
        this.seriesList.splice(index, 1);
        this.save();
    }

    generateUi(): string {
        var markup = "<ul>";
        var delId = 0;

        var sIndex = 0;
        this.seriesList.forEach(seriesData => {
            var pageNumber = seriesData.getFurthestRead();
            markup += "<li><a href='" + seriesData.lastUrl + "' target='_blank'>" + seriesData.title + "(" + pageNumber + ")" + "</a>";
            markup += "<a href='#' class='delButton' data-delId='" + sIndex + "'>delete</a>" + "</li>";
            delId++;
        });

        markup += "</ul>";

        return markup;
    }

}

export = SeriesList;