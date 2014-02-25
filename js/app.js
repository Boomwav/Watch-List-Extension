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

watchlistApp.run(function($rootScope, $location) {
    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        //console.log("current === null --> " + (current == null) + " value: " + current);
        //console.log("next.redirectTo == /watchlist --> " + (next.redirectTo == "/watchlist") + " value: " + next.redirectTo);

        if(current == null && next.redirectTo == "/watchlist")
        {
            console.log("Opening extension popup for the first time!");

            chrome.tabs.getSelected(null, function(tab){
                console.log(tab.url);
                var uri = new URI(tab.url);

                console.log(uri.hostname());
                if(uri.hostname() == "www.youtube.com"){
                    console.log(uri.search(true).list);
                    $rootScope.autoAddList = uri.search(true).list;
                }


            });
        }

        /*if ( $rootScope.loggedUser == null ) {
            // no logged user, we should be going to #login
            if ( next.templateUrl == "partials/login.html" ) {
                // already going to #login, no redirect needed
            } else {
                // not going to #login, we should redirect now
                $location.path( "/login" );
            }
        }*/
    });
});

