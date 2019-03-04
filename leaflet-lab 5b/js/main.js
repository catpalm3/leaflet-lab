//Example 2.1 line 1...function to convert markers to circle markers
function pointToLayer(feature, latlng, attributes){
    //Step 4: Assign the current attribute based on the first index of the attributes array
    var attribute = attributes[10];
    //check
    console.log(attribute);
};

//function to instantiate the Leaflet map
function createMap(){
    //create the map
    var map = L.map('mapid', {
        center: [38, -90],
        zoom: 3.5
    });

    //add OSM base tilelayer
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

    //call getData function
    getData(map);
};

//function to convert markers to circle markers
function pointToLayer(feature, latlng){
    //Determine which attribute to visualize with proportional symbols
    var attribute = "Dec15";
};


//calculate the radius of each proportional symbol
function calcPropRadius(attValue) {
    //scale factor to adjust symbol size evenly
    var scaleFactor = 10;
    //area based on attribute value and scale factor
    var area = attValue * scaleFactor;
    //radius calculated based on area
    var radius = Math.sqrt(area/Math.PI);

    return radius;
};

//Example 2.1 line 34...Add circle markers for point features to the map
function createPropSymbols(data, map, attributes){
    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
        pointToLayer: function(feature, latlng){
            return pointToLayer(feature, latlng, attributes);
        }
    }).addTo(map);
};

//Step 1: Create new sequence controls
function createSequenceControls(map){
    //create range input element (slider)
    $('#panel').append('<input class="range-slider" type="range">');
	
	 //set slider attributes
  $('.range-slider').attr({
      max: 10,
      min: 0,
      value: 0,
      step: 1
	  
  });
  
    //$('#panel').append('<button class="skip" id="reverse">Reverse</button>');
    //$('#panel').append('<button class="skip" id="forward">Skip</button>');
	
	//Below Example 3.5...replace button content with images
    //$('#reverse').html('<img src="img/reverse.png">');
    //$('#forward').html('<img src="img/forward.png">');
	
	//Below Example 3.6 in createSequenceControls()
    //Step 5: click listener for buttons
  //click listener for buttons
  $(".skip").click(function(){
    //get the old index value
    var index = $(".range-slider").val();
	
    //increment or decrement based on the button clicked
    if ($(this).attr("id") == "forward"){
      index++;
	  
      //if past the last attribute, wrap around to the first attribute again
      index = index > 10 ? 0 : index;
    } else if ($(this).attr("id") == "reverse"){
      index--;
	  
      //if past the first attribute, wrap around to the last attribute
      index = index < 0 ? 10 : index;
      updatePropSymbols(map, attributes[index]);
    };
	
    //update slider
    $(".range-slider").val(index);
    updatePropSymbols(map, attributes[index]);
  });
  
  //input listener for the slider
  $(".range-slider").on("input", function(){
    //get new index value
    var index = $(this).val();
  });
};

//Step 10: Resize proportional symbols according to new attribute values
function updatePropSymbols(map, attribute){
    map.eachLayer(function(layer){
        if (layer.feature && layer.feature.properties[attribute]){
            //access feature properties
            var props = layer.feature.properties;

            //update each feature's radius based on new attribute values
            var radius = calcPropRadius(props[attribute]);
            layer.setRadius(radius);

            //add city to popup content string
            var popupContent = "<p><b>City:</b> " + props.City + "</p>";

            //add formatted attribute to panel content string
            var year = attribute.split("_")[1];
            popupContent += "<p><b>Population in " + year + ":</b> " + props[attribute] + " million</p>";

            //replace the layer popup
            layer.bindPopup(popupContent, {
                offset: new L.Point(0,-radius)
            });
        };
        });
    };

//Above Example 3.8...Step 3: build an attributes array from the data
function processData(data){
    //empty array to hold attributes
    var attributes = [];

    //properties of the first feature in the dataset
    var properties = data.features[0].properties;

    //push each attribute name into attributes array
    for (var attribute in properties){
        //only take attributes with population values
        if (attribute.indexOf("15") > -1){
            attributes.push(attribute);
        };
    };

    //check result
    console.log(attributes);

    return attributes;
};


//function to retrieve the data and place it on the map
function getData(map){
    $.ajax("data/bike.geojson", {
        dataType: "json",
        success: function(response){
			//create an attributes array
            var attributes = processData(response);
			
			createPropSymbols(response, map);
            createSequenceControls(map);
			
            //create marker options
            var geojsonMarkerOptions = {
                radius: 8,
                fillColor: "#ff0000",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };
			
			
           //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(response, {
                pointToLayer: function (feature, latlng){
					// value for the attribute
					var attValue = Number(feature.properties.Dec15);
                    
					//Give each feature's circle marker a radius based on its attribute value
					geojsonMarkerOptions.radius = calcPropRadius(attValue);

					//create circle marker layer
					var layer = L.circleMarker(latlng, geojsonMarkerOptions);

					//build popup content string
					var popupContent = "<p><b>City:</b> " + feature.properties.City + "</p><p><b>Dec15:</b> " + feature.properties.Dec15 + " reported incident(s) </p>";

					//add formatted attribute to popup content string
					//var year = attribute.split("_")[1];
					//popupContent += "<p><b>Dec in " + year + ":</b> " + feature.properties.Dec15 + "</p>";
									
					//bind the popup to the circle marker
					layer.bindPopup(popupContent);

					//return the circle marker to the L.geoJson pointToLayer option
					return layer;
					
					//examine the attribute value to check that it is correct
					//console.log(feature.properties, popupContent);

					//makes circle markers on the map
					return L.circleMarker(latlng, geojsonMarkerOptions);
					
					
                }
            }).addTo(map);
        }
    });
};




$(document).ready(createMap);