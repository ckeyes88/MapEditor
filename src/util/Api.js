var Portal = require('portals');

var portal = new Portal.createPortal({
  globals: {
    hostname: 'https://some-web-service.com',
    headers: {
      Authorization: 'Bearer S#Gwer6in456DFGhje#$5dfgsr5)Lgeryugh'
    }
  }
});

module.exports = portal;
