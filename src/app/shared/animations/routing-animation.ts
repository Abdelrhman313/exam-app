import { animate, style, transition, trigger } from '@angular/animations';

export const RoutingAnimation = trigger('routing-animation', [
  transition('*<=>*', [
    style({ transform: 'translate(-30%)', opacity: 0 }),
    animate('1s ease'),
    style({ transform: 'translate(0px,0px)', opacity: 1 }),
  ]),
]);
