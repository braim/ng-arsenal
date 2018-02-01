import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable()
export class IdManagerService {
  constructor() {
    this.debugMode = true; // TODO : get from environment
  }
  debugMode = false;
  idPrefix_default = 'aga-';
  idPrefix = this.idPrefix_default;
  useFdf;
  ids = {};
  // Only for unit testing: wrapped in debug flag.
  debugUnitTestingReset() {
    if (this.debugMode) {
      this.idPrefix = this.idPrefix_default;
      this.ids = {};
    }
  }

  useFdfWherePossible() {
    return this.useFdf;
  }

  initialise(base, useFdfWherePossible) {
    if (base) {
      this.idPrefix += base + '-';
    }
    this.useFdf = useFdfWherePossible;
  }

  // Generates a sanitised id based on the string unput.
  public generateId(label, doIncrement) {
    const sanitisedLabel = this.sanitise(label);
    const id = this.generateIdInternal(sanitisedLabel, doIncrement);
    return id;
  }

  // Private functions
  private sanitise(label) {
    return label.toLowerCase()
      .replace(/[^a-z0-9 -]/gi, ' ')
      .replace(/[ -]+/g, '-')
      .replace(/^[0-9-]+/, '');
  }
  private generateIdInternal(label, doIncrement) {
    let index = 1;
    if (this.ids[label]) {
      if (doIncrement) {
        index = ++this.ids[label];
      } else {
        throw new Error('IdManager.generateId: id has already been generated for label ' + label);
      }
    } else {
      this.ids[label] = index;
    }
    const id = this.idPrefix + label + '-' + index;
    if (this.debugMode && window['$'] &&  window['$']('#' + id).length > 0) {
      LoggerService.logError('IdManager has generated an id that already exists on the screen', 'IdManager.generateId', { id: id });
      // tslint:disable-next-line:no-debugger
      debugger;
    }
    return id;
  }
}
