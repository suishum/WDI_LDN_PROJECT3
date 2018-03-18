Event.$inject = ['$http'];

function Event($http){
  function findById(id){
    return $http.get(`/api/events/${id}`);
  }

  function create(event){
    return $http.post('/api/events', event);
  }

  function update(event){
    return $http.put(`/api/events/${event._id}`, event);
  }

  function remove(event){
    return $http.delete( `/api/events/${event._id}`);
  }

  function voteCreate(id, restaurant){
    return $http.post(`/api/events/${id}/vote`, restaurant);
  }

  function commentCreate(id, comment){
    return $http.post( `/api/events/${id}/comment`, comment);
  }

  this.findById = findById;
  this.create = create;
  this.update = update;
  this.remove = remove;
  this.voteCreate = voteCreate;
  this.commentCreate = commentCreate;
}

export default Event;
