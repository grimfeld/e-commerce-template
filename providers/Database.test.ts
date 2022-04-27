import { Product } from 'types/Product'
import Database from './Database'

const db = Database.getInstance()

interface TestData {
  id: number,
  content: string
}

beforeAll(() => {
  db.createTable("test-table")
  db.insertIntoTable<TestData>("test-table", [
    {
      id: 1,
      content: 'test',
    }
  ])
})

describe("Database test suite", () => {

  it("Should be an instance of db", () => {
    expect(db).toBeInstanceOf(Database)
  })

  it("Lists all tables", () => {
    expect(db.getTables()).toEqual(["test-table"])
  })

  it("Creates a new empty table", () => {
    db.createTable("second-test-table")
    expect(db.getTable("second-test-table")).toEqual([])
  })

  it("Does not overwrite existing table", () => {
    db.createTable("test-table")
    expect(db.getTable("test-table")).toEqual([{
      id: 1,
      content: 'test',
    }])
  })

  it("Returns the content of a table", () => {
    expect(db.getTable("test-table")).toEqual([{
      id: 1,
      content: 'test',
    }])
  })

  it("Deletes a table", () => {
    db.deleteTable("second-test-table")
    expect(db.getTables()).toEqual(["test-table"])
  })

  it("Inserts data into a table", () => {
    db.insertIntoTable<TestData>("test-table", [
      {
        id: 2,
        content: 'test2',
      }
    ])
    expect(db.getTable("test-table")).toEqual([{
      id: 1,
      content: 'test',
    }, {
      id: 2,
      content: 'test2',
    }])
  })

  it("Gets data from a table by field", () => {
    expect(db.getFromTableByField<TestData>("test-table", "id", 1)).toEqual({
      id: 1,
      content: 'test',
    })
  })

  it("Queries data from a table", () => {
    expect(db.queryFromTable<TestData>("test-table", "1")).toEqual([{
      id: 1,
      content: 'test',
    }])
  })

  it("Updates data in a table", () => {
    db.updateIntoTable<TestData>("test-table", {
      id: 1,
      content: 'test',
    }, {
      id: 1,
      content: 'testupdated',
    })
    expect(db.getTable("test-table")).toEqual([{
      id: 1,
      content: 'testupdated',
    }, {
      id: 2,
      content: 'test2',
    }])
  })

  it("Deletes data from a table", () => {
    db.deleteFromTable<TestData>("test-table", {
      id: 1,
      content: 'testupdated',
    })
    expect(db.getTable("test-table")).toEqual([{
      id: 2,
      content: 'test2',
    }])
  })

})

afterAll(() => {
  db.deleteTable("test-table")
})