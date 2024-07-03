import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { AdminTableUsersComponent } from './adminpanel/users/admin-table-users/admin-table-users.component';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { LoginComponent } from './authentication/login/login.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TableComponent } from './table/table.component';
import { AdminTableReviewsComponent } from './adminpanel/reviews/admin-table-reviews/admin-table-reviews.component';
import { TabViewModule } from 'primeng/tabview';
import { AdminFormReviewsComponent } from './adminpanel/reviews/admin-form-reviews/admin-form-reviews.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { RegisterComponent } from './authentication/register/register.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { NavbarComponent } from './navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { AdminTableMoviesComponent } from './adminpanel/movies/admin-table-movies/admin-table-movies.component';
import { AdminFormMoviesComponent } from './adminpanel/movies/admin-form-movies/admin-form-movies.component';
import { CalendarModule } from 'primeng/calendar';
import { AdminMovieReviewsComponent } from './adminpanel/reviews/admin-movie-reviews/admin-movie-reviews.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RatingModule } from 'primeng/rating';
import { TooltipModule } from 'primeng/tooltip';
import { AdminUpdateUserComponent } from './adminpanel/users/admin-update-user/admin-update-user.component';
import { CheckboxModule } from 'primeng/checkbox';
import { AdminUpdateReviewsComponent } from './adminpanel/reviews/admin-update-reviews/admin-update-reviews.component';
import { AdminUpdateMoviesComponent } from './adminpanel/movies/admin-update-movies/admin-update-movies.component';
import { JwtInterceptor } from './interceptors/access-token-interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminTableUsersComponent,
    LoginComponent,
    TableComponent,
    AdminTableReviewsComponent,
    AdminFormReviewsComponent,
    RegisterComponent,
    NavbarComponent,
    AdminTableMoviesComponent,
    AdminFormMoviesComponent,
    AdminMovieReviewsComponent,
    AdminUpdateUserComponent,
    AdminUpdateReviewsComponent,
    AdminUpdateMoviesComponent,
    LayoutComponent,
  ],
  imports: [
    CheckboxModule,
    TooltipModule,
    RatingModule,
    SelectButtonModule,
    CalendarModule,
    MenubarModule,
    CardModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    ToastModule,
    InputGroupModule,
    InputGroupAddonModule,
    PasswordModule,
    TabViewModule,
    DynamicDialogModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule,
  ],
  providers: [
    DialogService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
