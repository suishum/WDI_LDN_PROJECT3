# MateDate
### Sui Shum and Katie Moore

---
## Project Brief
We were assigned teams and given one week to create a RESTful MEAN full stack app. We create MateDate, an app that allows users to create and plan events, using the google places, google maps, and yelp APIs. The admin can then add other users to their event, all attendees of an event can then vote on their preferred restaurant. The admin can close the poll at which point the app calculates a winner (and breaks any ties), provides more information on the restaurant,  displays a google-map with the winner pinned, and directions from the user's location (if available).

## Conception
To conceptualize our app idea we focused on things that interested both of us so that we would equally be invested in the project. We settled on restaurants as we both enjoy going out to eat. We then started to think about problems associated with going out to eat, such as finding places that are suitable for specific dietary requirements. We chose the problem of choosing a restaurant amongst a large group.

After fleshing out some feature ideas to make sure the idea had enough scope to challenge us we set up our Trello board.

<img width="1268" alt="trello" src="https://user-images.githubusercontent.com/31917459/37826214-81616650-2e8a-11e8-8e4f-5c708a544dee.png">

##Design Phase
We started out by drawing some simple wireframes for our RESTful routes for each resource. This also highlighted some feature ideas we had not previously thought about.

We added these wireframes to our Trello Board so that we would both have easy access to all of our planning materials. Below are some examples:

![wireframe1](https://user-images.githubusercontent.com/31917459/37826281-b2b45226-2e8a-11e8-8a4f-4de456c40a85.jpg)
![wireframe1](https://user-images.githubusercontent.com/31917459/37826283-b43fbf2c-2e8a-11e8-88c1-d57d46db55a5.jpg)

##Build Process
We were both very concerned with sharing the work fairly and as such initially each of us focused on one resource each (events and users) and split any non-resource specific files equally. We continued in this manner for the entirety of the backend and the basics of the front end views and routes.

Once the basic app was complete we were very open about which of the more novel and difficult functionality we would like to tackle. An example of one such feature is shown below:

```
function calcVoteWinner() {
  vm.voteWinner = [];
  tallyVotes();
  // find the id of the winner
  const winnerId = Object.keys(vm.talliedVotes).reduce((a, b) => vm.talliedVotes[a] > vm.talliedVotes[b] ? a : b);
  // get the winner object
  vm.voteWinner = vm.event.restaurants.filter(restaurant => restaurant.id === winnerId);
  Event.winnerCreate($state.params.id, vm.voteWinner[0])
    .then(res => {
      vm.event = res.data;
      // get winner co-ordinates in the form of { 'lat': 123, 'lng': 123 }
      vm.voteWinnerLocation.lat = vm.event.winner.coordinates.latitude;
      vm.voteWinnerLocation.lng = vm.event.winner.coordinates.longitude;
    })
    .catch(err => console.error(err));
}
```

As you can see we frequently used comments in our code which means that neither of us was unsure of how the logic in each controller worked.

We didn't start polishing the styling until the last two days. We began with layout and once this was consistent across all pages we moved onto color, font and other style choices.

We asked our friends and colleagues to test our site and to provide feedback about usability, we also consulted a UX/UI designer to provide further insights. This information was really valuable and heavily informed our design process.

## Wins
From the start of this project we both understood how important communication would be, particularly as we had not used the git collaborative process before. As a result we did not face any major merge issues which allowed us to maintain momentum throughout the week.

Despite not having worked together in the past we very quickly and easily merged out working styles and thought processes. We also collaborated frequently on troubleshooting which not only helped us solve any problems we were having much faster than if we had worked in isolation but also meant that we had further opportunity to discuss and understand one another's code.

## Blockers
For us, the biggest blocker was time. We were both very ambitious at the start of this project and frequently had to remind ourselves of what was possible in the given timeframe, for example, we had a number of fields in the models and forms in anticipation of future functionality that we later had to remove due to time constraints. We also had a number of cards in our Trello backlog board that we knew how to implement in theory but were aware we would likely not have time to achieve.

In a similar vein, for the first few days we struggled to remain focused on MVP. We found ourselves in many discussions about features that were that were not necessary for our initial product. To overcome this, early in conversations we began asking one another if the discussed feature was truly a part of the MVP. By Monday we had a clear idea of what our MVP would be.
