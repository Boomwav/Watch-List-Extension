angular.module('watchlistApp').provider 'YouTube', ->
  
  # --- Private
  apiKey = '[API_KEY]'
   
  getUrl = (type, playlistId) ->
    "https://www.googleapis.com/youtube/v3/#{type}?part=id,snippet,contentDetails&id=#{playlistId}&key=#{apiKey}"
  
  # --- Config
  
  setApiKey: (key) -> apiKey = key if key?
  
  # --- Service ----
  # Put injection here
  $get: ($q, $http) ->
    
    # --- Private
    self = this
    
    # --- Public
    getPlaylist: (playlistId) ->
      d = $q.defer()

      $http(        
        method: 'GET',
        url: getUrl("playlists", playlistId),
        cache: true)
      
      .success (data) ->
        d.resolve data
          
      .error (err) ->
        d.reject err
      
      d.promise