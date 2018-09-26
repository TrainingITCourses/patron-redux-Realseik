import { DataService } from "./../services/data.service";
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef
} from "@angular/core";
import {
  StoreService,
  GlobalSlideTypes
} from "../serviceStore/global-store.service";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent implements OnInit {
  public criterios: string[];
  public valores: string[];
  public lanzamientos = [];
  private criterio: string;

  constructor(
    private data: DataService,
    private global: StoreService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.iniciar();
    this.global
      .select$(GlobalSlideTypes.valores)
      .subscribe(valores => (this.valores = valores));

    this.global
      .select$(GlobalSlideTypes.launches)
      .subscribe(lanzamientos => (this.lanzamientos = lanzamientos));
  }

  iniciar() {
    this.criterios = this.data.getCriterios();
    this.valores = [];
  }

  onCriterioSeleccionado(criterio) {
    this.criterio = criterio;
    this.data.leerValoresCriterio(criterio);
  }

  onValorSeleccionado(valorCriterio) {
    this.data.leerLanzamientos(this.criterio, valorCriterio);
  }
}
