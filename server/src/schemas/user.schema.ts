import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class User {
  @Field((_) => ID!)
  _id: string;

  @Prop({ type: String, unique: true })
  @Field()
  name: string;

  @Prop(Number)
  @Field()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
