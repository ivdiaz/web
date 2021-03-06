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

/**
 * Interface that defines the Device info needed for creating the Device object instance
 */
import { KeyValue } from './key-value';
import { InventoryLocation } from './inventory-location';
import { AssetInfo } from './asset-info';

export interface Device {
  // OrganizationId with the organization identifier.
  organization_id: string;
  // DevicesGroupId with the device group identifier.
  device_group_id: string;
  // DeviceId with the device identifier.
  device_id: string;
  // AssetDeviceId is the composite of DeviceID and DeviceGroupId
  asset_device_id?: string;
  // RegisterSince is the timestamp when the device joined the group.
  register_since?: number;
  // Labels defined by the user.
  labels?: KeyValue;
  // Enabled determines if the device can interact with the running applications.
  enabled?: boolean;
  // DeviceApiKey contains the API KEY used by the device to send data.
  device_api_key?: string;
  // DeviceStatus contains the status of the device (ONLINE/OFFLINE)
  device_status_name?: string;
  // location with the device location
  location?: InventoryLocation;
  // AssetInfo with the information related to Hw, Storage and OS
  asset_info?: AssetInfo;
}
