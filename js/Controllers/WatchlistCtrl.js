angular.module('watchlistApp.controllers').controller('WatchlistCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $scope.items = '';

        var initCallback = function() {
            getItems();
            //$scope.newPlaylistId = 'PLs3acGYgI1-vpuBtw49UXezQrs1AFCFB1';
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

            $http.get(dataurl).success(function(data){
                dataStore.put(data.items[0], getItems, errorCallback);
                $scope.result = JSON.stringify(data);
            });

            $scope.newPlaylistId = '';
        };

        $scope.deleteItem = function (id) {
            console.log("Delete item: " + id);
            dataStore.remove(id, getItems, errorCallback);
        };
    }
]);

