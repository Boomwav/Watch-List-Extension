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
        };

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
			
			var success = function(data){

                youtubeApiService.getPlaylistVideos(data.items[0].id,
                    function(videosData) {
                        data.items[0].videos = videosData;
                        dataStore.put(data.items[0], getItems, errorCallback);
                        $scope.result = JSON.stringify(data);
                    }, errorCallback);
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

