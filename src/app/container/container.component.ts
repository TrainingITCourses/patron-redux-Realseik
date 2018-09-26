import { DataService } from './../services/data.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { StoreService, GlobalSlideTypes } from '../serviceStore/global-store.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent implements OnInit {
  public criterios: string[];
  public valores: string[];
  public lanzamientos = [];
  private criterio: string;

  constructor(private data: DataService,
    private global: StoreService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.iniciar();
    // HOLA
    // Aqui debo suscribirme al observable de VALORES, que no lo tengo creado
    // de este modo cada vez que se seleccione un criterio, se cambia el estado
    // con los nuevos valores, y saltaria el next aqui.
  }

  iniciar() {
    this.criterios = this.data.getCriterios();
    this.valores = [];
  }

  onCriterioSeleccionado(criterio) {
    this.criterio = criterio;
    this.data.leerValoresCriterio(criterio);
    // this.data.leerValoresCriterio(criterio).subscribe(res => {
    //   this.valores = res;
    //   this.lanzamientos = [];
    //   this.cdRef.detectChanges();
    // });
  }

  onValorSeleccionado(valorCriterio) {
    this.data.leerLanzamientos(this.criterio, valorCriterio).subscribe(res => {
      this.lanzamientos = res;
      //  this.cdRef.detectChanges();
    });
  }
}
