var watchlistApp = angular.module('watchlistApp', [
    'ngRoute',
    'watchlistApp.controllers'
]);

angular.module('watchlistApp.controllers', []);

watchlistApp.factory('utilityService', function() {
   return {
        back: function() {
            console.log('back button');
            window.history.back();
        }
   } ;
});

watchlistApp.config( function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist (/^\s*(https?|ftp|mailto|file|tel|chrome-extension):/);
});

watchlistApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/watchlist', {
                templateUrl: 'partials/watch-list.html',
                controller: 'WatchlistCtrl'
            }).
            when('/channels', {
                templateUrl: 'partials/channels-library.html',
                controller: 'ChannelLibraryCtrl'
            }).
            when('/channels/:channelId', {
                templateUrl: 'partials/channel-details.html',
                controller: 'ChannelDetailsCtrl'
            }).
			when('/playlists/:playlistId', {
				templateUrl:'partials/playlist-details.html',
				controller:'PlaylistDetailsCtrl'
			}).
            otherwise({
                redirectTo: '/watchlist'
            });
    }
]);

