import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UserInfoComponent } from '../user-info/user-info.component';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { NotificationsService } from '../services/notifications.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UpdateEventsService } from '../services/update-events.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Models that hold organization id, name, subscription type and the users list
   */
  organizationId: string;
  organizationName: string;
  subscriptionType: string;
  users: any[];

  /**
   * Loaded Data status
   */
  loadedData: boolean;

  /**
   * Reference for the service that allows the user info component
   */
  modalRef: BsModalRef;

  /**
   * Models that removes the possibility for the user to close the modal by clicking outside the content card
   */
  config = {
    backdrop: 'static',
    ignoreBackdropClick: false
  };

  constructor(
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
    private updateService: UpdateEventsService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.organizationMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
    // Default initialization
    this.loadedData = false;
    this.organizationName = 'Loading...';
    this.subscriptionType = 'Free subscription';
    this.users = [];
  }

  ngOnInit() {
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      this.organizationId = JSON.parse(jwtData).organizationID;
      if (this.organizationId !== null) {
        this.backend.getOrganizationInfo(this.organizationId)
          .subscribe(response => {
              this.organizationName = response.name;
          });
        this.backend.getOrganizationUsers(this.organizationId)
          .subscribe(response => {
              this.users = response.users;
          });
      }
    }
    this.updateService.changesOnUserList.subscribe(
      result => {
      this.backend.getOrganizationUsers(this.organizationId)
        .subscribe(response => {
          this.users = response.users;
        });
      }
    );
  }

  /**
   * Opens the modal view that holds the user info component
   */
  openUserInfo(user) {
    const initialState = {
      organizationName: this.organizationName,
      organizatinoId: this.organizationId,
      userName: user.name,
      userId: user.email,
      role: user.role_name,
    };

    this.modalRef = this.modalService.show(UserInfoComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => { this.updateUserList(); });
  }

  /**
   * Opens the modal view that holds the user info and editable component
   */
  openEditUser(user) {
    const initialState = {
      organizationName: this.organizationName,
      organizationId: this.organizationId,
      userName: user.name,
      userId: user.email,
      userRole: user.role_name,
      title: 'Edit user'
    };

    this.modalRef = this.modalService.show(EditUserComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => { this.updateUserList(); });
  }

  /**
   * Opens the modal view that holds add user component
   */
  addUser() {
    const initialState = {
      organizationId: this.organizationId,
    };

    this.modalRef = this.modalService.show(AddUserComponent, {initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => { this.updateUserList(); });
  }

  updateUserList() {
    if (this.organizationId != null) {
      this.backend.getOrganizationUsers(this.organizationId)
      .subscribe(response => {
          this.users = response.users;
        }, error => {
          this.users = [];
        }, complete => {
          if (!this.loadedData) {
            this.loadedData = true;
      }
    });
    }
  }
}

