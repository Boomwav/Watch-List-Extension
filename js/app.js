var watchlistApp = angular.module('watchlistApp', [
    'ngRoute',
    'watchlistControllers'
]);

watchlistApp.config( function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist (/^\s*(https?|ftp|mailto|file|tel|chrome-extension):/);
});

watchlistApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
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
                redirectTo: '/channels'
            });
    }
]);

