define(["require", "exports", "Dao"], function(require, exports, Dao) {
    var SeriesList = (function () {
        function SeriesList() {
            this.seriesList = Dao.loadSeriesDataList();
        }
        SeriesList.prototype.save = function () {
            Dao.saveSeriesDataList(this.seriesList);
        };

        SeriesList.prototype.addSeries = function (series) {
            this.seriesList.push(series);
            this.save();
        };

        SeriesList.prototype.removeSeries = function (index) {
            this.seriesList.splice(index, 1);
            this.save();
        };

        SeriesList.prototype.generateUi = function () {
            var markup = "<ul>";
            var delId = 0;

            var sIndex = 0;
            this.seriesList.forEach(function (seriesData) {
                var pageNumber = seriesData.getFurthestRead();
                markup += "<li><a href='" + seriesData.lastUrl + "' target='_blank'>" + seriesData.title + "(" + pageNumber + ")" + "</a>";
                markup += "<a href='#' class='delButton' data-delId='" + sIndex + "'>delete</a>" + "</li>";
                delId++;
            });

            markup += "</ul>";

            return markup;
        };
        return SeriesList;
    })();

    
    return SeriesList;
});
//# sourceMappingURL=C:/Users/Stephen/Documents/comic_tracker_plugin/comic_tracker_plugin/build/srcmaps/SeriesList.js.map
