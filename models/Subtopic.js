const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Subtopic extends Model {} 

Subtopic.init (
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    topic_id: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: 'topic',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'subtopic'
  }
);

module.exports = Subtopic;
