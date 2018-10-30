import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Models that hold organization id, user role, name, email and password
   */
  organizationId: string;
  userRole: string;
  userName: string;
  userId: string;
  email: string;

  constructor(
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.userInfoMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
  }

  ngOnInit() {
  }


  /**
   * Checks if the form has been modified before discarding changes
   * @param form Form object reference
   */
  discardChanges(form) {
    if (form.dirty) {
      const discard = confirm('Discard changes?');
      if (discard) {
        this.bsModalRef.hide();
      } else {
        // Do nothing
      }
    } else {
      this.bsModalRef.hide();
    }
  }
  /**
   *  Checks the role of current user
   */
  checkUserRole(buttonRole) {
    if (buttonRole === this.userRole) {
      return true;
    }
    return false;
  }
  /**
   * Changes the new user role
   * @param newRole New user role
   */
  changeRole(newRole) {
    this.userRole = newRole;
  }

  /**
   * Request to save the user data modifications
   * @param f Form object reference
   */
  saveUserChanges(f) {
    if (this.organizationId !== null && this.userId !== null) {
      this.backend.saveClusterChanges(this.organizationId, this.userId, {
        newUserName: this.userName,
        newUserEmail: this.email,
        newUserRole: this.userRole
      })
        .subscribe(response => {
          this.notificationsService.add({
            message: 'The user ' + this.userName + ' has been edited'
          });
          this.bsModalRef.hide();
        });
    }
  }

}

