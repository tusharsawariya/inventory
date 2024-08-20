import { DataTypes } from "sequelize";
import sequelize from "../DB/dbConfig.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const salt = bcrypt.genSaltSync(12);
      const hashedPassword = bcrypt.hashSync(value, salt);
      this.setDataValue("password", hashedPassword);
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

// Sync the model with the database
sequelize.sync()
  .then(() => console.log("User table created...."))
  .catch(err => console.error("Error creating table:", err));

// Static method to check password
User.checkPassword = async function (password, encryptedPassword) {
  return bcrypt.compare(password, encryptedPassword);
};

// Instance method to generate token
User.prototype.generateToken = function () {
  try {
    return jwt.sign(
      { id: this.id.toString(), email: this.email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};

export default User;