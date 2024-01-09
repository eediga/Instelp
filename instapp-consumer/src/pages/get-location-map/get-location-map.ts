import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;
@IonicPage()
@Component({
  selector: 'page-get-location-map',
  templateUrl: 'get-location-map.html',
})
export class GetLocationMapPage {

  input:any;
  locationName = '';
  
  origin =
  {
    lat: 0,
    lng: 0
  }
  constructor(private view : ViewController,public navParams: NavParams,private geolocation : Geolocation) {
  }

async  ionViewDidLoad() {
      //new google.maps.places.Autocomplete(input, options);

      await this.geolocation.getCurrentPosition().then((resp) => {  
        this.origin.lat = resp.coords.latitude;
        this.origin.lng = resp.coords.longitude;

        let latLng = new google.maps.LatLng(resp.coords.latitude,
          resp.coords.longitude);


        // let mapOptions = {
        // center: latLng,
        // zoom: 15,
        // mapTypeId: google.maps.MapTypeId.ROADMAP
        // }

        
       }).catch((error) => {
         console.log('Error getting location', error);
       });


      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: this.origin.lat, lng: this.origin.lng},
        zoom: 13,
        mapTypeId: 'roadmap'
      });
      var markers = [];
      markers.push( new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: map.getCenter()
      }));
      
      var input = document.getElementById('pac-input');
      
        var searchBox = new google.maps.places.SearchBox(input);
        console.log(input);
       // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());

        });
        console.log(searchBox);
        
        
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
  
            markers.push(new google.maps.Marker({
              map: map,
              //icon: icon,
              title: place.name,
              position: place.geometry.location
            }));
            
            var latitude = place.geometry.location.lat();
            var longitude = place.geometry.location.lng();
            console.log(latitude,longitude);
            // console.log("klat"+place.name);
            document.getElementById('outputValue').innerHTML = place.name;
            document.getElementById('outputValuesrc').innerHTML = latitude;
            document.getElementById('outputValuedest').innerHTML = longitude;

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });

        
  }
  closeModel()
  {
    const data =
    {
      name : document.getElementById('outputValue').innerHTML, 
      lat : document.getElementById('outputValuesrc').innerHTML, 
      long : document.getElementById('outputValuedest').innerHTML
    };
    this.view.dismiss(data);

  }
}
