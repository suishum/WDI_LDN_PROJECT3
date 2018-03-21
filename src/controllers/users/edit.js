UsersEditCtrl.$inject = ['User', '$state', '$http'];
function UsersEditCtrl(User, $state, $http) {
  const vm = this;
  vm.user = {};
  vm.categories = [];

  $http.get('/api/categories')
    .then(res => {
      vm.categories = res.data;
    });

  User.findById($state.params.id)
    .then(res => vm.user = res.data);

  function handleSubmit() {
    User.update(vm.user);
    $state.go('usersShow', { id: $state.params.id });
  }

  vm.handleSubmit = handleSubmit;
}

export default UsersEditCtrl;
