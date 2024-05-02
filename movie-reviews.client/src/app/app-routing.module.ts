import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTableUsersComponent } from './adminpanel/admin-table-users/admin-table-users.component';
import { AdminTableReviewsComponent } from './adminpanel/admin-table-reviews/admin-table-reviews.component';

const routes: Routes = [
  { path: '', component: AdminTableUsersComponent },
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
