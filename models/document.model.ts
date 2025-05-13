import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/sequelize';
import Class from './class.model';

interface DocumentsAttributes {
  id: number;
  name: string;
  classId: number;
  filePath: string;
  sharableLink : string;
}

interface DocumentsCreationAttributes extends Optional<DocumentsAttributes, 'id'> {}

class Document extends Model<DocumentsAttributes, DocumentsCreationAttributes> implements DocumentsAttributes {
  public id!: number;
  public name!: string;
  public classId!: number;
  public filePath!: string;
  public sharableLink!  : string;
}

Document.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    classId: {
      type: DataTypes.INTEGER,
      references: {
        model: Class,
        key: 'id',
      },
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sharableLink:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'documents',
  }
);

Document.hasMany(Document, { foreignKey: 'classId' });
Document.belongsTo(Class, { foreignKey: 'classId' });

export default Document;
