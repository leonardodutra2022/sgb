import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private subject = new Subject<any>();

  constructor() { }

  public fetching(isFetching){
    this.subject.next({isFetching});
  }

  public isFetching(){
    return this.subject.pipe(switchMap(
      (
        { isFetching }) => of({ isFetching })
      )
    );
  }
}
