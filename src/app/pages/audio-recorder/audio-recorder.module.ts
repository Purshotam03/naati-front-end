import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AudioRecorderPageRoutingModule } from './audio-recorder-routing.module';

import { AudioRecorderPage } from './audio-recorder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AudioRecorderPageRoutingModule
  ],
  declarations: [AudioRecorderPage]
})
export class AudioRecorderPageModule {}
