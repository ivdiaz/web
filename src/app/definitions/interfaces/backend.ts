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

import { Observable } from 'rxjs';

export interface Backend {
    // Login
    login(email: string, password: string): Observable<any>;
    logout();
    // Organization
    getUserProfileInfo(organizationId: string, userId: string);
    getOrganizationInfo(organizationId: string);
    getOrganizationUsers(organizationId: string);
    addUser(organizationId: string, user: any);
    deleteUser(organizationId: string, userId: string);
    resetPassword(organizationId: string, changePassword: any);
    saveUserChanges(organizationId: string, changes: any);
    listRoles(organizationId: string);
    changeRole(organizationId: string, userId: string, roleId: string);
    // Infrastructure
    getInventory(organizationId: string);
    getInventorySummary(organizationId: string);
    installAgent(organizationId: string, edgeControllerId: string, agent: any);
    uninstallAgent(organizationId: string, edgeControllerId: string, assetId: any);
    createEICToken(organizationId: string);
    createAgentJoinToken(organizationId: string,  edgeControllerId: string);
    unlinkEIC(organizationId: string, edgeControllerId: string);
    removeDeviceFromInventoryMockup(organizationId: string, deviceId: any);
    updateAsset(organizationId: string, assetId: string, asset: any);
    updateEC(organizationId: string, ecId: string, ec: any);
    // Resources
    saveClusterChanges(organizationId: string, clusterId: string, changes: any);
    getClusters(organizationId: string);
    getNodes(organizationId: string, clusterId: string);
    updateNode(organizationId: string, nodeId: string, changes: any);
    getClusterDetail(organizationId: string, clusterId: string);
    getResourcesSummary(organizationId: string);
    // Applications
    getInstances(organizationId: string);
    getRegisteredApps(organizationId: string);
    getAppInstance(organizationId: string, instanceId: string);
    getAppDescriptor(organizationId: string, descriptorId: string);
    addAppDescriptor(organizationId: string, descriptor: any);
    updateAppDescriptor(organizationId: string, descriptorId: string, changes: any);
    deploy(organizationId: string, descriptorId: string, name: string, params?: any, connections?: any[]);
    undeploy(organizationId: string, instanceId: string,  confirmation?: {user_confirmation: boolean});
    deleteRegistered(organizationId: string, descriptorId: string);
    // Application network
    getListAvailableInstanceInbounds(organizationId: string);
    getListAvailableInstanceOutbounds(organizationId: string);
    addConnection(organizationId: string, connection: any);
    removeConnection(organizationId: string, connection: any);
    getListConnections(organizationId: string);
    getListAvailableInstanceParameters(organizationId: string, instanceId: string);
    // Devices
    getDevices(organizationId: string, groupId: string);
    updateDevice(organizationId: string, deviceData: any);
    addLabelToDevice(organizationId: string, label: any);
    removeLabelFromDevice(organizationId: string, label: any);
    removeDevice(organizationId: string, groupId: string, deviceId: any);
    // Groups
    getGroups(organizationId: string);
    addGroup(organizationId: string, groupData: any);
    deleteGroup(organizationId: string, groupId: any);
    updateGroup(organizationId: string, groupData: any);

}
