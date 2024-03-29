import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserstableComponent } from './adminpanel/userstable/userstable.component';
import { TablereviewsComponent } from './reviews/tablereviews/tablereviews.component';

const routes: Routes = [
  { path: '', component: UserstableComponent },
  {
    path: 'reviews',
    component: TablereviewsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
