EventsEditCtrl.$inject = ['Event', '$state'];
function EventsEditCtrl(Event, $state) {
  this.event = {};
  Event.findById($state.params.id)
    .then(res => this.event = res.data);

  function handleSubmit() {
    Event.update(this.event)
      .then(() => $state.go('eventsShow', { id: $state.params.id }));
  }

  this.handleSubmit = handleSubmit;
}

export default EventsEditCtrl;
