'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    account: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: 'AccountIndex',
      comment: '账号',
      validate: {
        is: /^(\w){6,50}/,
      }
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: '昵称'
    },
    salt: {
      type: DataTypes.STRING(24),
      allowNull: false,
      comment: '密码盐'
    },
    secret: {
      type: DataTypes.STRING(24),
      allowNull: false,
      comment: 'MD5(MD5(密码)+密码盐)'
    },
    avatar: {
      type: Sequelize.STRING(50),
      allowNull: false,
      comment: '头像'
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};