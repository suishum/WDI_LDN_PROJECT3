EventsNewCtrl.$inject = ['Event', '$state'];

function EventsNewCtrl(Event, $state) {
  this.event = {};


  function handleSubmit(){
    if (this.form.invalid) return false;
    Event.create(this.event)
      .then(event => $state.go('eventsShow', { id: event._id }));
  }

  this.handleSubmit = handleSubmit;
}

export default EventsNewCtrl;
