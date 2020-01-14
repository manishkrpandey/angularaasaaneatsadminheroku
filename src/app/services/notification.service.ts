import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {
  constructor(public snackBar: MatSnackBar, private zone: NgZone) {}

  showSuccess(message: string): void {
    this.zone.run(() => {
      this.snackBar.open(message, 'X', {
        panelClass: ['success'],
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
      });
    });
  }

  showError(message: string): void {
    this.zone.run(() => {
      this.snackBar.open(message, 'X', {
        panelClass: ['error'],
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
      });
    });
  }
}
