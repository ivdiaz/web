import { Component, OnInit } from '@angular/core';
import { mockClusterChart, mockNodesChart } from '../utils/mocks';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { NotificationsService } from '../services/notifications.service';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { EditClusterComponent } from '../edit-cluster/edit-cluster.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
   providers: [
    { provide:
      CarouselConfig,
      useValue: {
        interval: 0,
        noPause: false,
        showIndicators: true
      }
    }
  ]
})
export class ResourcesComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;
   /**
   * Cluster information
   */
  clusterInfo: string;
  /**
   * Models that hold cluster ID, name, nodes, description, type, status, tags and multitenant
   */
  clusterId: string;
  clusterName: string;
  clusterNodes: string;
  clusterDescription: string;
  clusterType: string;
  clusterTags: string;
  clusterStatus: string;
  clusterMultitenant: string;
  clusters: any[];

  /**
   * Pie Chart options
   */
  gradient = true;
  doughnut = true;
  colorScheme = {
    domain: ['#0937FF', '#949494']
  };

  /**
   * Line Chart options
   */
  mockClusterChart: any;
  mockNodesChart: any;
  autoScale: any;
  showXAxis = true;
  showYAxis = false;
  showXAxisLabel = false;
  showYAxisLabel = false;
  showGridLines = false;
  showRefLines = true;
  showRefLabels = true;
  schemeType = 'ordinal';
  rangeFillOpacity = 0.0;
  referenceLines = [
    {
      name: 'xline',
      value: 0
    }
  ];
  customColors = [
    {
      name: 'Running',
      value: '#0000ff'
    },
    {
      name: 'error',
      value: '#00ff00'
    }
];

  /**
   * Reference for the service that allows the user info component
   */
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService

  ) {
    const mock = localStorage.getItem(LocalStorageKeys.resourcesMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
    this.clusterName = 'Loading ...'; // Default initialization
    this.clusterId = 'Loading ...'; // Default initialization
    this.clusterNodes = 'Loading ...'; // Default initialization
    this.clusterDescription = 'Loading ...'; // Default initialization
    this.clusterType = 'Loading ...'; // Default initialization
    this.clusterStatus = 'Loading ...'; // Default initialization
    this.clusterMultitenant = 'Loading ...'; // Default initialization
    this.clusters = [];

  /**
   * Mocked Charts
   */
    Object.assign(this, {mockClusterChart, mockNodesChart});
   }

  ngOnInit() {
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
       this.clusterInfo = JSON.parse(jwtData).ClusterInfo;
      if (this.clusterInfo !== null) {
        this.backend.getClustersList(this.clusterInfo)
          .subscribe(response => {
            if (response && response._body) {
              const data = JSON.parse(response._body);
              this.clusters = data;
              this.clusterName = data.name;
              this.clusterId = data.id;
              this.clusterNodes = data.nodes;
              this.clusterDescription = data.description;
              this.clusterType = data.type;
              this.clusterStatus = data.status;
              this.clusterMultitenant = data.multitenant;
            }
          });
      }
    }
  }
  /**
   * Opens the modal view that holds the edit cluster component TODO**
   */
  openEditCluster() {
    this.modalRef = this.modalService.show(EditClusterComponent);
    this.modalRef.content.closeBtnName = 'Close';
  }

}
