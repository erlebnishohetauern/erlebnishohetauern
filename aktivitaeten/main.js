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

karte.setView(
    [breite, laenge],
    10
);

//Fullscreen
karte.addControl(new L.Control.Fullscreen());

//Mit Mausklick Koordinaten anzeigen lassen
var coords = new L.Control.Coordinates();
coords.addTo(karte);
karte.on('click', function (e) {
    coords.setCoordinates(e);
});

L.geoJson()
//Funktion hinzufügen, damit verschiedene Atrribute des Popup eingebunden werden
.bindPopup(function (displayFieldName) {
    //console.log("Layer:", layer);
    return `<h4>${displayFieldName.fieldAliases}</h4>
    Name: ${displayFieldName.fieldAliases.name_de} m <br>
    Temperatur: ${layer.feature.properties.LT} °C <br>
    Datum: ${date.toLocaleDateString("de-AT")}
    ${date.toLocaleTimeString("de-AT")} <br>
    Windgeschwindigkeit:${layer.feature.properties.WG ? layer.feature.properties.WG + ' km/h' : ' keine Daten'}
    <hr>
    <footer>Quelle: Land Tirol - <a href="https://data.tirol.gv.at">data.tirol.gv.at</a></footer>
    `;
}) //Windgeschwindigkeit mit if abfrage, wenn keine Daten vorhanden sind
.addTo(awsTirol);

