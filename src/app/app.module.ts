import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeKeycloak } from './core/init/keycloak-init.factory';
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { ErrorInterceptor } from "./core/interceptors/error-interceptor";

import { ChartOfAccountsModule } from './features/chart-of-accounts/chart-of-accounts.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { FinancialStatementsModule } from './features/financial-statements/financial-statements.module';
import { JournalBookModule } from './features/journal-book/journal-book.module';
import { JournalEntryModule } from './features/journal-entry/journal-entry.module';
import { LedgerBookModule } from './features/ledger-book/ledger-book.module';
import { SupportModule } from './features/support/support.module';
import { UserAccountsModule } from './features/user-accounts/user-accounts.module';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartOfAccountsModule,
    DashboardModule,
    FinancialStatementsModule,
    JournalBookModule,
    JournalEntryModule,
    LedgerBookModule,
    SupportModule,
    UserAccountsModule,
    KeycloakAngularModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: MessageService,
      useClass: MessageService
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
