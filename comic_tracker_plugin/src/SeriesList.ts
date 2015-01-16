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

    generateUi(): HTMLUListElement {
        var d = document;
        var element = d.createElement("ul");
 
        var delId = 0;
        
        this.seriesList.forEach(seriesData => {
            var pageNumber = seriesData.getFurthestRead();
            var li = d.createElement("li");
            var comicLink = d.createElement("a");
            var deleteLink = d.createElement("a");
            comicLink.href = seriesData.lastUrl.url;
            comicLink.target = "_blank";
            comicLink.textContent = seriesData.title + " (" + pageNumber + ") ";

            deleteLink.href = "#";
            deleteLink.textContent = "delete";
            deleteLink.addEventListener("click", (delId => () => {
                this.removeSeries(delId);
            })(delId));
            deleteLink.classList.add("delButton");

            li.appendChild(comicLink);
            li.appendChild(deleteLink);

            element.appendChild(li);
                
            delId++;
        });


        return element;
    }

}

export = SeriesList;