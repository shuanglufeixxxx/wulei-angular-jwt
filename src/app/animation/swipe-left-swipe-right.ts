import { trigger, state, style, animate, transition } from '@angular/animations';
import { AnimationTriggerMetadata } from '@angular/animations';

export function swipeLeftSwipeRight(): AnimationTriggerMetadata {
  return trigger('position', [
    state('left', style({
      transform: 'translateX(-100%)'
    })),
    state('center', style({
      transform: 'translateX(0%)'
    })),
    state('right', style({
      transform: 'translateX(100%)'
    })),
    transition('left<=>center, right<=>center', animate('500ms ease-in-out'))
  ]);
}