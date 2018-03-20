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

  function remove(id){
    return $http.delete( `/api/events/${id}`);
  }

  function voteCreate(id, restaurant){
    return $http.post(`/api/events/${id}/vote`, restaurant);
  }

  function commentCreate(id, comment){
    return $http.post( `/api/events/${id}/comments`, comment);
  }

  function commentDelete(id, comment){
    return $http.delete(`/api/events/${id}/comments/${comment._id}`);
  }

  function attendeeCreate(id, attendees){
    return $http.post(`/api/events/${id}/attendees`, attendees);
  }

  function attendeeDelete(id,attendee){
    return $http.delete(`/api/events/${id}/attendees/${attendee._id}`);
  }

  function adminCreate(id, user){
    return $http.post(`/api/events/${id}/admin`, user);
  }

  this.findById = findById;
  this.create = create;
  this.update = update;
  this.remove = remove;
  this.voteCreate = voteCreate;
  this.commentCreate = commentCreate;
  this.commentDelete = commentDelete;
  this.attendeeCreate = attendeeCreate;
  this.attendeeDelete = attendeeDelete;
  this.adminCreate = adminCreate;
}

export default Event;
