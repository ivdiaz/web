import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'manage-connections',
  templateUrl: './manage-connections.component.html',
  styleUrls: ['./manage-connections.component.scss']
})
export class ManageConnectionsComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Model that hold manage connections and its info
   */
  organizationId: string;
  title: string;
  connections: any[];
  copyConnections: any[];
  selectedApp: any;

  /**
   * Model that hold the search term in search box
   */
  searchTerm: string;

  /**
   * Models that holds forms info
   */
  manageConnectionsFilterForm: FormGroup;
  submitted = false;
  manageConnections: FormControl;
  filter: FormControl;

  /**
   * NGX-select-dropdown
   */
  tab = 1;
  filteredOptions: any[];
  selectConfig = {};

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
    private translateService: TranslateService
    ) {
      const mock = localStorage.getItem(LocalStorageKeys.manageConnectionsMock) || null;
      // Check which backend is required (fake or real)
      if (mock && mock === 'true') {
        this.backend = this.mockupBackendService;
      } else {
        this.backend = this.backendService;
      }
    this.title = 'MANAGE CONNECTIONS';
    this.searchTerm = '';

    //  Manage connections dropdown
    this.manageConnections = null;

    // CONNECTIONS
    this.connections = [
        {
        inbound: {
          interfaceName: 'dbInbound',
          instance: 'MySQL'
        },
        outbound: {
          interfaceName: 'dbOutbound',
          instance: 'WordPress'
        },
        connected: true
      },
      {
        inbound: {
          interfaceName: 'dbInbound',
          instance: 'activemq'
        },
        outbound: {
          interfaceName: 'dbOutbound',
          instance: 'Opencast'
        },
        connected: true
      },
      {
        inbound: {
          interfaceName: 'dbInbound',
          instance: 'kuaroprocessing'
        },
        outbound: {
          interfaceName: 'dbOutbound',
          instance: 'Kuard'
        },
        connected: true
      },
      {
        inbound: {
          interfaceName: 'dbInbound',
          instance: 'testPara'
        },
        outbound: {
          interfaceName: 'dbOutbound',
          instance: 'appTest'
        },
        connected: true
      },
      {
        inbound: {
          interfaceName: 'dbInbound',
          instance: 'deviceVirtual3'
        },
        outbound: {
          interfaceName: 'dbOutbound',
          instance: 'Virtual3'
        },
        connected: true
      },
      {
        inbound: {
          interfaceName: 'dbInbound',
          instance: 'deviceVirtual2'
        },
        outbound: {
          interfaceName: 'dbOutbound',
          instance: 'Virtual2'
        },
        connected: true
      },
      {
        inbound: {
          interfaceName: 'dbInbound',
          instance: 'deviceVirtual1'
        },
        outbound: {
          interfaceName: 'dbOutbound',
          instance: 'Virtual1'
        },
        connected: true
      }
    ];
  }

  ngOnInit() {
    this.manageConnectionsFilterForm = this.formBuilder.group({
      filter: [null],
    });
    // to preserve the initial state
    this.copyConnections = [...this.connections];
    this.filteredOptions = this.getFilterName();
    this.selectConfig = {
      displayKey: 'name',
      search: false,
      height: 'auto',
      placeholder: 'No filter',
      limitTo: this.filteredOptions.length,
      moreText: 'more',
      noResultsFound: 'No results found!'
    };
  }

    /**
   * Convenience getter for easy access to form fields
   */
  get f() { return this.manageConnectionsFilterForm.controls; }

  /**
   * Creates an array with the names to be filtered by
   */
  getFilterName() {
    const filteredNames = [];
    this.copyConnections.forEach(connectionName => {
      filteredNames.push(connectionName.outbound.instance);
      filteredNames.push(connectionName.inbound.instance);
    });
    return filteredNames;
  }

  /**
   * Disconnects app instance
   */
  disconnectInstance(connection) {
    const deleteConfirm =
    confirm(this.translateService.instant('apps.manageConnections.disconnectConfirm'));
    if (deleteConfirm) {
      connection.connected = false;
      this.notificationsService.add({
        message: 'App disconnected',
        timeout: 3000
      });
    }
  }

  /**
   * Handler for change event on ngx-select-dropdown
   * @param f Form
   */
  useFilter(f) {
    this.copyConnections = [...this.connections];
    this.copyConnections = this.copyConnections.filter(element => {
      if (element.outbound.instance === f.filter.value
        || element.inbound.instance === f.filter.value) {
        return element;
      }
    });
  }

  /**
   * Close the modal window
   */
  closeModal() {
    this.bsModalRef.hide();
  }
}