import swal from "sweetalert";
import { AlertState } from "./Interafaces";

export class SweetAlert implements AlertState {

    public alert(alertText: string) {
        return (
            swal(alertText)
        );
    }
}