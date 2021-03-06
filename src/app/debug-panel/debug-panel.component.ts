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
import { BsModalRef } from 'ngx-bootstrap/modal';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { NotificationsService } from '../services/notifications.service';

/**
 * It sets the timeout for errors
 */
const TIMEOUT_ERROR = 5000;
/**
 * Interface for the objects that will be listed in the debug panel
 */
export interface ComponentMockOption {
  name: string;
  mock: string;
}

export const AvailableComponents = {
  login: 'Login',
  organization: 'Organization',
  resources: 'Resources',
  cluster: 'Cluster',
  apps: 'Apps',
  profile: 'Profile',
  notifications: 'Notifications',
  sidebar: 'Sidebar',
  userInfo: 'User Info',
  userEdit: 'User Edit',
  editCluster: 'Edit Cluster',
  addUser: 'Add User',
  addLabel: 'Add Label',
  devices: 'Devices',
  addGroup: 'Add Group',
  configGroup: 'Group Config',
  createdGroup: 'Group Created',
  deployInstance: 'Deploy instance',
  registeredInfo: 'Registered Info',
  registerApp: 'Register app',
  instanceInfo: 'Instance Info',
  serviceInstancesInfo: 'Service Instances Info',
  ruleInfo: 'Rule Info',
  serviceInfo: 'Service Info',
  infrastructure: 'Infrastructure',
  deviceInfo: 'Device Info',
  assetInfo: 'Asset Info',
  edgeControllerInfo: 'EC Info',
  installAgent: 'Install Agent',
  simpleLogInfo: 'Simple Log Info',
  eicJoinTokenInfo: 'EIC Join Token Info',
  agentJoinTokenInfo: 'Agent Join Token Info',
  addConnections: 'Add connections',
  advancedFilterOptions: 'Advanced filter options',
  manageConnections: 'Manage Connections'
};

@Component({
  selector: 'debug-panel',
  templateUrl: './debug-panel.component.html',
  styleUrls: ['./debug-panel.component.scss']
})
export class DebugPanelComponent implements OnInit {
  /**
   * List of components available to mock up
   */
  components: ComponentMockOption[] = [];
  notificationsMock: any;
  url: string;

  constructor(
    public bsModalRef: BsModalRef,
    private notificationsService: NotificationsService
    ) {
    this.notificationsMock = (localStorage.getItem(LocalStorageKeys.notificationsMock) === 'true' ? true : false);
    this.url = localStorage.getItem(LocalStorageKeys.url) || '';
    }

