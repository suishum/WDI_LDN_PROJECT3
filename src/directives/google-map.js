/* global google */ //this is just used to stop the linter caring about google
function googleMap() {
  let currentLocation = {};
  return {
    restrict: 'E',
    template: '<div class="google-map"></div>',
    replace: true,
    scope: {
      center: '=',
      zoom: '=',
      restaurants: '=',
      origin: '='
    },
    link($scope, $element) {

      const map = new google.maps.Map($element[0], {
        zoom: $scope.zoom,
        center: $scope.center,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: false
      });
      $scope.$watch('center', () => {
        map.setCenter($scope.center);
        const marker = new google.maps.Marker({
          position: $scope.center,
          map: map,
          icon: '⭐️'
        });

        marker.setMap(map);
      }, true);


      const directionsService = new google.maps.DirectionsService();
      const directionsDisplay = new google.maps.DirectionsRenderer();
      // const directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true});
      directionsDisplay.setMap(map);

      $scope.$watch('center', () => map.setCenter($scope.center), true);
      $scope.$watch('origin', displayRoute);

      navigator.geolocation.getCurrentPosition(pos => {
        currentLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };

        displayRoute();
      });




      // DISPLAY ROUTE
      function displayRoute() {
        if(!$scope.origin) return false;

        directionsService.route({
          origin: currentLocation,
          destination: $scope.center,
          travelMode: 'DRIVING'
        }, (response) => {
          directionsDisplay.setDirections(response);
        });
      }

      // directionsDisplay.setPanel(directionsShow);

      $scope.$watch('restaurants', () => {

        var infowindow = new google.maps.InfoWindow();
        var marker, i;
        for (i = 0; i < $scope.restaurants.length; i++) {
          const contentString = '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          `<h1 id="firstHeading" class="firstHeading">${$scope.restaurants[i].name}</h1>` +
          '<div id="bodyContent">'+
          `<img style="max-width:70px" src="${$scope.restaurants[i].image_url}">
          <p>${$scope.restaurants[i].location.address1}<br>
          ${$scope.restaurants[i].location.city}<br>
          ${$scope.restaurants[i].location.zip_code}<br>
          ⭐️ ${$scope.restaurants[i].rating}<br>
          <strong>${$scope.restaurants[i].price}<strong>
          </p>` +
          '</div>' +
          '</div>';

          const myLatLng = { lat: parseFloat($scope.restaurants[i].coordinates.latitude), lng: parseFloat($scope.restaurants[i].coordinates.longitude)};
          marker = new google.maps.Marker({
            position: myLatLng,
            map: map
          });
          google.maps.event.addListener(marker, 'click', (function(marker) {
            return function() {
              infowindow.setContent(contentString);
              infowindow.open(map, marker);
            };
          })(marker, i));
        }
      });
    }
  };
}


export default googleMap;
