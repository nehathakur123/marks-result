import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Score, Paper, Question } from './app.score.interface';
import { DailyTaskService } from './app.service';
// import 'rxjs/add/operator/map';
// import {DailyTaskService} from './app';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DailyTaskService]
})
export class AppComponent implements OnInit{
  title = 'Score Card!';
  dailytasklist = [];

  public myForm: FormGroup; // our model driven form
  public total: number;
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  public maxpaper: Paper;
  count: number  = 0;
  tncom: number = 0;

  constructor(private _dailytask: DailyTaskService, private _fb: FormBuilder){}

  ngOnInit(){
    this._dailytask.getDailyTask()
     .subscribe(resTask => this.dailytasklist = resTask);
    console.log(this.dailytasklist);

    this.maxpaper = { 

      "marks": [
        {"id": 1,"mark":20, "compulsory": true},
        {"id": 2,"mark":20, "compulsory": true},
        {"id": 3,"mark":20,"compulsory": false},
        {"id": 4,"mark":20,"compulsory": false},
        {"id": 5,"mark":20,"compulsory": false},
        {"id": 6,"mark":20,"compulsory": false}

      ]
    };

    this.myForm = this._fb.group({
      q1: [0, [Validators.required]],
      q2: [0,[]],
      q3: [0,[]],
      sum: [0,[]]
    });

    this.subcribeToFormChanges();

  }

  subcribeToFormChanges() {
    // initialize stream
    const myFormValueChanges$ = this.myForm.valueChanges;

    // subscribe to the stream 
    myFormValueChanges$.subscribe(x => 
      {
        this.events.push({ event: "STATUS CHANGED", object: x });
        console.log(x);
        this.total = this.calculateSum(x);
      });
  }

  calculateSum(model){
    return parseInt(model.q1) + parseInt(model.q2) + parseInt(model.q3);
    // this.count = 0;
    
    // for ( let i of this.maxpaper.marks) {
    //   if (i.compulsory){
    //     // this.count++;
    //     this.count =+ i.mark;
    //   }
    // }

    // this.tncom = 80-this.count;
    // // this.tncom = this.maxpaper.marks.length - this.count;
    
    // return this.count + this.tncom;
    
    
  }

  save(model: Score, isValid: boolean) {
    this.submitted = true; // set form submit to true

    // check if model is valid
    // if valid, call API to save customer
    console.log(model, isValid);
  }
}
