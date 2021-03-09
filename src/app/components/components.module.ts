import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { CalenderHeaderComponent } from './calender-header/calender-header.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ModalComponent } from './modal/modal.component';
import { ModalControllerService } from '../services/modal-controller.service';
import { ModalService } from '../services/modal.service';


@NgModule({
  declarations: [NavbarComponent, ProfileComponent, BreadcrumbComponent, CalenderHeaderComponent, ModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  providers: [
    ModalService,
    ModalControllerService,
  ],
  exports: [NavbarComponent, ProfileComponent, BreadcrumbComponent,CalenderHeaderComponent, ModalComponent]
})
export class ComponentsModule { }
