Markers = new Mongo.Collection('perros_loc');

if (Meteor.isClient) {
    Template.map.onCreated(function () {
        GoogleMaps.ready('exampleMap', function (map) {

            var markers = {};
            var d = new Date();
            Markers.find({
                createdAt: {
                    $gte: Date.now()
                }
            }).observe({
                added: function (document) {
					var time = Date.now();
					var contentString = '<div style="width:300px;">' + 
					'<div>Time-Mosquitto:' + document.timeM + '</div><br/>' + 
					'<div>Time-Kafka: ' + document.createdAt +'</div><br/>' + 
					'<div>Time-Meteor: ' + time + '</div><br/>' + 
					'<div>Kafka - Meteor: ' + (time - document.createdAt)/1000 + ' seg </div><br/>' + 
					'</div>';
					var infowindow = new google.maps.InfoWindow({
						content: contentString
					});
					//hello
                    var marker = new google.maps.Marker({
                        animation: google.maps.Animation.DROP,
                        position: new google.maps.LatLng(document.lat, document.log),
                        map: map.instance,						
						draggable: true,
                        id: document._id
                    });
					
					marker.addListener('click', function() {
						infowindow.open(map.instance, marker);
					});

                    GoogleMaps.maps.exampleMap.instance.setCenter(
                        new google.maps.LatLng(document.lat, document.log)
                    );
                    markers[document._id] = marker;
                }
            });
        });
    });

    Meteor.startup(function () {
        GoogleMaps.load({
            'key': 'AIzaSyDTMQmgYxiADuaJnfbEhVg33zDmsfsXPa4'
        });
    });

    Template.map.helpers({
        mapOptions: function () {
            if (GoogleMaps.loaded()) {
                return {
                    center: new google.maps.LatLng(4.645666000, -74.0612110),
                    zoom: 16
                };
            }
        }
    });
}
