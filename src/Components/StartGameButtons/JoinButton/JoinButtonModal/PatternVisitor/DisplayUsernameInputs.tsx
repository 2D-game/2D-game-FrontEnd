import { Component, Visitor } from "./Interfaces";
import { Input, InputAdornment, InputLabel } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

//export class ConcreteComponentA implements Component {
export class DisplayUsernameInputs implements Component {
    public userName: any;
    public handleUserNameChange: any;

    constructor(userName: any, handleUserNameChange: any) {
        this.userName = userName;
        this.handleUserNameChange = handleUserNameChange;
    }

    /**
     * Note that we're calling `visitConcreteComponentA`, which matches the
     * current class name. This way we let the visitor know the class of the
     * component it works with.
     */
    public accept(visitor: Visitor): JSX.Element {
        return visitor.visitDisplayUsernameInputs(this);
    }

    /**
     * Concrete Components may have special methods that don't exist in their
     * base class or interface. The Visitor is still able to use these methods
     * since it's aware of the component's concrete class.
     */
    public exclusiveMethodOfDisplayUsernameInputs(): JSX.Element {
        return (
            <>
                <InputLabel htmlFor="input-with-icon-adornment">
                    Your Username:
                </InputLabel>
                <Input
                    sx={{ marginBottom: 1 }}
                    id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                            <PersonIcon />
                        </InputAdornment>
                    }
                    onChange={this.handleUserNameChange}
                    value={this.userName}
                />
            </>
        );
    }
}