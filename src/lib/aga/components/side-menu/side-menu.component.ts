import { Component, OnInit } from '@angular/core';
import { IMenuItem } from '../../services/menu.service';

@Component({
  selector: 'aga-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  menuitems: Array<IMenuItem> = [
    { text: 'My Dashboard', icon: 'u39.svg', route: '', state: 'selected' },
    { text: 'New Quotes', icon: 'u40.svg', route: '' },
    { text: 'Policies/Quotes', icon: 'u41.svg', route: '' },
    { text: 'Transactions', icon: 'u43.svg', route: '' },
    { text: 'Reporting', icon: 'u42.svg', route: '', state: 'disabled' }
  ];
  constructor() { }

  ngOnInit() {
  }

  select(item: any) {
    if (item.state !== 'disabled') {
      for (let menuitem of this.menuitems) {
        if (menuitem.state !== 'disabled') {
          menuitem.state = (menuitem === item) ? 'selected' : undefined;
        }
      }
    }
  }
}
