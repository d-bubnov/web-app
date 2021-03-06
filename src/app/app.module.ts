import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { ProductsService } from './services/products.service';
import { LogService } from './services/log.service';
import { environment } from 'src/environments/environment';

import { appReducer } from './store/reducers/app.reducers';
import { ProductsEffects } from './store/effects/product.effects';
import { ModalEffects } from './store/effects/modal.effects';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductGetComponent } from './product-get/product-get.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductAddComponent,
    ProductGetComponent,
    ProductEditComponent,
    ModalDialogComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    EffectsModule.forRoot([ProductsEffects, ModalEffects]),
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [
    ProductsService,
    LogService,
  ],
  entryComponents: [
    ConfirmationDialogComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
