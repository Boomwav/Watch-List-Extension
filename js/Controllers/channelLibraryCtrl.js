angular.module('watchlistApp.controllers').controller('ChannelLibraryCtrl', ['$scope', '$http',
    function ($scope, $http) {
        var dataurl = "https://www.googleapis.com/youtube/v3/playlists?part=id,snippet&channelId=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=AIzaSyCUvP3-ZZ_zLOY2eMODHbNrDKR0Mwd20r4";

        $http.get(dataurl).success(function(data){
            $scope.playlists = data.items;
            $scope.result = JSON.stringify(data);
        });
    }
]);