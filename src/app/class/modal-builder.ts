import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { ComponentRef } from "@angular/core";
import { ModalComponent } from "../components/modal/modal.component";
import { ModalRef } from "../interface/modal-ref";

export class ModalBuilder {
    private modalReference: ComponentRef<ModalComponent> | null = null;
    private overlayRef: OverlayRef | any;
    constructor(private overlay: Overlay, options: ModalRef = {}) {
        this.createModal();
        if (!('getContainer' in options)) {
            options.getContainer = undefined;
        }
        this.changeProperties(options);
        this.modalReference!.instance.afterClose.subscribe(() => this.destroyModal())
    }
    destroyModal(): void {
        if (this.modalReference) {
          this.overlayRef.dispose();
          this.modalReference = null;
        }
      }
    getInstance(): ModalComponent | null {
        return this.modalReference && this.modalReference.instance;
    }
    private changeProperties(options: ModalRef): void {
        if (this.modalReference) {
            Object.assign(this.modalReference.instance, options);
        }
    }

    private createModal(): void {
        this.overlayRef = this.overlay.create();
        this.modalReference = this.overlayRef.attach(new ComponentPortal(ModalComponent));
    }
}
