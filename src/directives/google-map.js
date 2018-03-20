/* global google */ //this is just used to stop the linter caring about google
function googleMap() {
  return {
    restrict: 'E',
    template: '<div class="google-map"></div>',
    replace: true,
    scope: {
      center: '=',
      zoom: '=',
      restaurants: '='
    },
    link($scope, $element) {

      const map = new google.maps.Map($element[0], {
        zoom: $scope.zoom,
        center: $scope.center
      });
      $scope.$watch('center', () => {
        map.setCenter($scope.center);
        // console.log($scope.center);
      }, true);

      $scope.$watch('restaurants', () => {
        var infowindow = new google.maps.InfoWindow();
        var marker, i;
        for (i = 0; i < $scope.restaurants.length; i++) {
          const myLatLng = { lat: parseFloat($scope.restaurants[i].coordinates.latitude), lng: parseFloat($scope.restaurants[i].coordinates.longitude)};
          marker = new google.maps.Marker({
            position: myLatLng,
            map: map
          });
          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent($scope.restaurants[i].name);
              infowindow.open(map, marker);
            };
          })(marker, i));
        }
      });
    }
  };
}


export default googleMap;
