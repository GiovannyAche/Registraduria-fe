import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'seguridad',
      loadChildren: () => import('./seguridad/seguridad.module')
      .then(m => m.SeguridadModule),
    },
    {
      path: 'candidatos',
      loadChildren: () => import('./candidatos/candidatos.module')
      .then(m => m.CandidatosModule),
    },
    {
      path: 'partidos',
      loadChildren: () => import('./partidos/partidos.module')
      .then(m => m.PartidosModule),
    },
    {
      path: 'mesas',
      loadChildren: () => import('./mesas/mesas.module')
      .then(m => m.MesasModule),
    },
    {
      path: 'resultados',
      loadChildren: () => import('./resultados/resultados.module')
      .then(m => m.ResultadosModule),
    },
    
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
