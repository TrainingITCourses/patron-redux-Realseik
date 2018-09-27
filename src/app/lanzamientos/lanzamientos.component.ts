import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'app-lanzamientos',
  templateUrl: './lanzamientos.component.html',
  styleUrls: ['./lanzamientos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanzamientosComponent implements OnInit {
  public lanzs: any[];

  @Input()
  public lanzamientos: any[];

  constructor() { }

  ngOnInit() {
    this.lanzamientos = [];
  }

}
