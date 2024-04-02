import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmintableuserComponent } from './adminpanel/admintableusers/admintableuser.component';
import { AdmintablereviewsComponent } from './adminpanel/admintablereviews/admintablereviews.component';

const routes: Routes = [
  { path: '', component: AdmintableuserComponent },
  {
    path: 'reviews',
    component: AdmintablereviewsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
