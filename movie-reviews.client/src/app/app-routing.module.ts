import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminuserstableComponent } from './adminpanel/userstable/adminuserstable.component';
import { AdmintablereviewsComponent } from './adminpanel/admintablereviews/admintablereviews.component';

const routes: Routes = [
  { path: '', component: AdminuserstableComponent },
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
