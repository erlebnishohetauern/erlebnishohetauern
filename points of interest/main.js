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

//GPX GRuppe erstellen und Menü
let sehenswürdigkeiten = L.featureGroup().addTo(karte);
layerControl.addOverlay(sehenswürdigkeiten, "Points of Interest");

//GPX Track laden
sehenswürdigkeiten.clearLayers();
const poi = new L.GPX("poi.gpx", {
    async: true,
    marker_options: {
        IconUrl: 'icons/pin-icon-start.png',
        IconUrl: 'icons/pin-icon-end.png',
        shadowUrl: 'icons/pin-shadow.png',
        iconSize: [32, 37] 
}}).on("loaded", function (e) {
    karte.fitBounds(e.target.getBounds())
    console.log ("name",e.target.get_name())
    e.target.bindPopup(`${e.target.get_name()}`)
}).addTo(sehenswürdigkeiten).bindPopup("");


 poi.on("addline", function(e) {
    if (e.element.querySelector("name")) {
        // wenn es ein <name> Element gibt ...
        let track_name = e.element.querySelector("name").innerHTML;
        e.line.bindPopup(`${track_name}`)
    }
});

//Koordinaten anzeigen
var hash = new L.Hash(karte);
var coords = new L.Control.Coordinates();
coords.addTo(karte);
karte.on('click', function(e) {
	coords.setCoordinates(e);
});


