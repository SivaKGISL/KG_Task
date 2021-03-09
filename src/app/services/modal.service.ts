import { Overlay } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { ModalBuilder } from '../class/modal-builder';
import { ModalRef } from '../interface/modal-ref';
import { ModalControllerService } from './modal-controller.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private overlay: Overlay, private modalControl: ModalControllerService) { }
  closeAll(): void {
    this.modalControl.closeAll();
  }
  get openModals(): ModalRef[] {
    return this.modalControl.openModals;
  }
  create<T>(options: ModalRef<T>= {}) {
    const modalRef = new ModalBuilder(this.overlay, options).getInstance()!;
    return modalRef;
  }
}
