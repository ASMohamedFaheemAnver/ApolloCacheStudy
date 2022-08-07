import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type ChallengeDocument = Challenge & Document;

@Schema()
@ObjectType()
export class Challenge {
  @Field((_) => ID!)
  _id: string;

  @Prop({ type: String })
  @Field()
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
  @Field((_) => [User!]!)
  participants: User[];
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
