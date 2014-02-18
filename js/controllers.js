var watchlistControllers = angular.module('watchlistControllers',[]);

watchlistControllers.controller('ChannelLibraryCtrl', ['$scope', '$http',
    function ($scope, $http) {
        var dataurl = "https://www.googleapis.com/youtube/v3/playlists?part=id,snippet&channelId=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=AIzaSyCUvP3-ZZ_zLOY2eMODHbNrDKR0Mwd20r4";

        $http.get(dataurl).success(function(data){
            $scope.playlists = data.items;
        });
    }
]);

watchlistControllers.controller('ChannelDetailCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.channelId = $routeParams.channelId;
    }
]);




//watchListApp.filter('nospace', function () {
//    return function (value) {
//        return (!value) ? '' : value.replace(/ /g, '');
//    };
//});