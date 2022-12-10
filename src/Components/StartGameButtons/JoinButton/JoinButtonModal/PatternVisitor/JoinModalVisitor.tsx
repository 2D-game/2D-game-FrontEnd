import { Visitor } from "./Interfaces";
import { DisplayUsernameInputs } from "./DisplayUsernameInputs";
import { DisplayEnterLobbyCodeInputs } from "./DisplayEnterLobbyCodeInputs";

export class JoinModalVisitor implements Visitor {


    visitDisplayUsernameInputs(element: DisplayUsernameInputs): JSX.Element {
        return element.exclusiveMethodOfDisplayUsernameInputs();
    }

    visitDisplayEnterLobbyCodeInputs(element: DisplayEnterLobbyCodeInputs): JSX.Element {
        return element.exclusiveMethodOfDisplayEnterLobbyCode();
    }

}