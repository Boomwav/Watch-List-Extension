var watchlistControllers = angular.module('watchlistControllers',[]);



watchlistControllers.controller('ChannelLibraryCtrl', ['$scope', '$http',
    function ($scope, $http) {
        var dataurl = "https://www.googleapis.com/youtube/v3/playlists?part=id,snippet&channelId=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=AIzaSyCUvP3-ZZ_zLOY2eMODHbNrDKR0Mwd20r4";

        $http.get(dataurl).success(function(data){
            $scope.playlists = data.items;
            $scope.result = JSON.stringify(data);
        });
    }
]);

watchlistControllers.controller('ChannelDetailsCtrl', ['$scope', '$routeParams', '$http',
    function ($scope, $routeParams, $http) {
        $scope.channelId = $routeParams.channelId;
		
		var dataurl =  "https://www.googleapis.com/youtube/v3/playlistItems?part=id%2Csnippet%2CcontentDetails%2Cstatus&playlistId=PLOU2XLYxmsII2vIhzAyW6eouf62ur2Z2q&key=AIzaSyCUvP3-ZZ_zLOY2eMODHbNrDKR0Mwd20r4";
		
		$http.get(dataurl).success(function(data){
            $scope.playlists = data.items;
            $scope.result = JSON.stringify(data);
        });
    }
]);

watchlistControllers.controller('WatchlistCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $scope.items = '';

        var initCallback = function() {
            getItems();
            //$scope.newPlaylistId = 'PLs3acGYgI1-vpuBtw49UXezQrs1AFCFB1';
        };

        var dataStore = new IDBStore('watchlist', initCallback);

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
    }
]);

watchlistControllers.controller('PlaylistDetailsCtrl', ['$scope', '$routeParams', '$http', 'utilityService',
	function ($scope, $routeParams, $http, utilityService) {
		$scope.goBack = function() {
            utilityService.back();
        }

        $scope.playlistId = $routeParams.playlistId;
		
		//https://www.googleapis.com/youtube/v3/playlistItems?part=id%2Csnippet%2CcontentDetails%2Cstatus&playlistId=PLs3acGYgI1-vpuBtw49UXezQrs1AFCFB1&key=AIzaSyCUvP3-ZZ_zLOY2eMODHbNrDKR0Mwd20r4
		var dataurl =  "https://www.googleapis.com/youtube/v3/playlistItems?part=id%2Csnippet%2CcontentDetails%2Cstatus&playlistId="+ $routeParams.playlistId + "&key=AIzaSyCUvP3-ZZ_zLOY2eMODHbNrDKR0Mwd20r4";
		
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
            
			
			
        });
	}
]);