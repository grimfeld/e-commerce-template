export default class Database {
  private static instance: Database

  private constructor () { }

  private data: { [key: string]: Array<any> } = {}

  public static getInstance (): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  // TABLES CRUD

  public getTables (): string[] { // Returns the list of tables in the DB
    return Object.keys(this.data)
  }

  public createTable (table: string): void { // Creates a new empty table in the DB
    if (this.data[table] === undefined) this.data[table] = []
  }

  public getTable<T> (table: string): T[] { // Returns the content of a table
    return this.data[table]
  }

  public deleteTable (table: string): void { // Deletes a table from the DB
    delete this.data[table]
  }

  // ROWS CRUD

  public insertIntoTable<T> (table: string, data: T[]): void {
    this.data[table].push(...data)
  }

  public getFromTableByField<T> (table: string, field: string, value: any): T {
    return this.data[table].find((item: any) => item[field] === value)
  }

  public queryFromTable<T> (table: string, query: string): T[] {
    return this.data[table].filter((item: any) => {
      if (JSON.stringify(item).toLowerCase().includes(query.toLowerCase())) return item
    })
  }

  public selectFieldsFromTable<T> (table: string, fields: Array<keyof T>): T[] {
    return this.data[table].map(item => {
      const result: any = {}
      for (const field of fields) {
        result[field] = item[field]
      }
      return result
    })
  }

  public selectFieldsFromTableByField<T> (table: string, field: string, value: any, fields: Array<keyof T>): T[] {
    return this.data[table].filter(item => item[field] === value).map(item => {
      const result: any = {}
      for (const field of fields) {
        result[field] = item[field]
      }
      return result
    })
  }

  public selectFieldsFromQueryFromTable<T> (table: string, query: string, fields: Array<keyof T>): T[] {
    return this.data[table].filter((item: any) => {
      if (JSON.stringify(item).toLowerCase().includes(query.toLowerCase())) return item
    }).map(item => {
      const result: any = {}
      for (const field of fields) {
        result[field] = item[field]
      }
      return result
    })
  }

  public updateIntoTable<T> (table: string, oldData: T, newData: T): void {
    this.data[table] = this.data[table].map(item => JSON.stringify(item) == JSON.stringify(oldData) ? newData : item)
  }

  public deleteFromTable<T> (table: string, target: T): void {
    this.data[table] = this.data[table].filter(item => {
      if (!(JSON.stringify(item) == JSON.stringify(target))) {
        return item
      }
    })
  }

}


function init () {
  const db = Database.getInstance()
  if (process.env.NODE_ENV === 'test') {
    // No need to init the DB in test mode
  } else if (process.env.NODE_ENV === 'development') {
    db.createTable("products")
    db.createTable("users")
    db.insertIntoTable("products", [
      {
        id: 1,
        title: 'Product 1',
        description: 'Description of product 1',
        thumbnail: 'https://images.unsplash.com/photo-1620780327051-f7ad06f5b1e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
        medias: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
        feedbacks: ['Test feedback'],
        price: 49.99
      },
      {
        id: 2,
        title: 'Product 2',
        description: 'Description of product 2',
        thumbnail: 'https://picsum.photos/400',
        medias: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
        feedbacks: ['Test feedback'],
        price: 49.99
      },
    ])
    db.insertIntoTable("users", [
      {
        id: 1,
        username: 'admin',
        email: 'admin@grimfeld.tech',
        password: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
        admin: true
      },
      {
        id: 2,
        username: 'user',
        email: 'user@grimfeld.tech',
        password: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
        admin: false
      }
    ])
  } else {
    db.createTable("products")
    db.createTable("users")
    db.insertIntoTable("products", [
      {
        id: 1,
        title: 'Product 1',
        description: 'Description of product 1',
        thumbnail: 'https://images.unsplash.com/photo-1620780327051-f7ad06f5b1e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
        medias: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
        feedbacks: ['Test feedback'],
        price: 49.99
      },
      {
        id: 2,
        title: 'Product 2',
        description: 'Description of product 2',
        thumbnail: 'https://picsum.photos/400',
        medias: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
        feedbacks: ['Test feedback'],
        price: 49.99
      },
    ])
    db.insertIntoTable("users", [{
      id: 1,
      username: 'admin',
      email: 'admin@grimfeld.tech',
      password: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      admin: true
    },
    {
      id: 2,
      username: 'user',
      email: 'user@grimfeld.tech',
      password: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
      admin: false
    }])
  }
}

init()