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

karte.setView([47.25, 11.416667], 9);

// die Implementierung der Karte startet hier


//GPX GRuppe erstellen und Menü
let lehrweg = L.featureGroup().addTo(karte);
layerControl.addOverlay(lehrweg, "Naturlehrpfad");

//Höhenprofil intitalisieren
//let controlElevation = null;

//GPX Track laden
console.log(lehrpfad.features.geometry);

const lehrpfade = new L.GPX("lehrpfad.gpx", {
    async: true,
    marker_options: {
        startIconUrl: 'icons/pin-icon-start.png',
        endIconUrl: 'icons/pin-icon-end.png',
        shadowUrl: 'icons/pin-shadow.png',
        iconSize: [32, 37]
    }
}).addTo(lehrweg);

lehrweg.on("loaded", function () {
karte.fitBounds(lehrweg.getBounds());
});

for (let lehrweg of lehrpfad) {
    let lehrpin = L.marker(
        [lehrweg.lat, lehrweg.lng]
    ).addTo(lehrweg);
    lehrpin.bindPopup(
        `<h1>Standort ${blick.standort}</h1>
         <p>Höhe: ${blick.seehoehe} m</p>
         <em>Kunde: ${blick.kunde}</em>`
    );
}
//Höhenprofil zeichnen das sich aktualisiert

lehrweg.on("addline", function (evt) {
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

// etappeErzeugen(0);

// pulldown.onchange = function (evt) {
//     let opts = evt.target.options;
//     console.log(opts[opts.selectedIndex].value);
//     console.log(opts[opts.selectedIndex].text);
//     etappeErzeugen(opts[opts.selectedIndex].value);
// }
// //Route berechnen in Karte (auf Karte klick für Start und Ende und dann Route anzeigen lassen)
// const routingMachine = L.Routing.control({}).addTo(karte);
// let start, end;
// karte.on("click", function (ev) {

//     console.log("Clicked: ", ev.latlng);
//     if (!start) {
//         start = ev.latlng;
//         alert("Start gesetzt, bitte 2. Punkt für Ende setzen.");
//     } else {
//         end = ev.latlng;
//         routingMachine.setWaypoints([start, end]);
//         routingMachine.route();
//         start = null; //Anfangspunkt (erster Click) wird wieder auf Null gesetzt
//     }

//     console.log("Start: ", start, "End: ", end);
// })