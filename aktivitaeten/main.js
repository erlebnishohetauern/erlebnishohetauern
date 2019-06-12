//Skript E-Bike Route
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

//Fullscreen
karte.addControl(new L.Control.Fullscreen());

karte.setView(
   [breite, laenge],
   10
);

//GPX GRuppe erstellen und Menü
let bike = L.featureGroup().addTo(karte);
layerControl.addOverlay(bike, "Ebike");



//Höhenprofil intitalisieren
//let controlElevation = null;

//GPX Track laden
console.log(Ebike.features.geometry);
//GPX Track laden
bike.clearLayers();
const biken = new L.GPX("ebike.gpx", {
    async: true,
    marker_options: {
        startIconUrl: 'icons/pin-icon-start.png',
        endIconUrl: 'icons/pin-icon-end.png',
        shadowUrl: 'icons/pin-shadow.png',
        iconSize: [32, 37]
    }}).on("loaded", function (e) {
karte.fitBounds(e.target.getBounds());
}).addTo(bike).bindPopup("Hallo");

for (let name of Ebike) {
   biken.on("loaded", function (e) {
    karte.bindPopup("Test")})
};
//Höhenprofil zeichnen das sich aktualisiert

bike.on("addline", function (evt) {
    //damit immer nur eine Elevation angezeigt wird/ bestehendes Profil löschen
    if (controlElevation) {
        controlElevation.clear();
        document.getElementById("elevation-div").innerHTML = "";
    }
    controlElevation = L.control.elevation({
        theme: "steelblue-theme",
        detachedView: true,
        elevationDiv: "#elevation-div"
    })
    controlElevation.addTo(karte);
    controlElevation.addData(evt.line);
})