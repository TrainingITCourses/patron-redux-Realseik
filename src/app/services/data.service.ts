import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, pipe } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable()
export class DataService {
  public agencias: any[];
  public misiones: any[];
  public estados: any[];

  // Fijos
  private url = "http://localhost:4200";
  private criterios = ["Estado", "Agencia", "Tipo"];
  public lanzamientos: any[];
  constructor(private http: HttpClient) {}

  public getCriterios() {
    return this.criterios;
  }

  public leerValoresCriterio(name): Observable<any[]> {
    switch (name) {
      case "Estado":
        return this.getEstados();
      case "Agencia":
        return this.getAgencias();
      case "Tipo":
        return this.getMisiones();
    }
  }

  public leerLanzamientos(criterio, valor): Observable<any[]> {
    return this.http.get(this.url + "/assets/launchlibrary.json").pipe(
      map((res: any) =>
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

  private getAgencias(): Observable<any[]> {
    return this.http
      .get(this.url + "/assets/launchagencies.json")
      .pipe(map((res: any) => res.agencies));
  }

  private getMisiones(): Observable<any> {
    var i = console.log;
    i("hola");
    return this.http.get(this.url + "/assets/launchmissions.json").pipe(
      map((res: any) => {
        return res.types;
      })
    );
  }

  private getEstados(): Observable<any[]> {
    return this.http.get(this.url + "/assets/launchstatus.json").pipe(
      map((res: any) => res.types)
      // tap((res: any[]) => (this.estados = res))
    );
  }
}
