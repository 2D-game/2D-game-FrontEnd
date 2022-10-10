export class ButtonModalStrategy{
    public modal: any = <div></div>;

    displayModal(){
        return this.modal;
    }

    setModal(Modal: any){
        this.modal = Modal;
    }
}