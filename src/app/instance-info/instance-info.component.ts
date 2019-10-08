import { Component, OnInit, OnDestroy } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { NotificationsService } from '../services/notifications.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import * as shape from 'd3-shape';
import { ServiceInstancesInfoComponent } from '../service-instances-info/service-instances-info.component';
import { RuleInfoComponent } from '../rule-info/rule-info.component';
import { TranslateService } from '@ngx-translate/core';
import { InstanceServiceGroupInfoComponent } from '../instance-service-group-info/instance-service-group-info.component';
import { AccessType } from '../definitions/enums/access-type.enum';

@Component({
  selector: 'app-instance-info',
  templateUrl: './instance-info.component.html',
  styleUrls: ['./instance-info.component.scss']
})
export class InstanceInfoComponent implements OnInit, OnDestroy {

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
   * Model that hold organization ID
   */
  instanceId: string;

  /**
   * Model that hold instance
   */
  instance: any;
  enabled: boolean;

  /**
   * Registered instances list
   */
  registered: any[];

  /**
   * List of available services
   */
  services: any[];

  /**
   * List of available services groups
   */
  groups: any[];

  /**
   * List of labels
   */
  labels: any[];
  isSelectableLabel: boolean;

  /**
   * Interval reference
   */
  refreshIntervalRef: any;

  /**
   * Refresh ratio reference
   */
  REFRESH_RATIO = 5000;

  /**
   * Hold request error message or undefined
   */
  requestError: string;

  /**
   * Models that hold the sort info needed to sortBy pipe
   */
  sortedBy: string;
  reverse: boolean;
  sortedByRules: string;
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
  graphReset: boolean;
  graphDataLoaded: boolean;
  graphData: any;
  orientation: string;
  curve: any;
  autoZoom: boolean;
  autoCenter: boolean;
  enableZoom: boolean;
  colorScheme: any;
  view: any[];
  width: number;
  height: number;
  draggingEnabled: boolean;
  nalejColorScheme: string[];
  nextColorIndex: number;
  STATUS_COLORS = {
    RUNNING: '#00E6A0',
    ERROR: '#F7478A',
    OTHER: '#FFEB6C'
  };
  STATUS_TEXT_COLORS = {
    RUNNING: '#FFFFFF',
    ERROR: '#FFFFFF',
    OTHER: '#444444'
  };

  isGeneratedPublicRule: boolean;
  publicRule: any;

