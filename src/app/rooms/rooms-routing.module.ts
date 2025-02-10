import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { RoomsComponent } from './rooms.component';

const routes: Routes = [
  // children property dipakai untuk mengakses detail dari rooms (nested route & children route)
  { path: 'rooms', 
    component: RoomsComponent, 
    children: [
      { path: ':id', component: RoomsBookingComponent},
    ]
  },
  { path: 'rooms/add', component: RoomsAddComponent},
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
