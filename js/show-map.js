$(document).ready(function () {
  "use strict";

  const gSat = L.gridLayer.googleMutant({
		type: "satellite",
  });
  
  const gRoad = L.gridLayer.googleMutant({
		type: "roadmap",
  });
    const osm = L.tileLayer( 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    opacity: 0.8
  });
  
  const map = L.map('map', {
    scrollWheelZoom: false
  }).setView([35.762732158841366, 59.377916284132489], 5);

  const khorasan = {
    "type": "FeatureCollection",
    "name": "khorasan",
    "features": [
    { "type": "Feature", "properties": { "name": "Abbas Abad", "img":2 }, "geometry": { "type": "Point", "coordinates": [ 59.396057109147577, 35.773458290812329, 0.0 ] } },
    { "type": "Feature", "properties": { "name": "Bandiyan", "img":2 }, "geometry": { "type": "Point", "coordinates": [ 59.101514684129917, 37.462787580050488, 0.0 ] } },
    { "type": "Feature", "properties": { "name": "Bazeh Hur", "img":4 }, "geometry": { "type": "Point", "coordinates": [ 59.377916284132489, 35.762732158841366, 0.0 ] } },
    { "type": "Feature", "properties": { "name": "Biyasabad" }, "geometry": { "type": "Point", "coordinates": [ 60.056394444444479, 34.315252777777779, 0.0 ] } },
    { "type": "Feature", "properties": { "name": "Nishapur", "img":3 }, "geometry": { "type": "Point", "coordinates": [ 58.84735761676081, 36.17090323297046, 0.0 ] } },
    { "type": "Feature", "properties": { "name": "Shahr-e tepe", "img":2 }, "geometry": { "type": "Point", "coordinates": [ 59.064102964617362, 37.352697358582184, 0.0 ] } },
    { "type": "Feature", "properties": { "name": "Tepe Siyah" }, "geometry": { "type": "Point", "coordinates": [ 59.901400143231832, 34.329775321995932, 0.0 ] } },
    { "type": "Feature", "properties": { "name": "Viranshahr", "img":3 }, "geometry": { "type": "Point", "coordinates": [ 58.255288325098618, 37.315000897341868, 0.0 ] } },
    { "type": "Feature", "properties": { "name": "Zuzan", "img":5 }, "geometry": { "type": "Point", "coordinates": [ 59.877569362233338, 34.356743355624118, 0.0 ] } }
    ]
  };
  const khorasan_layer = L.geoJSON(khorasan, {
    onEachFeature: (feature, layer) => {
      let gal = [];
      if (feature.properties.img){
        for (let index = 1; index <= feature.properties.img; index++){
          gal.push(`<a href="img/sites/${feature.properties.name.toLowerCase().replace(' ', '-')}-${index}.jpg" 
            data-fancybox="${feature.properties.name}"
            data-caption="${feature.properties.name} photo #${index}"
            >
          Photo ${index}
          </a>`);
         
        }
      }
      layer.bindPopup(`<h4>${feature.properties.name}</h4>${gal.join(' - ')}`);
    },
    pointToLayer: (feature, latlng) => {
      return L.circleMarker(latlng, {
        radius: 8,
        fillColor: "#cea06c",
        color: "rgb(38, 58, 78)",
        weight: 3,
        opacity: .9,
        fillOpacity: 0.8
    });
  }
  });

  khorasan_layer.addTo(map);

  map.fitBounds(khorasan_layer.getBounds());

  gSat.addTo(map);

  L.control.layers({
    "Google Satellite": gSat,
    "Google Roadmap": gRoad,
    "Open Street Maps": osm
  }, {
    "Archaeological sites": khorasan_layer
  }, {
    collapsed: false
  }).addTo(map);

  const legend = L.control({ position: "bottomright" });
  legend.onAdd = () => {
    const el = L.DomUtil.create("div", "leaflet-control-layers leaflet-control credits");
    el.innerHTML = `<div class="legend-title">
        Mission Archéologique Franco-Iranienne dans le Khorasan
        <br>
        (Musée du Louvre)
        <br>
        Etude GIS dirigée par Rocco Rante
      </div>
      <div class="legend-source">&copy; Musée du Louvre. All rights reserved</div>`
    return el;
  };
  legend.addTo(map);

});