import { Component, Visitor } from "./Interfaces";
import { Input, InputAdornment, InputLabel } from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

//export class ConcreteComponentB implements Component {
export class DisplayEnterLobbyCodeInputs implements Component {
    public lobbyID: any;
    public handleLobbyIDChange: any;

    constructor(lobbyID: any, handleLobbyIDChange: any) {
        this.lobbyID = lobbyID;
        this.handleLobbyIDChange = handleLobbyIDChange;
    }
    /**
     * Same here: visitConcreteComponentB => ConcreteComponentB
     */
    public accept(visitor: Visitor): JSX.Element {
        return visitor.visitDisplayEnterLobbyCodeInputs(this);
    }

    public exclusiveMethodOfDisplayEnterLobbyCode(): JSX.Element {
        return (
            <>
                <InputLabel htmlFor="input-with-icon-adornment">
                    Enter lobby code:
                </InputLabel>
                <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                            <MeetingRoomIcon />
                        </InputAdornment>
                    }
                onChange={this.handleLobbyIDChange}
                value={this.lobbyID}
                />
            </>
        )
    }
}