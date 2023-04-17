module.exports = (sequelize, DataTypes) => {
    const Borrow = sequelize.define('Borrow', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      borrowerName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      borrowedDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      returnedDate: {
        type: DataTypes.DATEONLY
      }
    });
  
    Borrow.associate = models => {
      Borrow.belongsTo(models.Book, {
        foreignKey: {
          name: 'bookId',
          allowNull: false
        },
        onDelete: 'CASCADE'
      });
    };
  
    return Borrow;
  };
  