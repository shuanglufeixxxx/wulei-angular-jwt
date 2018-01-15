import { trigger, state, style, animate, transition } from '@angular/animations';
import { AnimationTriggerMetadata } from '@angular/animations';

export const dropDown: AnimationTriggerMetadata = trigger(
  'routeDropDown', [
    state('*', style({
      transform: 'translateY(0vh)'
    })),
    transition('void => *', [
      style({
        transform: 'translateY(-100vh)'
      }),
      animate('200ms ease-out')
    ]),
    transition('* => void', [
      animate('200ms ease-out', style({
        transform: 'translateY(100vh)'
      }))
    ])
  ]
);