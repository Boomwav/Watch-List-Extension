angular.module('watchlistApp').controller('ChannelDetailsCtrl', ['$scope', '$routeParams', '$http',
    function ($scope, $routeParams, $http) {
        $scope.channelId = $routeParams.channelId;

        var dataurl =  "https://www.googleapis.com/youtube/v3/playlistItems?part=id%2Csnippet%2CcontentDetails%2Cstatus&playlistId=PLOU2XLYxmsII2vIhzAyW6eouf62ur2Z2q&key=AIzaSyCUvP3-ZZ_zLOY2eMODHbNrDKR0Mwd20r4";

        $http.get(dataurl).success(function(data){
            $scope.playlists = data.items;
            $scope.result = JSON.stringify(data);
        });
    }
]);
