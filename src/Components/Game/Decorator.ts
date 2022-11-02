export interface DataSource {
  printString(): string;
}

export class ConcreteDataSource implements DataSource {
  public printString(): string {
    return "Decoratable object";
  }
}

export class Decorator implements DataSource {
  protected dataSource: DataSource;

  constructor(component: DataSource) {
    this.dataSource = component;
  }

  public printString(): string {
    return this.dataSource.printString();
  }
}

export class FirstDecorator extends Decorator {
  public printString(): string {
    return `Decorated first way (${super.printString()})`;
  }
}

export class SecondDecorator extends Decorator {
  public printString(): string {
    return `Decorated second way (${super.printString()})`;
  }
}

export function clientCode(component: DataSource) {
  console.log(`DECORATOR: ${component.printString()}`);
}
