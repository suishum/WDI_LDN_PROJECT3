EventsNewCtrl.$inject = ['Event', '$state', '$http'];

function EventsNewCtrl(Event, $state, $http) {
  this.event = {};
  this.restaurants = [];

  $http({
    method: 'GET',
    url: 'https://developers.zomato.com/api/v2.1/search?entity_id=61&entity_type=city&start=0&count=99', headers: {
      'user-key': 'bb553f8ef2af47b55acff60d10239333'
    }
  })
    .then(res => {
      this.restaurants = res.data.restaurants;
      console.log(this.restaurants);
    });

  function handleSubmit(){
    if (this.form.invalid) return false;
    Event.create(this.event)
      .then(event => $state.go('eventsShow', { id: event._id }));
  }

  this.handleSubmit = handleSubmit;
}

export default EventsNewCtrl;
