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

watchlistControllers.controller('PlaylistDetailsCtrl', ['$scope', '$routeParams', '$http',
	function ($scope, $routeParams, $http) {
		$scope.playlistId = $routeParams.playlistId;
		
		var dataurl =  "https://www.googleapis.com/youtube/v3/playlistItems?part=id%2Csnippet%2CcontentDetails%2Cstatus&playlistId="+ $routeParams.playlistId + "&key=AIzaSyCUvP3-ZZ_zLOY2eMODHbNrDKR0Mwd20r4";
		
		$http.get(dataurl).success(function(data){
            $scope.videos = data.items;
            $scope.result = JSON.stringify(data);
        });
	}
]);