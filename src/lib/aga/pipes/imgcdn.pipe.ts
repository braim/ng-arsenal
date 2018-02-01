import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgcdn'
})
export class ImgcdnPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return 'assets/images/'+value;
  }

}
