import { OverlayRef } from "@angular/cdk/overlay";
import { TemplateRef, Type } from "@angular/core";

export interface ModalRef<T= any> {
    modalTitle?: string|TemplateRef<{}>|Type<T>;
    modalText ?: string | TemplateRef<{}> | Type<T>;
    modalFooter ?: string | TemplateRef<{}>|Type<T> ;
    getContainer ?: HTMLElement | OverlayRef | (() => HTMLElement | OverlayRef);

}
