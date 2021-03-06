import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TutoComponent }  from './tuto/tuto.component';
import { EditorComponent }   from './editor/editor.component';
import { HomeComponent }      from './home/home.component';
import { Tuto1Component }  from './tuto1/tuto1.component';
import { Tuto2Component } from './tuto2/tuto2.component';
import { Tuto3Component } from './tuto3/tuto3.component';
import { ConnectComponent } from './connect/connect.component';
import { AproposComponent } from './apropos/apropos.component';
import { ModalBasicComponent } from './modal-basic/modal-basic.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'editor', component: EditorComponent },
  { path: 'home', component: HomeComponent },
  { path: 'a-propos', component: AproposComponent },
  { path: 'tuto1', component: Tuto1Component },
  { path: 'tuto2', component: Tuto2Component },
  { path: 'tuto3', component: Tuto3Component },
  { path: 'tuto', component: TutoComponent },
  { path: 'connect', component: ConnectComponent },
  {path: `modal`, component: ModalBasicComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
