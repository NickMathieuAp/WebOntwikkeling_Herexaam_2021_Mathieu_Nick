var iconGebruike= L.icon ({
  iconUrl:'/img/dot_red.svg',
  iconSize:[15,15],
})

var iconGebruike= L.icon ({
  iconUrl:'/img/dot_green.svg',
  iconSize:[15,15],
})

var iconGebruiker= L.icon ({
  iconUrl:'/img/dot_blue.svg',
  iconSize:[15,15],
})

var iconGebruike= L.icon ({
  iconUrl:'/img/dot_yellow.svg',
  iconSize:[15,15],
})

var iconGebruike= L.icon ({
  iconUrl:'/img/dot_black.svg',
  iconSize:[15,15],
})

var iconGebruike= L.icon ({
  iconUrl:'/img/dot_grey.svg',
  iconSize:[15,15],
})

var iconGebruike= L.icon ({
  iconUrl:'/img/dot_dead.svg',
  iconSize:[15,15],
})

var map = L.map('mapid');
L.tileLayer.provider('Stadia.AlidadeSmooth', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1
}).addTo(map);


function onLocationFound(e) {
  var radius = e.accuracy/3;

  L.marker((e.latlng),{icon:iconGebruiker}).addTo(map).bindPopup("You are here").openPopup();
}

function onLocationError(e) {
  alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({setView: true, watch: true, maxZoom: 16});
