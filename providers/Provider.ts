export default class Provider {
  private static instance: Provider
  private constructor () { }
  public static getInstance (): Provider {
    if (!Provider.instance) {
      Provider.instance = new Provider()
    }
    return Provider.instance
  }
}


export class ProductProvider implements Provider {

}

const provider = ProductProvider.getInstance()