  constructor(
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.appsMock) || null;
    // Check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = this.mockupBackendService;
    } else {
      this.backend = this.backendService;
    }
    // Default initialization
    this.labels = [];
    this.isSelectableLabel = false;
    this.groups = [];
    this.instance = {
        groups: [],
        environment_variables: {},
        configuration_options: {}
      };
    this.registered = [];
    this.requestError = '';
    this.showGraph = true;
    this.enabled = false;

    // SortBy
    this.sortedBy = '';
    this.reverse = false;
    this.sortedByRules = '';
    this.reverseRules = false;
    this.searchTerm = '';
    this.searchTermRules = '';
    // Filter field
    this.filterField = false;
    this.filterFieldRules = false;
     // Graph initialization
    this.graphReset = false;
    this.orientation = 'TB';
    this.curve = shape.curveBasis;
    this.autoZoom = true;
    this.autoCenter = true;
    this.enableZoom = true;
    this.draggingEnabled = false;
    this.colorScheme = {
      domain: ['#6C86F7']
    };
    this.graphDataLoaded = false;
    this.graphData = {
      nodes: [],
      links: []
    };

    this.nalejColorScheme = [
      '#4900d4',
      '#4000ba',
      '#3902a3',
      '#2e0480',
    ];
    this.nextColorIndex = 0;

    this.isGeneratedPublicRule = false;
    this.publicRule = null;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.instanceId = params['instanceId']; // (+) converts string 'id' to a number
    });
    // Get User data from localStorage
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      this.organizationId = JSON.parse(jwtData).organizationID;
        if (this.organizationId !== null) {
          this.updateInfo();
        }
    }
    this.refreshIntervalRef = setInterval(() => {
      this.updateInfo();
    }, this.REFRESH_RATIO); // Refresh each 5 seconds

  }

  ngOnDestroy() {
    clearInterval(this.refreshIntervalRef);
    this.refreshIntervalRef = null;
  }

  /**
   * Return an specific color depending on the node status
   * @param status Status name
   */
  getNodeColor(status: string): string {
    switch (status.toLowerCase()) {
      case this.translateService.instant('status.serviceRunning'):
        return this.STATUS_COLORS.RUNNING;
      case this.translateService.instant('status.serviceError'):
        return this.STATUS_COLORS.ERROR;
      case this.translateService.instant('status.serviceWaiting'):
        return this.STATUS_COLORS.OTHER;
      default:
        return this.STATUS_COLORS.OTHER;
    }
  }

    /**
   * Return an specific color depending on the node status
   * @param status Status name
   */
  getNodeTextColor(status: string): string {
    switch (status.toLowerCase()) {
      case this.translateService.instant('status.serviceRunning'):
        return this.STATUS_TEXT_COLORS.RUNNING;
      case this.translateService.instant('status.serviceError'):
        return this.STATUS_TEXT_COLORS.ERROR;
      case this.translateService.instant('status.serviceWaiting'):
        return this.STATUS_TEXT_COLORS.OTHER;
      default:
        return this.STATUS_TEXT_COLORS.OTHER;
    }
  }

  /**
   * Sortby pipe in the component
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
   * Returns the descriptor beauty name
   * @param descriptorId Descriptor identifier
   */
  getDescriptorName(descriptorId: string) {
    const index =
    this.registered
        .map(x => x.app_descriptor_id).
        indexOf(descriptorId);
    if (index !== -1) {
      return this.registered[index].name;
    }
  }

   /**
   * Requests to undeploy the selected instance
   * @param app Application instance object
   */
  undeploy(app) {
    const undeployConfirm =
    confirm(this.translateService.instant('apps.instance.undeployConfirm', { appName: app.name }));
    if (undeployConfirm) {
      this.backend.undeploy(this.organizationId, app.app_instance_id)
        .subscribe(undeployResponse => {
          this.notificationsService.add({
            message: this.translateService.instant('apps.instance.undeployMessage', { appName: app.name }),
            timeout: 3000
          });
          this.router.navigate(['/applications']);
        }, error => {
          this.notificationsService.add({
            message: error.error.message,
            timeout: 5000,
            type: 'warning'
          });
        });
    }
  }

  /**
   * Checks if the status requires an special css class
   * @param status  status name
   * @param className CSS class name
   */
  classStatusCheck(status: string, className: string): boolean {
    switch (status.toLowerCase()) {
      case this.translateService.instant('status.serviceRunning'): {
        if (className.toLowerCase() === this.translateService.instant('status.serviceRunning')) {
          return true;
        }
        break;
      }
      case this.translateService.instant('status.serviceError'): {
        if (className.toLowerCase() === this.translateService.instant('status.serviceError')) {
          return true;
        }
        break;
      }
      case this.translateService.instant('status.serviceWaiting'): {
        if (className.toLowerCase() === this.translateService.instant('status.serviceWaiting')) {
          return true;
        }
        break;
      }
     default: {
        if (className.toLowerCase() === this.translateService.instant('status.serviceWaiting')) {
          return true;
        }
        return false;
      }
    }
  }

  /**
   * Checks if the instances status requires an special css class
   * @param status instances status name
   * @param className CSS class name
   */
  classInstanceStatusCheck(status: string, className: string): boolean {
    switch (status.toLowerCase()) {
      case this.translateService.instant('status.running'): {
        if (className.toLowerCase() === this.translateService.instant('status.running')) {
          return true;
        }
        break;
      }
      case this.translateService.instant('status.deploymentError'): {
        if (className.toLowerCase() === this.translateService.instant('status.error')) {
          return true;
        }
        break;
      }
      case this.translateService.instant('status.planningError'): {
        if (className.toLowerCase() === this.translateService.instant('status.error')) {
          return true;
        }
        break;
      }
      case this.translateService.instant('status.incomplete'): {
        if (className.toLowerCase() === this.translateService.instant('status.error')) {
          return true;
        }
        break;
      }
      case this.translateService.instant('status.error'): {
        if (className.toLowerCase() === this.translateService.instant('status.error')) {
          return true;
        }
        break;
      }
      case 'queued': {
        if (className.toLowerCase() === this.translateService.instant('status.process')) {
          return true;
        }
        break;
      }
      case this.translateService.instant('status.planning'): {
        if (className.toLowerCase() === this.translateService.instant('status.process')) {
          return true;
        }
        break;
      }
      case this.translateService.instant('status.scheduled'): {
        if (className.toLowerCase() === this.translateService.instant('status.process')) {
          return true;
        }
        break;
      }
     default: {
        if (className.toLowerCase() === this.translateService.instant('status.process')) {
          return true;
        }
        return false;
      }
    }
  }

  /**
   * Shows the graph in services card
   */
  selectDisplayMode(type: string) {
    if (type === this.translateService.instant('graph.typeList')) {
      this.showGraph = false;
    } else if (type === this.translateService.instant('graph.typeGraph')) {
      this.showGraph = true;
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
      instanceId: service.service_instance_id,
      appDescriptorId: service.app_descriptor_id,
      appInstanceId: service.app_instance_id,
      environmentVariables: service.environment_variables,
      exposedPorts: service.exposed_ports,
      image: service.image,
      name: service.name,
      groupId: service.service_group_id,
      groupInstanceId: service.service_group_instance_id,
      replicas: service.replicas,
      specs: service.specs,
      statusName: service.status_name,
      typeName: service.type_name,
      endpoints: service.endpoints,
      credentials : service.credentials,
      dockerRepository: service.docker_repository,
      deployAfter: service.deploy_after,
      deployedOnCluster: service.deployed_on_cluster_id,
      labels: service.labels,
    };

    this.modalRef = this.modalService.show(ServiceInstancesInfoComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
  }

  /**
   * Open group services info modal window
   *  @param group group object
   */
  openGroupServicesInfo(group, event) {
    event.stopPropagation();
    const initialState = {
      organizationId: this.organizationId,
      appDescriptorId: group.app_descriptor_id,
      appInstanceId: group.app_instance_id,
      policyName: group.policy_name,
      name: group.name,
      serviceGroupId: group.service_group_id,
      serviceGroupInstanceId: group.service_group_instance_id,
      serviceInstances: group.service_instances,
      status: group.status_name,
      globalFqdn: group.global_fqdn,
      metadata: group.metadata
    };

    this.modalRef = this.modalService.show(InstanceServiceGroupInfoComponent,
      { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
  }

  /**
   * Open rules info modal window
   * @param rule rule object
   */
  openRulesInfo(rule) {
    const initialState = {
      organizationId: this.organizationId,
      ruleId: rule.rule_id,
      access: rule.access_name,
      appDescriptorId: rule.app_descriptor_id,
      authServices: rule.auth_services,
      authServiceGroupName: rule.auth_service_group_name,
      name: rule.name,
      targetPort: rule.target_port,
      targetServiceGroupName: rule.target_service_group_name,
      targetServiceName: rule.target_service_name,
      deviceGroupIds: rule.device_group_ids,
      deviceGroupNames: rule.device_group_names,
    };

    this.modalRef = this.modalService.show(RuleInfoComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
  }

  /**
   * Returns the length of service instances group
   */
  countGroupServices() {
    let counter = 0;
    if (this.instance && this.instance.groups) {
      this.instance.groups.forEach(group => {
        counter += group.service_instances.length;
      });
      return counter;
    } else {
      return 0;
    }
  }

  /**
   * Return the list of group services
   * @param groupId Group identifier
   */
  getGroupServices(groupId: string) {
    const index = this.groups
    .map(x => x.service_group_instance_id)
    .indexOf(groupId);

    if (index !== -1) {
      return this.groups[index].service_instances;
    } else {
      return [];
    }
  }

  /**
   * Adds https in case of being required
   * @param endpoint String containing the endpoint
   */
  getEndpointHref(endpoint: string) {
    let URL = '';
    if (!endpoint.startsWith('http') && !endpoint.startsWith('https')) {
      URL = 'http://' + endpoint;
    } else {
      URL = endpoint;
    }
    return URL;
  }

  /**
   * Filters the backend incoming status to display it in removing the initial "service_"
   * @param rawStatus string containing the status that the backend is sending
   */
  getBeautyStatusName(rawStatus: string): string {
    if (rawStatus.toLowerCase().startsWith('service_')) {
      return rawStatus.substring('service_'.length, rawStatus.length);
    }
    return rawStatus;
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
   * Request the list of registered apps and updates the instance info
   */
  private updateInfo() {
    this.backend.getRegisteredApps(this.organizationId)
      .subscribe(registeredAppsResponse => {
        this.registered = registeredAppsResponse.descriptors;
      });
    this.updateInstanceInfo(this.organizationId);
  }

  /**
   * Transforms the data needed to create the graph
   * @param instance instance object
   */
  private toGraphData(instance) {
    this.graphData = {
      nodes: [],
      links: []
    };
    if (instance && instance.groups) {
      instance.groups.forEach(group => {
        const nodeGroup = {
          id: group.service_group_instance_id,
          label: group.name,
          tooltip: this.translateService.instant('graph.group')
          + group.name
          + ': '
          + this.getBeautyStatusName(group.status_name),
          color: this.getNodeColor(group.status_name),
          text: {
            color: this.getNodeTextColor(group.status_name)
          },
          alignment: 'central',
          shape: 'rectangle',
          customHeight: 34,
          group: group.service_group_instance_id,
          icon: {
            width: 24,
            height: 24,
            x: 14,
            y: 5,
            viewBox: '0 0 24 24',
            paths: [
              {
                fill: '#FFF',
                d: 'M4,11H9V5H4Zm0,7H9V12H4Zm6,0h5V12H10Zm6,0h5V12H16Zm-6-7h5V5H10Zm6-6v6h5V5Z'
              },
              {
                fill: 'none',
                d: 'M0,0H24V24H0Z'
              }
            ]
          }
        };
        this.graphData.nodes.push(nodeGroup);
        group.service_instances.forEach(service => {
          const nodeService = {
            id: group.service_group_instance_id + '-s-' + service.service_id,
            label: service.name,
            tooltip:
            this.translateService.instant('graph.service')
            + service.name
            + ': ' + this.getBeautyStatusName(service.status_name),
            color: this.getNodeColor(service.status_name),
            text: this.getNodeTextColor(group.status_name),
            alignment: 'central',
            shape: 'rectangle',
            customHeight: 34,
            group: group.service_group_instance_id
          };
          this.graphData.nodes.push(nodeService);
          this.graphData.links.push({
            source: group.service_group_instance_id,
            target: group.service_group_instance_id + '-s-' + service.service_id
          });
        });
        if (instance.rules) {
          instance.rules.forEach(rule => {
            this.setPublicConnections(rule, group);
          });
        }
        if (instance && instance.groups) {
          console.log('INSTANCE ', instance);
          this.backend.getListConnections(this.organizationId).subscribe((instances_connections) => {
            console.log('INSTANCES CONNECTIONS ', instances_connections);
            // THOSE DATA ARE NOT AVAILABLE FOR NOW
            instance.rules.forEach(rule => {
              if (rule.access_name === AccessType.InboundAppnet) {
                rule['inbound_net_interface'] = 'inbound';
              } else if (rule.access_name === AccessType.OutboundAppnet) {
                rule['outbound_net_interface'] = 'outbound';
              }
            });
            console.log('INSTANCE 2 ', instance);
            // // THOSE DATA ARE NOT AVAILABLE FOR NOW
            this.setInboundConnections(instances_connections, group, instance);
            this.setOutboundConnections(instances_connections, group, instance);
            this.graphDataLoaded = true;
          });
        }
      });
    }
    if (instance.rules) {
      instance.rules.forEach(rule => {
        if (rule.auth_services) {
          rule.auth_services.forEach(authService => {
            const targetsIndex: number[] = [];
            for (let index = 0; index < this.graphData.nodes.length; index++) {
              if (this.graphData.nodes[index].label === rule.target_service_name) {
                targetsIndex.push(index);
              }
            }
            const sourcesIndex: number[] = [];
            for (let index = 0; index < this.graphData.nodes.length; index++) {
              if (this.graphData.nodes[index].label === authService) {
                sourcesIndex.push(index);
              }
            }
            sourcesIndex.forEach(indexSource => {
              targetsIndex.forEach(indexTarget => {
                const link = {
                  source: this.graphData.nodes[indexSource].id,
                  target: this.graphData.nodes[indexTarget].id,
                };
                this.graphData.links.push(link);
              });
            });
          });
        }
      });
    }
  }

  private setPublicRulesNodes(rule, group) {
    const ruleNode = {
      id: rule.rule_id,
      label: 'Public Access',
      tooltip: this.translateService.instant('graph.rule') + rule.name,
      group: group.service_group_instance_id,
      color: '#5800FF',
      text: {
        color: '#000',
        y: 71
      },
      shape: 'circle',
      customRadius: 24,
      icon: {
        width: 25,
        height: 25,
        x: 34,
        y: 17,
        viewBox: '0 0 25 25',
        paths: [
          {
            fill: '#ffffff',
            d: 'M21.444,6.216A35.833,35.833,0,0,1,12.485,7.27,35.833,35.833,0,0,1,3.527,6.216' +
                'L3,8.324A37.36,37.36,0,0,0,9.324,9.377v13.7h2.108V16.755h2.108v6.324h2.108' +
                'V9.377a37.36,37.36,0,0,0,6.324-1.054Zm-8.958,0a2.108,2.108,0,1,0-2.108-2.108' +
                'A2.114,2.114,0,0,0,12.485,6.216Z'
          },
          {
            fill: 'none',
            d: 'M0,0H24V24H0Z'
          }
        ]
      }
    };
    this.graphData.nodes.push(ruleNode);
  }

  private setRulesLinks(rule, group) {
    group.service_instances.forEach(service => {
      if (service.name === rule.target_service_name) {
        this.graphData.links.push({
          source: this.publicRule ? this.publicRule.rule_id : rule.rule_id,
          target: group.service_group_instance_id + '-s-' + service.service_id,
          notMarker: true
        });
        if (!this.publicRule) {
          this.publicRule = rule;
        }
      }
    });
  }

  private setPublicConnections(rule, group) {
    if (rule.access_name === AccessType.Public) {
      if (this.isGeneratedPublicRule) {
        this.setRulesLinks(rule, group);
      } else {
        this.setPublicRulesNodes(rule, group);
        this.setRulesLinks(rule, group);
        this.isGeneratedPublicRule = true;
      }
    }
  }

  private setInboundConnections(instances_connections, group, instance) {
    if (instance.inbound_net_interfaces && instance.inbound_net_interfaces.length > 0 ) {
      const inbounds = {};
      instance.inbound_net_interfaces.forEach(inbound => {
        inbounds[inbound.name + '_i_' + instance.app_instance_id] = {
          id: inbound.name + '_i_' + instance.app_instance_id,
          label: inbound.name,
          tooltip: this.translateService.instant('graph.inbound') + inbound.name,
          group: group,
          color: this.isConnectedBound('inbound', instances_connections.connections, instance).isConnected ? '#00E6A0' : '#5800FF',
          text: {
            color: '#000',
            y: 10
          },
          secoundaryText: {
            text: this.isConnectedBound('inbound', instances_connections.connections, instance).secoundaryName,
            color: '#000',
            y: 85
          },
          shape: 'circle',
          customRadius: 24,
          icon: {
            width: 24,
            height: 24,
            x: 55,
            y: 35,
            viewBox: '0 0 24 24',
            paths: [
              {
                fill: 'none',
                d: 'M0 0h24v24H0z'
              },
              {
                fill: '#fff',
                d: 'M20 5.41L18.59 4 7 15.59V9H5v10h10v-2H8.41z'
              }
            ]
          }
        };
      });
      console.log('INBOUNDS ', inbounds);
      this.graphData.nodes.push(...Object.values(inbounds));
      this.setInboundLinks(Object.values(inbounds), instance);
    }
  }

  private setInboundLinks(inbounds, instance) {
    inbounds.forEach(inbound => {
      const filteredData = instance.rules.filter(rule => inbound.label === rule.inbound_net_interface);
      if (filteredData.length > 0) {
        this.graphData.links.push({
          source: inbound.id,
          target: this.graphData.nodes.filter(node => node.label === filteredData[0]['target_service_name'])[0].id,
          notMarker: true
        });
      }
    });
  }

  private setOutboundLinks(outbounds, instance) {
    outbounds.forEach(outbound => {
      const filteredData = instance.rules.filter(rule => outbound.label === rule.outbound_net_interface);
      if (filteredData.length > 0) {
        this.graphData.links.push({
          source: outbound.id,
          target: this.graphData.nodes.filter(node => node.label === filteredData[0]['target_service_name'])[0].id,
          notMarker: true
        });
      }
    });
  }

  private setOutboundConnections(instances_connections, group, instance) {
    if (instance.outbound_net_interfaces && instance.outbound_net_interfaces.length > 0 ) {
      const outbounds = {};
      instance.outbound_net_interfaces.forEach(outbound => {
        outbounds[outbound.name + '_i_' + instance.app_instance_id] = {
          id: outbound.name + '_i_' + instance.app_instance_id,
          label: outbound.name,
          tooltip: this.translateService.instant('graph.outbound') + outbound.name,
          group: group,
          color: this.isConnectedBound('outbound', instances_connections.connections, instance).isConnected ? '#00E6A0' : '#5800FF',
          text: {
            color: '#000',
            y: 0,
          },
          secoundaryText: {
            text: this.isConnectedBound('outbound', instances_connections.connections, instance).secoundaryName,
            color: '#000',
            y: 85
          },
          shape: 'circle',
          customRadius: 24,
          icon: {
            width: 24,
            height: 24,
            x: 25,
            y: 20,
            viewBox: '0 0 24 24',
            paths: [
              {
                fill: 'none',
                d: 'M0,0H24V24H0Z'
              },
              {
                fill: '#fff',
                d: 'M9,5V7h6.59L4,18.59,5.41,20,17,8.41V15h2V5Z'
              }
            ]
          }
        };
      });
      this.graphData.nodes.push(...Object.values(outbounds));
      this.setOutboundLinks(Object.values(outbounds), instance);
    }
  }

  private isConnectedBound(type, instances_connections, instance): {isConnected: boolean, secoundaryName: string} {
    const data = {
      inbound: {
        rule: 'target_instance_id',
        name: 'source_instance_name'
      },
      outbound: {
        rule: 'source_instance_id',
        name: 'target_instance_name'
      }
    };
    const filteredData =
        instances_connections.filter(instance_connection => instance_connection[data[type].rule] === instance.app_instance_id);
    const isConnected = filteredData.length > 0;
    return {
      isConnected: isConnected,
      secoundaryName: isConnected ? filteredData[0][data[type].name] : ''
    };
  }

  /**
   * Requests an updated list of available services group to update the current one
   * @param organizationId Organization identifier
   */
  private updateInstanceInfo(organizationId: string) {
    if (organizationId !== null) {
      // Requests an updated services group list
      this.backend.getAppInstance(this.organizationId,  this.instanceId)
      .subscribe(instance => {
          if (this.anyChanges(this.instance, instance)) {
            if (instance.labels) {
              const labelsLikeArray = [];
              Object.keys(instance.labels).forEach(label => {
                labelsLikeArray.push({key: label, value: instance.labels[label], selected: false});
              });
              instance.labels = labelsLikeArray;
            }
            this.instance = instance;
            this.groups = instance.groups || [];
            this.toGraphData(instance);
            if (!this.loadedData) {
              this.loadedData = true;
            }
          }
      }, errorResponse => {
          this.loadedData = true;
          this.requestError = errorResponse.error.message;
        });
    }
  }

  /**
   * Compares the status of each instance service to determine if there are changes in the instances
   * @param instanceOutdated Outdated instance object
   * @param instanceUpdated Updated instance object
   */
  private anyChanges(instanceOutdated, instanceUpdated) {
    let anyChanges = false;
    const instanceOutdatedServices = [];
    const instanceUpdatedServices = [];
    if (!instanceOutdated ||
        !instanceOutdated.groups ||
        !instanceUpdated ||
        !instanceUpdated.groups ||
        (instanceOutdated.groups.length !== instanceUpdated.groups.length)) {
      return true;
    }
    // Creating arrays of services to compare
    instanceOutdated.groups.forEach(group => {
      group.service_instances.forEach(service => {
        instanceOutdatedServices.push({
            id: group.service_group_instance_id + service.service_instance_id,
            status: service.status_name
          });
      });
    });
    instanceUpdated.groups.forEach(group => {
      group.service_instances.forEach(service => {
        instanceUpdatedServices.push({
            id: group.service_group_instance_id + service.service_instance_id,
            status: service.status_name
          });
      });
    });
    // Check if there is any difference in the status
    instanceOutdatedServices.forEach(service => {
      const index = instanceUpdatedServices.map(x => x.id).indexOf(service.id);
      if (index !== -1) {
        if (instanceUpdatedServices[index].status !== service.status) {
          anyChanges = true;
        }
      } else {
        anyChanges = true;
      }
    });
    return anyChanges;
  }
}

