import { DataService } from './services/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LanzamientosComponent } from './lanzamientos/lanzamientos.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { CriterioComponent } from './criterio/criterio.component';
import { ValoresComponent } from './valores/valores.component';
import { ContainerComponent } from './container/container.component';

@NgModule({
  declarations: [
    AppComponent,
    LanzamientosComponent,
    BuscadorComponent,
    CriterioComponent,
    ValoresComponent,
    ContainerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
