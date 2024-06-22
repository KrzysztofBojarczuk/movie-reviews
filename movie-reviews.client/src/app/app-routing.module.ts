import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTableUsersComponent } from './adminpanel/users/admin-table-users/admin-table-users.component';
import { AdminTableReviewsComponent } from './adminpanel/reviews/admin-table-reviews/admin-table-reviews.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminTableMoviesComponent } from './adminpanel/movies/admin-table-movies/admin-table-movies.component';
import { AuthGuard } from './AuthGuard/AuthGuard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'users', component: AdminTableUsersComponent },
      { path: 'reviews', component: AdminTableReviewsComponent },
      { path: 'movies', component: AdminTableMoviesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
