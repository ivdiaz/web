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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonsCardComponent } from './action-buttons-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TooltipModule, BsModalService, ModalModule } from 'ngx-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from '../../app.module';
import { ActionButtonsService } from './action-buttons.service';

describe('ActionButtonsCardComponent', () => {
  let component: ActionButtonsCardComponent;
  let fixture: ComponentFixture<ActionButtonsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionButtonsCardComponent ],
      imports: [
        HttpClientTestingModule,
        TooltipModule.forRoot(),
        RouterTestingModule,
        ModalModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        TranslateService,
        ActionButtonsService,
        BsModalService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
