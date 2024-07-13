import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTableUsersComponent } from './adminpanel/users/admin-table-users/admin-table-users.component';
import { AdminTableReviewsComponent } from './adminpanel/reviews/admin-table-reviews/admin-table-reviews.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminTableMoviesComponent } from './adminpanel/movies/admin-table-movies/admin-table-movies.component';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './guards/auth.guard';
import { SpectatorComponent } from './SpectatorView/spectator/spectator.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'users',
    component: AdminTableUsersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'reviews',
    component: AdminTableReviewsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'movies',
    component: AdminTableMoviesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'Spectator',
    component: SpectatorComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
