import { GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { Context } from "./context.js";
import { UUIDType } from "./uuid.js";
import { Post } from "@prisma/client";
import { UserType } from "./user.js";

export const PostType: GraphQLObjectType = new GraphQLObjectType<Post, Context>({
    name: 'PostType',
    description: 'Post data',
    fields: () => ({
        id: { type: new GraphQLNonNull(UUIDType) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        
        author: {
            type: new GraphQLNonNull(UserType),
            resolve: async (post, _, ctx) =>
                await ctx.prisma.user.findUnique({ where: { id: post.authorId } }),
        },
    }),
});

export const CreatePostInput = new GraphQLInputObjectType({
    name: 'CreatePostInput',
    description: 'Create post unput',
    fields: () => ({
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
    }),
});

export const ChangePostInput = new GraphQLInputObjectType({
    name: 'ChangePostInput',
    description: 'Change post unput',
    fields: () => ({
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        authorId: { type: UUIDType },
    }),
});