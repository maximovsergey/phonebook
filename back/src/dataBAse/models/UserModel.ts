import { Table, Column, Model, Sequelize, HasMany } from 'sequelize-typescript';
import { PhoneModel } from './PhoneModel';

@Table({

})
export class UserModel extends Model<UserModel> {
    @Column({
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        set(id: string) {
            this.setDataValue('userUUID', id);
        },
        get() {
            return this.getDataValue('userUUID');
        }
    })
    userUUID: string;

    @Column(Sequelize.STRING)
    userName: string;

    @Column(Sequelize.STRING)
    userLastName: string;

    @Column(Sequelize.STRING)
    userAddress: string;

    @Column(Sequelize.STRING)
    userEmail: string;

    @HasMany(() => PhoneModel, 'fkUserId')
    userPhone: PhoneModel[];

}