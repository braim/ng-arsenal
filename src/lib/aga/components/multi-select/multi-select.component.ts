import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, SimpleChange, OnChanges } from '@angular/core';
import { AgaSingleFieldComponent } from '../aga-single-field-component';



export interface DdlListType extends Array<{
  value: string, text: string,
  tag?: any
}> { }

@Component({
  selector: 'aga-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MultiSelectComponent extends AgaSingleFieldComponent implements OnInit, OnChanges {
  @Input() simpleMode = false;
  @Input() label: string;
  @Input() textWhenAllSelected: string;
  @Input() options: DdlListType;
  @Input() class: string;
  @Output() onSelectionChange: EventEmitter<DdlListType> = new EventEmitter<DdlListType>();
  @Input() errorDefs: any;
  @Input() badgeShowLimit = 1;
  @Input() noglyph = false;
  public dropdownList = [];
  public selectedItems = [];
  public dropdownSettings = {};

  constructor() { super(); }

  ngOnInit() {
    this.mapOptionsToDropDownList();

    this.dropdownSettings = {
      singleSelection: false,
      text: this.label,
      text_allselected: this.simpleMode ? undefined : this.textWhenAllSelected,
      selectAllText: 'select all',
      unSelectAllText: 'unselect all',
      enableSearchFilter: !this.simpleMode,
      classes: 'agamultiselect',
      badgeShowLimit: this.badgeShowLimit,
      noglyph: this.noglyph
    };
  }
  mapOptionsToDropDownList() {
    this.dropdownList = [];
    this.selectedItems = [];
    if (!this.options) {
      return;

      // TODO: do we need to throw error?, Is this control useful without options?
      // throw new Error(`multi select component needs "options" input. label is ${this.label}`);
    }
    for (const option of this.options) {
      this.dropdownList.push({ 'value': option.value, 'text': option.text });
    }

    if (this.field.value) {
      for (const selection of this.field.value) {
        const optionfound = this.dropdownList.some((op) => op.value === selection.value);

        if (optionfound) {
          this.selectedItems.push(selection);
        }
      }
    }

    this.field.setValue(this.selectedItems);
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes['options']) {
      this.mapOptionsToDropDownList();
    }
  }

  private fireOnSelectionChange() {
    const output: DdlListType = [];
    for (const selectedItem of this.field.value) {
      output.push(this.options.find((o) => o.value === selectedItem.value));
    }
    this.onSelectionChange.emit(output);
  }
  onItemSelect(item: any) {
    this.fireOnSelectionChange();
  }
  OnItemDeSelect(item: any) {
    this.fireOnSelectionChange();
  }
  onSelectAll(items: any) {
    this.fireOnSelectionChange();
  }
  onDeSelectAll(items: any) {
    this.fireOnSelectionChange();
  }
}
