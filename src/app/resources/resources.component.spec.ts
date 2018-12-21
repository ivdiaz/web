import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ResourcesComponent } from './resources.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, ModalModule, BsModalRef, BsModalService, TooltipModule } from 'ngx-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { AbbreviatePipe } from '../pipes/abbreviate.pipe';

describe('ResourcesComponent', () => {
  let component: ResourcesComponent;
  let fixture: ComponentFixture<ResourcesComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResourcesComponent,
        TruncatePipe,
        AbbreviatePipe,
      ],
      imports: [
        HttpClientTestingModule,
        NgxChartsModule,
        CarouselModule,
        BrowserAnimationsModule,
        FormsModule,
        ButtonsModule,
        ModalModule.forRoot(),
        RouterTestingModule,
        TooltipModule
      ],
      providers: [
        BsModalRef,
        BsModalService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('openEditCluster() - Should open the modal view that holds the edit cluster component', () => {
    const openEditCluster = spyOn(component, 'openEditCluster').and.returnValue(true);
    const clusters = {};

    openEditCluster(clusters);

    expect(openEditCluster).toHaveBeenCalledWith(clusters);
  });

  it('updatePieChartsData() - Should open the modal view that holds the edit cluster component', () => {
    const updatePieChartsData = spyOn(component, 'updatePieChartsData').and.returnValue(true);
    const clusters = {};

    updatePieChartsData(clusters);

    expect(updatePieChartsData).toHaveBeenCalledWith(clusters);
  });

  it('generateClusterChartData() - Should open the modal view that holds the edit cluster component', () => {
    const generateClusterChartData = spyOn(component, 'generateClusterChartData').and.returnValue(true);
    const clusters = {};

    generateClusterChartData(clusters);

    expect(generateClusterChartData).toHaveBeenCalledWith(clusters);
  });

  it('updateClusterList() - Should requests an updated list of available clusters to update the current one', () => {
    const updateClusterList = spyOn(component, 'updateClusterList').and.returnValue(true);
    const clusters = {};

    updateClusterList(clusters);

    expect(updateClusterList).toHaveBeenCalledWith(clusters);
  });

  it('It should render Cluster Count', () => {
    component.clustersCount = 20;
    fixture.detectChanges();

    de.query(By.css('.summary-box'));

    expect(el.innerText).toContain('20');
  });


});