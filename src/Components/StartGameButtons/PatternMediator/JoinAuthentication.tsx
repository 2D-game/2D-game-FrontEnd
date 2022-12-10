import { Component } from "./Component";

export class JoinAuthentication extends Component {
    public joinButton: {
        userName: string;
        lobbyID: string;
    };

    constructor(joinButton: { userName: string, lobbyID: string }) {
        super();
        this.joinButton = joinButton;
    }

    public checkIfTextBoxNotClear(): boolean {
        return this.mediator.notify(this, 'click');
    }

    public checkIfLobbyIDIsWrittenCorrectly(): boolean {
        return this.mediator.notify(this, 'lobbyIDChange');
    }
}