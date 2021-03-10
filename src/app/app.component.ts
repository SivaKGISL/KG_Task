import { Router } from '@angular/router';
import { DataService } from './services/data.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'sample';
  constructor(private dataService: DataService, private router: Router) {
  }
  ngOnInit(): void {
    this.dataService.sendGetRequest('process').subscribe((res) => {
      console.log('res',res);
      this.router.navigateByUrl('home');
    })
  }
}
