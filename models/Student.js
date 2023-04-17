module.exports = (sequelize,DataType)=>{
    const Student = sequelize.define('student', {
        name: {
          type: DataType.STRING,
          allowNull: false
        },
        surname: {
          type: DataType.STRING,
          allowNull: false
        },
          gender: {
            type: DataType.ENUM('male', 'female'),
            allowNull: false
          }
        
      });
      return Student;
}