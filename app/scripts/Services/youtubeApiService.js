

angular.module('watchlistApp')

    .service('youtubeApiService', ['$http', function($http) {

        /**
         * @name watchlistApp.services.youtubeApiService
         * @module youtubeApiService
         *
         * @description
         * Get data from YouTube.
         */

        this.apiKey = "AIzaSyCUvP3-ZZ_zLOY2eMODHbNrDKR0Mwd20r4";

        /**
         * @method getPlaylist
         *
         * @description
         * Get a playlist from YouTube
         *
         * @param {string} playlistId ID of the playlist to find.
         * @param {function} successCallback Callback when successful.
         * @param {function} errorCallback Callback when failed.
         * */
        this.getPlaylist = function(playlistId, successCallback, errorCallback) {
            var dataurl = "https://www.googleapis.com/youtube/v3/playlists?part=id,snippet&id="+ playlistId + "&key=" + this.apiKey;
            $http.get(dataurl).success(successCallback).error(errorCallback);
        };

        /**
         * @method getPlaylistVideos
         *
         * @description
         * Get the videos of a playlist from YouTube
         *
         * @param {string} playlistId ID of the playlist to find.
         * @param {function} successCallback Callback when successful.
         * @param {function} errorCallback Callback when failed.
         */
        this.getPlaylistVideos = function(playlistId, successCallback, errorCallback) {
            var dataurl =  "https://www.googleapis.com/youtube/v3/playlistItems?part=id%2Csnippet%2CcontentDetails%2Cstatus&playlistId="+ playlistId + "&maxResults=50&key=AIzaSyCUvP3-ZZ_zLOY2eMODHbNrDKR0Mwd20r4";
            $http.get(dataurl).success(successCallback).error(errorCallback);
        }
}]);