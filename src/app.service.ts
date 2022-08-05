import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';
@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('MONGO') private database: Db, //inyecion hacia mongo
  ) {}
  getHello(): string {
    return `Hello World! ${this.apiKey}`;
  }
  getTask() {
    const tasksCollection = this.database.collection('task');
    return tasksCollection.find().toArray();
  }
}
