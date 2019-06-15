//Skript Lehrpfade
const div = document.getElementById("map");
const breite = div.getAttribute("data-lat");
const laenge = div.getAttribute("data-lng");
const titel = div.getAttribute("data-title");

//Karte initialisieren
let karte = L.map("map");

const kartenLayer = {
    osm: L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
};

const layerControl = L.control.layers({
    "Geoland Basemap": kartenLayer.geolandbasemap,
    "Geoland Basemap Orthofoto": kartenLayer.bmaporthofoto30cm,
    "OpenStreetMap": kartenLayer.osm,
}).addTo(karte);

kartenLayer.geolandbasemap.addTo(karte);

karte.setView(
    [breite, laenge],
    10
);

karte.addControl(new L.Control.Fullscreen());

const ssehenswürdigkeit = L.featureGroup().addTo(karte);

//GPX Datei Einlesen
new L.GPX(POI, { async: true }).on('loaded', function (e) {
    karte.fitBounds(e.target.getBounds());
}).addTo(sehenswürdigkeit);


/* GPX GRuppe erstellen und Menü
let point = L.featureGroup().addTo(karte);
layerControl.addOverlay(lehrweg, "Naturlehrpfad");


GPX Track laden
console.log(POI.features.geometry);

for (let point of POI) {
    console.log(point);
    let pin = L.marker(
        [point.lat, point.lng]
    ).addTo(point);
    pin.bindPopup(
        `<h1>Standort ${features.properties.NAME}</h1>
         `
    );
}

new L.GPX("poi.gpx", {
    async: true,
    marker_options: {
        startIconUrl: 'images/pin-icon-start.png',
    }
}).on('loaded', function (e) {
    karte.fitBounds(e.target.getBounds())
}); */