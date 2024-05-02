import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTableUserComponent } from './adminpanel/admin-tableusers/admin-table-user.component';
import { AdminTableReviewsComponent } from './adminpanel/admin-table-reviews/admin-table-reviews.component';

const routes: Routes = [
  { path: '', component: AdminTableUserComponent },
  {
    path: 'reviews',
    component: AdminTableReviewsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
