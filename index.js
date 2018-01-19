const stompit = require('stompit');

var connectOptions = {
  host : 'localhost',
  port : 61613,
  connectHeaders: {
    host : 'localhost'
  }
};

var subscribeHeaders = {
  destination: '/topic/fedora',
  ack: 'client-individual'
};

stompit.connect(connectOptions, (error, client) => {
  if( error ) throw error;
  console.log('Connected to FIN via fedora ActiveMQ connection, STOMP protocol');
  
  init(client);
});

function init(client) {
  client.subscribe(subscribeHeaders, async (error, message) => {
    if( error ) return console.error(error);

    var headers = message.headers;    
    message.readString('utf-8', function(error, body) {
      if( error ) return console.error(error);
      console.log(headers, body);
    });
  });
}