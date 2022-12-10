import { AlertState } from "./Interafaces";

export class AlertStateContext {
    private currentState: AlertState;
    public alertText: string;
    
    constructor(currentState: AlertState, alertText: string) {
        this.currentState = currentState;
        this.alertText = alertText
    }

    public setState(state: AlertState) {
        this.currentState = state;
    }

    public alert() {
        this.currentState.alert(this.alertText);
    }
}