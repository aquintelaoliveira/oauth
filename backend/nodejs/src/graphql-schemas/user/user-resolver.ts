import {
  Resolver,
  Query,
  //Mutation,
  //Arg,
  //Field,
  //Ctx,
  //UseMiddleware,
  //Int
} from "type-graphql";
//import { hash, compare } from "bcryptjs";
import { UserEntity } from "./user-entity";
import { User } from "../../mongoose-models/user-model";

@Resolver()
export class UserResolver {
  @Query(() => [UserEntity])
  users() {
    return User.find();
  }

  @Query(() => UserEntity, { nullable: true })
  me() {}
}