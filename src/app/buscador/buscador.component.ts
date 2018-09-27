import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from "@angular/core";

@Component({
  selector: "app-buscador",
  templateUrl: "./buscador.component.html",
  styleUrls: ["./buscador.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuscadorComponent implements OnInit {
  public aux: any[];

  @Input()
  public criterios = [];
  @Input()
  public valoresCriterio = [];

  @Output()
  criterioSeleccionado = new EventEmitter<string>();
  @Output()
  valorSeleccionado = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onCriterioSeleccionado(evt) {
    this.criterioSeleccionado.emit(evt);
  }

  onValorSeleccionado(evt) {
    this.valorSeleccionado.emit(evt);
  }
}
