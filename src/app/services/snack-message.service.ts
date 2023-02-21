import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationData} from '../models/notification-data';

@Injectable({
  providedIn: 'root'
})
export class SnackMessageService {

  constructor(private snackbar: MatSnackBar) { }
  public show(snackData: NotificationData) {
    this.snackbar.open(snackData?.message, snackData?.action || 'OK', {
      duration: snackData?.duration || 4000,
    });
  }
}
