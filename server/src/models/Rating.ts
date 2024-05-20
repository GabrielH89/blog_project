import { DataTypes, Model } from 'sequelize';
import { connection } from '../config/connection';
import { User } from './User';
import { Post } from './Post';

class Rating extends Model {
    public rating_id!: number;
    public rateCol!: number;
}

Rating.init(
    {
        rating_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        rateCol: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
    },
    {
        sequelize: connection,
        tableName: 'ratings',
        timestamps: false,
    }
);

Rating.belongsTo(User, { foreignKey: 'user_id' });
Rating.belongsTo(Post, { foreignKey: 'post_id' });

try{
    Rating.sync();
    console.log("Table created with success");
}catch(error) {
    console.log("Error: " + error);
}

export { Rating };
