import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

export class AgaSingleFieldComponent {
    @Input() public field: FormControl;
    public fieldId:string; // TODO: Identifiers should be generated automatically
}