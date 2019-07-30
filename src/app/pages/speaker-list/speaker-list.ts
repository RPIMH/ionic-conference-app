import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';

import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html',
  styleUrls: ['./speaker-list.scss'],
})
export class SpeakerListPage {
  speakers: any[] = [];



  popularCategories = [
    ///----------------------
    {
      "title": "Reman",
      "image": "/assets/img/category_reman.jpg",
      "subLinks": [
        {
          "title": "Control Cards"
        },
        {
          "title": "Engines"
        },
        {
          "title": "Hydraulic Control Valves"
        },
        {
          "title": "Starters"
        },
        {
          "title": "Transmissions"
        },
        {
          "title": "View More"
        }
      ]
    },
    ///----------------------
    {
      "title": "Accessories",
      "image": "/assets/img/category_accessories.jpg",
      "subLinks": [
        {
          "title": "Alarms"
        },
        {
          "title": "Accessory Fans"
        },
        {
          "title": "Fire Extinguishers"
        },
        {
          "title": "Strobes"
        },
        {
          "title": "Work Lights"
        },
        {
          "title": "View More"
        }
      ]
    },
    ///----------------------
    {
      "title": "Front End",
      "image": "/assets/img/category_front_end.jpg",
      "subLinks": [
        {
          "title": "Hook Fork Search"
        },
        {
          "title": "Fork Accessories"
        },
        {
          "title": "Leaf Chain"
        },
        {
          "title": "Roller Chain"
        },
        {
          "title": "Chain Connecting Links"
        },
        {
          "title": "View More"
        }
      ]
    },
    ///----------------------
    {
      "title": "Shop Supplies",
      "image": "/assets/img/category_shop_supplies.jpg",
      "subLinks": [
        {
          "title": "Brake Chemicals"
        },
        {
          "title": "General Purpose Cleaners"
        },
        {
          "title": "Lubricants"
        },
        {
          "title": "Storage Equipments"
        },
        {
          "title": "WypAll Wipes"
        },
        {
          "title": "View More"
        }
      ]
    },
    ///----------------------
    {
      "title": "Safety",
      "image": "/assets/img/category_safety.jpg",
      "subLinks": [
        {
          "title": "Body Protection"
        },
        {
          "title": "Fall Protection"
        },
        {
          "title": "Work Gloves"
        },
        {
          "title": "Hard Hats"
        },
        {
          "title": "Safety Glasses"
        },
        {
          "title": "View More"
        }
      ]
    },
    {
      "title": "Tires",
      "image": "/assets/img/category_tires.jpg",
      "subLinks": [
        {
          "title": "Tire and Load Wheel Search"
        },
        {
          "title": "Tire Chains"
        },
        {
          "title": "STR Casters"
        },
        {
          "title": "STR Caster Breakdown"
        },
        {
          "title": "HALO/SIT Removal Rings"
        },
        {
          "title": "View More"
        }
      ]
    },
  ];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public inAppBrowser: InAppBrowser,
    public router: Router
  ) {}

  ionViewDidEnter() {
    this.confData.getSpeakers().subscribe((speakers: any[]) => {
      this.speakers = speakers;
    });
  }

  goToSpeakerTwitter(speaker: any) {
    this.inAppBrowser.create(
      `https://twitter.com/${speaker.twitter}`,
      '_blank'
    );
  }

  async openSpeakerShare(speaker: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log(
              'Copy link clicked on https://twitter.com/' + speaker.twitter
            );
            if (
              (window as any)['cordova'] &&
              (window as any)['cordova'].plugins.clipboard
            ) {
              (window as any)['cordova'].plugins.clipboard.copy(
                'https://twitter.com/' + speaker.twitter
              );
            }
          }
        },
        {
          text: 'Share via ...'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async openContact(speaker: any) {
    const mode = 'ios'; // this.config.get('mode');

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Contact ' + speaker.name,
      buttons: [
        {
          text: `Email ( ${speaker.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + speaker.email);
          }
        },
        {
          text: `Call ( ${speaker.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + speaker.phone);
          }
        }
      ]
    });

    await actionSheet.present();
  }
}
