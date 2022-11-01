import { Colors } from "../../types";

export class Adapter {
  private colors: Colors;

  constructor(colors: Colors) {
    this.colors = colors;
  }

  public getString = (): string => {
    return this.colors.lava + " " + this.colors.water + " " + this.colors.wall;
  };
}

export class Logger {
  logString = (text: string) => {
    console.log("converted colors interface to string with adapter", text);
  };
}
