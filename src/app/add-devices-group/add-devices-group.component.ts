import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { FormGroup } from '@angular/forms';
import { DeviceGroupCreatedComponent } from '../device-group-created/device-group-created.component';

@Component({
  selector: 'app-add-devices-group',
  templateUrl: './add-devices-group.component.html',
  styleUrls: ['./add-devices-group.component.scss']
})
export class AddDevicesGroupComponent implements OnInit {
  checkBox = true;
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Models that hold organization id, user role, name and email
   */
  organizationId: string;
  userRole: string;
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;

  errorMessages: string[];


  /**
   * Models that removes the possibility for the user to close the modal by clicking outside the content card
   */
  config = {
    backdrop: false,
    ignoreBackdropClick: true
  };

  /**
   * Device grup modal window reference
   */
  bsDeviceGroupModalRef: BsModalRef;

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
  ) {
    this.userRole = null;
    const mock = localStorage.getItem(LocalStorageKeys.addUserMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
    this.errorMessages = [];

  }

  ngOnInit() {
  }

  /**
   * Requests to add a new user
   * @param form Form with the user input data
   */
  addUser(form) {
    if (this.errorMessages.length === 0) {
      const user = {
        name: form.value.name,
        email: form.value.email,
        password: form.value.password,
        role_name: this.userRole
      };
      this.backend.addUser(this.organizationId, user)
        .subscribe(response => {
          this.notificationsService.add({
            message: 'The user ' + user.email + ' has been created successfully'
          });
          this.bsModalRef.hide();
        }, error => {
          if (error.status === 409) {
            this.notificationsService.add({
              message: 'ERROR: ' + error.error.message + ' already exists',
              timeout: 10000
            });
          } else {
              this.notificationsService.add({
                message: 'ERROR: ' + error.error.message,
                timeout: 10000
              });
            }
        });
    }
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
   * Changes the new user role
   * @param newRole New user role
   */
  changeRole(newRole) {
    this.userRole = newRole;
  }

  /**
   * Validates user data
   * @param form Form with user data
   */
  checkFormFields(form: FormGroup) {
    this.errorMessages = [];
    if (form.controls.email.invalid) {
      if (form.controls.email.errors.required) {
        this.errorMessages.push('Email is required');
      }
      if (form.controls.email.errors.pattern) {
        this.errorMessages.push('Email must be a valid email address');
      }
    }
    if (form.controls.password.invalid) {
      if (form.controls.password.errors.required) {
        this.errorMessages.push('Password is required');
      }
      if (form.controls.password.errors.minlength) {
        this.errorMessages.push('Password must have more than 6 characters');
      }
    }
    if (form.controls.password.value !== form.controls.passwordConfirm.value) {
      this.errorMessages.push('Password and confirm password are not the same one');
    }
    if (!this.userRole) {
      this.errorMessages.push('User role selection is required');
    }

    if (this.errorMessages.length === 0) {
      this.addUser(form);
    }
  }

  /**
   * Outputs the error messages in the required format, showing the first one
   * @param errors String containing the errors
   */
  formatValidationOutput(errors: string[]) {
    if (this.errorMessages.length === 1) {
      return {
        msg: this.errorMessages[0],
        errors: this.errorMessages
      };
    } else if (this.errorMessages.length > 0) {
      return {
        msg: this.errorMessages[0] + ' +' + (this.errorMessages.length - 1) + ' errors',
        errors: this.errorMessages
      };
    } else {
      return {
        msg: '',
        errors: this.errorMessages
      };
    }
  }

  /**
   * Another string definition of an array
   * @param array Array of elements
   */
  arrayToString(array: any[]): string {
    let msg = '';
    array.forEach(element => {
      msg = msg + element.toLowerCase() + ', ';
    });
    msg = msg.slice(0, msg.length - 2);
    return msg;
  }

  /**
   * Checkbox
   */
  enabled() {
    this.checkBox = !this.checkBox;
  }

  /**
   * Create device group opens the device group created component modal window confirmation
   */
  createDeviceGroup() {
    const initialState = {
      organizationId: this.organizationId,
    };
    this.bsDeviceGroupModalRef =
      this.modalService.show(DeviceGroupCreatedComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.bsDeviceGroupModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.hide();
  }
}