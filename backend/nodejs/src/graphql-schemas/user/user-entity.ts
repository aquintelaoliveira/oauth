import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class UserEntity {
  @Field()
  id: string;

  @Field()
  email: string;

  password: string;

  @Field()
  name: string;
}