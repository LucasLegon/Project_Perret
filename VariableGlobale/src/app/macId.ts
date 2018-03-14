import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppGlobals {
    macID: Observable<number>;

    constructor() {
      this.macID = of(0);
    }
}
