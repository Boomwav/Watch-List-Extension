angular.module('watchlistApp.controllers').controller('WatchlistCtrl', ['$scope', '$http', '$rootScope', 'youtubeApiService',
    function ($scope, $http, $rootScope, youtubeApiService) {
        $scope.items = '';

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
        }

        var dataStore = new IDBStore(parameters);

        var getItemsSuccess = function(data){
            $scope.items = data;
            $scope.$apply();
        };

        var errorCallback = function() {
            console.log('An error occured.');
        };

        var getItems = function() {
            dataStore.getAll(getItemsSuccess, errorCallback);
            console.log('getItems');
        };

        $scope.addItem = function() {
			
            var dataurl = "https://www.googleapis.com/youtube/v3/playlists?part=id,snippet&id="+ $scope.newPlaylistId + "&key=AIzaSyCUvP3-ZZ_zLOY2eMODHbNrDKR0Mwd20r4";

			var success = function(data){
                dataStore.put(data.items[0], getItems, errorCallback);
                $scope.result = JSON.stringify(data);
            };
			
			var error = function() {
				console.log("Error while trying to get playlist with id '" + $scope.newPlaylistId + "' using the YouTube API");
			}
			
            youtubeApiService.getPlaylist($scope.newPlaylistId, success, error );

            $scope.newPlaylistId = '';
        };

        $scope.deleteItem = function (id) {
            console.log("Delete item: " + id);
            dataStore.remove(id, getItems, errorCallback);
        };
    }
]);

