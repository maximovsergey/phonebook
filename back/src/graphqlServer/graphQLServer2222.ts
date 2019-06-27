// // import { users } from '../dataBAse/db';
// import { Users } from '../dataBAse/models/UserModel';
// import { User } from '../dataBAse/TypeObject/User';
// // import { sequelize } from '../dataBAse/db';
// // import * as uuid from 'uuid';
// // import { Phones } from '../dataBAse/models/Phones';
// // import { Phone } from '../dataBAse/TypeObject/Phone';

// const PORT = 4001;
// export async function graphqlServer() {
//     const connect = require('connect');
//     const { ApolloServer, gql } = require('apollo-server-express');
//     const query = require('qs-middleware');

//     // Construct a schema, using GraphQL schema language
//     // type Mutation {
//     //     addUser(name: String, email: String): User
//     //     addPhoneNumber(id: String, phoneNumber: String): Phone
//     // }
//     const typeDefs = gql`
//     type Query {
//         users: [User]
//     }
//     type User {
//         id: String
//         name: String
//         age: String
//         adress: String
//         email: String
//     }
//     `;

//     // type Phone{
//     //     phoneId: String
//     //     userId: String
//     //     phoneNumber: String
//     // }
//     // Provide resolver functions for your schema fields
//     const resolvers = {
//         // addUser: async (parent, { id, name, email, age }, context, info) => {
//         //     const t = await sequelize.transaction();
//         //     const newUser: [Users, boolean] = await Users.findOrCreate({
//         //         where: {
//         //             userName: name,
//         //             userEmail: email,
//         //         },
//         //         defaults: {
//         //             id: uuid.v1(),
//         //         },
//         //         transaction: t,
//         //     });
//         //     t.commit();
//         //     const user: User = new User();
//         //     user.id = newUser[0].id;
//         //     user.name = newUser[0].userName;
//         //     user.age = newUser[0].userAge;
//         //     user.email = newUser[0].userEmail;
//         //     return user;
//         // },
//         // addPhoneNumber: async (parent, { id, phoneNumber }, context, info) => {
//         //     const t = await sequelize.transaction();
//         //     const newPhone: [Phones, boolean] = await Phones.findOrCreate({
//         //         where: {
//         //             fkUserPhonesId: id,
//         //             phoneNumber: phoneNumber,
//         //         },
//         //         defaults: {
//         //             phoneId: uuid.v1(),
//         //         },
//         //         transaction: t,
//         //     });
//         //     t.commit();
//         //     const phone: Phone = new Phone();
//         //     phone.phoneId = newPhone[0].phoneId;
//         //     phone.userId = newPhone[0].fkUserPhonesId;
//         //     phone.phoneNumber = newPhone[0].phoneNumber;
//         //     return phone;
//         // },

//         Query: {
//             users: async () => {
//                 const usersDb: any = await Users.findAll();
//                 let users: User[] = []
//                 for (let index = 0; index < usersDb.length; index++) {
//                     const element = usersDb[index];
//                     users.push(new User());
//                     users[index].id = element.userUUID;
//                     users[index].name = element.userName;
//                     users[index].age = element.userAge;
//                     users[index].adress = element.userAddress;
//                     users[index].email = element.userEmail;
//                     // users[index].userPhones = [];
//                     // if (element.userPhones) {
//                     //     element.userPhones.forEach(ph => {
//                     //         users[index].userPhones.push(ph.phoneNumber);
//                     //     });
//                     // }
//                 }

//                 return users;
//             },
//         },
//     };






//     const server = new ApolloServer({ typeDefs, resolvers });

//     const app = connect();
//     const path = '/graphql';
//     app.use(query());
//     server.applyMiddleware({ app, path });

//     app.listen({ port: PORT }, () =>
//         console.log(`🚀 Server ready at http://localhost:4001/graphql`)
//     );
// }