import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import { AppComponent } from './app.component';
import { EnvoibrokerComponent } from './envoibroker/envoibroker.component';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    AppComponent,
    EnvoibrokerComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatInputModule,
      MatIconModule,
      BrowserAnimationsModule,
      MatCardModule,
      MatSlideToggleModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
