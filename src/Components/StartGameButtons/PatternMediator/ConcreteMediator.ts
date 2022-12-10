import { AlertStateContext } from "../PatternState/AlertStateContext";
import { StandartJsAlert } from "../PatternState/StandartJsAlert";
import { SweetAlert } from "../PatternState/SweetAlert";
import { Mediator } from "./Interfaces";
import { JoinAuthentication } from "./JoinAuthentication";

export class ConcreteMediator implements Mediator {
    private component1: JoinAuthentication;

    constructor(c1: JoinAuthentication) {
        this.component1 = c1;
        this.component1.setMediator(this);
    }

    public notify(sender: object, event: string): boolean {
        if (event === 'click') {
            if (this.component1.joinButton.lobbyID === "") {
                const givenAlert = new AlertStateContext(new StandartJsAlert(), "Lobby code can NOT be empty");
                givenAlert.alert();
                return true;
            }
            if (this.component1.joinButton.userName === "") {
                const givenAlert = new AlertStateContext(new StandartJsAlert(), "Username can NOT be empty");
                givenAlert.alert();
                return true;
            }
        }

        if (event === 'lobbyIDChange') {
            if (this.component1.joinButton.lobbyID.length > 4) {
                const givenAlert = new AlertStateContext(new SweetAlert(), "Lobby code can NOT be longer than 4 symbols");
                givenAlert.alert();
                return true;
            }
        }

        return false;
    }
}