import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EditorComponent } from './editor/editor.component';
import { AppRoutingModule } from './/app-routing.module';
import { Tuto1Component } from './tuto1/tuto1.component';
import { Tuto2Component } from './tuto2/tuto2.component';
import { Tuto3Component } from './tuto3/tuto3.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Tuto1Component,
    EditorComponent,
    Tuto2Component,
    Tuto3Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
      BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }