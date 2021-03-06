/*
 *  Copyright 2019 Nalej
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DebugPanelComponent } from '../debug-panel/debug-panel.component';
import { AuthService } from '../services/auth.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UpdateEventsService } from '../services/update-events.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'nalej-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Models that hold user name, role and email on sidebar
   */
  name: string;
  role: string;
  email: string;
  /**
   * Models that hold user id and organizationId
   */
  userId: string;
  organizationId: string;
  /**
   * Reference for the service that allows to open debug panel and profile modal view
   */
  modalRef: BsModalRef;

  constructor(
    backendService: BackendService,
    mockupBackendService: MockupBackendService,
    private router: Router,
    private modalService: BsModalService,
    private auth: AuthService,
    private updateService: UpdateEventsService,
    private translateService: TranslateService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.sidebarMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
    this.name = this.translateService.instant('organization.loading'); // Default initialization
    this.role = this.translateService.instant('organization.loading'); // Default initialization
    this.email = this.translateService.instant('organization.loading'); // Default initialization
  }

  ngOnInit() {
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      const userId = JSON.parse(jwtData).userID;
      this.organizationId = JSON.parse(jwtData).organizationID;
      if (userId !== null && this.organizationId !== null) {
        this.updateProfileUser(this.organizationId, userId);
      }
    }
  }

  /**
   * Opens the modal view that holds the debug panel
   */
  openDebugPanel() {
    this.modalRef = this.modalService.show(DebugPanelComponent);
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => { location.reload(); });
  }
  /**
   * Opens the modal view that holds the user info and editable component
   */
  openEditUser() {
    const initialState = {
      userName: this.name,
      email: this.email,
      profileRole: this.role,
      title: this.translateService.instant('sidebar.editProfile'),
      organizationId: this.organizationId,
      selfEditProfile: true,
    };
    this.modalRef = this.modalService.show(EditUserComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => {
      this.updateProfileUser(this.organizationId, initialState.email);
      if (this.router.url === '/organization') {
        this.updateService.changesOnUserList.next();
      }
    });
  }
  /**
   * Requests an updated profile user to update the current one
   */
  updateProfileUser(organizationId, userId) {
    this.backend.getUserProfileInfo(organizationId, userId)
    .subscribe(response => {
        this.name = response.name;
        this.email = response.email;
        this.role = response.role_name;
    });
  }
  /**
   * Cleans the credentials and leads to login page
   */
  logout() {
    this.auth.logout();
  }
}
