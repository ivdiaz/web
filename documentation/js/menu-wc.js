'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nalej-web-ui documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-f4c138a4912bec908183117e0f906d8a"' : 'data-target="#xs-components-links-module-AppModule-f4c138a4912bec908183117e0f906d8a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-f4c138a4912bec908183117e0f906d8a"' :
                                            'id="xs-components-links-module-AppModule-f4c138a4912bec908183117e0f906d8a"' }>
                                            <li class="link">
                                                <a href="components/ActionButtonsCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ActionButtonsCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddConnectionsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddConnectionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddDevicesGroupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddDevicesGroupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddLabelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddLabelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddUserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdvancedFilterOptionsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdvancedFilterOptionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AgentJoinTokenInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AgentJoinTokenInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppInfoDetailedComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppInfoDetailedComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ApplicationsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ApplicationsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AssetInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AssetInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChangePasswordComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChangePasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClusterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClusterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContextualMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContextualMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DebugPanelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DebugPanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeployInstanceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeployInstanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeviceGroupCreatedComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeviceGroupCreatedComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeviceGroupInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeviceGroupInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeviceInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeviceInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DevicesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DevicesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EdgeControllerInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EdgeControllerInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditClusterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditClusterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditUserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GraphComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GraphComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupConfigurationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupConfigurationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InfrastructureComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InfrastructureComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InstallAgentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InstallAgentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InstanceInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InstanceInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InstanceServiceGroupInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InstanceServiceGroupInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LabelsCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LabelsCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageConnectionsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageConnectionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotificationsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterApplicationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterApplicationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisteredInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisteredInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisteredServiceGroupInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisteredServiceGroupInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResourcesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResourcesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RuleInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RuleInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ServiceInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ServiceInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ServiceInstancesInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ServiceInstancesInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ServicesCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ServicesCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SimpleLogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SimpleLogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToolsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ToolsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserInfoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-AppModule-f4c138a4912bec908183117e0f906d8a"' : 'data-target="#xs-directives-links-module-AppModule-f4c138a4912bec908183117e0f906d8a"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-AppModule-f4c138a4912bec908183117e0f906d8a"' :
                                        'id="xs-directives-links-module-AppModule-f4c138a4912bec908183117e0f906d8a"' }>
                                        <li class="link">
                                            <a href="directives/AutofocusDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">AutofocusDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-f4c138a4912bec908183117e0f906d8a"' : 'data-target="#xs-injectables-links-module-AppModule-f4c138a4912bec908183117e0f906d8a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-f4c138a4912bec908183117e0f906d8a"' :
                                        'id="xs-injectables-links-module-AppModule-f4c138a4912bec908183117e0f906d8a"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BackendService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>BackendService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UpdateEventsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UpdateEventsService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-f4c138a4912bec908183117e0f906d8a"' : 'data-target="#xs-pipes-links-module-AppModule-f4c138a4912bec908183117e0f906d8a"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-f4c138a4912bec908183117e0f906d8a"' :
                                            'id="xs-pipes-links-module-AppModule-f4c138a4912bec908183117e0f906d8a"' }>
                                            <li class="link">
                                                <a href="pipes/AbbreviatePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AbbreviatePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FilterPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SortByPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SortByPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/TruncatePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TruncatePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Application.html" data-type="entity-link">Application</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApplicationDescriptor.html" data-type="entity-link">ApplicationDescriptor</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApplicationInstance.html" data-type="entity-link">ApplicationInstance</a>
                            </li>
                            <li class="link">
                                <a href="classes/GraphData.html" data-type="entity-link">GraphData</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ActionButtonsService.html" data-type="entity-link">ActionButtonsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ApplicationsService.html" data-type="entity-link">ApplicationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ErrorHandlerService.html" data-type="entity-link">ErrorHandlerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InfrastructureService.html" data-type="entity-link">InfrastructureService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InstanceInfoService.html" data-type="entity-link">InstanceInfoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LabelsCardService.html" data-type="entity-link">LabelsCardService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MockupBackendService.html" data-type="entity-link">MockupBackendService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationsService.html" data-type="entity-link">NotificationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RegisteredInfoService.html" data-type="entity-link">RegisteredInfoService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AgentOpSummary.html" data-type="entity-link">AgentOpSummary</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppParameter.html" data-type="entity-link">AppParameter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Asset.html" data-type="entity-link">Asset</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AssetInfo.html" data-type="entity-link">AssetInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Backend.html" data-type="entity-link">Backend</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Cluster.html" data-type="entity-link">Cluster</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ComponentMockOption.html" data-type="entity-link">ComponentMockOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigFile.html" data-type="entity-link">ConfigFile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConnectionInstance.html" data-type="entity-link">ConnectionInstance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Controller.html" data-type="entity-link">Controller</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CpuInfo.html" data-type="entity-link">CpuInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeploySpecs.html" data-type="entity-link">DeploySpecs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Device.html" data-type="entity-link">Device</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Endpoint.html" data-type="entity-link">Endpoint</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Group.html" data-type="entity-link">Group</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HardwareInfo.html" data-type="entity-link">HardwareInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ImageCredentials.html" data-type="entity-link">ImageCredentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InboundNetworkInterface.html" data-type="entity-link">InboundNetworkInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InstanceMetadata.html" data-type="entity-link">InstanceMetadata</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Inventory.html" data-type="entity-link">Inventory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InventoryLocation.html" data-type="entity-link">InventoryLocation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/KeyValue.html" data-type="entity-link">KeyValue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NetworkingHardwareInfo.html" data-type="entity-link">NetworkingHardwareInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Notification.html" data-type="entity-link">Notification</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OperatingSystemInfo.html" data-type="entity-link">OperatingSystemInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OutboundNetworkInterface.html" data-type="entity-link">OutboundNetworkInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Port.html" data-type="entity-link">Port</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SecurityRule.html" data-type="entity-link">SecurityRule</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Service.html" data-type="entity-link">Service</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServiceGroup.html" data-type="entity-link">ServiceGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServiceGroupDeploymentSpecs.html" data-type="entity-link">ServiceGroupDeploymentSpecs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServiceGroupInstance.html" data-type="entity-link">ServiceGroupInstance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServiceInstance.html" data-type="entity-link">ServiceInstance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Storage.html" data-type="entity-link">Storage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StorageHardwareInfo.html" data-type="entity-link">StorageHardwareInfo</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});