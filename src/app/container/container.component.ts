import { DataService } from './../services/data.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import {
  StoreService,
  GlobalSlideTypes
} from '../serviceStore/global-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent implements OnInit {
  public criterios: string[];
  public valores$: Observable<any>;
  public lanzamientos$: Observable<any>;
  public lanzamientos = [];
  private criterio: string;

  constructor(
    private data: DataService,
    private global: StoreService
  ) { }

  ngOnInit() {
    this.iniciar();
    this.valores$ = this.global.select$(GlobalSlideTypes.valores);
    this.lanzamientos$ = this.global.select$(GlobalSlideTypes.launches);
  }

  iniciar() {
    this.criterios = this.data.getCriterios();
  }

  onCriterioSeleccionado(criterio) {
    this.criterio = criterio;
    this.data.leerValoresCriterio(criterio);
  }

  onValorSeleccionado(valorCriterio) {
    this.data.leerLanzamientos(this.criterio, valorCriterio);
  }
}
