import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoibrokerComponent } from './envoibroker.component';

describe('EnvoibrokerComponent', () => {
  let component: EnvoibrokerComponent;
  let fixture: ComponentFixture<EnvoibrokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvoibrokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvoibrokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
