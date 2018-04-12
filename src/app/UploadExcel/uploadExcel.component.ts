import {Component,ElementRef, ViewChild} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IUserData} from './userData';

//import {FileUploader, FileUploaderOptions} from 'ng2-file-upload';

@Component({
           selector:'upload-excel',
           templateUrl:'uploadExcel.component.html',
           styleUrls: ['../../css/bootstrap.css']
          })
export class UploadExcel{
    apiUrl:string = 'http://localhost:3000';
    
 form: FormGroup;
  isFileAdded: boolean = false;
  loading:boolean = false;
  public res1: string;
public maleReport=[];
public femaleReport=[];

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private _http : Http, private fb: FormBuilder) {
    this.createForm();
  }
result={'data':[]};
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      fileUploader: null
    });
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('fileUploader').setValue(file);
      this.isFileAdded = true;
    console.log(file);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('name', this.form.get('name').value);
    input.append('fileUploader', this.form.get('fileUploader').value);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;
    this.isFileAdded = true;

     this._http.post(this.apiUrl + "/api/Upload" , formModel)
                  .map(this.extractData)
                  .subscribe(resp => this.result = resp);
    console.log(this.result);
    this.bindReport();
    setTimeout(() => {
      // FormData cannot be inspected (see "Key difference"), hence no need to log it here
      alert('done!');
       this.loading = true;
    }, 1000);
  }

private bindReport(){
  var result = this.result.data;
  var tempReport;
   var found=false;
   var age=0;
for(let index=0;index<result.length;index++)
{
  found=false;
  age=this.getAge(result[index].DOB);
  if(result[index].gender == 'male')
  {
    for(let maleIndex=0;maleIndex<this.maleReport.length;maleIndex++)
    {
        if(this.maleReport[maleIndex].Nationality == result[index].Nationality)
        {
          found=true;
          if(age >= 0 && age <= 30)
           this.maleReport[maleIndex].Age0_30 += 1;
          else if(age > 30 && age <= 50)
            this.maleReport[maleIndex].Age30_50 += 1;
          else
            this.maleReport[maleIndex].Age50_avove += 1;
        }
    }
    if(found==false){
     tempReport = {'Nationality':result[index].Nationality, 'Age0_30':0,'Age30_50':0,'Age50_avove':0};
          if(age >= 0 && age <= 30)
           tempReport.Age0_30 += 1;
          else if(age > 30 && age <= 50)
            tempReport.Age30_50 += 1;
          else
            tempReport.Age50_avove += 1;
            this.maleReport.push(tempReport);
    }
  }
  else{
for(let femaleIndex=0;femaleIndex<this.femaleReport.length;femaleIndex++)
    {
        if(this.femaleReport[femaleIndex].Nationality == result[index].Nationality)
        {
          found=true;
          if(age >= 0 && age <= 30)
           this.femaleReport[femaleIndex].Age0_30 += 1;
          else if(age > 30 && age <= 50)
            this.femaleReport[femaleIndex].Age30_50 += 1;
          else
            this.femaleReport[femaleIndex].Age50_avove += 1;
        }
    }
    if(found==false){
     tempReport = {'Nationality':result[index].Nationality, 'Age0_30':0,'Age30_50':0,'Age50_avove':0};
          if(age >= 0 && age <= 30)
           tempReport.Age0_30 += 1;
          else if(age > 30 && age <= 50)
            tempReport.Age30_50 += 1;
          else
            tempReport.Age50_avove += 1;
            this.femaleReport.push(tempReport);
    }
  }
  
}
}

private getAge(dob):number{
  var currDate = new Date();
  var _dob = new Date(dob);
  var timeDiff = Math.abs(currDate.getTime() - _dob.getTime());
var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
var years = Math.round(diffDays/360);
  return years;
}

  clearFile() {
    this.form.get('fileUploader').setValue(null);
    this.fileInput.nativeElement.value = '';
     this.isFileAdded = false;
  }

  private extractData(res: Response) {
	let body = res.json();
        return body || {};
    }
}