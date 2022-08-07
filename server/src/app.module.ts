import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { Challenge, ChallengeSchema } from './schemas/challenge.schema';
import { User, UserSchema } from './schemas/user.schema';
import * as mongoose from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/cache'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: process.env.NODE_ENV !== 'prod',
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Challenge.name, schema: ChallengeSchema },
    ]),
  ],
  controllers: [],
  providers: [AppResolver, AppService],
})
export class AppModule {
  constructor() {
    // mongoose.set('debug', true);
  }
}
