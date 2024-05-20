import { DataTypes, Model } from 'sequelize';
import { connection } from '../config/connection';

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
        sequelize: connection,
        tableName: 'users',
        timestamps: false, // Se não houver colunas 'createdAt' e 'updatedAt' na tabela
    }
);

/*try{
    User.sync();
    console.log("Table created with success");
}catch(error) {
    console.log("Error: " + error);
}*/


export { User };
