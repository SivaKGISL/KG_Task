import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  image = "https://i.pravatar.cc/150?img=5";
  currentDate = new Date().toISOString();
  constructor(private route: Router) { }

  routeToAppointment() {
    console.log("inside router")
    this.route.navigateByUrl('appointment')
  }
  ngOnInit(): void {
  }

}
