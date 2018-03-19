/* global api, describe, it, expect, beforeEach */
const Event = require('../../../models/event');

const eventsData = [{
  'location': {
    'lat': 51.50090949999999,
    'lng': -0.11953229999994619
  },
  'restaurants': [ {
    'id': 'hawksmoor-seven-dials-london-4',
    'name': 'Hawksmoor Seven Dials'
  },
  {
    'id': 'great-queen-street-london',
    'name': 'Great Queen Street'
  },
  {
    'id': 'burger-and-lobster-london-2',
    'name': 'Burger & Lobster'
  },
  {
    'id': 'lanzhou-noodle-bar-london',
    'name': 'Lanzhou Noodle Bar'
  },
  {
    'id': 'quilon-restaurant-london',
    'name': 'Quilon Restaurant'
  }
  ],
  'attendees': [ ],
  'admin': [],
  'name': 'Katsu\'s Event',
  'date': '2018-03-30T23:00:00.000Z',
  'time': '1970-01-01T20:07:00.000Z',
  'comments': [ ],
  'votes': [ ]
},{
  'location': {
    'lat': 35.6894875,
    'lng': 139.69170639999993
  },
  'restaurants': [
    {
      'id': '一蘭-渋谷店-渋谷区-2',
      'name': 'Ichiran Shibuya'
    },
    {
      'id': '龍の家-新宿区',
      'name': 'Tatsunoya'
    },
    {
      'id': '治郎丸-新宿本店-新宿区',
      'name': 'Jirōmaru Shinjuku Honten'
    },
    {
      'id': 'ウッチャン新宿思い出横丁-新宿区-2',
      'name': 'Ucchan Shinjuku Omoide Yokocho'
    },
    {
      'id': 'ニューヨーク-グリル-新宿区',
      'name': 'New York Grill'
    }
  ],
  'attendees': [],
  'admin': [ ],
  'name': 'Katsu\'s Event',
  'date': '2018-03-30T23:00:00.000Z',
  'time': '1970-01-01T15:00:00.000Z',
  'comments': [ ],
  'votes': [ ]
}
];

describe('GET /api/events', () => {
  beforeEach(done => {
    Event.remove({})
      .then(() => eventsData.forEach(event => Event.create(event)))
      .then(() => done());
  });

  it('should return 200 response', done => {
    api
      .get('/api/events')
      .end((err, res) => {
        res.body.forEach((event,index) => {
          expect(event.name).to.eq(eventsData[index].name);
        });
        done();
      });
  });
});
