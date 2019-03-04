//leaflet quickstart

//sets up the map location on the first view
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

//allows us to access mapbox and use their map
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicGFsbTMiLCJhIjoiY2prc2U2bnBjMDd4ZTNrcGZiYjg1MWF6bCJ9.CEpnS6XAFCTIVgsFs02Epw'
}).addTo(mymap);

//id: 'mapbox://styles/palm3/cjs979cbe2f011fmkmb15r1it',
//accessToken: 'pk.eyJ1IjoicGFsbTMiLCJhIjoiY2prc2U2bnBjMDd4ZTNrcGZiYjg1MWF6bCJ9.CEpnS6XAFCTIVgsFs02Epw'

//creates a marker on a specific coordinate 
var marker = L.marker([51.5, -0.09]).addTo(mymap);

//creates a circle with colors and size on a specific coordinate
var circle = L.circle([51.508, -0.01], {
    color: 'purple',
    fillColor: '#f09',
    fillOpacity: 0.7,
    radius: 800
}).addTo(mymap);

//creates a polygon to appear over specific coordinates
var polygon = L.polygon([
    [51.509, -0.08],
    [51.501, -0.06],
    [52.51, -0.047]
]).addTo(mymap);

//when the user clicks on the circle, polygon, and marker, these lines of dialogue would appear
marker.bindPopup("<strong>Hello world!</strong><br />I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

//a popup would appear on a specific coordinate with a line of dialogue
var popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a lonely popup.")
    .openOn(mymap);

//a popup would appear on a specific coordinate with a line of dialogue
var popup = L.popup();

//when user clicks on the map, a line of dialogue would appear
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Congrats! You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

//the funciton will be executed when prompted
mymap.on('click', onMapClick);






//geoJSON tutorial



//creates a point feature that will appear on the Coors field, with the pop up dialogue line, within the coordinates of Denver
var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
};

//the function will be executed
L.geoJSON(geojsonFeature).addTo(mymap);

//two lines will appear at those coordinates
var myLines = [{
    "type": "LineString",
    "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
}, {
    "type": "LineString",
    "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
}];

//optional layer with the potential of adding more features 
var myLayer = L.geoJSON().addTo(mymap);
myLayer.addData(geojsonFeature);

//two lines will appear at those coordinates
var myLines = [{
    "type": "LineString",
    "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
}, {
    "type": "LineString",
    "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
}];

//the colors and size will be determined by the choices
var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};

//attaches the two functions of myLines with myStyle and be put on map
L.geoJSON(myLines, {
    style: myStyle
}).addTo(mymap);

//depending on the party property, certain polygon styles will be executed
var states = [{
    "type": "Feature",
    "properties": {"party": "Republican"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-104.05, 48.99],
            [-97.22,  48.98],
            [-96.58,  45.94],
            [-104.03, 45.94],
            [-104.05, 48.99]
        ]]
    }
}, {
    "type": "Feature",
    "properties": {"party": "Democrat"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-109.05, 41.00],
            [-102.06, 40.99],
            [-102.03, 36.99],
            [-109.04, 36.99],
            [-109.05, 41.00]
        ]]
    }
}];

//with the function of states, two parties will have those colors on the map
L.geoJSON(states, {
    style: function(feature) {
        switch (feature.properties.party) {
            case 'Republican': return {color: "#ff0000"};
            case 'Democrat':   return {color: "#0000ff"};
        }
    }
//appears on the map
}).addTo(mymap);

//style choices are being given to the var geojsonMarkerOptions
//you can modify the pointer marker to be  something different from the default style
var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var someGeojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "denver",
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.981369, 39.748483]
    }
};

//the function is being executed
L.geoJSON(someGeojsonFeature, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }

//added on the map	
}).addTo(mymap);

//if the feature exists and have a pop up assigned to it, then onEachFeature will bind the pop up content to the feature on the layer
function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
}

//creates a point feature that will appear on the Coors field, with the popup dialogue line, within the coordinates of Denver
var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
};

//the function has been executed, will be added to the map
L.geoJSON(geojsonFeature, {
    onEachFeature: onEachFeature
}).addTo(mymap);

//this function will filter locations out or retain them
//coors field is true, meaning it will be retained
//busch field is false, meaning it will be filtered out
var someFeatures = [{
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "show_on_map": true
    },
	//indicates the coordinate and the marker
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
}, {
    "type": "Feature",
    "properties": {
        "name": "Busch Field",
        "show_on_map": false
    },
	//indicates the coordinate and the marker
    "geometry": {
        "type": "Point",
        "coordinates": [-104.98404, 39.74621]
    }
}];

//the function will be executed
L.geoJSON(someFeatures, {
    filter: function(feature, layer) {
        return feature.properties.show_on_map;
    }

//will be added on the map
}).addTo(mymap);