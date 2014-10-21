'use strict'

angular.module('watchlistApp').factory 'WatchList', ['youtubeApiService', (youtubeApiService) -> 
  new class WatchList
    constructor: ->
      $playlists = []
        
    addPlaylist: (playlistId) ->
      
      success = (data) ->
        console.log data
        $playlists.push data
      
        #youtubeApiService.getPlaylistVideos (data.items[0].id, (videosData) ->
        #  data.items[0].videos = videosData;
        #  dataStore.put data.items[9], getItems, errorCallback
        #  $scope.result = JSON.stringify data
        #, errorCallback)
        
      error = ->
        console.log 'Error while trying to get playlist with id #{playlistId} using the YouTube API'
      
      youtubeApiService.getPlaylist(playlistId, success, error );
      
    deleteItem: (id) ->
      console.log 'Delete item: #{id}'
      dataStore.remove id, getItems, errorCallback
]