import { ModalService } from './../../services/modal.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { CalenderHeaderComponent } from 'src/app/components/calender-header/calender-header.component';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  @ViewChild('modalHeader') modalHeader: TemplateRef<{}> | string= '' ;
  @ViewChild('modalContent') modalContent: TemplateRef<{}> | string = '';
  @ViewChild('modalFooter') modalFooter: TemplateRef<{}> | string = '';
  breadCrumpList = [
    {name: "Home", route: '/home'},
    {name: "Appointment", route: '/appointment'}
  ];
  selectedDate = new Date();
  startAt = new Date();
  minDate = new Date();
  maxDate = new Date(new Date().setMonth(new Date().getMonth()+1));
  year: any;
  DayAndDate: string | undefined;

  calenderHeader = CalenderHeaderComponent
  day1 = new Date('2021/03/23');
  day2 = new Date('2021/03/14');

  datesToBeHighlighted: number[] =[11,15,16];

  constructor(private modalService: ModalService) {
    this.onSelect(this.selectedDate);
   }

  ngOnInit(): void {
   
  }

  showModal(): void  {
    this.modalService.create({
      modalTitle: this.modalHeader,
      modalText: this.modalContent,
      modalFooter: this.modalFooter
    })
  }

  onSelect(event: any) {
    console.log(event);
    this.selectedDate = event;
    const dateString = event.toDateString();
    const dateValue = dateString.split(' ');
    this.year = dateValue[3];
    this.DayAndDate = dateValue[0] + ',' + ' ' + dateValue[1] + ' ' + dateValue[2];
  }

  myDateFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6 ;
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return (this.datesToBeHighlighted.includes(date)) ? 'special-date' : '';
    }

    return '';
  }

}
