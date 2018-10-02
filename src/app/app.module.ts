import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { ErrorHandlerService } from './services/error-handler.service';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { DebugPanelComponent } from './debug-panel/debug-panel.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ButtonsModule } from 'ngx-bootstrap';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { BackendService } from './services/backend.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    DebugPanelComponent,
    MainComponent,
    LoginComponent
  ],
  entryComponents: [DebugPanelComponent],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    RouterModule
  ],
  exports: [
    LoginComponent
   ],
  providers: [
    AuthService,
    appRoutingProviders,
    BackendService,

    { provide: ErrorHandler,
      useClass: ErrorHandlerService }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
