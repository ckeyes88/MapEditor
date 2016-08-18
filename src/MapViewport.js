var svgPanZoom = require('svg-pan-zoom');

var _defaultHandleMouseDown = function (e) {
  this.modifyElement = e.target;
  return e.target;
};

var _defaultHandleMouseMove = function (e) {
  if (this.modifyElement) this.move(this.modifyElement, [e.clientX, e.clientY])
  return this;
};

var _defaultHandleMouseUp = function (e) {
  this.modifyElement = false;
  return this;
};

var MapViewport = function(height, width, drawing) {
  this.height = height;
  this.width = width;
  this.handleMouseDown = _defaultHandleMouseDown;
  this.handleMouseMove = _defaultHandleMouseMove;
  this.handleMouseUp = _defaultHandleMouseUp;
  this.modifyElement = false;
  this.drawing = this.createDrawing(drawing);
  this.markerAssets = {};
  this.markers = [];
};

MapViewport.prototype.changeViewport = function (width, height) {
  this.width = width;
  this.height = height;

  // do something to redraw
};

MapViewport.prototype.changeViewbox = function (dimensionArray) {
  if (!this.svg) return;
  if (dimensionArray.length < 4) {
    dimensionArray[2] = this.width;
    dimensionArray[3] = this.height;
  }

  var viewBoxString = '';
  dimensionArray.forEach(function(dimension, i) {
    var comma = i === dimensionArray.length - 1 ? '' : ' ';
    viewBoxString = viewBoxString.concat(dimension.toString(), comma);
  });
  this.svg.setAttribute('viewBox', viewBoxString);

  return this;
}

MapViewport.prototype.changeHandleClick = function (newClickFunction) {
  if (typeof newClickFunction === 'function') this.handleClick = newClickFunction;
}

MapViewport.prototype.createDrawing = function (drawingObj) {
  if (!drawingObj.width || !drawingObj.height || !drawingObj.path) throw err;

  var drawing = document.createElementNS("http://www.w3.org/2000/svg", "image");
  drawing.setAttribute('height', drawingObj.width);
  drawing.setAttribute('width', drawingObj.height);
  drawing.setAttribute('href', drawingObj.path);
  return drawing;
}

MapViewport.prototype.draw = function (elementID, viewbox) {
  // in react, this may not be necessary.  maybe just return it
  if (!elementID) return;

  this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  var selectedElement = document.getElementById(elementID);

  selectedElement.appendChild(this.svg);

  this.svg.setAttribute('style', 'border: 1px solid black');
  this.svg.setAttribute('width', this.width);
  this.svg.setAttribute('height', this.height);

  this.svg.appendChild(this.drawing)

  this.panZoom = svgPanZoom(this.svg, {
      viewportSelector: this.drawing, panEnabled: true, controlIconsEnabled: true, zoomEnabled: true, dblClickZoomEnabled: false,
      mouseWheelZoomEnabled: true, preventMouseEventsDefault: true, zoomScaleSensitivity: 0.1, minZoom: 0.1, maxZoom: 100, fit: true,
      contain: false, center: true, refreshRate: 'auto', customEventsHandler: null, eventsListenerElement: null,
      onZoom : null, onPan : null
  });

  return this.svg;
};

MapViewport.prototype.move = function (element, translation) {
  element.setAttribute('transform', 'translate(' + translation[0] + ', ' + translation[1] + ')');
  console.log(element);
}

MapViewport.prototype.addMarkerAsset = function (name, asset) {
  this.markerAssets.name = asset;
}

MapViewport.prototype.addMarker = function (marker) {
  if (marker.type && marker.position) this.markers.push(marker);
}

MapViewport.prototype.deletMarker = function (removeMarker) {
  // do markers need ids?
  this.markers.forEach(function(currentMarker, i) {
    if (currentMarker.id === removeMarker.id) {
      return this.markers.splice(i, 1);
    }
  })
}

module.exports = MapViewport;
