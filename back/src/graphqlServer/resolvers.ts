import { UserModel } from "../dataBAse/models/UserModel";
import { PhoneModel } from "../dataBAse/models/PhoneModel";
import { User } from "../dataBAse/TypeObject/User";
import { Phone } from "../dataBAse/TypeObject/Phone";
import uuid = require('uuid');

const resolvers = {
    Subscription: {
        reloadContact: async () => {
            const usersDb: UserModel[] = await UserModel.findAll({
                include: [{
                    model: PhoneModel,
                }],
                order: [['userName', 'ASC']]
            });
            let users: User[] = [];
            for (let index = 0; index < usersDb.length; index++) {
                const element = usersDb[index];
                users.push(new User());
                users[index].id = element.userUUID;
                users[index].name = element.userName;
                users[index].lastName = element.userLastName;
                users[index].address = element.userAddress;
                users[index].email = element.userEmail;
                users[index].phones = [];
                for (let i = 0; i < element.userPhone.length; i++) {
                    const el = element.userPhone[i];
                    let phone: Phone = new Phone();
                    phone.phoneId = el.phoneUUID;
                    phone.userId = el.fkUserId;
                    phone.phoneNumber = el.phoneNumber;
                    users[index].phones.push(phone);
                }
            }
            return users;
        },
    },
    Mutation: {
        addContact: async (parent, { input }, context, info) => {
            // const t = await sequelize.transaction();
            const newUser: [UserModel, boolean] = await UserModel.findOrCreate({
                where: {
                    userName: input.name,
                    userLastName: input.lastName,
                    userAddress: input.address,
                    userEmail: input.email,
                },
                defaults: {
                    userUUID: uuid.v1(),
                },
                // transaction: t,
            });
            const user: User = new User();
            user.id = newUser[0].userUUID;
            user.name = newUser[0].userName;
            user.lastName = newUser[0].userLastName;
            user.address = newUser[0].userAddress;
            user.email = newUser[0].userEmail;
            user.phones = [];
            for (let i = 0; i < input.phones.length; i++) {
                const element = input.phones[i];
                if (element !== '') {
                    const newPhone: [PhoneModel, boolean] = await PhoneModel.findOrCreate({
                        where: {
                            fkUserId: newUser[0].userUUID,
                            phoneNumber: element,
                        },
                        defaults: {
                            phoneUUID: uuid.v1(),
                        },
                    })
                    let phone: Phone = new Phone();
                    phone.phoneId = newPhone[0].phoneUUID;
                    phone.userId = newPhone[0].fkUserId;
                    phone.phoneNumber = newPhone[0].phoneNumber;
                    user.phones.push(phone);
                }
            }
            return user;
        },
        updateContactById: async (parent, { id, input }, context, info) => {
            const userDb: UserModel | null = await UserModel.findOne({
                where: {
                    userUUID: id
                },
                include: [{
                    model: PhoneModel
                }],
            });
            const user: User = new User();
            if (userDb) {
                await UserModel.update({
                    userName: input.name,
                    userLastName: input.lastName,
                    userAddress: input.address,
                    userEmail: input.email,
                }, {
                        where: {
                            userUUID: id
                        }
                    })
                user.id = userDb.userUUID;
                user.name = userDb.userName;
                user.lastName = userDb.userLastName;
                user.address = userDb.userAddress;
                user.email = userDb.userEmail;
                user.phones = [];
                for (let i = 0; i < input.phones.length; i++) {
                    const phone = input.phones[i];
                    console.log('////////// phone ', phone);
                    await PhoneModel.update({
                        phoneNumber: phone.phoneNumber
                    }, {
                            where: {
                                phoneUUID: phone.phoneId
                            }
                        })
                    let p: Phone = new Phone();
                    p.phoneId = userDb.userPhone[i].phoneUUID;
                    p.userId = userDb.userPhone[i].fkUserId;
                    p.phoneNumber = phone.phoneNumber;
                    user.phones.push(p);
                }
            }
            return user;
        },
        deleteContact: async (parent, { id }, context, info) => {
            const findContact: UserModel | null = await UserModel.findOne({
                where: {
                    userUUID: id,
                },
                include: [{
                    model: PhoneModel
                }]
            })
            if (findContact) {
                if (findContact.userPhone.length > 0) {
                    for (let i = 0; i < findContact.userPhone.length; i++) {
                        const element = findContact.userPhone[i];
                        await PhoneModel.destroy({
                            where: {
                                phoneUUID: element.phoneUUID
                            },
                        })
                    }
                }
                await UserModel.destroy({
                    where: {
                        userUUID: id
                    }
                })
                const user: User = new User();
                user.id = findContact.userUUID;
                user.name = findContact.userName;
                user.lastName = findContact.userLastName;
                user.address = findContact.userAddress;
                user.email = findContact.userEmail;
                return user;
            } else {
                return new Error('Контакт не существует')
            }
        },
        addPhoneNumber: async (parent, { id, phoneNumber }, context, info) => {
            // const t = await sequelize.transaction();
            const newPhone: [PhoneModel, boolean] = await PhoneModel.findOrCreate({
                where: {
                    fkUserId: id,
                    phoneNumber: phoneNumber,
                },
                defaults: {
                    phoneUUID: uuid.v1(),
                },
                // transaction: t,
            });
            // t.commit();
            const phone: Phone = new Phone();
            phone.phoneId = newPhone[0].phoneUUID;
            phone.userId = newPhone[0].fkUserId;
            phone.phoneNumber = newPhone[0].phoneNumber;
            return phone;
        },
    },
    Query: {
        users: async () => {
            const usersDb: UserModel[] = await UserModel.findAll({
                include: [{
                    model: PhoneModel,
                }],
                order: [['userName', 'ASC']]
            });
            let users: User[] = [];
            for (let index = 0; index < usersDb.length; index++) {
                const element = usersDb[index];
                users.push(new User());
                users[index].id = element.userUUID;
                users[index].name = element.userName;
                users[index].lastName = element.userLastName;
                users[index].address = element.userAddress;
                users[index].email = element.userEmail;
                users[index].phones = [];
                for (let i = 0; i < element.userPhone.length; i++) {
                    const el = element.userPhone[i];
                    let phone: Phone = new Phone();
                    phone.phoneId = el.phoneUUID;
                    phone.userId = el.fkUserId;
                    phone.phoneNumber = el.phoneNumber;
                    users[index].phones.push(phone);
                }
            }
            return users;
        },
        getUserbyId: async (parent, { id }, context, info) => {
            const usersDb: UserModel | null = await UserModel.findOne({
                where: {
                    userUUID: id
                },
                include: [{
                    model: PhoneModel,
                }],
            });
            if (usersDb) {

                let user: User = new User();
                user.id = usersDb.userUUID;
                user.name = usersDb.userName;
                user.lastName = usersDb.userLastName;
                user.address = usersDb.userAddress;
                user.email = usersDb.userEmail;
                user.phones = [];
                for (let i = 0; i < usersDb.userPhone.length; i++) {
                    const el = usersDb.userPhone[i];
                    let phone: Phone = new Phone();
                    phone.phoneId = el.phoneUUID;
                    phone.userId = el.fkUserId;
                    phone.phoneNumber = el.phoneNumber;
                    user.phones.push(phone);
                }
                return user;
            } else {
                return new Error('Контакт не существует');
            }
        },
    },
};

export default resolvers;