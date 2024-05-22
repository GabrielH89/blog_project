import { DataTypes, Model } from 'sequelize';
import { connection } from '../config/connection';
import { User } from './User';
import { Post } from './Post';

class Comment extends Model {
    public comment_id!: number;
    public commentCol!: string;
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
    },
    {
        sequelize: connection,
        tableName: 'comments',
        timestamps: false,
    }
);

Comment.belongsTo(User, { foreignKey: 'user_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

/*try{
    Comment.sync();
    console.log("Table created with success");
}catch(error) {
    console.log("Error: " + error);
}*/

export { Comment };
