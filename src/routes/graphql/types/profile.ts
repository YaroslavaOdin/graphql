import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { Context } from "./context.js";
import { UUIDType } from "./uuid.js";
import { UserType } from "./user.js";
import { MemberType, MemberTypeId } from "./member-type.js";
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

export const CreateProfileInput = new GraphQLInputObjectType({
    name: 'CreateProfileInput',
    description: 'Create profile unput data',
    fields: () => ({
        isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
        yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
        userId: { type: new GraphQLNonNull(UUIDType) },
        memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
    }),
});

export const ChangeProfileInput = new GraphQLInputObjectType({
    name: 'ChangeProfileInput',
    description: 'Change profile unput',
    fields: () => ({
        isMale: { type: GraphQLBoolean },
        yearOfBirth: { type: GraphQLInt },
    }),
});