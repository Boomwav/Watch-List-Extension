angular.module('watchlistApp').controller('PlaylistDetailsCtrl', ['$scope', '$routeParams', '$http', 'utilityService', 'YouTube',
    function ($scope, $routeParams, $http, utilityService, YouTube) {
        $scope.goBack = function() {
            utilityService.back();
        }
        
        
        
        $scope.markAsWatched = function(video) {

            var currentIndex = $scope.playlist.videos.items.indexOf(video);

            console.log(currentIndex);

            if(currentIndex != -1)
            {
                console.log("Mark " + currentIndex + " as watched.");
                $scope.playlist.videos.items[currentIndex].watched = true;
                dataStore.put($scope.playlist);
            }
        }

        $scope.isWatched = function(row)  {
            return (row.hasOwnProperty('watched') && row.watched == true);
        }

        $scope.isNotWatched = function(row)  {
            return !row.hasOwnProperty('watched') || ( row.hasOwnProperty('watched') &&  !row.watched);
        }

        $scope.playlistId = $routeParams.playlistId;

        var initCallback = function() {
            getItem($scope.playlistId);
        };

        var parameters = {
            storeName: 'watchlist',
            storePrefix: 'Watchlist-',
            dbVersion: 1,
            keyPath: 'id',
            autoIncrement: false,
            indexes: [],
            onStoreReady: initCallback,
            onError: function(error){ throw error; }
        }

        var dataStore = new IDBStore(parameters);

        var getItem = function (playlistId) {
          console.log('getItem("' + playlistId + '")');
          YouTube.getPlaylistVideos(playlistId).then(function(data){
            $scope.playlist = data;
            console.log('It worked! There is ' + data.length + ' items.');
          });
        }

        //https://www.googleapis.com/youtube/v3/playlistItems?part=id%2Csnippet%2CcontentDetails%2Cstatus&playlistId=PLs3acGYgI1-vpuBtw49UXezQrs1AFCFB1&key=AIzaSyCUvP3-ZZ_zLOY2eMODHbNrDKR0Mwd20r4
        /*var dataurl =  "https://www.googleapis.com/youtube/v3/playlistItems?part=id%2Csnippet%2CcontentDetails%2Cstatus&playlistId="+ $routeParams.playlistId + "&key=AIzaSyCUvP3-ZZ_zLOY2eMODHbNrDKR0Mwd20r4";

        $http.get(dataurl).success(function(data){

            //$scope.result = JSON.stringify(data);

            if(data.items.length > 0)
            {
                // Get a list of all the videoIds from the playlist details
                var videoIds = "";
                data.items.forEach(function(video){
                    videoIds += video.contentDetails.videoId + ",";
                });
                videoIds = videoIds.slice(0,-1);

                //https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=5jqHCQuM4Qg&key=AIzaSyCUvP3-ZZ_zLOY2eMODHbNrDKR0Mwd20r4
                dataurl = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id="+ videoIds + "&key=AIzaSyCUvP3-ZZ_zLOY2eMODHbNrDKR0Mwd20r4"
                $http.get(dataurl).success(function(data2){
                    for (var i=0;i<data2.items.length;i++)
                    {
                        data.items[i].contentDetails.duration = data2.items[i].contentDetails.duration.replace("PT","").replace("H"," hours ").replace("M"," minutes ").replace("S"," seconds");
                    }

                    $scope.result = JSON.stringify(data2);
                });
            }


            $scope.videos = data.items;



        });*/
    }
]);