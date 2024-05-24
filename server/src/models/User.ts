import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connection'; // ajuste o caminho conforme necessário

class User extends Model {
    public user_id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
}

User.init(
    {
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: false,
    }
);

/*try{
    User.sync();
    console.log("Table created with success");
}catch(error) {
    console.log("Error: " + error);
}*/

export { User };
