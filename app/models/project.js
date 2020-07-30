'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Project.belongsTo(models.User, {
        foreignKey: {
          name: 'userId'
        }
      });

      models.Project.belongsTo(models.Subdirectory, {
        foreignKey: {
          name: 'subdirectoryId'
        }
      });

      models.Project.belongsTo(models.Target, {
        foreignKey: {
          name: 'targetId'
        }
      });
    }
  };
  Project.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    pathSource: DataTypes.STRING,
    targetId: DataTypes.INTEGER,
    pathDest: DataTypes.STRING,
    subdirectoryId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    logOutputFile: DataTypes.STRING,
    logOutputText: DataTypes.TEXT,
    isInProgress: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};