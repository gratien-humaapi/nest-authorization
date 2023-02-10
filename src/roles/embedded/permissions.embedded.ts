/* eslint-disable prettier/prettier */
import { Embeddable, Property } from '@mikro-orm/core';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('PermissionsInput')
@Embeddable()
export class Permissions {
  @Field()
  @Property()
  action: string;

  @Field()
  @Property()
  subject: string;

  @Field(() => [String], { nullable: true })
  @Property({ nullable: true, type: 'array' })
  fields?: string[];
}
