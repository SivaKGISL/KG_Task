import { DataService } from './../../services/data.service';
import { ModalService } from './../../services/modal.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { CalenderHeaderComponent } from 'src/app/components/calender-header/calender-header.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface timeSlot  {
  fromTime: string,
  toTime: string,
  disabled: boolean
}
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  @ViewChild('modalHeader') modalHeader: TemplateRef<{}> | string= '' ;
  @ViewChild('modalContent') modalContent: TemplateRef<{}> | string = '';
  @ViewChild('modalFooter') modalFooter: TemplateRef<{}> | string = '';
  @ViewChild('modalAppointmentHeader') modalAppointmentHeader: TemplateRef<{}> | string= '' ;
  @ViewChild('modalAppointmentContent') modalAppointmentContent: TemplateRef<{}> | string = '';
  @ViewChild('modalAppointmentFooter') modalAppointmentFooter: TemplateRef<{}> | string = '';
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
  timeSlotForm: FormGroup = new FormGroup({});
  appointmentForm: FormGroup = new FormGroup({});
  calenderHeader = CalenderHeaderComponent;
  fromTime: number = 0;
  toTime: number = 0;
  datesToBeHighlighted: number[] =[11,15,16];
  added: boolean =  false;
  morningTimeSlot: timeSlot [] = [];
  eveningTimeSlot: timeSlot [] = [];
  currentDate : any;
  constructor(private modalService: ModalService, private dataService: DataService) {
    this.onSelect(this.selectedDate);
  }

  ngOnInit(): void {
    this.timeSlotForm = new FormGroup({
      fromTime: new FormControl('', [Validators.required]),
      toTime: new FormControl({ value: '', disabled: true }, [])
    });
    this.appointmentForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(3), Validators.max(60)]),
      gender: new FormControl('', [Validators.required])
    });
    const timeout = setTimeout(() => {
      this.getTimeSlot();
      clearTimeout(timeout)
    }, 200);
  }

  showModal(fromTime : number, toTime: number): void  {
    this.fromTime = fromTime;
    this.toTime = toTime;
    this.added = false;
    this.modalService.create({
      modalTitle: this.modalHeader,
      modalText: this.modalContent,
      modalFooter: this.modalFooter
    })
  }

  
  showAppointmentModal(fromTime : any, toTime: any): void  {
    this.fromTime = fromTime;
    this.toTime = toTime;
    this.added = false;
    this.modalService.create({
      modalTitle: this.modalAppointmentHeader,
      modalText: this.modalAppointmentContent,
      modalFooter: this.modalAppointmentFooter
    })
  }

  assignID(i: any): any {
    console.log('i', i);
    return i
  }
  onSelect(event: any) {
    console.log(event);
    this.selectedDate = event;
    const dateString = event.toDateString();
    const dateValue = dateString.split(' ');
    this.year = dateValue[3];
    this.DayAndDate = dateValue[0] + ',' + ' ' + dateValue[1] + ' ' + dateValue[2];
    this.currentDate = Number(dateValue[2]);
    this.getTimeSlot();
  }

  onSubmitAppointment() {
    if(this.appointmentForm.valid) {
      const formValue = this.appointmentForm.value;
      const data = {
        ...formValue,
        image: "https://i.pravatar.cc/150?img=10",
        appointment: this.fromTime,
        age: formValue.age +', '+ formValue.gender,
        status: 'queu',
        waited: '10Mins'
      };
      this.dataService.sendPostRequest(data, 'appointments').then((res) => {
        console.log('appointment result', res);
        this.added = true;
      })
    }
  }

  onSubmit() {
    this.timeSlotForm.setErrors(null);
    if(this.timeSlotForm.valid) {
      const fromTime: string = this.timeSlotForm.get('fromTime')?.value;
      const timeArray: string [] = fromTime.split(':');
      if ( this.fromTime <= Number(timeArray[0]) && this.toTime >=  Number(timeArray[0])) {
        let hours: any = 0;
        let minutes: any = Number(timeArray[1]) + 30;
        if (Number(timeArray[0]) >= 24) {
          if (minutes > 60) {
            hours = '0' + 1;
            minutes = ((((minutes - 60) < 10) ? '0' : '') + (minutes - 60))
          } {
            hours = '0' + 0;
          }
        } else {
          hours = Number(timeArray[0]);
          if (minutes > 60) {
            hours = ((((hours + 1) < 10) ? '0' : '') + (hours + 1))
            minutes = ((((minutes - 60) < 10) ? '0' : '') + (minutes - 60))
          }
        }
        const toTime: string = ((hours === '24') ? '00' : hours) + ':' + minutes;
        this.timeSlotForm.get('toTime')?.setValue(toTime);
        const data = {
          fromTime: fromTime,
          toTime: toTime
        };
        this.dataService.sendPostRequest(data, 'users').then((res) => {
          if(res?.error) {
            this.timeSlotForm.setErrors({timeSlotExist: true})
          } else {
            this.added = true;
            this.getTimeSlot();
          }
        })
      } else {
        this.timeSlotForm.setErrors({minMax: true})

      }
    }
  }

  getTimeSlot() {
    this.morningTimeSlot = [];
    this.eveningTimeSlot = [];
    this.dataService.sendGetRequest('users').subscribe((res: any) => {
      const timeSlotArray: any[] = res;
      for (let index = 0; index < timeSlotArray.length; index++) {
        const element = timeSlotArray[index];
        const result =  this.changeHourFormat(element.fromTime);
        element['fromTime'] = result.hours;
        element['disabled'] = result.disabled;
        if( element['fromTime']?.includes('AM')) {
          this.morningTimeSlot.push(element);
        } else {
          this.eveningTimeSlot.push(element);
        }
      }
    })
  }

  changeHourFormat(input: any) {
    let result: any = '' ;
    if(typeof input === 'number') {
      if(input >= 12 ) {
        result =  input + ":00 PM" 
      } else {
        result =  input + ":00 AM"
      }
    } else if(typeof input === 'string'){
      const time = input.split(':');
      let hours: any = Number(time[0]);
      let minutes: any = Number(time[1]);
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      let disabled: boolean = false;
      const currentTime = new Date().getHours();
      const currentDate = new Date().getDate();
      if(currentDate === this.currentDate) {
        disabled = (Number(time[0]) < currentTime)? true: false
      } else {
        disabled = false;
      }
      hours = (((hours < 10)? '0':'') + hours);
      minutes = (((minutes < 10)? '0':'') + minutes);
      result = {
        hours:  hours + ':' + minutes + ' ' + ampm,
        disabled:disabled
      }
    }
    return result
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
