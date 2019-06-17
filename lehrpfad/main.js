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

//karte.setView([47.25, 11.416667], 9);

// die Implementierung der Karte startet hier


//GPX GRuppe erstellen und Menü
let lehrweg = L.featureGroup().addTo(karte);
layerControl.addOverlay(lehrweg, "Naturlehrpfad");


//GPX Track laden
console.log(lehrpfad.features.geometry);

const lehrpfade = new L.GPX("lehrpfad.gpx", {
    async: true,
    marker_options: {
        startIconUrl: 'icons/pin-icon-start.png',
        endIconUrl: 'icons/pin-icon-end.png',
        shadowUrl: 'icons/pin-shadow.png',
        iconSize: [32, 37]
    }}).on("loaded", function (e) {
karte.fitBounds(e.target.getBounds());
console.log("name",e.target.get_name())
e.target.bindPopup(`${e.target.get_name()}`)
}).addTo(lehrweg).bindPopup("");

//biken.on("addline", function(e) {




