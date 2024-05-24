import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connection'; // ajuste o caminho conforme necessário
import { User } from './User'; // importe o modelo de User
import { Post } from './Post'; // importe o modelo de Post

class Rating extends Model {
    public rating_id!: number;
    public rateCol!: number;
    public user_id!: number;
    public post_id!: number;
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
        tableName: 'ratings',
        timestamps: false,
    }
);

Rating.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Rating.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

/*try{
    Rating.sync();
    console.log("Table created with success");
}catch(error) {
    console.log("Error: " + error);
}*/

export { Rating };
