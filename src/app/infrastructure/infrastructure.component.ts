import { Component, OnInit } from '@angular/core';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { mockInfrastructurePieChart } from '../utils/mocks';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AssetInfoComponent } from '../asset-info/asset-info.component';
import { EdgeControllerInfoComponent } from '../edge-controller-info/edge-controller-info.component';
import { InstallAgentComponent } from '../install-agent/install-agent.component';

@Component({
  selector: 'app-infrastructure',
  templateUrl: './infrastructure.component.html',
  styleUrls: ['./infrastructure.component.scss']
})
export class InfrastructureComponent implements OnInit {
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
   * List of available inventory
   */
  inventory: any[];

  /**
   * List of available devices, assets and edge controllers
   */
  devices: any[];
  assets: any[];
  controllers: any [];

  /**
   * NGX-Charts object-assign required object references (for rendering)
   */
  infrastructurePieChart: any;

  /**
   * Pie Chart options
   */
  gradient = true;
  doughnut = true;
  colorScheme = {
    domain: ['#0937FF', '#949494']
  };

  /**
   * Count of total cpu, memory, storage, online ECs
   */
  cpuCoresCount: number;
  memoryCount: number;
  storageCount: number;
  onlineCount: number;
  onlineTotalCount: number;

  /**
   * Models that hold the sort info needed to sortBy pipe
   */
  sortedBy: string;
  reverse: boolean;

  /**
   * Model that hold the search term in search box
   */
  searchTerm: string;

  /**
   * Model that hold the quick filter
   */
  quickFilter: string;

  /**
   * Variable to store the value of the filter search text and sortBy pipe
   */
  filterField: boolean;

  /**
   * List of selected labels from an entity
   */
  selectedLabels = [];
  entityId: boolean;

  /**
   * List of labels
   */
  labels: any[];

  /**
   * Reference for the service that allows Edge Controller info and asset info component components
   */
  ecModalRef: BsModalRef;
  assetModalRef: BsModalRef;
  agentModalRef: BsModalRef;

  /**
   * Hold request error message or undefined
   */
  requestError: string;

  /**
   * Active context menu item ID
   */
  activeContextMenuItemId: string;


  constructor(
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.infrastructureMock) || null;
    // Check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }

    // Default initialization
    this.inventory = [];
    this.assets = [];
    this.devices = [];
    this.controllers = [];
    this.labels = [];
    this.loadedData = false;
    this.requestError = '';
    this.cpuCoresCount = 0;
    this.memoryCount = 0;
    this.storageCount = 0;
    this.onlineCount = 0;
    this.onlineTotalCount = 0;
    this.activeContextMenuItemId = '';

    // SortBy
    this.sortedBy = '';
    this.reverse = false;
    this.searchTerm = '';
    this.quickFilter = '';

    // Filter field
    this.filterField = false;

