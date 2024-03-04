import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { Context } from "./types/context.js";
import { ChangeUserInput, CreateUserInput, UserType } from "./types/user.js";
import { ChangePostInput, CreatePostInput, PostType } from "./types/post.js";
import { ChangeProfileInput, CreateProfileInput, ProfileType } from "./types/profile.js";
import { UUIDType } from "./types/uuid.js";

export const Mutation = new GraphQLObjectType<null, Context>({
    name: 'Mutation',
    fields: () => ({
        createPost: {
            type: PostType,
            args: { dto: { type: CreatePostInput } },
            resolve: async (_, args, ctx) => await ctx.prisma.post.create( { data: args.dto }),
        },

        createUser: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            type: UserType,
            args: { dto: { type: CreateUserInput } },
            resolve: async (_, args, ctx) => await ctx.prisma.user.create( { data: args.dto }),
        },

        createProfile: {
            type: ProfileType,
            args: { dto: { type: CreateProfileInput } },
            resolve: async (_, args, ctx) => await ctx.prisma.profile.create( { data: args.dto }),
        },

        deletePost: {
            type: GraphQLBoolean,
            args: { id: { type: new GraphQLNonNull(UUIDType) } },
            resolve: async (_, args, ctx) => { 
                await ctx.prisma.post.delete({ where: { id: args.id } }); 
                return true;
            }
        },

        deleteProfile: {
            type: GraphQLBoolean,
            args: { id: { type: new GraphQLNonNull(UUIDType) } },
            resolve: async (_, args, ctx) => { 
                await ctx.prisma.profile.delete({ where: { id: args.id } }); 
                return true;
            }
        },

        deleteUser: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            type: GraphQLBoolean,
            args: { id: { type: new GraphQLNonNull(UUIDType) } },
            resolve: async (_, args, ctx) => { 
                await ctx.prisma.user.delete({ where: { id: args.id } }); 
                return true;
            }
        },

        changePost: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
                dto: { type: new GraphQLNonNull(ChangePostInput) },
            },
            resolve: async (_, args, ctx) =>
                await ctx.prisma.post.update({ where: { id: args.id }, data: args.dto }),
        },

        changeProfile: {
            type: ProfileType,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
                dto: { type: new GraphQLNonNull(ChangeProfileInput) },
            },
            resolve: async (_, args, ctx) =>
                await ctx.prisma.profile.update({ where: { id: args.id }, data: args.dto }),
        },

        changeUser: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
                dto: { type: new GraphQLNonNull(ChangeUserInput) },
            },
            resolve: async (_, args, ctx) =>
                await ctx.prisma.user.update({ where: { id: args.id }, data: args.dto }),
        },

        subscribeTo: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            type: UserType,
            args: {
                userId: { type: new GraphQLNonNull(UUIDType) },
                authorId: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async (_, args, ctx) =>
                await ctx.prisma.user.update({ where: { id: args.userId }, data: {
                    userSubscribedTo: {
                        create: {
                            authorId: args.authorId
                        },
                    },
                },
            }),
        },

        unsubscribeFrom: {
            type: GraphQLBoolean,
            args: {
                userId: { type: new GraphQLNonNull(UUIDType) },
                authorId: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async (_, args, ctx) => { 
                await ctx.prisma.subscribersOnAuthors.delete({ 
                    where: {
                        subscriberId_authorId: {
                            subscriberId: args.userId,
                            authorId: args.authorId,
                        },
                    }, 
                }); 
                return true;
            }
        }
    })
});