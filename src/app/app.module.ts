import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { ErrorHandlerService } from './services/error-handler.service';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { DebugPanelComponent } from './debug-panel/debug-panel.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ButtonsModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';




@NgModule({
  declarations: [
    AppComponent,
    DebugPanelComponent,
    MainComponent
  ],
  entryComponents: [DebugPanelComponent],
  imports: [
    FormsModule,
    BrowserModule,
    routing,
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
  ],
  providers: [
    appRoutingProviders,
    {provide: ErrorHandler, useClass: ErrorHandlerService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
