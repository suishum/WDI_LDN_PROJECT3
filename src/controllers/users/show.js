UsersShowCtrl.$inject = ['User', '$state'];
function UsersShowCtrl(User, $state) {
  // console.log('show ctrl loaded');
  this.user = {};

  User.findById($state.params.id)
    .then(res => this.user = res.data);
  // .then(() => {
  //   const lat = this.user.location.lat;
  //   const lng = this.user.location.lng;
  //   User.getForecast(lat, lng)
  //     .then(res => console.log(res));
  // });

  // function remove() {
  //   User.remove(this.user)
  //     .then(() => $state.go('home'));
  // }
  //
  // this.remove = remove;
}

export default UsersShowCtrl;
