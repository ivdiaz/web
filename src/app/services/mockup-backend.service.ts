import { Injectable } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { Response, ResponseOptions } from '@angular/http';
import { of, Observable } from 'rxjs';
import { mockJwtToken, mockUserProfileInfo } from '../utils/mocks';

@Injectable({
  providedIn: 'root'
})
export class MockupBackendService implements Backend {

  constructor() { }

  /**
   * Simulates the login request
   * @param email String containing the user email
   * @param password String that holds the user password
   */
  login(email: string, password: string): Observable<any> {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify({
        jwt: mockJwtToken
      }),
      status: 200
    })));
  }
  /**
   * Simulates the logout request
   */
  logout() {
    return of (new Response(new ResponseOptions({
      status: 200
    })));
  }
  /**
   * Simulates get profile info
   * @param userId String containing the user identificator - used to replicate expected backend behavior
   */
  getUserProfileInfo(userId: string) {
    return of (new Response(new ResponseOptions({
      body: JSON.stringify({
        name: mockUserProfileInfo.name,
        email: mockUserProfileInfo.email,
        role: mockUserProfileInfo.role
      }),
      status: 200
    })));
  }

  getOrganizationInfo(organizationId: string) {
    throw new Error('Method not implemented.');
  }

  getOrganizationUsers(organizationId: string) {
    throw new Error('Method not implemented.');
  }

}
