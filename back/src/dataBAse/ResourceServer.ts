import { sequelize } from './db';


export async function resourceServer() {

    await sequelize.sync().then(() => {
        console.log("Connection succefully");
    }).catch(err => {
        console.log("Connection is failed " + err);
    })
}