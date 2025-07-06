import dotenv from 'dotenv'
import { MongoClient, ServerApiVersion } from 'mongodb'
dotenv.config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gq6vrxw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

class DatabaseService {
  private client: MongoClient
  constructor() {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
  }
  async connect() {
    try {
      await this.client.connect()
      await this.client.db('admin').command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log(error)
    } finally {
      await this.client.close()
    }
  }
}
export default new DatabaseService()
