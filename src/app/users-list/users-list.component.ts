import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DataExchangeServiceService} from '../services/data-exchange-service.service';
import {environment} from '../../environments/environment';
import {Profile} from '../models/auth-data';
import {MatDialog} from '@angular/material/dialog';
import {SnackMessageService} from '../services/snack-message.service';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, AfterViewInit{

  displayedColumns = ['created at', 'name', 'role'];
  dataSource: MatTableDataSource<Profile>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  update: any;
  delete: any;

  private readonly userRoles = environment?.userRoles;
  @Input() userList!: Profile[];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private exchangeServiceService: DataExchangeServiceService,
              private dialog: MatDialog,
              private messageService: SnackMessageService,
              private usersService: UsersService) {}

  ngOnInit(): void {}


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
   /* const userDialog = this.dialog.open(UserModal, {
      width: '450px',
      maxWidth: '100%',
      data: user,
      disableClose: true,
    });
    return await userDialog.afterClosed().toPromise();*/
  }
}

