import {RequestMethod} from '@angular/http';

export function methodToString(method: RequestMethod){
  switch(method){
    case RequestMethod.Get:
      return 'GET';
    case RequestMethod.Post:
      return 'POST';
    case RequestMethod.Put:
      return 'PUT';
    case RequestMethod.Delete:
      return 'DELETE';
    case RequestMethod.Options:
      return 'OPTIONS';
    case RequestMethod.Head:
      return 'HEAD';
    case RequestMethod.Patch:
      return 'PATCH';
    default:
      return 'UNKNOWN';
  }
}
