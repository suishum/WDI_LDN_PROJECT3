UsersEditCtrl.$inject = ['User', '$state'];
function UsersEditCtrl(User, $state) {
  this.user = {};

  User.findById($state.params.id)
    .then(res => this.user = res.data);

  function handleSubmit() {
    User.update(this.user);
    $state.go('usersShow', { id: $state.params.id });
  }

  this.handleSubmit = handleSubmit;
}

export default UsersEditCtrl;
