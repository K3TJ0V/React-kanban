export class column {
  private _id: number;

  private _tittle: string;

  private _taskList: Array<task>;

  constructor(id: number, tittle: string, taskList: Array<task>) {
    this._id = id;
    this._tittle = tittle;
    this._taskList = taskList;
  }

  public get id() {
    return this._id;
  }
  public get tittle() {
    return this._tittle;
  }
  public set tittle(newTittle: string) {
    this._tittle = newTittle;
  }
  public get taskList() {
    return this._taskList;
  }
  public set taskList(newList: Array<task>) {
    this._taskList = newList;
  }
}

export class task {
  private _id: number;

  private _description: string;

  private _shortDesc: string;

  constructor(id: number, desc: string, shortDesc: string) {
    this._id = id;
    this._description = desc;
    this._shortDesc = shortDesc;
  }

  public get id() {
    return this._id;
  }
  public get desc() {
    return this._description;
  }
  public set desc(newDesc: string) {
    this._description = newDesc;
  }
  public get shortDesc() {
    return this._shortDesc;
  }
  public set shortDesc(newShortDesc: string) {
    this._shortDesc = newShortDesc;
  }
}
