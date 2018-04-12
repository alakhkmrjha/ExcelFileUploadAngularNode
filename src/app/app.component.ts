import { Component } from '@angular/core';
import {UploadExcel} from './UploadExcel/uploadExcel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../css/bootstrap.css']
})
export class AppComponent {
  title = 'AngularJs 5';
  header = 'Upload Excel to MongoDb Using NodeJs';
}
