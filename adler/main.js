// Skript für Adlerweg

const div = document.getElementById("map");
const breite = div.getAttribute("data-lat");
const laenge = div.getAttribute("data-lng");
const titel = div.getAttribute("data-title");
const breite2 = div.getAttribute("data-lat2");
const laenge2 = div.getAttribute("data-lng2");
const titel2 = div.getAttribute("data-title2");


//console.log("Breite=",breite,"Länge=",laenge,"Titel=",titel);

// Karte initialisieren
let karte = L.map("map");
//console.log(karte);

const kartenLayer = {
    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>`
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps2", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps2", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps2", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps2", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps2", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps2", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps2", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_terrain: L.tileLayer("http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_watercolor: L.tileLayer("http:////stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
    }),
};

//Auswahlmenü hinzufügen
L.control.layers({
    "Geoland basemap": kartenLayer.geolandbasemap,
    "Geoland basemap grau": kartenLayer.bmapgrau,
    "OpenStreetMap": kartenLayer.osm,
    "Geoland basemap overlay": kartenLayer.bmapoverlay,
    "Geoland basemap high DPI": kartenLayer.bmaphidpi,
    "Geoland basemap Orthofoto 30cm": kartenLayer.bmaporthofoto30cm,
    "Geoland basemap Gelände": kartenLayer.bmapgelaende,
    "Geoland basemap Oberfläche": kartenLayer.bmapoberflaeche,
    "Stamen Toner": kartenLayer.stamen_toner,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Stamen Watercolor": kartenLayer.stamen_watercolor
}).addTo(karte);

kartenLayer.osm.addTo(karte);
//kartenLayer.geolandbasemap.addTo(karte);

//Positionsmarker setzen
let pin1 = L.marker(
    [breite, laenge]
).addTo(karte);

//Popup zum Pin hängen
pin1.bindPopup(titel).openPopup();

//Positionsmarker 2 setzen
let pin2 = L.marker(
    [breite2, laenge2]
).addTo(karte);

//Popup zum zweiten Pin
pin2.bindPopup(titel2).openPopup();

let blickeGruppe = L.featureGroup().addTo(karte);

for (let blick of ADLERBLICKE) {
    console.log(blick);
    let blickpin = L.marker(
        [blick.lat, blick.lng]
    ).addTo(blickeGruppe);
    blickpin.bindPopup(
        `<h1>Standort ${blick.standort}</h1>
         <p>Höhe: ${blick.seehoehe} m</p>
         <em>Kunde: ${blick.kunde}</em>`
    );
}
//console.log(blickeGruppe.getBounds());
//Auf Ausschnitt zoomen
karte.fitBounds(blickeGruppe.getBounds());

//Fullscreen Befehl
karte.addControl(new L.Control.Fullscreen());

//Position Karte für Link
var hash = new L.Hash(karte);

//Mit Mausklick Koordinaten anzeigen lassen
var coords = new L.Control.Coordinates();
coords.addTo(karte);
karte.on('click', function (e) {
    coords.setCoordinates(e);
});

//gpx Track laden - kann nur bei firefox geladen werden
new L.GPX("AdlerwegEtappe03.gpx", {
    async: true,
    marker_options: {
        startIconUrl: 'images/pin-icon-start.png',
        endIconUrl: 'images/pin-icon-end.png',
        shadowUrl: 'images/pin-shadow.png'
    }
}).on('loaded', function (e) {
    karte.fitBounds(e.target.getBounds()); //Kartenausschnitt wird auf Track gesetzt
    const minSpan = document.getElementById('min');
    const maxSpan = document.getElementById('max');
    const diffSpan = document.getElementById('diff');
    minSpan.innerHTML = e.target.get_elevation_min();
    maxSpan.innerHTML = e.target.get_elevation_max();
    diffSpan.innerHTML = Math.round(e.target.get_elevation_gain());

}).on('addline', function (e) {
    console.log('linie geladen')
    //Höhenprofil aufrufen
    const controlElevation = L.control.elevation({
        //position: "bottomright",
        //collapsed: true,
        detachedView: true,
        elevationDiv: "#elevation-div",
    });
    controlElevation.addTo(karte);
    controlElevation.addData(e.line);
    const gpxLinie = e.line.getLatLngs();
    for (let i = 1; i < gpxLinie.length; i += 1) {
        //letzten und aktuellen Punkt definieren
        let p1 = gpxLinie[i - 1];
        let p2 = gpxLinie[i];

        //Distanz anzeigen lassen zwischen 2 Punkten
        let dist = karte.distance(
            [p1.lat, p1.lng],
            [p2.lat, p2.lng],
        );

        // Höhendifferenz zwischen zwei Punkten anzeigen
        let delta = (p2.meta.ele - p1.meta.ele);

        //Höhenunterschied berechnen
        let proz = (dist != 0 ? delta / dist * 100.0 : 0).toFixed(1);

        let farbe =
            proz >= 10 ? "#d73027" :
            proz >= 6 ? "#fc8d59" :
            proz >= 2 ? "#fee08b" :
            proz >= 0 ? "#ffffbf" :
            proz >= -6 ? "#d9ef8b" :
            proz >= -10 ? "#91cf60" :
            "#1a9850";

        L.polyline (
            [
                [p1.lat, p1.lng],
            [p2.lat, p2.lng], 
            ], {
                color : farbe,
            }
        ).addTo(karte);
    }
});