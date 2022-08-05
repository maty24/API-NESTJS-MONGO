import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import { ConfigType } from '@nestjs/config';
import config from '../config';

const API_KEY = '1234567';

@Global() //esto hace que el moulo sea global
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } =
          configService.mongo; // 👈 get mongo config
        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: API_KEY,
    },
    {
      provide: 'MONGO', //cualquier servicio lo puede tener
      useFactory: async (configService: ConfigType<typeof config>) => {
        //le pongo el nombre y que tipo es
        const { connection, user, password, host, port, dbName } =
          configService.mongo; // 👈 get mongo config
        const uri = `${connection}://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(dbName);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO'], //esto hace que la api kay sea global
})
export class DatabaseModule {}
