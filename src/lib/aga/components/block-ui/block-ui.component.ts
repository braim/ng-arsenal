import { Component, Input } from '@angular/core';

@Component({
  selector: 'aga-block-ui',
  templateUrl: './block-ui.component.html',
  styleUrls:['./block-ui.component.scss']
})
export class BlockUiComponent {
  constructor() { }
  @Input() waitingcover = false;
  @Input() glyphicon = false;
}
