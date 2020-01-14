// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import {
//   CanDeactivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { ValidateDataComponent } from 'src/app/modules/validate-data/validate-data/validate-data.component';

// @Injectable()
// export class CanDeactivateValidateGuard
//   implements CanDeactivate<ValidateDataComponent> {
//   canDeactivate(
//     component: ValidateDataComponent,
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean> | boolean {
//     // you can just return true or false synchronously
//     if (component.isRecordModified()) {
//       component.openSaveInfoDialog('NAVIGAtING');
//       return false;
//     } else {
//       return true;
//     }
//   }
// }
