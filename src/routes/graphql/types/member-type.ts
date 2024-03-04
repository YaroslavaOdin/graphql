import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";

export const MemberTypeId = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
        basic: { value: 'basic' },
        business: { value: 'business' },
    },
});

export const MemberType = new GraphQLObjectType({
    name: 'MemberType',
    description: 'Member data',
    fields: () => ({
        id: { type: new GraphQLNonNull(MemberTypeId) },
        discount: { type: new GraphQLNonNull(GraphQLFloat) },
        postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
    }),
});