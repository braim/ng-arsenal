export class LoggerService {

  static LogLevel = {
    'Debug': 1,
    'Info': 2,
    'Warning': 3,
    'Error': 4
  };
  static treatAsIE8 = false;
  static loggingLevel = 0;

  static setLogLevel(level: number) {
    LoggerService.loggingLevel = level;
  }
  static canLog(testLevel) {
    return testLevel >= LoggerService.loggingLevel;
  }
  static checkParams(title: string, message, source) {
    if (!message) {
      throw new Error('Logger.logInfo: called with empty message');
    }
    if (!source) {
      throw new Error('Logger.logInfo: called with empty source');
    }
  }

  static logDebug(message, source, data?: any) {
    this.log(message, source, data, 'Debug');
  }
  static logInfo(message, source, data?: any) {
    this.log(message, source, data, 'Info');
  }

  static logWarning(message, source, data?: any) {
    this.log(message, source, data, 'Warning');
  }
  static logError(message, source, data?: any) {
    this.log(message, source, data, 'Error');
  }
  private static log(message, source, data, level: string) {

    this.checkParams('Logger.log' + level, message, source);
    if (!this.canLog(LoggerService.LogLevel[level])) {
      return;
    }

    source = source ? '[' + source + '] ' : '';
    if (console.info && console.warn && console.error && LoggerService.LogLevel[level] > 1) {
      // we are probably in Chrome/FF. user the nice logging colors there
      switch (level) {
        case 'Warning':
          console.warn(source, message, data);
          break;
        case 'Info':
          // tslint:disable-next-line:no-console
          console.info(source, message, data);
          break;
        case 'Error':
          console.error(source, message, data);
          break;
      }
      return;
    } else {
      if (data) {
        this.logPolyfill(source, message, data);
      } else {
        this.logPolyfill(source, message);
      }
    }
  }

  static logPolyfill(...args: any[]) {
    try {
      const slice = Array.prototype.slice;
      // Modern browsers
      if (typeof console !== 'undefined' && typeof console.log === 'function') {

        // Opera 11
        if (window['opera']) {
          let i = 0;
          while (i < arguments.length) {
            console.log('Item ' + (i + 1) + ': ' + arguments[i]);
            i++;
          }
        }

        // All other modern browsers
        else if ((slice.call(arguments)).length === 1 && typeof slice.call(arguments)[0] === 'string') {
          console.log((slice.call(arguments)).toString());
        } else {
          console.log.apply(console, slice.call(arguments).toString());
        }
      }

      // IE8
      else if ((!Function.prototype.bind || LoggerService.treatAsIE8)
      && typeof console !== 'undefined' && typeof console.log === 'object') {
        Function.prototype.call.call(console.log, console, slice.call(arguments));
      }

      // IE7 and lower, and other old browsers
    } catch (ignore) { }
  }
}
