import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AgaSingleFieldComponent } from '../aga-single-field-component';
import { IdManagerService } from '../../services/id-manager.service';
import { LoggerService } from '../../services/logger.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
declare var jQuery: any;
@Component({
  selector: 'aga-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent extends AgaSingleFieldComponent implements OnInit, AfterViewInit {
  @ViewChild('in') inputVC: ElementRef;
  @Input() label: string;
  @Input() value: string;
  @Input() class: string;
  @Input() errorDefs: any;

  constructor(private idmanager: IdManagerService) { super(); }

  ngOnInit() {
    if (!this.fieldId) {
      this.fieldId = this.idmanager.generateId(this.label ? 'datep-' + this.label : 'datep', true);
    }
  }
  ngAfterViewInit() {
    const element = this.inputVC.nativeElement;
    const formCtrl = this.field;
    // Because jQuery will change value through JavaScript, we need this hook to update FormControl accordingly
    // so that things work correctly
    jQuery(element).datepicker({
      dateFormat: 'dd/mm/yy',
      onSelect: function (dateText) {
        formCtrl.setValue(this.value);
      }
    });
  }
  setFocus() {
    this.inputVC.nativeElement.focus();
  }
  onInputBlur() {
    const val = this.field.value;
    const isnum: Boolean = /^\d+$/.test(val);

    if (isnum && val.length === 8) {
      this.field.setValue(val.slice(0, 2) + '/' + val.slice(2, 4) + '/' + val.slice(4));
    }
  }
}
