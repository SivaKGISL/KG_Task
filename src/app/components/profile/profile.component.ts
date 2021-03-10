import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() showDropDown = false;
  @Input() dragHandle = false;
  @Input() name: string = '';
  @Input() destination: string = '';
  @Input() image: string = '';
  @Input() rounded = true;
  @Input() order: number = 0;
  @Input() badgeOrder = true;
  @Input() showBadge = false;
  @Input() newItem = true;
  constructor() { }

  ngOnInit(): void {
  }

}