  ngOnInit() {
    // Load values from localStorage and populate options list
    this.components.push({
      name: AvailableComponents.login,
      mock: localStorage.getItem(LocalStorageKeys.loginMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.organization,
      mock: localStorage.getItem(LocalStorageKeys.organizationMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.resources,
      mock: localStorage.getItem(LocalStorageKeys.resourcesMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.cluster,
      mock: localStorage.getItem(LocalStorageKeys.clusterMock) === 'false' ? 'false' : 'true'
    });   this.components.push({
      name: AvailableComponents.apps,
      mock: localStorage.getItem(LocalStorageKeys.appsMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.profile,
      mock: localStorage.getItem(LocalStorageKeys.profileMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.notifications,
      mock: localStorage.getItem(LocalStorageKeys.notificationsMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.sidebar,
      mock: localStorage.getItem(LocalStorageKeys.sidebarMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.userInfo,
      mock: localStorage.getItem(LocalStorageKeys.userInfoMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.userEdit,
      mock: localStorage.getItem(LocalStorageKeys.userEditMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.editCluster,
      mock: localStorage.getItem(LocalStorageKeys.clusterEditMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.addUser,
      mock: localStorage.getItem(LocalStorageKeys.addUserMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.devices,
      mock: localStorage.getItem(LocalStorageKeys.devicesMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.addGroup,
      mock: localStorage.getItem(LocalStorageKeys.addGroupMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.configGroup,
      mock: localStorage.getItem(LocalStorageKeys.configGroupMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.createdGroup,
      mock: localStorage.getItem(LocalStorageKeys.createdGroupMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.deployInstance,
      mock: localStorage.getItem(LocalStorageKeys.deployInstanceMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.registeredInfo,
      mock: localStorage.getItem(LocalStorageKeys.registeredInfoMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.registerApp,
      mock: localStorage.getItem(LocalStorageKeys.registerAppMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.instanceInfo,
      mock: localStorage.getItem(LocalStorageKeys.instanceInfoMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.serviceInstancesInfo,
      mock: localStorage.getItem(LocalStorageKeys.serviceInstancesInfoMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.ruleInfo,
      mock: localStorage.getItem(LocalStorageKeys.ruleInfoMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.serviceInfo,
      mock: localStorage.getItem(LocalStorageKeys.serviceInfoMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.infrastructure,
      mock: localStorage.getItem(LocalStorageKeys.infrastructureMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.deviceInfo,
      mock: localStorage.getItem(LocalStorageKeys.deviceInfoMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.assetInfo,
      mock: localStorage.getItem(LocalStorageKeys.assetInfoMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.edgeControllerInfo,
      mock: localStorage.getItem(LocalStorageKeys.edgeControllerInfoMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.installAgent,
      mock: localStorage.getItem(LocalStorageKeys.installAgentMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.simpleLogInfo,
      mock: localStorage.getItem(LocalStorageKeys.simpleLogMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.agentJoinTokenInfo,
      mock: localStorage.getItem(LocalStorageKeys.agentJoinTokenInfoMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.addConnections,
      mock: localStorage.getItem(LocalStorageKeys.addConnectionsMock) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.advancedFilterOptions,
      mock: localStorage.getItem(LocalStorageKeys.advancedFilterOptions) === 'false' ? 'false' : 'true'
    });
    this.components.push({
      name: AvailableComponents.manageConnections,
      mock: localStorage.getItem(LocalStorageKeys.manageConnectionsMock) === 'false' ? 'false' : 'true'
    });
  }
  /**
   * Modifies all components mocks values
   * @param newValue new mock value
   */
  changeAll(newValue) {
    this.components.forEach(component => {
      component.mock = newValue;
    });
    // Persist values on localStorage
    localStorage.setItem(LocalStorageKeys.loginMock, newValue);
    localStorage.setItem(LocalStorageKeys.organizationMock, newValue);
    localStorage.setItem(LocalStorageKeys.resourcesMock, newValue);
    localStorage.setItem(LocalStorageKeys.clusterMock, newValue);
    localStorage.setItem(LocalStorageKeys.appsMock, newValue);
    localStorage.setItem(LocalStorageKeys.profileMock, newValue);
    localStorage.setItem(LocalStorageKeys.notificationsMock, newValue);
    localStorage.setItem(LocalStorageKeys.sidebarMock, newValue);
    localStorage.setItem(LocalStorageKeys.userInfoMock, newValue);
    localStorage.setItem(LocalStorageKeys.userEditMock, newValue);
    localStorage.setItem(LocalStorageKeys.clusterEditMock, newValue);
    localStorage.setItem(LocalStorageKeys.addUserMock, newValue);
    localStorage.setItem(LocalStorageKeys.addLabelMock, newValue);
    localStorage.setItem(LocalStorageKeys.devicesMock, newValue);
    localStorage.setItem(LocalStorageKeys.addGroupMock, newValue);
    localStorage.setItem(LocalStorageKeys.configGroupMock, newValue);
    localStorage.setItem(LocalStorageKeys.createdGroupMock, newValue);
    localStorage.setItem(LocalStorageKeys.deployInstanceMock, newValue);
    localStorage.setItem(LocalStorageKeys.registeredInfoMock, newValue);
    localStorage.setItem(LocalStorageKeys.registerAppMock, newValue);
    localStorage.setItem(LocalStorageKeys.instanceInfoMock, newValue);
    localStorage.setItem(LocalStorageKeys.serviceInstancesInfoMock, newValue);
    localStorage.setItem(LocalStorageKeys.ruleInfoMock, newValue);
    localStorage.setItem(LocalStorageKeys.serviceInfoMock, newValue);
    localStorage.setItem(LocalStorageKeys.infrastructureMock, newValue);
    localStorage.setItem(LocalStorageKeys.deviceInfoMock, newValue);
    localStorage.setItem(LocalStorageKeys.assetInfoMock, newValue);
    localStorage.setItem(LocalStorageKeys.edgeControllerInfoMock, newValue);
    localStorage.setItem(LocalStorageKeys.installAgentMock, newValue);
    localStorage.setItem(LocalStorageKeys.simpleLogMock, newValue);
    localStorage.setItem(LocalStorageKeys.agentJoinTokenInfoMock, newValue);
    localStorage.setItem(LocalStorageKeys.addConnectionsMock, newValue);
    localStorage.setItem(LocalStorageKeys.advancedFilterOptions, newValue);
    localStorage.setItem(LocalStorageKeys.manageConnectionsMock, newValue);
  }
  /**
   * Persist the modifications on the local storage
   * @param componentMockOption Object containing the selected option name and mock value
   */
  optionChange(componentMockOption) {
    // Persist modifications in localStorage
    switch (componentMockOption.name) {
      case AvailableComponents.login:
        localStorage.setItem(LocalStorageKeys.loginMock, componentMockOption.mock);
      break;
      case AvailableComponents.organization:
        localStorage.setItem(LocalStorageKeys.organizationMock, componentMockOption.mock);
      break;
      case AvailableComponents.resources:
        localStorage.setItem(LocalStorageKeys.resourcesMock, componentMockOption.mock);
      break;
      case AvailableComponents.cluster:
        localStorage.setItem(LocalStorageKeys.clusterMock, componentMockOption.mock);
      break;
      case AvailableComponents.apps:
        localStorage.setItem(LocalStorageKeys.appsMock, componentMockOption.mock);
      break;
      case AvailableComponents.profile:
        localStorage.setItem(LocalStorageKeys.profileMock, componentMockOption.mock);
      break;
      case AvailableComponents.notifications:
        localStorage.setItem(LocalStorageKeys.notificationsMock, componentMockOption.mock);
      break;
      case AvailableComponents.sidebar:
        localStorage.setItem(LocalStorageKeys.sidebarMock, componentMockOption.mock);
      break;
      case AvailableComponents.userInfo:
        localStorage.setItem(LocalStorageKeys.userInfoMock, componentMockOption.mock);
      break;
      case AvailableComponents.userEdit:
        localStorage.setItem(LocalStorageKeys.userEditMock, componentMockOption.mock);
      break;
      case AvailableComponents.editCluster:
        localStorage.setItem(LocalStorageKeys.clusterEditMock, componentMockOption.mock);
      break;
      case AvailableComponents.addUser:
      localStorage.setItem(LocalStorageKeys.addUserMock, componentMockOption.mock);
      break;
      case AvailableComponents.addLabel:
      localStorage.setItem(LocalStorageKeys.addLabelMock, componentMockOption.mock);
      break;
      case AvailableComponents.devices:
        localStorage.setItem(LocalStorageKeys.devicesMock, componentMockOption.mock);
      break;
      case AvailableComponents.addGroup:
        localStorage.setItem(LocalStorageKeys.addGroupMock, componentMockOption.mock);
      break;
      case AvailableComponents.configGroup:
        localStorage.setItem(LocalStorageKeys.configGroupMock, componentMockOption.mock);
      break;
      case AvailableComponents.createdGroup:
        localStorage.setItem(LocalStorageKeys.createdGroupMock, componentMockOption.mock);
      break;
      case AvailableComponents.deployInstance:
        localStorage.setItem(LocalStorageKeys.deployInstanceMock, componentMockOption.mock);
      break;
      case AvailableComponents.registeredInfo:
        localStorage.setItem(LocalStorageKeys.registeredInfoMock, componentMockOption.mock);
      break;
      case AvailableComponents.registerApp:
        localStorage.setItem(LocalStorageKeys.registerAppMock, componentMockOption.mock);
      break;
      case AvailableComponents.instanceInfo:
        localStorage.setItem(LocalStorageKeys.instanceInfoMock, componentMockOption.mock);
      break;
      case AvailableComponents.serviceInstancesInfo:
        localStorage.setItem(LocalStorageKeys.serviceInstancesInfoMock, componentMockOption.mock);
      break;
      case AvailableComponents.ruleInfo:
        localStorage.setItem(LocalStorageKeys.ruleInfoMock, componentMockOption.mock);
      break;
      case AvailableComponents.serviceInfo:
        localStorage.setItem(LocalStorageKeys.serviceInfoMock, componentMockOption.mock);
      break;
      case AvailableComponents.infrastructure:
        localStorage.setItem(LocalStorageKeys.infrastructureMock, componentMockOption.mock);
      break;
      case AvailableComponents.deviceInfo:
        localStorage.setItem(LocalStorageKeys.deviceInfoMock, componentMockOption.mock);
      break;
      case AvailableComponents.edgeControllerInfo:
        localStorage.setItem(LocalStorageKeys.edgeControllerInfoMock, componentMockOption.mock);
      break;
      case AvailableComponents.assetInfo:
        localStorage.setItem(LocalStorageKeys.assetInfoMock, componentMockOption.mock);
      break;
      case AvailableComponents.installAgent:
        localStorage.setItem(LocalStorageKeys.installAgentMock, componentMockOption.mock);
      break;
      case AvailableComponents.simpleLogInfo:
        localStorage.setItem(LocalStorageKeys.simpleLogMock, componentMockOption.mock);
      break;
      case AvailableComponents.agentJoinTokenInfo:
        localStorage.setItem(LocalStorageKeys.agentJoinTokenInfoMock, componentMockOption.mock);
      break;
      case AvailableComponents.addConnections:
        localStorage.setItem(LocalStorageKeys.addConnectionsMock, componentMockOption.mock);
      break;
      case AvailableComponents.advancedFilterOptions:
        localStorage.setItem(LocalStorageKeys.advancedFilterOptions, componentMockOption.mock);
      break;
      case AvailableComponents.manageConnections:
        localStorage.setItem(LocalStorageKeys.manageConnectionsMock, componentMockOption.mock);
      break;
      default:
        console.log('Selected option not registered as available component');
    }
  }
  /**
   * Adds a new notification to notificationsService list so it can be displayed on screen
   */
  spamNotification(): void {
    this.notificationsService.add({
      id: this.notificationsService.uuidv4(),
      message: 'Test notification',
      type: 'info',
      timeout: TIMEOUT_ERROR,
    });
  }
  urlChange($event) {
    this.url = $event;
    localStorage.setItem(LocalStorageKeys.url, this.url);
  }
}
