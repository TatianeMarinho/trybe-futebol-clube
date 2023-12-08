import { DataTypes, Model, QueryInterface } from 'sequelize';
import ITeam from '../../Interfaces/team/ITeam';

export default {
    up(queryInterface: QueryInterface) {
        return queryInterface.createTable<Model<ITeam>>('teams', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            teamName: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        });
    },
    down(queryInterface: QueryInterface) {
        return queryInterface.dropTable('teams');
    },
}