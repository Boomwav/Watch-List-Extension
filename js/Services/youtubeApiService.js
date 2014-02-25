angular.module('watchlistApp.services').service('youtubeApiService', ['$http', function($http) {
	this.apiKey = "AIzaSyCUvP3-ZZ_zLOY2eMODHbNrDKR0Mwd20r4";
	
	this.getPlaylist = function(playlistId, successCallback, errorCallback) {
		var dataurl = "https://www.googleapis.com/youtube/v3/playlists?part=id,snippet&id="+ playlistId + "&key=" + this.apiKey;
		$http.get(dataurl).success(successCallback).error(errorCallback);
	};
}]);