EventsEditCtrl.$inject = ['Event', '$state'];
function EventsEditCtrl(Event, $state) {
  const vm = this;
  vm.event = {};

  Event.findById($state.params.id)
    .then(res => vm.event = res.data);

  function handleSubmit() {
    Event.update(vm.event)
      .then(() => $state.go('eventsShow', { id: $state.params.id }));
  }

  vm.handleSubmit = handleSubmit;

}

export default EventsEditCtrl;
