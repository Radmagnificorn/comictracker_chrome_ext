// <reference path="../Scripts/typings/requirejs/require.d.ts"/>
define(["require", "exports", "Series", "UrlData"], function(require, exports, Series, UrlData) {
    chrome.runtime.sendMessage({ method: "getUrls" }, function (seriesDataIn) {
        var seriesDataList = seriesDataIn.map(function (seriesData) {
            return new Series(seriesData);
        });
        var currentUrl = new UrlData(window.location.href);
        var seriesData = findSeriesMatch(seriesDataList, currentUrl);

        if (seriesData != null) {
            showHelperUI(seriesData.title, currentUrl.parsePageNumber(seriesData.pageIdentifier));
            seriesData.lastUrl = currentUrl;
            saveSeries(seriesData);
        }
    });

    function findSeriesMatch(seriesList, pageUrl) {
        var match = null;

        seriesList.forEach(function (series) {
            var sToken = series.lastUrl;
            var seriesSearch = series.getSearchString();
            var cSeriesId = pageUrl.urlTokens[series.seriesIdentifier];

            if (sToken.domain === pageUrl.domain) {
                if (cSeriesId.indexOf(seriesSearch) > -1) {
                    match = series;
                }
            }
        });

        return match;
    }

    function saveSeries(seriesData) {
        alert("saving series");

        chrome.runtime.sendMessage({ method: "saveSeries", series: seriesData }, function (response) {
            $("#saveStatus").text(response ? "Page Saved" : "Save Failed");
        });
    }

    function showHelperUI(name, page) {
        alert("showing helper");
        var markup = "<div id='helperWrapper'>";
        markup += "<div>" + name + "</div><div>pg: " + page + "</div>";
        markup += "<div id='saveStatus'></div>";
        markup += "</div>";
        $("body").prepend(markup);
    }
});
