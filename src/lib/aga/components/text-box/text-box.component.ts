import { Component, OnInit, Input } from '@angular/core';
import { AgaSingleFieldComponent } from '../aga-single-field-component';

@Component({
  selector: 'aga-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent extends AgaSingleFieldComponent implements OnInit {
  @Input() label: string;
  @Input() value: string;
  @Input() class: string;
  @Input() placeholder:string;
  @Input() errorDefs:any ;
  constructor() { super(); }

  ngOnInit() {
  }

}
