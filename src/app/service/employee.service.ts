import {Injectable} from '@angular/core';
import { Http } from '@angular/http'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService{

 constructor(private _http : Http){}

    GetUsers():any{
           
   }


}