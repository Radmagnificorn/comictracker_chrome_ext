describe("Test Module", function() {
    describe("create Url", function () {

        it("creates a new url", function (done) {
            
            require(["UrlData"], function (UrlData) {
                var testUrl = "http://www.testurl.com/page=142";
                var sut = new UrlData(testUrl);

                expect(sut.url).toEqual(testUrl);
                done();
            });
          
        });

    });

    describe("Test Data Access", function () {
        describe("Individual Adapters", function() {
            it("local storage adapter", function(done) {
                require(["DataAdapters"], function(DataAdapters) {
                    var sut = new DataAdapters.LSAdapter();
                    var saveString = "test";
                    sut.saveData(saveString);

                    expect(sut.loadData()).toEqual(saveString);
                    done();

                });
            });
        });

        it("Save in Local Storage", function(done) {
            require(["Dao", "DataAdapters", "Series", "SeriesList", "SaveData"], function(Dao, DataAdapters, Series, SeriesList, SaveData) {
                var dao = new Dao(new DataAdapters.LSAdapter());
                var list = new SeriesList(dao);
                
                list.addSeries(new Series(new SaveData("Comic1", "http://www.c1.com/page45", "0", "1")));
                list.addSeries(new Series(new SaveData("Comic2", "http://www.c2.com/page45", "0", "1")));
                list.addSeries(new Series(new SaveData("Comic3", "http://www.c3.com/page45", "0", "1")));

                list.save().then(function() {

                    var list2 = new SeriesList(new Dao(new DataAdapters.LSAdapter()));
                    list2.loadData().then(function() {

                        expect(list.seriesList).toEqual(list2.seriesList);
                        done();

                    }, function() { alert(); });

                }, function(err) {});

            });
        });
    });
});