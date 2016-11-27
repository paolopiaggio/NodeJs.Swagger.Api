var Sequelize = require('sequelize');

function Context () {
    this.users;
    this.profiles;
};

var sequelize = new Sequelize('db.sqlite', 'local', 'local', {
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    logging: console.log,
    define: {
        timestamps: false
    },
    storage: './db.sqlite'
});

var User = sequelize.define('user', {
  id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
          len: 2
      }
  }
},{
  tableName: 'user'
});
var Profile = sequelize.define('profile', {
  id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
          len: 4
      }
  },
  userId: {
      type: Sequelize.INTEGER,
      references: { model: "users", key: "id" },
      field: 'user_id'
    }
},{
  tableName: 'profile'
});

User.hasMany(Profile);
Profile.belongsTo(User);

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

var context = new Context();
context.users = User;
context.profiles = Profile;

module.exports = context;
