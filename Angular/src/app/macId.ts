import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
    macID: number = 0;
    
    setMacId(id: number){
        this.macID=id;
    }
}
