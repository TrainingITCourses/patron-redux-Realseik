import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { StoreService, GlobalSlideTypes } from '../serviceStore/global-store.service';
import { URL } from '../shared/config';
import { LoadStatuses, LoadLaunches, LoadAgencies, LoadTypes } from '../serviceStore/global-store.actions';

@Injectable()
export class DataService {
  constructor(private http: HttpClient, private global: StoreService) { }

  // ---------    Funciones generales

  public leerValoresCriterio(name) {
    switch (name) {
      case 'Estado':
        this.getEstados();
        break;
      case 'Agencia':
        this.getAgencias();
        break;
      case 'Tipo':
        this.getTipos();
        break;
    }
  }

  public leerLanzamientos(criterio, valor) {
    this.http.get(URL + '/assets/launchlibrary.json').pipe(
      map((res: any) =>
        res.launches.filter(launch => {
          switch (criterio) {
            case 'Agencia':
              return this.filtrarAgencia(launch, Number(valor));
            case 'Estado':
              return this.filtrarEstado(launch, Number(valor));
            case 'Tipo':
              return this.filtrarTipoMision(launch, Number(valor));
          }
        })
      )
    ).subscribe((lanzamientos: any) => {
      this.global.dispatch(new LoadLaunches(lanzamientos));
    });
  }

  // ---------   Filtros a aplicar en la lista de lanzamientos

  private filtrarAgencia(lanzamiento: any, valor: number): boolean {
    if (lanzamiento.lsp) {
      return lanzamiento.lsp.id === valor;
    }
  }
  private filtrarTipoMision(lanzamiento: any, valor: number): boolean {
    if (lanzamiento.missions.length > 0) {
      return lanzamiento.missions[0].type === valor;
    }
  }

  private filtrarEstado(lanzamiento: any, valor: number): boolean {
    return lanzamiento.status === valor;
  }

  // ---------   GETS

  public getCriterios() {
    // Para hacerlo diferente voy a tratarlo como algo 'fijo', asique tan solo necesitariamos una snapshot.
    return this.global.selectSnapShot(GlobalSlideTypes.criterios);
  }

  private getAgencias() {
    const Agencies = this.global.selectSnapShot(GlobalSlideTypes.agencies);
    if (Agencies.length > 0) {
      return [...Agencies];
    } else {
      this.http.get(URL + '/assets/launchagencies.json').pipe(
        map((res: any) => {
          return res.agencies;
        })
      ).subscribe((agencies: any) => {
        this.global.dispatch(new LoadAgencies(agencies));
      });
    }
  }

  private getTipos() {
    const Types = this.global.selectSnapShot(GlobalSlideTypes.types);
    if (Types.length > 0) {
      return [...Types];
    } else {
      this.http.get(URL + '/assets/launchmissions.json').pipe(
        map((res: any) => {
          this.global.dispatch(new LoadTypes(res.types));
        })
      ).subscribe((types: any) => {
        this.global.dispatch(new LoadTypes(types));
      });
    }
  }

  private getEstados() {
    const States = this.global.selectSnapShot(GlobalSlideTypes.statuses);
    if (States.length > 0) {
      return [...States];
    } else {
      this.http.get(URL + '/assets/launchstatus.json').pipe(
        map((res: any) => {
          return res.types;
        })
      ).subscribe((states: any) => {
        this.global.dispatch(new LoadStatuses(states));
      });
    }
  }
}
