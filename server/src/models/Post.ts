import { DataTypes, Model } from 'sequelize';
import { connection } from '../config/connection';
import { User } from './User';

class Post extends Model {
    public post_id!: number;
    public title!: string;
    public body!: string;
    public created_at!: Date;
    public updated_at!: Date;
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
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize: connection,
        tableName: 'posts',
        timestamps: false,
    }
);

Post.belongsTo(User, { foreignKey: 'user_id' });

try{
    Post.sync();
    console.log("Table created with success");
}catch(error) {
    console.log("Error: " + error);
}

export { Post };
