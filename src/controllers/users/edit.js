UsersEditCtrl.$inject = ['User', '$state'];
function UsersEditCtrl(User, $state) {
  const vm = this;
  vm.user = {};

  User.findById($state.params.id)
    .then(res => vm.user = res.data);

  function handleSubmit() {
    User.update(vm.user);
    $state.go('usersShow', { id: $state.params.id });
  }

  vm.handleSubmit = handleSubmit;
}

export default UsersEditCtrl;
