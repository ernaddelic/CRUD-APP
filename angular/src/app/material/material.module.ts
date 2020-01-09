import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import { 
  MatInputModule, 
  MatOptionModule, 
  MatSelectModule,
  MatCardModule,
  MatTabsModule,
  MatCheckboxModule,
  MatIconModule,
  MatToolbarModule,
  MatGridListModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule
  } from '@angular/material';

  const MaterialComponents = [
    MatInputModule, 
    MatOptionModule, 
    MatSelectModule,
    MatCardModule,
    MatTabsModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    MatMenuModule,
    MatToolbarModule,
    MatGridListModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule
  ]

@NgModule({
  imports: [
    MaterialComponents  
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }
