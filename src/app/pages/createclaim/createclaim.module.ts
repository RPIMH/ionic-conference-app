import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CreateClaimPage } from './createclaim';
import { CreateClaimPageRoutingModule } from './createclaim-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CreateClaimPageRoutingModule
  ],
  declarations: [
    CreateClaimPage,
  ]
})
export class CreateClaimModule { }
