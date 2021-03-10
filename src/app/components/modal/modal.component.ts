import { ModalControllerService } from './../../services/modal-controller.service';
import { Overlay } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, Inject, Input, OnInit, Output, TemplateRef, Type, ViewContainerRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  preserveWhitespaces: false,
})
export class ModalComponent  implements OnInit {
  private _visible: boolean = false;
  // private contentComponentRef: ComponentRef<T> | null = null;

  @Input() zIndex = 500;
  @Input() modalTitle:  TemplateRef<{}>  | null = null;
  @Input() modalText: TemplateRef<{}> | null = null;
  @Input() modalFooter:  TemplateRef<{}> | null = null;
  @Input()
  set visible(value: boolean) {this._visible = '' + value !== 'false'; }
  get visible(): boolean { return this._visible; };
  @Output() readonly afterClose = new EventEmitter<any>();

  constructor(
   private modalControllerService: ModalControllerService
  ) {

  }

  ngOnInit(): void {
  }

  closeModal(): void {
      this.modalControllerService.closeAll();
      this.afterClose.emit(true)
  }

  isTemplateRef(value: {}  | null): boolean {
    return value instanceof TemplateRef;
  }
  public isEmptyString(value: {}  | null): boolean {
    return typeof value === 'string' && value !== '';
  }
  public isComponent(value: {} | null): boolean {
    return value instanceof Type;
  }

  
}
