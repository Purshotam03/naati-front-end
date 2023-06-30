import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AudioRecorderPage } from './audio-recorder.page';

const routes: Routes = [
  {
    path: '',
    component: AudioRecorderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudioRecorderPageRoutingModule {}
