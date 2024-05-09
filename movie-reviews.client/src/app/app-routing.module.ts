import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTableUsersComponent } from './adminpanel/admin-table-users/admin-table-users.component';
import { AdminTableReviewsComponent } from './adminpanel/admin-table-reviews/admin-table-reviews.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  { path: 'users', component: AdminTableUsersComponent },
  { path: 'reviews', component: AdminTableReviewsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
