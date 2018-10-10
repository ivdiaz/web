import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  constructor(
    private notificationService: NotificationsService
  ) { }

  ngOnInit() {
  }

  /**
   * Opens the notifications service view that holds the notifications component
   */
  addUser() {
    this.notificationService.add({
      message: 'This option is not available at this moment',
      type: 'info',
      });
  }

}
