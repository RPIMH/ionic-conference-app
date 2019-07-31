import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['./map.scss']
})
export class MapPage implements AfterViewInit {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;


 orderTypes =[
   {
     "title": "Orders",
     "value": "orders",
     "default": true
   },
   {
    "title": "Backorders",
    "value": "backorders",
    "default": false
  },
  {
    "title": "Invoices",
    "value": "invoices",
    "default": false
  },
  {
    "title": "Credits",
    "value": "credits",
    "default": false
  },
  {
    "title": "Quotes",
    "value": "quotes",
    "default": false
  },
  {
    "title": "Part Store Orders",
    "value": "partStoreOrders",
    "default": false
  },

 ];


 orders = [
    {
      "OrderNumber": "1000117781",
      "SalesOrg": "RP",
      "Origin": "Other",
      "PONumber": "test",
      "Date": "7/2/2019",
      "Status": "Open",
      "OrderType": "Emergency",
      "Total": "$6.60"
    },
    {
      "OrderNumber": "1000117848",
      "SalesOrg": "MA",
      "Origin": "Other",
      "PONumber": "test",
      "Date": "7/24/2019",
      "Status": "Open",
      "OrderType": "Emergency",
      "Total": "$2.20"
    },
    {
    "OrderNumber": "1000117849",
    "SalesOrg": "RP",
    "Origin": "Other",
    "PONumber": "test",
    "Date": "7/24/2019",
    "Status": "Open",
    "OrderType": "Emergency",
    "Total": "$6.90"
  },
  {
    "OrderNumber": "1000117854",
    "SalesOrg": "RP",
    "Origin": "DealerNet",
    "PONumber": "test",
    "Date": "7/29/2019",
    "Status": "Open",
    "OrderType": "Emergency",
    "Total": "$6.60"
  }
 ];

  constructor(public confData: ConferenceData, public platform: Platform) {}

  async ngAfterViewInit() {
    const googleMaps = await getGoogleMaps(
      'AIzaSyB8pf6ZdFQj5qw7rc_HSGrhUwQKfIe9ICw'
    );
    this.confData.getMap().subscribe((mapData: any) => {
      const mapEle = this.mapElement.nativeElement;

      const map = new googleMaps.Map(mapEle, {
        center: mapData.find((d: any) => d.center),
        zoom: 16
      });

      mapData.forEach((markerData: any) => {
        const infoWindow = new googleMaps.InfoWindow({
          content: `<h5>${markerData.name}</h5>`
        });

        const marker = new googleMaps.Marker({
          position: markerData,
          map,
          title: markerData.name
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });

      googleMaps.event.addListenerOnce(map, 'idle', () => {
        mapEle.classList.add('show-map');
      });
    });
  }
}

function getGoogleMaps(apiKey: string): Promise<any> {
  const win = window as any;
  const googleModule = win.google;
  if (googleModule && googleModule.maps) {
    return Promise.resolve(googleModule.maps);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      const googleModule2 = win.google;
      if (googleModule2 && googleModule2.maps) {
        resolve(googleModule2.maps);
      } else {
        reject('google maps not available');
      }
    };
  });
}
