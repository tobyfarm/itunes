angular.module('itunes').service('itunesService', function($http, $q) {
    //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
    //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

    //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
    //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
    //Note that in the above line, artist is the parameter being passed in.
    //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    this.getMusic = function(artist) {
      var deferred = $q.defer();
      $http.jsonp("https://itunes.apple.com/search?term=" + artist + "&callback=JSON_CALLBACK").then(function(response) {
        var parsedResponse = response.data.results;
        // console.log(parsedResponse)
        var filterResponse = [];

        for (var i = 0; i < parsedResponse.length; i++) {
            filterResponse.push({
                Song: parsedResponse[i].trackName,
                AlbumArt: parsedResponse[i].artworkUrl100,
                Collection: parsedResponse[i].collectionName,
                Artist: parsedResponse[i].artistName,
                Play: parsedResponse[i].previewUrl,
                Type: parsedResponse[i].kind,
                CollectionPrice: parsedResponse[i].trackPrice
            })
          }
          deferred.resolve(filterResponse)
        })
        return deferred.promise;
  }



})
