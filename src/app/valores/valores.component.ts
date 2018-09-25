import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-valores",
  templateUrl: "./valores.component.html",
  styleUrls: ["./valores.component.css"]
})
export class ValoresComponent implements OnInit {
  @Input()
  public valoresCriterio: any[];

  @Output()
  valorSeleccionado = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  seleccionado(valor) {
    this.valorSeleccionado.emit(valor.currentTarget.value);
  }
}
