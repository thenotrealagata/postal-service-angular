import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'curry',
})
export class CurryPipe implements PipeTransform {
  // Apply arguments to function, to be used in templates
  // As using this pipe will result in the function being called only when the arguments change (or their references)
  transform<T, S>(value: (...args: S[]) => T, ...args: S[]): T {
    return value(...args);
  }
}
