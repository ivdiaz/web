import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceInfoComponent } from './instance-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { TooltipModule } from '@swimlane/ngx-charts';
import { ButtonsModule, ModalModule, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../pipes/filter.pipe';
import { SortByPipe } from '../pipes/sort-by.pipe';
import { TruncatePipe } from '../pipes/truncate.pipe';

describe('InstancesInfoComponent', () => {
  let component: InstanceInfoComponent;
  let fixture: ComponentFixture<InstanceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceInfoComponent,
        FilterPipe,
        SortByPipe,
        TruncatePipe,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxGraphModule,
        TooltipModule,
        ButtonsModule,
        BrowserAnimationsModule,
        FormsModule,
        ModalModule.forRoot(),
      ],
      providers: [
        BsModalRef,
        BsModalService
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
