import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connection'; // ajuste o caminho conforme necessário
import { User } from './User'; // importe o modelo de User

class Post extends Model {
    public post_id!: number;
    public title!: string;
    public body!: string;
    public user_id!: number;
}

Post.init(
    {
        post_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'posts',
        timestamps: false,
    }
);

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

try{
    Post.sync();
    console.log("Table created with success");
}catch(error) {
    console.log("Error: " + error);
}

export { Post };
