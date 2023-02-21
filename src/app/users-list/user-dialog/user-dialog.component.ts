import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Profile} from '../../models/auth-data';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDialogComponent implements OnInit {
  constructor(
    private userListService: UsersService,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Profile
  ) {}

  public save(formData: any) {
    /*this.userListService.updateUser({
        ...this.data,
        fullName: formData?.fullName,
        role: formData?.role,
      })

    if (success) {
      this.dialogRef.close({ success: true, userData: user });
    }*/
  }

  ngOnInit(): void {}
}
