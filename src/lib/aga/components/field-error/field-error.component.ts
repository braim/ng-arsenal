import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'aga-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FieldErrorComponent implements OnInit {

  constructor() { }

  @Input() errorMsg: string;
  @Input() displayError: boolean;

  ngOnInit() {
  }

}
