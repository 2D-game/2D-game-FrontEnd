import { AlertState } from "./Interafaces";

export class StandartJsAlert implements AlertState {

    public alert(alertText: string) {
        return (
            alert(alertText)
        );
    }
}