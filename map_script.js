
const map_backgroundlayer_url = "/webmaps/basemap.php/{z}/{x}/{y}.png";
const map_overlaylayer_url = '/kartendaten/puema24/{z}/{x}/{y}.png';

var southWest = L.latLng(50.7395, 7.1594),
    northEast = L.latLng(50.7484, 7.1481),
    bounds = L.latLngBounds(southWest, northEast);

var map = L.map('map', {
    minZoom: 17,
    maxZoom: 20
}).setView([50.7443, 7.155], 17);
L.tileLayer(map_backgroundlayer_url, {
    maxZoom: 19,
    attribution: 'BaseMap'
}).addTo(map);
L.tileLayer(map_overlaylayer_url, {
    maxZoom: 20
}).addTo(map);
var lc = L.control
    .locate({
        position: "bottomright",
        strings: {
            title: "Show me where I am"
        }
    })
    .addTo(map);


map.setMaxBounds(bounds);
L.control.search({
    url: 'search_edp.php?q={s}',
    textPlaceholder: 'Objekt...',
    position: 'topright',
    hideMarkerOnCollapse: true,
    marker: {
        circle: {
            radius: 20,
            color: '#0a0',
            opacity: 1
        }
    }
}).addTo(map);