import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AppGlobals {
    public macID : Observable <number>;
    
    getData(): Observable<number> {
    return (this.macID);
  }
}