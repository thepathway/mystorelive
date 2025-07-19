// backend\models\category.model.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Category = sequelize.define('Category', {
  productLine: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  textDescription: {
    type: DataTypes.STRING(4000),
    allowNull: true
  },
  htmlDescription: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image: {
    type: DataTypes.BLOB,
    allowNull: true
  }
}, {
  tableName: 'productlines',
  timestamps: false
});

export default Category;
