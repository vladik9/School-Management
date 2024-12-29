import { DataTypes, Model, Optional } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../db/sequelize'; // Assuming you have a sequelize instance

interface UserAttributes {
  id: number;
  email: string;
  password_hash: string;
  auth_token: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password_hash!: string;
  public auth_token!: string;

  // Method to hash the password before saving the user
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    return bcrypt.hash(password, salt); // Hash the password
  }

  // Method to compare a given password with the stored hash
  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password_hash); // Compare password with stored hash
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    auth_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;
