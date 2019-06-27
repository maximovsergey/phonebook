import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Query {
        users: [User]
        getUserbyId(id: String): User
    }
    
    type Mutation {
        addContact(input: AddContactInput): User
        updateContactById(id: String, input: EditContactInput): User
        deleteContact(id: String!): User
        addPhoneNumber(id: String, phoneNumber: String): Phone
    }
    type Subscription {
        reloadContact: [User]
    }

    type User {
        id: String
        name: String
        lastName: String
        address: String
        email: String
        phones: [Phone]
    }

    type Phone {
        phoneId: String
        userId: String
        phoneNumber: String
    }

    input AddContactInput {
        name: String!
        lastName: String!
        phones: [String!]
        address: String!
        email: String!
    }

    input EditContactInput {
        name: String!
        lastName: String!
        phones: [PhoneInput!]
        address: String!
        email: String!
    }

    input PhoneInput {
        phoneId: String
        userId: String
        phoneNumber: String
    }

    `;
export default typeDefs;
