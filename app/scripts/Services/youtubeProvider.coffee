angular.module('watchlistApp').provider 'YouTube', ->
  
  # --- Private
  apiKey = '[API_KEY]'
   
  getPlaylistUrl = (part, playlistId) ->
    "https://www.googleapis.com/youtube/v3/playlists?part=#{part}&id=#{playlistId}&key=#{apiKey}"
  
  getPlaylistVideosUrl = (part, playlistId, nextPageToken) ->
    url = "https://www.googleapis.com/youtube/v3/playlistItems?part=#{part}&maxResults=50&playlistId=#{playlistId}&key=#{apiKey}"
    url += "&pageToken=#{nextPageToken}" if nextPageToken?
    url
  # --- Config
  
  setApiKey: (key) -> apiKey = key if key?
  
  # --- Service ----
  # Put injection here
  $get: ($q, $http) ->
    
    # --- Private
    self = this
      
    getPlaylistVideosRequest = (playlistId, d, pageToken, result) ->
      
      console.log "getPlaylistVideosRequest(playlistId = #{playlistId}, d, pageToken = #{pageToken}, result)"
      
      d = $q.defer() if not d?
      result = [] if not result?
            
      $http(        
        method: 'GET',
        url: getPlaylistVideosUrl('id,snippet', playlistId, pageToken)
        cache: true)
      
      .success (data, status, headers, config) ->
        console.log 'Promises data ----'
        console.log data.items
        
        if(result?)
          result = result.concat(data.items)
        else
          result = data.items
        
        console.log result.length
        
        if data.nextPageToken?
          console.log 'There is another page!'
          getPlaylistVideosRequest(playlistId, d, data.nextPageToken, result)       
        else
          console.log 'There is no other pages.'
          console.log 'Final result ---'
          console.log result
          d.resolve result   
        
      .error (err) ->
        d.reject err
      
      d.promise
    
    
    # --- Public
    getPlaylist: (playlistId) ->
      d = $q.defer()
      
      $http(        
        method: 'GET',
        url: getPlaylistUrl('id,snippet,contentDetails', playlistId),
        cache: true)
      
      .success (data) ->
        d.resolve data
          
      .error (err) ->
        d.reject err
      
      d.promise
      
    getPlaylistVideos: (playlistId, pageToken) ->
      getPlaylistVideosRequest(playlistId)