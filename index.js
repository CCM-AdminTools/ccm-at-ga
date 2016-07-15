'use strict';

const Path    = require('path');
const Hapi    = require('hapi');
const Inert   = require('inert');

const Server  = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, '')
      }
    }
  }
});

Server.connection({
  port: process.env.PORT || 6234
});

Server.register(Inert, (err)=> {
  if(err) {
    throw err;
  }
});

Server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'app'
        }
    }
}); 

// start server
Server.start((err)=> {
  if(err) {
    throw err;
  }
  console.log('Server running at: ', Server.info.uri);
});
