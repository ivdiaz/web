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

export enum ClusterStatus {
    // STATUS_NAME
    Online = 'online',
    Offline = 'offline',
    OnlineCordon = 'online_cordon',
    OfflineCordon = 'offline_cordon',
    Error = 'error',
    // STATE
    Running = 'running',
    Unknown = 'unknown',
    Provisioning = 'provisioning',
    Provisioned = 'provisioned',
    Installing = 'installing',
    Installed = 'installed',
    Uninstalling = 'uninstalling',
    Decommissioning = 'decommissioning'
}
