import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  StoreService,
  GlobalSlideTypes
} from "../serviceStore/global-store.service";
import { URL } from "../shared/config";
import {
  GlobalActionTypes,
  GlobalActions,
  LoadStatuses,
  LoadLaunches,
  LoadAgencies,
  LoadValores
} from "../serviceStore/global-store.actions";

@Injectable()
export class DataService {
  public agencias: any[];
  public misiones: any[];
  public estados: any[];

  // Fijos
  public lanzamientos: any[];
  constructor(private http: HttpClient, private global: StoreService) {}

  public getCriterios() {
    // Como es 'fijo', tan solo necesitariamos una snapshot.
    return this.global.selectSnapShot(GlobalSlideTypes.criterios);
  }

  public leerValoresCriterio(name) {
    switch (name) {
      case "Estado":
        this.getEstados();
        break;
      case "Agencia":
        this.getAgencias();
        break;
      case "Tipo":
        this.getMisiones();
        break;
    }
  }

  public leerLanzamientos(criterio, valor) {
    this.http.get(URL + "/assets/launchlibrary.json").pipe(
      map((res: any) =>
        this.global.dispatch(
          new LoadValores(
            res.launches.filter(launch => {
              switch (criterio) {
                case "Agencia":
                  return this.filtrarAgencia(launch, Number(valor));
                case "Estado":
                  return this.filtrarEstado(launch, Number(valor));
                case "Tipo":
                  return this.filtrarTipoMision(launch, Number(valor));
              }
            })
          )
        )
      )
    );
  }

  private filtrarAgencia(lanzamiento: any, valor: number): boolean {
    if (lanzamiento.lsp) {
      return lanzamiento.lsp.id == valor;
    }
  }
  private filtrarTipoMision(lanzamiento: any, valor: number): boolean {
    if (lanzamiento.missions.length > 0) {
      return lanzamiento.missions[0].type == valor;
    }
  }

  private filtrarEstado(lanzamiento: any, valor: number): boolean {
    return lanzamiento.status === valor;
  }

  private getAgencias() {
    return this.http.get(URL + "/assets/launchagencies.json").pipe(
      map((res: any) => {
        this.global.dispatch(new LoadAgencies(res.agencies));
      })
    );
  }

  private getMisiones(): Observable<any> {
    return this.http.get(URL + "/assets/launchmissions.json").pipe(
      map((res: any) => {
        this.global.dispatch(new LoadLaunches(res.types));
      })
    );
  }

  private getEstados() {
    this.http.get(URL + "/assets/launchstatus.json").pipe(
      map((res: any) => {
        console.log(res);
        this.global.dispatch(new LoadStatuses(res.types));
      })
    );
  }
}
