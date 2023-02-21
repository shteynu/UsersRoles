import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserDialogComponent} from './user-dialog.component';
import {modules} from '../../models/module-util';
import {UserFormComponent} from '../../user-form/user-form.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

describe('UserDialogComponent', () => {
  let component: UserDialogComponent;
  let fixture: ComponentFixture<UserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ...modules,
      ],
      declarations: [ UserDialogComponent, UserFormComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
