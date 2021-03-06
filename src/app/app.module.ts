import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule, MatIconModule, MatToolbarModule, MatTableModule, MatButtonModule, MatChipsModule, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatDividerModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { EditResourceDialog } from './edit-resource-dialog/edit-resource-dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EditResourceDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule
  ],
  entryComponents: [
    EditResourceDialog
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
