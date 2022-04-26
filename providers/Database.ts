export default class Database {
  private static instance: Database

  private constructor () { }

  private data: any = {}

  public static getInstance (): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  public getTables (): string[] {
    return Object.keys(this.data)
  }

  public createTable<T> (table: string, data: T): void {
    this.data[table] = data
  }

  public deleteTable (table: string): void {
    delete this.data[table]
  }

  public getTable (table: string): any {
    return this.data[table]
  }

  public queryTable (table: string, query: any): any {
    return this.data[table].filter(query)
  }

  public insertIntoTable (table: string, data: any): void {
    this.data[table].push(data)
  }

  public getFromTable (table: string, id: number): any {
    return this.data[table].find(item => item.id === id)
  }


  // public getProperty<T, K extends keyof T> (obj: T, key: K): T[K] {
  //   return obj[key]
  // }

}