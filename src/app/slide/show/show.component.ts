import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ShowElement } from './show-element';
import { ShowAreaDirective } from './show-area.directive';
import { ShowElementData } from './show-element-data';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  @Input() showElement: ShowElement;

  @ViewChild(ShowAreaDirective) showArea: ShowAreaDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.showElement.component);
    let viewContainerRef = this.showArea.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as ShowElementData).data = this.showElement.data;
  }
}
