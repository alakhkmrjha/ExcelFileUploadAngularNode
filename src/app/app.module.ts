import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';

import {ReactiveFormsModule } from "@angular/forms";
//import {FileSelectDirective} from 'ng2-file-upload';

import {UploadExcel} from './UploadExcel/uploadExcel.component';
import {IUserData} from './UploadExcel/userData';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent, UploadExcel
  ],
  imports: [
    BrowserModule,
    HttpModule,ReactiveFormsModule 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
