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

@NgModule({
  declarations: [AppComponent, UserstableComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    ToastModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
