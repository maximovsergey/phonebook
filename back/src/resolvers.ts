// import { users } from "./db";
const resolvers = {
    // Query: {
    //     users: () => {
    //         return users;
    //     },
    //     user: (parent, { id }, context, info) => {
    //         console.log('////////// id ', id);
    //         return users.find(user => user.id === id);
    //     },
    // },

    // Mutation: {
    //     createUser: (parent, arg, context, info) => {
    //         // вместо arg можно записать {id, name, email, age}
    //         const newUser = arg;

    //         users.push(newUser);
    //         return newUser;
    //     },
    //     updateUser: (parent, { id, name, email, age }, context, info) => {
    //         let updUser = users.find(user => user.id = id);
    //         updUser.name = name;
    //         updUser.email = email;
    //         updUser.age = age;
    //         return updUser;
    //     },
    //     deleteUser: (parent, { id, name, email, age }, context, info) => {
    //         const userIndex = users.findIndex(user => user.id === id);
    //         if (userIndex === -1) {
    //             return new Error("Данный пользователь не сушествует")
    //         }
    //         const deletedUser = users.splice(userIndex, 1)
    //         console.log('////////// deletedUser ', deletedUser);
    //         return deletedUser[0];
    //     }
    // }

};

export default resolvers;