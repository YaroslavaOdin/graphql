import { GraphQLObjectType } from "graphql";
import { Context } from "./types/context.js";

export const Mutation = new GraphQLObjectType<null, Context>({
    name: 'Mutation',
    fields: {},
});