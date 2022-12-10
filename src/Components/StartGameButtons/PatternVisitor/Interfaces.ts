import { DisplayUsernameInputs } from "./DisplayUsernameInputs";
import { DisplayEnterLobbyCodeInputs } from "./DisplayEnterLobbyCodeInputs";

export interface Component {
    accept(visitor: Visitor): JSX.Element;
}

export interface Visitor {
    visitDisplayUsernameInputs(element: DisplayUsernameInputs): JSX.Element;

    visitDisplayEnterLobbyCodeInputs(element: DisplayEnterLobbyCodeInputs): JSX.Element;
}