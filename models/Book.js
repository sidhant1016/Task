module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isbn: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    return Book;
  };
  