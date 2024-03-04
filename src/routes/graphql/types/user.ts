import { GraphQLFloat, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { User } from '@prisma/client';
import { UUIDType } from "./uuid.js";
import { ProfileType } from "./profile.js";
import { PostType } from "./post.js";
import { Context } from "./context.js";

export const UserType = new GraphQLObjectType<User, Context>({
    name: 'User',
    description: 'User data',
    fields: () => ({
        id: { type: new GraphQLNonNull(UUIDType) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        balance: { type: new GraphQLNonNull(GraphQLFloat) },

        profile: {
            type: ProfileType,
            resolve: async (user, _, ctx) => await ctx.prisma.profile.findUnique({ where: { userId: user.id } }),
        },

        posts: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
                resolve: async (user, _, ctx) => await ctx.prisma.post.findMany({ where: { authorId: user.id } }),
        },

        userSubscribedTo: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
            resolve: async (user, _, ctx) =>
                await ctx.prisma.user.findMany({
                    where: {
                        subscribedToUser: { some: { subscriberId: user.id } },
                    },
                }),
        },

        subscribedToUser: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
            resolve: async (user, _, ctx) =>
                await ctx.prisma.user.findMany({
                    where: {
                        userSubscribedTo: { some: { authorId: user.id } },
                    },
                }),
        },
    }),
});

export const CreateUserInput = new GraphQLInputObjectType({
    name: 'CreateUserInput',
    description: 'Create user unput',
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) },
        balance: { type: new GraphQLNonNull(GraphQLFloat) },
    }),
});

export const ChangeUserInput = new GraphQLInputObjectType({
    name: 'ChangeUserInput',
    description: 'Change user unput',
    fields: () => ({
        name: { type: GraphQLString },
        balance: { type: GraphQLFloat },
    }),
});