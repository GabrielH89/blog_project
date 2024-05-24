import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connection'; // ajuste o caminho conforme necessário
import { User } from './User'; // importe o modelo de User
import { Post } from './Post'; // importe o modelo de Post

class Comment extends Model {
    public comment_id!: number;
    public commentCol!: string;
    public user_id!: number;
    public post_id!: number;
}

Comment.init(
    {
        comment_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        commentCol: {
            type: DataTypes.STRING,
            allowNull: false,
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
        tableName: 'comments',
        timestamps: false,
    }
);

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

/*try{
    Comment.sync();
    console.log("Table created with success");
}catch(error) {
    console.log("Error: " + error);
}*/

export { Comment };
