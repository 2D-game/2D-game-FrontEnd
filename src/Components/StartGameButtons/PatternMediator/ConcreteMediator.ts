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
                alert("Lobby code can NOT be empty")
                return true;
            }
            if (this.component1.joinButton.userName === "") {
                alert("Username can NOT be empty")
                return true;
            }
        }

        if (event === 'lobbyIDChange') {
            if (this.component1.joinButton.lobbyID.length > 4) {
                alert("Lobby code can NOT be longer than 4 symbols")
                return true;
            }
        }

        return false;
    }
}