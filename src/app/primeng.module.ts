import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  exports: [
    InputTextModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    ProgressSpinnerModule
  ]
})
export class PrimeNGModule { }