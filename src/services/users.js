User.$inject = ['$http'];

function User($http){

  function find(){
    return $http.get('/api/users');
  }

  function findById(id){
    return $http.get(`/api/users/${id}`);
  }

  function create(user){
    return $http.post('/api/users', user);
  }

  function update(user){
    return $http.put(`/api/users/${user._id}`, user);
  }

  function remove(user){
    return $http.delete( `/api/users/${user._id}`);
  }

  this.find = find;
  this.findById = findById;
  this.create = create;
  this.update = update;
  this.remove = remove;
}

export default User;
