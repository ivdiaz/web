import { Injectable } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { Response, ResponseOptions } from '@angular/http';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// tslint:disable-next-line:max-line-length
import { mockJwtToken, mockUserList, mockOrganizationInfo, mockResetPasword, mockClusterList, mockResourcesSummary, mockAppsList, mockNodeList  } from '../utils/mocks';

@Injectable({
  providedIn: 'root'
})
export class MockupBackendService implements Backend {

  constructor() {
  }

  /********************
   * Login
   ********************/

  /**
   * Simulates the login request
   * @param email String containing the user email
   * @param password String that holds the user password
   */
  login(email: string, password: string): Observable<any> {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify({
        token: mockJwtToken,
        refresh_token: '018e42cf-9acb-4b4c-8804-6c54334d6947'
      }),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }
  /**
   * Simulates the logout request
   */
  logout() {
    return of (new Response(new ResponseOptions({
      status: 200
    })));
  }

  /********************
   * Organization
   ********************/

  /**
   * Simulates get profile info
   * @param userId String containing the user identificator - used to replicate expected backend behavior
   */
  getUserProfileInfo(organizationId: string, userId: string) {
    const index = mockUserList.map(x => x.email).indexOf(userId);
    if (index !== -1) {}
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockUserList[index]),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  getOrganizationInfo(organizationId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockOrganizationInfo),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  getOrganizationUsers(organizationId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify({ users: mockUserList }),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  /**
  * Simulates adding a user
  */
  addUser(organizationId: string, user: any) {
    const index = mockUserList.map(x => x.email).indexOf(user.email);
    if (index === -1) {
      mockUserList.push(user);
      return of (new Response(new ResponseOptions({
        status: 200
      }))).pipe(
        map(response => response.json())
      );
    } else {
      return of (new Response(new ResponseOptions({
        status: 403,
        body: user.email + ' is already in use'
      }))).pipe(
        map(response => response.json())
      );
    }
  }

  /**
  * Simulates delete user
  */
  deleteUser(organizationId: string, userId: string) {
    const index = mockUserList.map(x => x.email).indexOf(userId);
    if (index !== -1) {
      mockUserList.splice(index, 1);
    }
    return of (new Response(new ResponseOptions({
      status: 200
    })));
  }

  /**
  * Simulates reset password
  */
  resetPassword(organizationId: string, userId: string) {
    return of (new Response(new ResponseOptions({
      body: mockResetPasword,
      status: 200
    })));
  }

  /**
   * Simulates save user changes
   * @param userId String containing the user identificator - used to replicate expected backend behavior
   */
  saveUserChanges(organizationId: string, user: any) {
    const index = mockUserList.map(x => x.email).indexOf(user.email);
    if (index !== -1) {
      mockUserList[index].name = user.name;
      mockUserList[index].email = user.email;
      mockUserList[index].role_name = user.role_name;
    }
    return of(new Response(new ResponseOptions({
      status: 200
    }))).pipe(
      map(response => response.json())
    );
  }


  /********************
   * Resources
   ********************/

  /**
   * Simulates save cluster changes
   * @param clusterId String containing the cluster identificator - used to replicate expected backend behavior
   */
  saveClusterChanges(organizationId: string, clusterId: string, changes: any) {
    const index = mockClusterList.map(x => x.cluster_id).indexOf(clusterId);
    if (index !== -1) {
      mockClusterList[index].name = changes.newClusterName;
      mockClusterList[index].description = changes.newClusterDescription;
      mockClusterList[index].labels = changes.newClusterTags;
    }
    return of(new Response(new ResponseOptions({
      status: 200
    })));
  }

  getResourcesSummary(organizationId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockResourcesSummary),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  getClusters(organizationId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockClusterList),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  /********************
   * Appications
   ********************/

  /**
   * Simulates get apps list
   */
  getApps(organizationId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockAppsList),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  /**
   * Simulates get nodes list
   */
  getNodes(organizationId: string, clusterId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockNodeList),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }

  /**
   * Simulates get cluster details
   */
  getClusterDetail(organizationId: string, clusterId: string) {
    const index = mockClusterList.map(x => x.cluster_id).indexOf(clusterId);
    return of (new Response(new ResponseOptions({
      body: JSON.stringify(mockClusterList[index]),
      status: 200
    })))
    .pipe(
      map(response => response.json())
    );
  }
}
