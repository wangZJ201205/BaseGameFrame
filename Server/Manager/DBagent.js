/**
 * 实现数据库
 */
const Sequelize = require('sequelize');
const mysql = require('mysql2');
var sequelize = null;



const DBagent = {

    init : function ()
    {
        console.info('dbagent init');

        //连接数据库
        sequelize = new Sequelize('wemix_wzj_game', 'root', '123', {
            dialect: 'mysql',
            host: '192.168.0.101',
            port: 3306,
            ssl: true,
          });
        
        sequelize.authenticate()
          .then(() => {
            console.log('Connection has been established successfully.');
          })
          .catch(err => {
            console.error('Unable to connect to the database:', err);
          });
    },

    start : function()
    {
        console.info('dbagent start');

        /**
         * 实现外部传入参数
         *  const sql = 'SELECT * FROM users WHERE age > :age';
            const replacements = { age: 18 };
            sequelize.query(sql, { replacements, type: Sequelize.QueryTypes.SELECT })
            .then(users => {
                console.log(users);
            })
            .catch(err => {
                console.error(err);
            });
         */
        // sequelize.query('SELECT * FROM player', { type: Sequelize.QueryTypes.SELECT })
        // .then(player => {
        //     console.log(player);
        // })
        // .catch(err => {
        //     console.error(player);
        // });

      
    },



};

server.dbagent = module.exports = DBagent;