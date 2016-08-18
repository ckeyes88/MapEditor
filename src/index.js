var MapViewport = require(__dirname + '/MapViewport');

window.Viewport = {
  launch: new MapViewport(500, 500, {width: 200, height: 200, path: '400.jpeg'}).draw('viewer', [0, 0]),

  attach: function (domTarget) {
    var causeChange = function (e) {
      if(this.setAttribute) {
        this.setAttribute('transform', 'translate(100, 100)');
      }
      return console.log('hit: ', e, this);
    };
    causeChange();
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('style', 'border: 1px solid black');
    svg.setAttribute('width', '600');
    svg.setAttribute('height', '250');

    var image = document.createElementNS("http://www.w3.org/2000/svg", "image");
    image.setAttribute('height', 350);
    image.setAttribute('width', 350);
    image.setAttribute('href', "400.jpeg");
    image.addEventListener('click', causeChange.bind(image));
    svg.appendChild(image);

    document.body.appendChild(svg);
  }
};
