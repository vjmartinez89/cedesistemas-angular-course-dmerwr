import './polyfills';

import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {TripsComponent} from './app/trips.component';
import { DialogComponent } from './app/dialog/dialog.component';
import { DateFormatterPipe } from './app/dateformatter.pipe';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  entryComponents: [TripsComponent,DialogComponent],
  declarations: [TripsComponent,DialogComponent,DateFormatterPipe],
  bootstrap: [TripsComponent],
  exports: [DateFormatterPipe],
  providers: [DateFormatterPipe]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);

