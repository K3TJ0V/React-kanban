export class column {
  private id: number;

  private tittle: string;

  private taskList: Array<task>;

  constructor(id: number, tittle: string, taskList: Array<task>) {
    this.id = id;
    this.tittle = tittle;
    this.taskList = taskList;
  }

  public get getId() {
    return this.id;
  }
  public get getTittle() {
    return this.tittle;
  }
  public get getTaskList() {
    return this.taskList;
  }
  public set setTaskList(newList: Array<task>) {
    this.taskList = newList;
  }
}

export class task {
  private id: number;

  private description: string;

  constructor(id: number, desc: string) {
    this.id = id;
    this.description = desc;
  }

  public get getID() {
    return this.id;
  }
  public get getDesc() {
    return this.description;
  }
  public set setDesc(newDesc: string) {
    this.description = newDesc;
  }
}
