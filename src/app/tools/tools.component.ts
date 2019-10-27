import { Component, OnInit } from '@angular/core';
import { ClusterStatus } from '../definitions/enums/cluster-status.enum';
import { AppStatus } from '../definitions/enums/app-status.enum';
import { GraphData } from '../definitions/models/graph-data';
import { NodeType } from '../definitions/enums/node-type.enum';
import * as shape from 'd3-shape';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import {Backend} from '../definitions/interfaces/backend';
/**
 * It sets the status colors for nodes
 */
const STATUS_COLORS = {
  RUNNING: '#00E6A0',
  ERROR: '#F7478A',
  OTHER: '#FFEB6C'
};
/**
 * It sets the status colors for nodes
 */
const STATUS_TEXT_COLORS = {
  RUNNING: '#FFFFFF',
  ERROR: '#FFFFFF',
  OTHER: '#444444'
};

@Component({
  selector: 'tools',
  template: ``,
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * Graph options
   */
  graphData: GraphData<any[]>;
  graphReset: boolean;
  orientation: string;
  curve: any;
  autoZoom: boolean;
  autoCenter: boolean;
  enableZoom: boolean;
  draggingEnabled: boolean;
  /**
   * Instances list
   */
  instances: any[];
  /**
   * Model that hold organization ID
   */
  organizationId: string;
  /**
   * Pie Chart options
   */
  gradient: boolean;
  doughnut: boolean;
  colorScheme: any;

  constructor() {
    this.graphData = new GraphData([], []);
    this.graphReset = false;
    this.instances = [];
    this.orientation = 'TB';
    this.curve = shape.curveBasis;
    this.autoZoom = true;
    this.autoCenter = true;
    this.enableZoom = true;
    this.draggingEnabled = false;
    this.organizationId = null;
    this.gradient = true;
    this.doughnut = true;
    this.colorScheme = {
      domain: ['#5800FF', '#828282']
    };
  }

  ngOnInit() {
    // Get User data from localStorage
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      this.organizationId = JSON.parse(jwtData).organizationID;
    }
  }
  /**
   * Return an specific color depending on the node status
   * @param status Status name
   */
  getNodeColor(status: string): string {
    switch (status.toLowerCase()) {
      case ClusterStatus.Running:
      case ClusterStatus.Online:
      case ClusterStatus.OnlineCordon:
        return STATUS_COLORS.RUNNING;
      case ClusterStatus.Error:
      case ClusterStatus.Offline:
      case ClusterStatus.OfflineCordon:
      case AppStatus.DeploymentError:
      case AppStatus.Incomplete:
      case AppStatus.PlanningError:
      case AppStatus.Error:
        return STATUS_COLORS.ERROR;
      case AppStatus.Queued:
      case AppStatus.Deploying:
      case AppStatus.Scheduled:
      case AppStatus.Planning:
        return STATUS_COLORS.OTHER;
      default:
        return STATUS_COLORS.OTHER;
    }
  }
  /**
   * Return an specific text color depending on the node status
   * @param status Status name
   */
  getNodeTextColor(status: string): string {
    switch (status.toLowerCase()) {
      case ClusterStatus.Running:
      case ClusterStatus.Online:
      case ClusterStatus.OnlineCordon:
        return STATUS_TEXT_COLORS.RUNNING;
      case ClusterStatus.Error:
      case ClusterStatus.Offline:
      case ClusterStatus.OfflineCordon:
      case AppStatus.DeploymentError:
      case AppStatus.Incomplete:
      case AppStatus.PlanningError:
      case AppStatus.Error:
        return STATUS_TEXT_COLORS.ERROR;
      case AppStatus.Queued:
      case AppStatus.Deploying:
      case AppStatus.Scheduled:
      case AppStatus.Planning:
        return STATUS_TEXT_COLORS.OTHER;
      default:
        return STATUS_TEXT_COLORS.OTHER;
    }
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
   * It returns filtered app instances avoiding duplicated instances by cluster ID
   * @param clusterId Identifier for the cluster
   */
  getAppsInCluster(clusterId: string) {
    const appsInCluster = {};
    if (this.instances) {
      for (let indexInstance = 0, instancesLength = this.instances.length; indexInstance < instancesLength; indexInstance++) {
        const groups = this.instances[indexInstance].groups || [];
        for (let indexGroup = 0, groupsLength = groups.length; indexGroup < groupsLength; indexGroup++) {
          const serviceInstances = groups[indexGroup].service_instances || [];
          for (let indexService = 0; indexService < serviceInstances.length; indexService++) {
            if (serviceInstances[indexService].deployed_on_cluster_id === clusterId) {
              appsInCluster[serviceInstances[indexService].app_instance_id] = this.instances[indexInstance];
            }
          }
        }
      }
    }
    return Object.values(appsInCluster);
  }
  /**
   * Return if the marker is required
   * @param link Link object
   */
  getMarker(link: { [x: string]: any; is_between_apps: any; }, origin: string) {
    const index = this.graphData.nodes.map((x: { id: any; }) => x.id).indexOf(link[origin]);
    if (index !== -1) {
      if (link.is_between_apps) {
        return 'url(#arrow)';
      } else {
        return '';
      }
    }
    return '';
  }
  /**
   * It returns a node with style
   * @param color Background color for the node
   * @param textColor Text color for the node
   * @param customBorderColor Border color for the node
   * @param customBorderWidth Border width for the node
   * @param customHeight Height for the node
   */
  getStyledNode(color: string, textColor: string, customBorderColor: string, customBorderWidth: number, customHeight: number): {} {
    return {
      color: color,
      text: textColor,
      customBorderColor: customBorderColor,
      customBorderWidth: customBorderWidth,
      customHeight: customHeight
    };
  }
  /**
   * It sets the links between apps
   */
  setLinksBetweenApps() {
    const linksBetweenApps = {};
    const connections = ['inbound_connections', 'outbound_connections'];
    this.graphData.nodes.forEach(node => {
      if (node.type === NodeType.Instances) {
        connections.forEach(connection_type => {
          node[connection_type].forEach((connection: { source_instance_id: any; target_instance_id: any; }) => {
            const source = connection.source_instance_id;
            const target = connection.target_instance_id;
            const isSourceNode = this.graphData.nodes.filter(item => item.id === source).length > 0;
            const isTargetNode = this.graphData.nodes.filter(item => item.id === target).length > 0;
            if (isSourceNode && isTargetNode) {
              linksBetweenApps[ source + '_' + target] = {
                source: source,
                target: target,
                is_between_apps: true
              };
            }
          });
        });
      }
    });
    this.graphData.links.push(...Object.values(linksBetweenApps));
  }
}
