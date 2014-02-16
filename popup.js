chrome.tabs.getSelected(null, function(tab) {
    document.getElementById('currentLink').innerHTML = tab.url;
});

// chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
//   // Use the token.
// });
$( function () { 
  $("#search-button").click(function() {
      alert("test");
     $.get(
      "https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=AIzaSyCUvP3-ZZ_zLOY2eMODHbNrDKR0Mwd20r4",
      {},
      function(data) {
         var str = JSON.stringify(data);
        $('#search-container').html('<pre>' + str + '</pre>');
      }
    );  
  });
});