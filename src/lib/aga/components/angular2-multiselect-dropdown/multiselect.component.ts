import {
  Component, OnInit, NgModule, OnChanges, ViewEncapsulation, forwardRef, Input,
  Output, EventEmitter, ElementRef, AfterViewInit, Pipe, PipeTransform, SimpleChanges
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListItem, MyException } from './multiselect.model';
import { DropdownSettings } from './multiselect.interface';
import { ClickOutsideDirective } from './clickOutside';
import { ListFilterPipe } from './list-filter';

export const DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AngularMultiSelect),
  multi: true
};
const noop = () => {
};

@Component({
  selector: 'angular2-multiselect',
  templateUrl: './multiselect.component.html',
  host: { '[class]': 'defaultSettings.classes' },
  styleUrls: ['./multiselect.component.scss'],
  providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR]
})

export class AngularMultiSelect implements OnInit, ControlValueAccessor,OnChanges {

  @Input()
  data: Array<ListItem>;

  @Input()
  settings: DropdownSettings;

  @Output('onSelect')
  onSelect: EventEmitter<ListItem> = new EventEmitter<ListItem>();

  @Output('onDeSelect')
  onDeSelect: EventEmitter<ListItem> = new EventEmitter<ListItem>();

  @Output('onSelectAll')
  onSelectAll: EventEmitter<Array<ListItem>> = new EventEmitter<Array<ListItem>>();

  @Output('onDeSelectAll')
  onDeSelectAll: EventEmitter<Array<ListItem>> = new EventEmitter<Array<ListItem>>();

  @Input()
  selectedItems: Array<ListItem>;

  public isActive = false;
  public isSelectAll = false;
  filter: ListItem = new ListItem();
  defaultSettings: DropdownSettings = {
    singleSelection: false,
    text: 'Select',
    enableCheckAll: true,
    selectAllText: 'select all',
    unSelectAllText: 'unselect all',
    enableSearchFilter: false,
    maxHeight: 300,
    badgeShowLimit: 999999999999,
    classes: '',
    badgeShow: true,
    noglyph: true
  };
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor() {

  }
  ngOnInit() {
    this.settings = Object.assign(this.defaultSettings, this.settings);
  }
  ngOnChanges(changes: SimpleChanges) {

    if (changes.data && changes.data.currentValue !== changes.data.previousValue) {
      this.updateIsSelectAll();

    }
  }
  onItemClick(item: ListItem, index) {

    const found = this.isSelected(item);
    const limit = this.selectedItems.length < this.settings.limitSelection ? true : false;

    if (!found) {
      if (this.settings.limitSelection) {
        if (limit) {
          this.addSelected(item);
          this.onSelect.emit(item);
        }
      } else {
        this.addSelected(item);
        this.onSelect.emit(item);
      }

    } else {
      this.removeSelected(item);
      this.onDeSelect.emit(item);
    }
    this.updateIsSelectAll();
  }
  private updateIsSelectAll() {
    if (this.data && this.selectedItems) {
      if (this.isSelectAll || this.data.length > this.selectedItems.length) {
        this.isSelectAll = false;
      }
      if (this.data.length === this.selectedItems.length) {
        this.isSelectAll = true;
      }
    }
  }


  writeValue(value: any) {
    if (value !== undefined && value !== null) {
      if (this.settings.singleSelection) {
        try {

          if (value.length > 1) {
            this.selectedItems = [value[0]];
            throw new MyException(404, { 'msg': 'Single Selection Mode, Selected Items cannot have more than one item.' });
          } else {
            this.selectedItems = value;
          }
        } catch (e) {
          console.error(e.body.msg);
        }

      } else {
        if (this.settings.limitSelection) {
          this.selectedItems = value.splice(0, this.settings.limitSelection);
        } else {
          this.selectedItems = value;
        }
      }
    } else {
      this.selectedItems = [];
    }
    this.updateIsSelectAll();
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
  trackByFn(index, item) {
    return item.value;
  }
  isSelected(clickedItem: ListItem) {
    let found = false;
    this.selectedItems.forEach(item => {
      if (clickedItem.value === item.value) {
        found = true;
      }
    });
    return found;
  }
  addSelected(item: ListItem) {
    if (this.settings.singleSelection) {
      this.selectedItems = [];
      this.selectedItems.push(item);
    } else {
      this.selectedItems.push(item);
    }
    this.onChangeCallback(this.selectedItems);
  }
  removeSelected(clickedItem: ListItem) {
    this.selectedItems.forEach(item => {
      if (clickedItem.value === item.value) {
        this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
      }
    });
    this.onChangeCallback(this.selectedItems);
  }
  toggleDropdown() {
    this.isActive = !this.isActive;
  }
  closeDropdown() {
    this.isActive = false;
  }
  toggleSelectAll() {
    if (!this.isSelectAll) {
      this.selectedItems = [];
      this.selectedItems = this.data.slice();
      this.isSelectAll = true;
      this.onChangeCallback(this.selectedItems);
      this.onSelectAll.emit(this.selectedItems);
    } else {
      this.selectedItems = [];
      this.isSelectAll = false;
      this.onChangeCallback(this.selectedItems);
      this.onDeSelectAll.emit(this.selectedItems);
    }
  }
  private isNotEmptyAndAllSelected(): boolean {
    return !(!(this.data && this.selectedItems && this.selectedItems.length === this.data.length && this.data.length > 0));

  }

  get justSayAll(): boolean {
    return this.isNotEmptyAndAllSelected() && this.settings.text_allselected && this.settings.badgeShow;
  }
}
