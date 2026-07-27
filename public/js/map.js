console.log("Coordinates:", coordinates);
console.log("Latitude:", coordinates[1]);
console.log("Longitude:", coordinates[0]);

const map = L.map("map").setView(
    [coordinates[1], coordinates[0]], // latitude, longitude
    13
);

L.tileLayer(
    `https://api.maptiler.com/maps/base-v4/{z}/{x}/{y}.png?key=${mapToken}`,
    {
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 2,
    }
).addTo(map);

L.marker([coordinates[1], coordinates[0]])
    .addTo(map)
    .bindPopup(`<h5>${listingLocation}</h5><p>Exact Location provided after booking</p>`)
    .openPopup();
