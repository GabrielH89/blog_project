import { DataTypes, Model } from 'sequelize';
import { connection } from '../config/connection';
import { User } from './User';
import { Post } from './Post';

class Like extends Model {
    public like_id!: number;
}

Like.init(
    {
        like_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
    },
    {
        sequelize: connection,
        tableName: 'likes',
        timestamps: false,
    }
);

Like.belongsTo(User, { foreignKey: 'user_id' });
Like.belongsTo(Post, { foreignKey: 'post_id' });

try{
    Like.sync();
    console.log("Table created with success");
}catch(error) {
    console.log("Error: " + error);
}

export { Like };
