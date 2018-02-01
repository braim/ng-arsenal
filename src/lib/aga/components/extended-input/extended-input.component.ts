import { Component, OnInit, OnChanges, ViewEncapsulation, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { error } from 'util';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'aga-extended-input',
  templateUrl: './extended-input.component.html',
  styleUrls: ['./extended-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExtendedInputComponent implements OnInit {

  constructor() { }
  @Input() label = '';
  @Input() field: FormControl;
  @Input() errorDefs: any;
  @Input() class: string;

  errorMessage = '';

  ngOnInit(): void {
    if (!this.errorDefs && this.field && this.field.validator) {
      LoggerService.logDebug(`extended input used without defining errorDefs label=${this.label}`, 'ExtendedInputComponent');
    }
  }
  notEmpty(a: any): boolean {
    if (!a) {
      return false;
    }
    return Object.keys(a).length > 0;
  }
  summarize(a: any): string {
    let result = null;
    if (a && this.errorDefs) {
      Object.keys(this.errorDefs).some(key => {
        if (a[key]) {
          result = this.errorDefs[key];
          return true;
        }
      });
    }
    return result;
  }

  isFieldInvalid(field: FormControl) {
    return field.errors && this.notEmpty(field.errors) && field.touched;
  }
  getClass() {
    return {
      'has-error': this.isFieldInvalid(this.field),
      'has-feedback': this.isFieldInvalid(this.field),
      'required': this.field.errors && this.field.errors.required
    };
  }
}
