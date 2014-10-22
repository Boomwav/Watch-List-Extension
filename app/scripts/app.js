var watchlistApp = angular.module('watchlistApp', ['ngRoute', 'LocalStorageModule']);

watchlistApp.factory('utilityService', function() {
  return {
    back: function() {
    console.log('back button');
      window.history.back();
    }
  };
});

watchlistApp.config(["$compileProvider", function ($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist (/^\s*(https?|ftp|mailto|file|tel|chrome-extension):/);
}]);

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

watchlistApp.run(["$rootScope", "$location", function($rootScope, $location) {
  // register listener to watch route changes
  $rootScope.$on( "$routeChangeStart", function(event, next, current) {

    if(current == null && next.redirectTo == "/watchlist"){
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
  });
}]);

