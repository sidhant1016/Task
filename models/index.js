const pg = require('pg');
const {Sequelize,DataTypes} = require('sequelize');
const sequelize = new Sequelize('project', 'postgres', '123456789', {
  host: 'localhost',
  dialect: 'postgres',
  logging:false,
  dialectModule: pg
});

sequelize.authenticate()
.then(()=>{
    console.log("database connected ")

})
.catch(error=>{
    console.log("error"+error)
});

const db = {};
db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.Student = require("./Student")(sequelize,DataTypes)
db.Book = require("./Book")(sequelize,DataTypes)
db.Borrow = require("./Borrow")(sequelize,DataTypes)


sequelize.sync({force:true})
  .then(() => {
    console.log('Database synced!');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

  module.exports =db