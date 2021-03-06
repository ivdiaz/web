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
import { Backend } from '../../definitions/interfaces/backend';
import { BackendService } from '../../services/backend.service';
import { MockupBackendService } from '../../services/mockup-backend.service';
import { NotificationsService } from '../../services/notifications.service';
import { LocalStorageKeys } from '../../definitions/const/local-storage-keys';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DeployInstanceComponent } from '../deploy-instance/deploy-instance.component';
import { ActivatedRoute, Router } from '@angular/router';
import * as shape from 'd3-shape';
import { ApplicationDescriptor } from '../../definitions/models/application-descriptor';
import { RuleInfoComponent } from '../rule-info/rule-info.component';
import { ServiceInfoComponent } from './service-info/service-info.component';
import { RegisteredServiceGroupInfoComponent } from './registered-service-group-info/registered-service-group-info.component';
import { TranslateService } from '@ngx-translate/core';
import { AddLabelComponent } from '../../add-label/add-label.component';
import { RegisteredInfoService } from './registered-info.service';
import { KeyValue } from '../../definitions/interfaces/key-value';

@Component({
  selector: 'app-registered-info',
  templateUrl: './registered-info.component.html',
  styleUrls: ['./registered-info.component.scss']
})
export class RegisteredInfoComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Model that hold organization ID
   */
  organizationId: string;
  /**
   * Loaded Data status
   */
  loadedData: boolean;
  /**
   * Count of total services for summary card
   */
  servicesCount: number;
  /**
   * Model that hold descriptor ID
   */
  descriptorId: string;
  /**
   * Model that hold registered application descriptor data
   */
  registeredData: ApplicationDescriptor;
  openFromRegistered: boolean;
  /**
   * List of available services groups
   */
  groups: any[];
  /**
   * List of labels
   */
  isSelectableLabel: boolean;
  entityId: string;
  /**
   * Open form instance reference
   */
  isOpenFromRegistered: boolean;
  /**
   * Hold request error message or undefined
   */
  requestError: string;
  /**
   * Models that hold the sort info needed to sortBy pipe
   */
  sortedBy: string;
  sortedByRules: string;
  reverse: boolean;
  reverseRules: boolean;
  /**
   * Model that hold the search term in search box
   */
  searchTerm: string;
  searchTermRules: string;
  /**
   * Variable to store the value of the filter search text and sortBy pipe
   */
  filterField: boolean;
  filterFieldRules: boolean;
  /**
   * Reference for the service that allows the modal component
   */
  modalRef: BsModalRef;
  /**
   *  Show the services graph tab
   */
  showGraph: boolean;
  /**
   * Accordion options
   */
  nalejAccordion = 'nalejAccordion';
  isFirstOpen = true;
  /**
   * Graph options
   */
  graphDataLoaded: boolean;
  graphReset: boolean;
  graphData: any;
  orientation: string;
  curve: any;
  view: any[];
  autoZoom: boolean;
  autoCenter: boolean;
  enableZoom: boolean;
  width: number;
  height: number;
  whiteColor: string;

  constructor(
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private registeredInfoService: RegisteredInfoService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.registeredInfoMock) || null;
    // Check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
    // Default initialization
    this.openFromRegistered = true;
    this.servicesCount = 0;
    this.isSelectableLabel = true;
    this.isOpenFromRegistered = true;
    this.requestError = '';
    this.showGraph = true;
    this.registeredData = new ApplicationDescriptor();
    // SortBy
    this.sortedBy = '';
    this.sortedByRules = '';
    this.reverse = false;
    this.reverseRules = false;
    this.searchTerm = '';
    this.searchTermRules = '';
    // Filter field
    this.filterField = false;
    this.filterFieldRules = false;
     // Graph initialization
    this.orientation = 'TB';
    this.curve = shape.curveBasis;
    this.autoZoom = true;
    this.autoCenter = true;
    this.enableZoom = true;
    this.graphDataLoaded = false;
    this.graphData = {
      nodes: [],
      links: []
    };
    this.graphReset = false;
    this.whiteColor = '#FFFFFF';
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.descriptorId = params['registeredId']; // (+) converts string 'id' to a number
    });
    // Get User data from localStorage
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      this.organizationId = JSON.parse(jwtData).organizationID;
        if (this.organizationId !== null) {
          this.updateAppDescriptor();
        }
    }
  }

  /**
   *  Sortby pipe in the component
   * @param categoryName the name of the chosen category
   */
  setOrder(list: string, categoryName: string) {
    if (list === this.translateService.instant('apps.instance.servicesList')) {
      if (this.sortedBy === categoryName) {
        this.reverse = !this.reverse;
        this.filterField = false;
      }
      this.sortedBy = categoryName;
      this.filterField = true;
    } else if (list === this.translateService.instant('apps.instance.rulesList')) {
      if (this.sortedByRules === categoryName) {
        this.reverseRules = !this.reverseRules;
        this.filterFieldRules = false;
      }
      this.sortedByRules = categoryName;
      this.filterFieldRules = true;
    }
  }
  /**
   * Reset all the filters fields
   */
  resetFilters(list: string) {
    if (list === this.translateService.instant('apps.instance.servicesList')) {
      this.filterField = false;
      this.searchTerm = '';
      this.sortedBy = '';
    } else if (list === this.translateService.instant('apps.instance.rulesList')) {
      this.filterFieldRules = false;
      this.searchTermRules = '';
      this.sortedByRules = '';
    }
  }
  /**
   * Gets the category headers to add a class
   * @param categoryName the class for the header category
   */
  getCategoryCSSClass(list: string, categoryName: string) {
    if (list === this.translateService.instant('apps.instance.rulesList')) {
      if (this.sortedByRules === '') {
        return this.translateService.instant('devices.default');
      } else {
        if (this.sortedByRules === categoryName) {
          return this.translateService.instant('devices.enabled');
        } else if (this.sortedByRules !== categoryName) {
          return this.translateService.instant('devices.disabled');
        }
      }
    } else if (list === this.translateService.instant('apps.instance.servicesList')) {
      if (this.sortedBy === '') {
        return this.translateService.instant('devices.default');
      } else {
        if (this.sortedBy === categoryName) {
          return this.translateService.instant('devices.enabled');
        } else if (this.sortedBy !== categoryName) {
          return this.translateService.instant('devices.disabled');
        }
      }
    }
  }
  /**
   * Opens the modal view that holds the deploy registered app component
   * @param app registered app to deploy
   */
  deployRegistered(app) {
    const initialState = {
      organizationId: this.organizationId,
      registeredId: app.app_descriptor_id,
      registeredName: app.name,
      openFromRegistered: true,
      defaultAutofocus: true,
      appFromRegistered: app
    };
    this.modalRef = this.modalService.show(DeployInstanceComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalRef.content.onClose = ( () => {
      this.router.navigate(['/applications']);
    });
  }
  /**
   * Requests to delete the selected app
   * @param app Application object
   */
  deleteApp(app) {
    const deleteConfirm =
    confirm(this.translateService.instant('apps.registered.deleteApp', { appName: app.name }));
    if (deleteConfirm) {
      this.backend.deleteRegistered(this.organizationId, app.app_descriptor_id)
        .subscribe(() => {
          this.notificationsService.add({
            message: this.translateService.instant('apps.registered.deleting', { appName: app.name })
          });
          this.router.navigate(['/applications']);
        }, error => {
          this.notificationsService.add({
            message: error.error.message,
            type: 'warning'
          });
        });
    }
  }
  /**
   * Returns the length of the services in registered list. Represents the number of available services
   * @param registered selected registered
   */
  getServicesCount(registered) {
    let temporalCount = 0;
    if (registered && registered.groups) {
      registered.groups.forEach(group => {
        temporalCount += group.services.length;
      });
    }
    return temporalCount;
  }
  /**
   * Returns the length of service registered group
   */
  countGroupServices() {
    let counter = 0;
    if (this.registeredData && this.registeredData.groups) {
      this.registeredData.groups.forEach(group => {
        counter += group.services.length;
      });
    }
    return counter;
  }
  /**
   *  Return the list of group services
   * @param groupId Group identifier
   */
  getGroupServices(groupId: string): any[] {
    const index = this.groups
    .map(x => x.service_group_id)
    .indexOf(groupId);
    if (index !== -1) {
      return this.groups[index].services;
    } else {
      return [];
    }
  }
  /**
  * Open services info modal window
  *  @param service service object
  */
  openServicesInfo(service) {
    const initialState = {
      organizationId: this.organizationId,
      serviceId: service.service_group_id,
      appDescriptorId: service.app_descriptor_id,
      exposedPorts: service.exposed_ports,
      environmentVariables: service.environment_variables,
      image: service.image,
      labels: service.labels,
      name: service.name,
      groupId: service.service_group_id,
      replicas: service.replicas,
      specs: service.specs,
      endpoints: service.endpoints
    };
    this.modalRef = this.modalService.show(ServiceInfoComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
  }
  /**
  * Open rules info modal window
  *  @param rule rule object
  */
  openRulesInfo(rule) {
    const initialState = {
      organizationId: this.organizationId,
      ruleId: rule.rule_id,
      access: rule.access,
      appDescriptorId: rule.app_descriptor_id,
      authServices: rule.auth_services,
      authServiceGroupName: rule.auth_service_group_name,
      name: rule.name,
      targetPort: rule.target_port,
      targetServiceGroupName: rule.target_service_group_name,
      targetServiceName: rule.target_service_name,
      deviceGroupIds: rule.device_group_ids,
      deviceGroupNames: rule.device_group_names
    };
    this.modalRef = this.modalService.show(RuleInfoComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
  }
  /**
   * Shows the graph in services card
   * @param type display mode type
   */
  selectDisplayMode(type: string) {
    if (type === this.translateService.instant('graph.typeList')) {
      this.showGraph = false;
    } else if (type === this.translateService.instant('graph.typeGraph')) {
      this.showGraph = true;
    }
  }
  /**
   * Helper to workaround the reset graph status through the DOM refresh, using *ngIf
   */
  resetGraphZoom() {
    this.graphReset = true;
    setTimeout(() => {
      this.graphReset = false;
    }, 1);
  }
  /**
   * Open group services info modal window
   *  @param group group object
   */
  openRegisteredServicesGroupInfo(group, event) {
    event.stopPropagation();
    const initialState = {
      organizationId: this.organizationId,
      appDescriptorId: group.app_descriptor_id,
      name: group.name,
      serviceGroupId: group.service_group_id,
    };
    this.modalRef = this.modalService.show(RegisteredServiceGroupInfoComponent,
      { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
  }
  /**
   * Updates labels
   * @param updateLabel label object
   */
  updateLabels(updateLabel: {action: string, selectedLabels: any[]}) {
    if (updateLabel.action === 'add') {
      this.addLabel();
    } else if (updateLabel.action === 'delete') {
      this.deleteLabel(updateLabel.selectedLabels);
    }
  }
  /**
   * Opens the modal view that holds add label component
   */
  addLabel() {
    const registeredDataForBackend = Object.assign({}, this.registeredData);
    const labelsLikeArray: KeyValue = {};
    if (registeredDataForBackend.labels) {
      for (const labelsKey in this.registeredData.labels) {
        if (this.registeredData.labels[labelsKey] === null || this.registeredData.labels[labelsKey] === undefined) {
          continue;
        }
        labelsLikeArray[this.registeredData.labels[labelsKey]['key']] = this.registeredData.labels[labelsKey]['value'];
      }
    }
    registeredDataForBackend.labels = labelsLikeArray;
    const initialState = {
      organizationId: this.organizationId,
      entityType: this.translateService.instant('apps.registered.app'),
      entity: registeredDataForBackend,
      modalTitle: registeredDataForBackend.name
    };
    this.modalRef = this.modalService.show(AddLabelComponent, {initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe(() => {
      this.updateAppDescriptor();
    } );
  }
  /**
   * Deletes a selected label
   * @param selectedLabels selected labels by the user for delete them
   */
  deleteLabel(selectedLabels) {
    const deleteConfirm = confirm(this.translateService.instant('label.deleteLabels'));
    if (deleteConfirm) {
      const labelsForBackend = {};
      selectedLabels.forEach(label => {
        labelsForBackend[label.key] = label.value;
      });
      this.backend.updateAppDescriptor(
          this.organizationId,
          this.registeredData.app_descriptor_id,
          {
            organizationId: this.organizationId,
            descriptorId: this.registeredData.app_descriptor_id,
            remove_labels: true,
            labels: labelsForBackend
          }).subscribe( () => {
        this.updateAppDescriptor();
      });
    }
  }
  /**
   * Request the list of app descriptors
   */
  private updateAppDescriptor() {
    this.backend.getAppDescriptor(this.organizationId, this.descriptorId)
      .subscribe(registeredResponse => {
        if (registeredResponse.labels) {
          const labelsLikeArray = [];
          Object.keys(registeredResponse.labels).forEach(label => {
            labelsLikeArray.push({key: label, value: registeredResponse.labels[label], selected: false});
          });
          registeredResponse.labels = labelsLikeArray;
        }
        this.registeredData = registeredResponse;
        this.groups = registeredResponse.groups || [];
        if (this.groups.length) {
          this.groups.forEach(group => {
            group.isFirstOpen = this.isFirstOpen;
          });
        }
        this.toGraphData(registeredResponse);
        if (!this.loadedData) {
          this.loadedData = true;
        }
      }, errorResponse => {
        this.loadedData = true;
        this.requestError = errorResponse.error.message;
      });
  }
  /**
   * Transforms the data needed to create the graph
   * @param registered registered object
   */
  private toGraphData(registered) {
    this.registeredInfoService.toGraphData(registered);
    this.graphData = this.registeredInfoService.graphData;
    this.graphDataLoaded = true;
  }
  /**
   * Show the graph and hides the services table
   * @param displayGraph show if the graph is displayed
   */
  onShowGraph(displayGraph: boolean) {
    this.showGraph = displayGraph;
  }
}
