import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
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

  displayedColumns = ['date', 'fullName', 'role', 'id', 'actions'];
  dataSource: MatTableDataSource<Profile>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  data: Profile[];

  private readonly userRoles = environment?.userRoles;

  constructor(private exchangeService: DataExchangeServiceService,
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
      this.data = res.data;
      this.dataSource = new MatTableDataSource<Profile>(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public updateUser(user: Profile) {
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

  private openDialog(user?: Profile) {
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

  updateDisabled(row) {
    const currentUser = this.exchangeService.currentUser$.getValue();
    if (currentUser.role === 'admin') { return false; }
    else { return currentUser.id !== row?.id; }

  }

  onDeleteDisabled(row) {
    const currentUser = this.exchangeService.currentUser$.getValue();
    if (currentUser.role === 'user') { return true; }
    else { return currentUser.id === row?.id; }
  }
}

