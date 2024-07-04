class EnumValue {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class Enum {
  public name: string;
  public enumValues: EnumValue[];

  constructor(name: string, enumValues: EnumValue[]) {
    this.name = name;
    this.enumValues = enumValues;
  }
}
