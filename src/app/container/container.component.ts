import { DataService } from './../services/data.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

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

  constructor(private data: DataService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.iniciar();
  }

  iniciar() {
    this.criterios = this.data.getCriterios();
    this.valores = [];
  }

  onCriterioSeleccionado(criterio) {
    this.criterio = criterio;
    this.data.leerValoresCriterio(criterio).subscribe(res => {
      this.valores = res;
      // Un cambio de criterio debe limpiar los lanzamientos; hay que repintar los 2 componentes hijo
      this.lanzamientos = [];
      this.cdRef.detectChanges();
    });
  }

  onValorSeleccionado(valorCriterio) {
    this.data.leerLanzamientos(this.criterio, valorCriterio).subscribe(res => {
      this.lanzamientos = res;
    //  this.cdRef.detectChanges();
    });
  }
}
