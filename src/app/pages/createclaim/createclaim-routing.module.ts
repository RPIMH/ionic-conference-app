import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateClaimPage } from './createclaim';

const routes: Routes = [
  {
    path: '',
    component: CreateClaimPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateClaimPageRoutingModule { }
