/* global google */
function googlePlaces() {
  return {
    restrict: 'A',
    scope: {
      location: '=',
      address: '='
    },
    link($scope, $element) {

      const input = $element[0];

      const autocomplete = new google.maps.places.Autocomplete(input);

      autocomplete.addListener('place_changed', () => {
        const address = autocomplete.getPlace().formatted_address;
        const location = autocomplete.getPlace().geometry.location.toJSON();

        $scope.location = location;
        $scope.address = address;
        $scope.$apply();
      });
    }
  };
}

export default googlePlaces;
