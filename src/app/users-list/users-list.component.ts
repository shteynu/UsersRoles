import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DataExchangeServiceService} from '../services/data-exchange-service.service';
import {environment} from '../../environments/environment';
import {Profile} from '../models/auth-data';
import {MatDialog} from '@angular/material/dialog';
import {SnackMessageService} from '../services/snack-message.service';
import {UsersService} from '../services/users.service';
import {UserDialogComponent} from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {

  displayedColumns = ['date', 'fullName', 'role', 'userId', 'actions'];
  dataSource: MatTableDataSource<Profile>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private readonly userRoles = environment?.userRoles;

  constructor(private exchangeServiceService: DataExchangeServiceService,
              private dialog: MatDialog,
              private messageService: SnackMessageService,
              private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.usersService.getAllUsers().subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource<Profile>(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  visualizeUserRole(roleIndex: number | undefined): string {
    return this.userRoles[roleIndex ? roleIndex : 0];
  }
  // AVOID TO DELETE CURRENT USER
  isOwner(user: Profile): boolean {
    return this.exchangeServiceService.currentUser$.getValue()?.id === user?.id;
  }
  // FOR LOOP PERFORMANCE
  trackByFn(index: number, user: Profile): number {
    return user?.id;
  }

  async updateUser(user: Profile) {
      /*const { success, userData } = this.openUserModal(user);
      if (success) {
        const userIndex = this.userList.findIndex(
          (usr) => usr?.id === user?.id
        );
        if (userIndex >= 0) {
          this.userList[userIndex] = userData;
          this.messageService.show({
            message: `User (${userData?.fullName}) has been updated successfully`,
            duration: 4000,
          });
        }
      }
    } catch (error: any) {
      this.messageService.show({
        message: error?.message || 'An error occoured when updating  user',
      });
    }*/
  }

  public deleteUser(userData: Profile) {
    /*const { success } = this.usersService.deleteUser(userData?.id);
    if (success) {
      const userIndex = this.userList.findIndex(
        (usr) => usr.id === userData?.id
      );
      if (userIndex >= 0) {
        this.userList.splice(userIndex, 1);
        this.messageService.show({
          message: `User (${userData?.fullName}) has been removed successfully`,
        });
      }
    }*/
  }

  private openUserModal(user?: Profile) {
    const userDialog = this.dialog.open(UserDialogComponent, {
      width: '450px',
      maxWidth: '100%',
      data: user,
      disableClose: true,
    });
    return userDialog.afterClosed().toPromise();
  }

  onDelete(row) {
    this.usersService.deleteUser(row.id).subscribe(
      {
      next: (res) => {
        this.messageService.show({
          message: `User (${row?.fullName}) has been removed successfully`,
        });
        this.getUsers();
      },
      error: (error) => {
        this.messageService.show({
          message: error?.message || 'Failure during update',
        });
      }
    });
  }

  onUpdate(row) {

  }
}

