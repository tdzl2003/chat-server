'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      account: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: '账号'
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
        comment: '昵称'
      },
      avatar: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: '头像'
      },
      salt: {
        type: Sequelize.STRING(24),
        allowNull: false,
        comment: '密码盐'
      },
      secret: {
        type: Sequelize.STRING(24),
        allowNull: false,
        comment: 'MD5(MD5(密码)+密码盐)'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(function() {
      return queryInterface.addIndex('Users',
        ['account'], {
          indexName: 'AccountIndex',
          indicesType: 'UNIQUE'
        }).then(()=>queryInterface.addIndex('Users',
        ['name'], {
          indexName: 'NameIndex'
        }));
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};