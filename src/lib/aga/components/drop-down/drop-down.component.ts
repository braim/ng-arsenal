import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AgaSingleFieldComponent } from '../aga-single-field-component';
@Component({
  selector: 'aga-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent extends AgaSingleFieldComponent implements OnInit {
  @Input() label: string;
  @Input() options: any[] = [];
  @Input() value: string;
  @Input() class:string;
  @Input() errorDefs:any;
  
  constructor() { super(); }
  
  ngOnInit() {
    
  }
}
