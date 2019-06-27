import { Table, Model, Column, Sequelize, BelongsTo, ForeignKey } from "sequelize-typescript";
import { UserModel } from "./UserModel";

@Table({

})
export class PhoneModel extends Model<PhoneModel> {

    @Column({
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        set(id: string) {
            this.setDataValue('phoneUUID', id);
        },
        get() {
            return this.getDataValue('phoneUUID');
        }
    })
    phoneUUID: string;


    @Column(Sequelize.STRING)
    phoneNumber: string;

    @ForeignKey(() => UserModel)
    @Column(Sequelize.UUID)
    fkUserId: string;

    @BelongsTo(() => UserModel)
    user: UserModel;
}