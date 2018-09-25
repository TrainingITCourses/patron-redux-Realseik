import { ChangeDetectionStrategy, Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-criterio',
  templateUrl: './criterio.component.html',
  styleUrls: ['./criterio.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush  
})
export class CriterioComponent implements OnInit {

  @Input() public criterios = [];

  @Output() criterioSeleccionado = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  seleccionado(evt) {
    console.log(evt.currentTarget.value);
    this.criterioSeleccionado.emit(evt.currentTarget.value);    
  }
}
