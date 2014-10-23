watchlistApp.controller 'WatchlistCtrl', ['$scope', '$http', '$rootScope', 'localStorageService', 'YouTube', ($scope, $http, $rootScope, localStorageService, YouTube) ->
    
    $scope.WatchList = []
       
    loadWatchList = -> localStorageService.get 'WatchList'
    saveWatchList = -> localStorageService.set 'WatchList', JSON.stringify $scope.WatchList
    
    getItems = ->      
      data = loadWatchList()
      
      if data?
        # Used the extension before. Load from localStorage.
        $scope.WatchList = data
      else
        # First-time use. Create empty localstorage.
        $scope.WatchList = []
        saveWatchList()
        
      console.log $scope.WatchList

    $scope.addItem = ->     
      if not _.any($scope.WatchList, (item) -> item.id == $scope.newPlaylistId)
      
        YouTube.getPlaylist $scope.newPlaylistId
        
        .then (data) -> 
          $scope.WatchList.push data.items[0]
          saveWatchList()
          
      $scope.newPlaylistId = ''

    $scope.deleteItem = (id) ->
      console.log "Delete item: #{id}"
      $scope.WatchList = _.reject($scope.WatchList , (item) -> item.id == id)
      saveWatchList()
      localStorageService.remove id
      
    getItems()
    $scope.newPlaylistId = $rootScope.autoAddList if $rootScope.autoAddList?
]

