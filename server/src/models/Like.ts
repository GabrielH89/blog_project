import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connection'; // ajuste o caminho conforme necessário
import { User } from './User'; // importe o modelo de User
import { Post } from './Post'; // importe o modelo de Post

class Like extends Model {
    public like_id!: number;
    public user_id!: number;
    public post_id!: number;
}

Like.init(
    {
        like_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'likes',
        timestamps: false,
    }
);

Like.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Like.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

/*try{
    Like.sync();
    console.log("Table created with success");
}catch(error) {
    console.log("Error: " + error);
}*/

export { Like };
