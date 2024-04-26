import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { AdmintableuserComponent } from './adminpanel/admintableusers/admintableuser.component';
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
import { AdmintablereviewsComponent } from './adminpanel/admintablereviews/admintablereviews.component';
import { TabViewModule } from 'primeng/tabview';
import { AdminformreviewsComponent } from './adminpanel/adminformreviews/adminformreviews.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { RegisterComponent } from './authentication/register/register.component';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    AppComponent,
    AdmintableuserComponent,
    LoginComponent,
    TableComponent,
    AdmintablereviewsComponent,
    AdminformreviewsComponent,
    RegisterComponent,
  ],
  imports: [
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
  ],
  providers: [DialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
