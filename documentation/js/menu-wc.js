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
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">nalej-web-ui documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
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
                            <a href="license.html"
                        data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>LICENSE
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-7d1e45fcea7d00676e154e74656ed018"' : 'data-target="#xs-components-links-module-AppModule-7d1e45fcea7d00676e154e74656ed018"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-7d1e45fcea7d00676e154e74656ed018"' : 'id="xs-components-links-module-AppModule-7d1e45fcea7d00676e154e74656ed018"' }>
                                        <li class="link">
                                            <a href="components/AddUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddUserComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ApplicationsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ApplicationsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ClusterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClusterComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DebugPanelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DebugPanelComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/EditClusterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditClusterComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/EditUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditUserComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/MainComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/NotificationsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotificationsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/OrganizationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ResourcesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResourcesComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/UserInfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserInfoComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-AppModule-7d1e45fcea7d00676e154e74656ed018"' : 'data-target="#xs-injectables-links-module-AppModule-7d1e45fcea7d00676e154e74656ed018"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-AppModule-7d1e45fcea7d00676e154e74656ed018"' : 'id="xs-injectables-links-module-AppModule-7d1e45fcea7d00676e154e74656ed018"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BackendService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>BackendService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UpdateEventsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>UpdateEventsService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/ErrorHandlerService.html" data-type="entity-link">ErrorHandlerService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/MockupBackendService.html" data-type="entity-link">MockupBackendService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/NotificationsService.html" data-type="entity-link">NotificationsService</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                 ${ isNormalMode ? 'data-target="#guards-links"' : 'data-target="#xs-guards-links"' }>
            <span class="icon ion-ios-lock"></span>
            <span>Guards</span>
            <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
                ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                <li class="link">
                    <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                </li>
            </ul>
            </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                ${ isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"' }>
                <span class="icon ion-md-information-circle-outline"></span>
                <span>Interfaces</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                    <li class="link">
                        <a href="interfaces/Backend.html" data-type="entity-link">Backend</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ClusterInfo.html" data-type="entity-link">ClusterInfo</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ComponentMockOption.html" data-type="entity-link">ComponentMockOption</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Notification.html" data-type="entity-link">Notification</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
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
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});