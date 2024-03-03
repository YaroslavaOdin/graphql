import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { Context } from "./context.js";
import { UUIDType } from "./uuid.js";
import { UserType } from "./user.js";
import { MemberType } from "./member-type.js";
import { Profile } from "@prisma/client";

export const ProfileType: GraphQLObjectType = new GraphQLObjectType<Profile, Context>({
    name: 'Profile',
    description: 'Profile data',
    fields: () => ({
        id: { type: new GraphQLNonNull(UUIDType) },
        isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
        yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },

        user: {
            type: new GraphQLNonNull(UserType),
            resolve: async (profile, _, ctx) =>
                await ctx.prisma.user.findUnique({ where: { id: profile.userId } }),
        },

        memberType: {
            type: new GraphQLNonNull(MemberType),
            resolve: async (profile, _, ctx) =>
                await ctx.prisma.memberType.findUnique({ where: { id: profile.memberTypeId } }),
        },
    }),
});