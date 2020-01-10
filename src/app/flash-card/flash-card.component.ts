import { Component, Input } from '@angular/core';

@Component({
  selector: 'flash-card',
  templateUrl: 'flash-card.component.html'
})
export class FlashCardComponent {

  @Input('isFlipped') flipCard: boolean;

  constructor() {

  }

}