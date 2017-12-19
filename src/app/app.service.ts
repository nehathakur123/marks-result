import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()

export class DailyTaskService{
    private _url:string = "http://localhost:8000/dailytask/?format=json";
    constructor(private _http:Http){}
    getDailyTask(){
       return  this._http.get(this._url)
        .map((response:Response) => response.json());
   }
}