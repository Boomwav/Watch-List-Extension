watchlistApp.filter 'isNotWatched', -> 
  (items) -> _.filter items, (video) -> not video.watched? || video.watched? == (false)

watchlistApp.controller 'PlaylistDetailsCtrl', ['$scope', '$routeParams', '$http', 'utilityService', 'localStorageService', 'YouTube', ($scope, $routeParams, $http, utilityService, localStorageService, YouTube) ->
  
  $scope.goBack = ->
    utilityService.back()
        
  $scope.markAsWatched = (videoId) ->
    console.log "Marking as watched video with id:'#{videoId}'."  
    match = _.find($scope.playlist, (item) -> item.snippet.resourceId.videoId == videoId)
    match.watched = true if  match? && match
    savePlaylist()
      
  savePlaylist = ->  localStorageService.set $scope.playlistId, JSON.stringify($scope.playlist)
    
  getVideos = (playlistId) ->
    data = localStorageService.get playlistId
      
    if data?
      # Playlist was loaded in the past. Load from localStorage.
      $scope.playlist = data
    else
      # Loading playlist from YouTube and saving it to LocalStorage.
      YouTube.getPlaylistVideos playlistId
      .then (data) ->
        $scope.playlist = data
        savePlaylist()
  
  $scope.playlistId = $routeParams.playlistId
  getVideos $scope.playlistId
  
  return
]