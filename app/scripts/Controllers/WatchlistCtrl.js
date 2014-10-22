angular.module('watchlistApp').controller('WatchlistCtrl', ['$scope', '$http', '$rootScope', 'youtubeApiService', 'WatchList', 'YouTube',
  function ($scope, $http, $rootScope, youtubeApiService, WatchList, YouTube) {
    $scope.items = '';
  
    $scope.playlistData = {};
    /*YouTube.getPlaylist('PLH-huzMEgGWB5MGtt06KSPgFu6z4ORn7M')
      .then(function(data) {
        console.log(data);
      });*/
      
    $scope.watchlist = WatchList;
    
    //console.log(WatchList.nbPlaylists);
    
    //WatchList.addPlaylist('PLH-huzMEgGWB5MGtt06KSPgFu6z4ORn7M');
    //console.log(WatchList.playlists);
    
    var initCallback = function() {
      
      getItems();
      
      if($rootScope.autoAddList != null)
      {
        $scope.newPlaylistId = $rootScope.autoAddList;
      }
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
    };

    var dataStore = new IDBStore(parameters);

    var getItemsSuccess = function(data){
        $scope.items = data;
        
        /*console.log('getItems -- Result --')
        console.log(data);*/
        
        $scope.$apply();
    };

    var errorCallback = function() {
        console.log('An error occured.');
    };

    var getItems = function() {
        dataStore.getAll(getItemsSuccess, errorCallback);
    };

    $scope.addItem = function() {
      /*var success = function(data){
        youtubeApiService.getPlaylistVideos(data.items[0].id, function(videosData) {
          data.items[0].videos = videosData;
          dataStore.put(data.items[0], getItems, errorCallback);
          $scope.result = JSON.stringify(data);
        }, errorCallback);
      };
      
      var error = function() {
        console.log("Error while trying to get playlist with id '" + $scope.newPlaylistId + "' using the YouTube API");
      }
      
      youtubeApiService.getPlaylist($scope.newPlaylistId, success, error );*/
      
      WatchList.addPlaylist($scope.newPlaylistId);

      $scope.newPlaylistId = '';
    };

    $scope.deleteItem = function (id) {
      console.log("Delete item: " + id);
      WatchList.deletePlaylist(id);
    };
  }
]);

