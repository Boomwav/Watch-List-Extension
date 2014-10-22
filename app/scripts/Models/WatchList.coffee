'use strict'

angular.module('watchlistApp').factory 'WatchList', ['YouTube', 'localStorageService', (YouTube, localStorageService) -> 
  new class WatchList
    constructor: ->
      data = localStorageService.get 'WatchList'
      
      if data?
        # Used the extension before. Load from localStorage.
        @load data
      else
        # First-time use. Create empty localstorage.
        @playlists = []
        @save()
        
      
      @load data 
    
    addPlaylist: (playlistId) ->
      
      if not _.any(@playlists, (item) -> item.id == playlistId)
        self = this
        
        YouTube.getPlaylist playlistId
        
        .then (data) -> 
          self.playlists.push data.items[0]
          self.nbPlaylists += 1
          self.save()
            
    deletePlaylist: (id) ->
      @playlists = _.reject(@playlists, (item) -> item.id == id)
      @save()
      
    load: (data) ->
      _.extend this, data
      
    save: ->
      localStorageService.set 'WatchList', JSON.stringify this
      
      #@cows = 
      #  for cowData in @cows
      #    _.extend new Cow, cowData
]