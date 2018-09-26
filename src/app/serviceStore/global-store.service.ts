import { Injectable } from '@angular/core';
import { globalInitialState } from './models/global-store.model';
import { BehaviorSubject } from 'rxjs';
import { globalStoreReducer } from './global-store.reducer';
import { GlobalActions, GlobalActionTypes } from './global-store.actions';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private state = { ...globalInitialState };
  private launches$ = new BehaviorSubject<any>(this.state.launches);
  private statuses$ = new BehaviorSubject<any>(this.state.statuses);
  private types$ = new BehaviorSubject<any>(this.state.types);
  private agencies$ = new BehaviorSubject<any>(this.state.agencies);
  private criterios$ = new BehaviorSubject<any>(this.state.criterios);

  constructor() { }

  public select$(slice: GlobalSlideTypes) {
    switch (slice) {
      case GlobalSlideTypes.agencies:
        return this.agencies$.asObservable();
      case GlobalSlideTypes.types:
        return this.types$.asObservable();
      case GlobalSlideTypes.statuses:
        return this.statuses$.asObservable();
      case GlobalSlideTypes.launches:
        return this.launches$.asObservable();
      case GlobalSlideTypes.criterios:
        return this.criterios$.asObservable();
    }
  }

  public selectSnapShot = (slice: GlobalSlideTypes) => {
    switch (slice) {
      case GlobalSlideTypes.launches:
        return [...this.state.launches];
      case GlobalSlideTypes.statuses:
        return [...this.state.statuses];
      case GlobalSlideTypes.types:
        return [...this.state.types];
      case GlobalSlideTypes.agencies:
        return [...this.state.agencies];
      case GlobalSlideTypes.criterios:
        return [...this.state.criterios];
    }
  }

  public dispatch = (action: GlobalActions) => {
    console.log('dispatching...', action);
    this.state = globalStoreReducer(this.state, action);
    switch (action.type) {
      case GlobalActionTypes.LoadLaunches:
        this.launches$.next([...this.state.launches]);
        break;
      case GlobalActionTypes.LoadStatuses:
        this.statuses$.next([...this.state.statuses]);
        break;
      case GlobalActionTypes.LoadTypes:
        this.types$.next([...this.state.types]);
        break;
      case GlobalActionTypes.LoadAgencies:
        this.agencies$.next([...this.state.agencies]);
        break;
    }
  }

}

export enum GlobalSlideTypes {
  launches = 'launches',
  statuses = 'statuses',
  types = 'types',
  agencies = 'agencies',
  criterios = 'criterios',
}
