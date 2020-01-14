// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import {
//   CanDeactivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { first, map } from 'rxjs/operators';

// @Injectable()
// export class CanDeactivateUploadGuard
//   implements CanDeactivate<UploadDataComponent> {
//   dialogRef;
//   canDeactivate(
//     component: UploadDataComponent,
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean> | boolean {
//     if (component && component.uploadForm && component.uploadForm.isFormValid) {
//       // component.openNavigateWarningDialog();
//       const message = {
//         icon: 'EXCL',
//         subText:
//           'The file you have browsed has not been uploaded yet. Are you sure want to move to other page?',
//         primaryBtn: 'Yes',
//         secondaryBtn: 'No',
//       };
//       this.dialogRef = component.dialog.open(WipComponent, {
//         maxWidth: 400,
//         width: '400px',
//         data: message,
//         panelClass: 'cm-success-modal',
//       });

//       return this.dialogRef.afterClosed().pipe(
//         map(result => {
//           console.log('UPLOAD DEACTIVATE', result);
//           if (result === 'SECONDARY_ACTION' || result === undefined) {
//             return false;
//           } else {
//             return true;
//           }
//         }),
//         first()
//       );
//     } else {
//       return true;
//     }
//   }
// }