    /**
     * Charts reference init
     */
    Object.assign(this, { mockInfrastructurePieChart });
  }

  ngOnInit() {
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      this.organizationId = JSON.parse(jwtData).organizationID;
      if (this.organizationId !== null) {
        // Requests left card summary data
        this.backend.getInventorySummary(this.organizationId)
        .subscribe(summary => {
          this.cpuCoresCount = summary['total_num_cpu'];
          this.memoryCount = summary['total_ram'];
          this.storageCount = summary['total_storage'];
        });
        this.updateInventoryList();
      }
    }
  }

  /**
   * Requests an updated list of inventory
   */
  updateInventoryList() {
    this.requestError = ''; // Empty error before requesting new list
    // Request to get inventory
    this.backend.getInventory(this.organizationId)
    .subscribe(response => {
      this.normalizeInventoryItems(response);
      if (!this.loadedData) {
        this.loadedData = true;
      }
      this.updateOnlineEcsPieChart(response);
    }, errorResponse => {
      this.loadedData = true;
      this.requestError = errorResponse.error.message;
    });
  }

  /**
   * Normalize the inventory list and added type
   * @param response Backend response where to modify the data
   */
  normalizeInventoryItems(response) {
    this.inventory = [];
    if (!response || response === null) {
    } else {
      if (response.devices) {
        response.devices.forEach(device => {
          device.type = 'Device';
          device.id = device.device_id;
          if (!device.location || device.location === undefined || device.location === null) {
            device.location = 'undefined';
          }
          this.inventory.push(device);
        });
      }
      if (response.assets) {
        response.assets.forEach(asset => {
          asset.type = 'Asset';
          asset.id = asset.asset_id;
          if (!asset.location || asset.location === undefined || asset.location === null) {
            asset.location = 'undefined';
          }
          this.inventory.push(asset);
        });
      }
      if (response.controllers) {
        response.controllers.forEach(controller => {
          controller.type = 'EC';
          controller.id = controller.edge_controller_id;
          if (!controller.location || controller.location === undefined || controller.location === null) {
            controller.location = 'undefined';
          }
          this.inventory.push(controller);
        });
      }
    }
  }

  /**
   * Updates the pie chart with latest changes
   * @param response Backend response where to modify the data
   */
  updateOnlineEcsPieChart(response) {
    this.onlineTotalCount = response.controllers.length;
    const itemStatus =
    response.controllers.filter(item => item.status === 'online');
    this.onlineCount = itemStatus.length;
    this.infrastructurePieChart = this.generateSummaryChartData(this.onlineCount, this.onlineTotalCount);
  }

  /**
   * Generates the NGX-Chart required JSON object for pie chart rendering
   * @param online Number of online ECs
   * @param total Number of total ECs online
   * @returns anonym array with the required object structure for pie chart rendering
   */
  generateSummaryChartData(online: number, total: number): any[] {
    return [
      {
        name: 'Online',
        value: online
      },
      {
        name: 'Offline',
        value: total - online
      }];
  }

  /**
   * Sortby pipe in the component
   */
  setOrder(categoryName: string) {
    if (this.sortedBy === categoryName) {
      this.reverse = !this.reverse;
      this.filterField = false;
    }
    this.sortedBy = categoryName;
    this.filterField = true;
  }

  /**
   * Adds a quick filter
   */
  addQuickFilter(quickFilter: string) {
    if (this.quickFilter === quickFilter) {
      this.quickFilter = '';
    } else {
      this.quickFilter = quickFilter;
    }
  }

  /**
   * Reset all the filters fields
   */
  resetFilters() {
    this.filterField = false;
    this.searchTerm = '';
    this.sortedBy = '';
    this.quickFilter = '';
  }

  /**
   * Gets the category headers to add a class
   * @param categoryName class for the header category
   */
  getCategoryCSSClass(categoryName: string) {
    if (this.sortedBy === '') {
      return 'default';
    } else {
      if (this.sortedBy === categoryName) {
        return 'enabled';
      } else if (this.sortedBy !== categoryName) {
        return 'disabled';
      }
    }
  }

  /**
   * Parse to string labels map
   * @param labels Key-value map that contains the labels
   */
  labelsToString(labels: any) {
    if (!labels || labels === '-') {
      return ;
    }
    return Object.entries(labels);
  }

  /**
   * Checks if the status requires an special css class
   * @param status  status name
   * @param className CSS class name
   */
  classStatusCheck(status: string, className: string): boolean {
    switch (status.toLowerCase()) {
      case 'online': {
        if (className.toLowerCase() === 'online') {
          return true;
        }
        break;
      }
      case 'offline': {
        if (className.toLowerCase() === 'offline') {
          return true;
        }
        break;
      }
      case 'process': {
        if (className.toLowerCase() === 'process') {
          return true;
        }
        break;
      }
     default: {
        if (className.toLowerCase() === 'process') {
          return true;
        }
        return false;
      }
    }
  }

  /**
  * Open Asset info modal window
  *  @param asset asset object
  */
  openAssetInfo(asset) {
  const initialStateAsset = {
    organizationId: this.organizationId,
    assetId: asset.asset_id,
    agentId: asset.agent_id,
    assetIp: asset.asset_ip,
    ecName: asset.ec_name,
    show: asset.show,
    created: asset.created,
    labels: asset.labels,
    class: asset.os.class,
    version: asset.os.version,
    architecture: asset.hardware.cpus.architecture,
    model: asset.hardware.cpus.model,
    manufacturer: asset.hardware.cpus.manufacturer,
    cores: asset.hardware.cpus.num_cores,
    netInterfaces: asset.hardware.net_interfaces,
    storage: asset.storage,
    capacity: asset.storage.total_capacity,
    eic: asset.eic_net_ip,
    status: asset.status,
    inventory: this.inventory,
  };

    this.assetModalRef = this.modalService.show(
    AssetInfoComponent, {
      initialState: initialStateAsset,
      backdrop: 'static',
      ignoreBackdropClick: false
    });

    // onClose is used if the Asset modal comes while closing it, which means that we need to trigger a new edge controller modal
    this.assetModalRef.content.onClose = (ecFromAsset) => {
    if (ecFromAsset) {
      this.openEdgeControllerInfo(ecFromAsset);
      }
    };

    this.assetModalRef.hide();
    this.assetModalRef.content.closeBtnName = 'Close';
  }

  /**
  * Open Edge Controllers info modal window
  *  @param controller Edge controller object
  */
  openEdgeControllerInfo(controller) {
    const initialStateEC = {
      organizationId: this.organizationId,
      id: controller.edge_controller_id,
      assets: controller.assets,
      show: controller.show,
      created: controller.created,
      name: controller.ec_name,
      labels: controller.labels,
      status: controller.status,
      inventory: this.inventory,
    };

    this.ecModalRef = this.modalService.show(
      EdgeControllerInfoComponent, {
        initialState: initialStateEC,
        backdrop: 'static',
        ignoreBackdropClick: false
       });

    // onClose is used if the EC modal comes while closing it, which means that we need to trigger a new edge controller modal
    this.ecModalRef.content.onClose = (assetFromEC) => {
      if (assetFromEC) {
        this.openAssetInfo(assetFromEC);
      }
    };

    this.ecModalRef.hide();
    this.ecModalRef.content.closeBtnName = 'Close';
  }

  /**
  * Open Install Agent info modal window
  */
  openInstallAgent() {
    const initialState = {
      organizationId: this.organizationId,
    };

    this.agentModalRef = this.modalService.show(InstallAgentComponent, {initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.agentModalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => { });

  }


  /**
   * Opens context menu
   * @param Item inventory item
   */
  openContextualMenu(item) {
    if (item.id === this. activeContextMenuItemId) {
      this.activeContextMenuItemId = '';
    } else {
      this.activeContextMenuItemId = item.id;
    }
  }

  /**
   * Get the item options to show in the context menu
   * @param item inventory item
   */
  getItemOptions(item) {
    switch (item.type) {
      case 'EC':
        const ecOptions = [];
        const ecOptions1 = {
          name: 'More info',
          action: (inventoryItem) => {
            // debugg log to test functions inside context menu
            console.log(inventoryItem);
          },
          item: item
        };
        ecOptions.push(ecOptions1);

      return ecOptions;
      default:
        break;
    }
  }

  /**
   * Temporary method by which we open all the modal windows
   * @param item inventory item
   */
  openInfo(item) {
    switch (item.type) {
      case 'Asset':
       this.openAssetInfo(item);
      break;
      case 'EC':
        this.openEdgeControllerInfo(item);
      break;
      default:
        break;
    }
  }

}
