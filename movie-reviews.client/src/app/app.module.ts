import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { UserstableComponent } from './adminpanel/userstable/userstable.component';
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
import { TablereviewsComponent } from './reviews/tablereviews/tablereviews.component';
import { TabViewModule } from 'primeng/tabview';
@NgModule({
  declarations: [
    AppComponent,
    UserstableComponent,
    LoginComponent,
    TableComponent,
    TablereviewsComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
