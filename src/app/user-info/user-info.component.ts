import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { mockOrganizationInfo } from '../utils/mocks';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Dialog title
   */
  title: string;
  /**
   * Text for the resset password action button
   */
  buttonRessetPassword: string;
  /**
   * Text for the delete user action button
   */
  buttonDeleteUser: string;
  /**
   * Models that hold user name, organization company name, user email/ID and role selection
   */
  userName: string;
  organizationName: string;
  userId: string;
  role: string;


  constructor(
    public bsModalRef: BsModalRef,
    backendService: BackendService,
    mockupBackendService: MockupBackendService,
    ) {
      const mock = localStorage.getItem(LocalStorageKeys.userInfoMock) || null;
      // check which backend is required (fake or real)
      if (mock && mock === 'true') {
        this.backend = mockupBackendService;
      } else {
        this.backend = backendService;
      }
      this.title = 'Info User';
      this.userName = 'Loading ...'; // Default initialization
      this.userId = 'Loading ...'; // Default initialization
      this.buttonDeleteUser = 'Delete User';
      this.buttonRessetPassword = 'Resset Password';
     }

  ngOnInit() {
    console.log(this.organizationName, 'log de organization');
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      const jwtJson = JSON.parse(jwtData);
        this.userId = jwtJson.UserId;
        this.role = jwtJson.Rolename;
      if (this.userId !== null) {
        this.backend.getUserProfileInfo(this.userId)
          .subscribe(response => {
            if (response && response._body) {
              const data = JSON.parse(response._body);
              this.userName = data.name;
              this.userId = data.email;
            }
          });
      }
    }
  }
  checkUserRole(buttonRole) {
    if (buttonRole === this.role) {
      return true;
    }
    return false;
  }

}
