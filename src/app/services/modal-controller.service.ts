import { Injectable, Optional, SkipSelf } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalControllerService {
  private rootOpenModals:[] | null =this.parentService?null:[];

  get openModals(): any{
      return this.parentService ? this.parentService.openModals : this.rootOpenModals!;
  }  
  closeAll():void{
    console.log("this.openModals", this.openModals)
    let i =this.openModals.length;
    while(i--){
      this.openModals[i].close();
    }
  }
  constructor(
    @Optional() @SkipSelf() private parentService:ModalControllerService
  ) { }
}
