import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UserType } from "./types/user.js";
import { UUIDType } from "./types/uuid.js";
import { MemberType, MemberTypeId } from "./types/member-type.js";
import { ProfileType } from "./types/profile.js";
import { PostType } from "./types/post.js";
import { Context } from "./types/context.js";

export const Query = new GraphQLObjectType<null, Context>({
    name: 'Query',
    fields: () => ({
        user: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            type: UserType,
            args: { id: { type: new GraphQLNonNull(UUIDType) } },
            resolve: async (_, args: { id: string }, ctx) =>
                await ctx.prisma.user.findUnique({ where: { id: args.id } }),
        },
        users: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
            resolve: async (_, __, ctx) => await ctx.prisma.user.findMany(),
        },
        post: {
            type: PostType,
            args: { id: { type: new GraphQLNonNull(UUIDType) } },
            resolve: async (_, args: { id: string }, ctx) =>
                await ctx.prisma.post.findUnique({ where: { id: args.id } }),
        },
        posts: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
            resolve: async (_, __, ctx) => await ctx.prisma.post.findMany(),
        },
        profile: {
            type: ProfileType,
            args: { id: { type: new GraphQLNonNull(UUIDType) } },
            resolve: async (_, args: { id: string }, ctx) =>
                await ctx.prisma.profile.findUnique({ where: { id: args.id } }),
        },
        profiles: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ProfileType))),
            resolve: async (_, __, ctx) => await ctx.prisma.profile.findMany(),
        },
        memberType: {
            type: new GraphQLNonNull(MemberType),
            args: { id: { type: new GraphQLNonNull(MemberTypeId) } },
            resolve: async (_, args: { id: string }, ctx) =>
                await ctx.prisma.memberType.findUnique({ where: { id: args.id } }),
        },
        memberTypes: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
            resolve: async (_, __, ctx) => await ctx.prisma.memberType.findMany(),
        },
    }),
});