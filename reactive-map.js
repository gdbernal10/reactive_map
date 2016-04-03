Markers = new Mongo.Collection('markers');

if (Meteor.isClient) {
    Template.map.onCreated(function () {
        GoogleMaps.ready('exampleMap', function (map) {

            var markers = {};
            var d = new Date();
            Markers.find({
                createdAt: {
                    $gte: d.getTime()
                }
            }).observe({
                added: function (document) {
                    var marker = new google.maps.Marker({
                        animation: google.maps.Animation.DROP,
                        position: new google.maps.LatLng(document.lat, document.lng),
                        map: map.instance,
                        id: document._id
                    });

                    GoogleMaps.maps.exampleMap.instance.setCenter(
                        new google.maps.LatLng(document.lat, document.lng)
                    );
                    markers[document._id] = marker;
                }
            });
        });
    });

    Meteor.set

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
