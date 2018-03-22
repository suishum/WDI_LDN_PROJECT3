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
      origin: '=',
      usersLocation: '=',
      directions: '='
    },
    link($scope, $element) {

      const map = new google.maps.Map($element[0], {
        zoom: $scope.zoom,
        center: $scope.center,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            'featureType': 'administrative',
            'elementType': 'labels',
            'stylers': [
              {
                'visibility': 'on'
              },
              {
                'gamma': '1.82'
              }
            ]
          },
          {
            'featureType': 'administrative',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'visibility': 'on'
              },
              {
                'gamma': '1.96'
              },
              {
                'lightness': '-9'
              }
            ]
          },
          {
            'featureType': 'administrative',
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'landscape',
            'elementType': 'all',
            'stylers': [
              {
                'visibility': 'on'
              },
              {
                'lightness': '25'
              },
              {
                'gamma': '1.00'
              },
              {
                'saturation': '-100'
              }
            ]
          },
          {
            'featureType': 'poi.business',
            'elementType': 'all',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'poi.park',
            'elementType': 'all',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'road',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'road',
            'elementType': 'labels.icon',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'road.highway',
            'elementType': 'geometry',
            'stylers': [
              {
                'hue': '#ffaa00'
              },
              {
                'saturation': '-43'
              },
              {
                'visibility': 'on'
              }
            ]
          },
          {
            'featureType': 'road.highway',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'road.highway',
            'elementType': 'labels',
            'stylers': [
              {
                'visibility': 'simplified'
              },
              {
                'hue': '#ffaa00'
              },
              {
                'saturation': '-70'
              }
            ]
          },
          {
            'featureType': 'road.highway.controlled_access',
            'elementType': 'labels',
            'stylers': [
              {
                'visibility': 'on'
              }
            ]
          },
          {
            'featureType': 'road.arterial',
            'elementType': 'all',
            'stylers': [
              {
                'visibility': 'on'
              },
              {
                'saturation': '-100'
              },
              {
                'lightness': '30'
              }
            ]
          },
          {
            'featureType': 'road.local',
            'elementType': 'all',
            'stylers': [
              {
                'saturation': '-100'
              },
              {
                'lightness': '40'
              },
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'transit.station.airport',
            'elementType': 'geometry.fill',
            'stylers': [
              {
                'visibility': 'on'
              },
              {
                'gamma': '0.80'
              }
            ]
          },
          {
            'featureType': 'water',
            'elementType': 'all',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [
              { visibility: 'off' }
            ]
          }
        ]
      });

      $scope.$watch('center', () => {
        map.setCenter($scope.center);
      }, true);

      function yourLocationMarker(){
        const image = {
          url: '/assets/images/m8d8-mark2.svg', // url
          scaledSize: new google.maps.Size(50, 50), // scaled size
          scale: 10,
          origin: new google.maps.Point(0,0) // origin
        };

        var marker = new google.maps.Marker({
          position: $scope.center,
          icon: image
        });
        var infowindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', (function(marker) {
          return function() {
            infowindow.setContent('You\'re Here!');
            infowindow.open(map, marker);
          };
        })(marker));
        marker.setMap(map);
      }


      const directionsService = new google.maps.DirectionsService();
      const directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true});
      directionsDisplay.setMap(map);

      $scope.$watch('center', () => map.setCenter($scope.center), true);
      $scope.$watch('origin', displayRoute);

      navigator.geolocation.getCurrentPosition(pos => {
        currentLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        yourLocationMarker();
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
          $scope.directions = response.routes[0].legs[0].steps;
          directionsDisplay.setDirections(response);
          $scope.$apply();
        });
      }

      var directionsShow = document.getElementById('directionsShow' );
      directionsDisplay.setPanel(directionsShow);

      const image = {
        url: '/assets/images/m8d8-mark.svg', // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        scale: 10,
        origin: new google.maps.Point(0,0) // origin
      };

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
            map: map,
            icon: image
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
