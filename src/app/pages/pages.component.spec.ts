import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesComponent } from './pages.component';
import {modules} from "../models/module-util";
import {NavBarComponent} from "../nav-bar/nav-bar.component";

describe('PagesComponent', () => {
  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ...modules
      ],
      declarations: [ PagesComponent, NavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
