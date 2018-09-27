import { Injectable } from "@angular/core";
import { globalInitialState } from "./models/global-store.model";
import { BehaviorSubject } from "rxjs";
import { globalStoreReducer } from "./global-store.reducer";
import { GlobalActions, GlobalActionTypes } from "./global-store.actions";

@Injectable({
  providedIn: "root"
})
export class StoreService {
  private store = { ...globalInitialState };
  private launches$ = new BehaviorSubject<any>(this.store.launches);
  private statuses$ = new BehaviorSubject<any>(this.store.statuses);
  private types$ = new BehaviorSubject<any>(this.store.types);
  private agencies$ = new BehaviorSubject<any>(this.store.agencies);
  private criterios$ = new BehaviorSubject<any>(this.store.criterios);
  private valores$ = new BehaviorSubject<any>(this.store.valores);

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
      case GlobalSlideTypes.valores:
        return this.valores$.asObservable();
    }
  }

  public selectSnapShot = (slice: GlobalSlideTypes) => {
    switch (slice) {
      case GlobalSlideTypes.launches:
        return [...this.store.launches];
      case GlobalSlideTypes.statuses:
        return [...this.store.statuses];
      case GlobalSlideTypes.types:
        return [...this.store.types];
      case GlobalSlideTypes.agencies:
        return [...this.store.agencies];
      case GlobalSlideTypes.criterios:
        return [...this.store.criterios];
      case GlobalSlideTypes.valores:
        return [...this.store.valores];
    }
  }

  public dispatch = (action: GlobalActions) => {
    this.store = globalStoreReducer(this.store, action);
    switch (action.type) {
      case GlobalActionTypes.LoadLaunches:
        this.launches$.next([...this.store.launches]);
        break;
      case GlobalActionTypes.LoadStatuses:
        this.valores$.next([...this.store.statuses]);
        // this.statuses$.next([...this.state.statuses]); ¿Se podria emitir por 2 observables si fuera necesario o es una mala practica?
        break;
      case GlobalActionTypes.LoadTypes:
        this.valores$.next([...this.store.types]);
        // this.types$.next([...this.state.types]);
        break;
      case GlobalActionTypes.LoadAgencies:
        this.valores$.next([...this.store.agencies]);
        // this.agencies$.next([...this.state.agencies]);
        break;
      case GlobalActionTypes.LoadValores:
        this.valores$.next([...this.store.valores]);
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
  valores = 'valores'
}
