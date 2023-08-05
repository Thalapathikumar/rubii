import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CounterInputComponent } from './counter-input/counter-input.component';
import { SliderComponent } from './slider/slider.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    CounterInputComponent,
    SliderComponent
  ],
  exports: [
    CounterInputComponent,
    SliderComponent
  ]
})
export class ComponentsModule {}