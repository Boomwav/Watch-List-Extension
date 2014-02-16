var watchListApp = angular.module('watchListApp', []);
 
watchListApp.controller('PlaylistsCtrl', function ($scope) {
  $scope.playlists = [
    {'title': 'Civilization 5: France (Tourism)',
     'channelUrl': 'http://www.youtube.com/user/quill18',
     'channelName': 'quill18'},
    {'title': 'EU IV (Co op MP) - Sunni invasion of Europe',
     'channelUrl': 'http://www.youtube.com/user/SBFMadDjinn',
     'channelName': 'SBFMadDjinn'},
    {'title': 'Xcom Enemy Within: Impossible Ironman South America',
     'channelUrl': 'http://www.youtube.com/user/SBFMadDjinn',
     'channelName': 'SBFMadDjinn'},
  ];
});