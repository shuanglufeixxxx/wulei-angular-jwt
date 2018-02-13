import { trigger, state, style, animate, transition } from '@angular/animations';
import { AnimationTriggerMetadata } from '@angular/animations';

export function appearDisappear(appearDelay: boolean = false): AnimationTriggerMetadata {
  return trigger('routeAppearDisappear', [
    state('*', style({
      opacity: 1
    })),
    transition('void => *', [
      style({
        position: 'absolute',
        opacity: 0
      }),
      animate('300ms ' + (appearDelay ? '100' : '0') + 'ms ease-in')
    ]),
    transition('* => void', [
      animate('100ms ease-out', style({
        position: 'absolute',
        opacity: 0
      }))
    ])
  ]);
}