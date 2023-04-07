/**
 * 实现数据库
 */
const Sequelize = require('sequelize');
const mysql = require('mysql2');
const EventName = require('../Common/EventName');
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
        this.register();
    },

    register()
    {
      //检查账号
      server.event.On(EventName.DB_LOGIN_CHECK_ACCOUNT_REQUEST,(data)=>{
        
        //先查找玩家
        const sql = 'SELECT * FROM account WHERE accountId = :accountId';
        const replacements = { accountId: data.accountId};
        sequelize.query(sql, { replacements:replacements, type: Sequelize.QueryTypes.SELECT })
          .catch(err => {
              console.error(err);
          })
          .then(account => {
            //服务器有账号
            if(account.length == 0)
            {

              const dd = data;
              //添加账号
              const sql1 = 'INSERT INTO account (accountId, password) VALUES ( :accountId, :password )';
              const replacement = {  accountId:dd.accountId, password:dd.password};
              sequelize.query(sql1, { replacements:replacement, type: Sequelize.QueryTypes.INSERT });
              //账号和pid绑定
              const sql = 'INSERT INTO player (accountId) VALUES ( :accountId )';
              const replacements = { accountId: dd.accountId};
              sequelize.query(sql, { replacements:replacements, type: Sequelize.QueryTypes.INSERT })
              .then(ss => {
                console.info(dd);
                var msg = {};
                msg.error = 0;
                msg.client_id = dd.client_id;
                msg.accountId = dd.accountId;
                server.event.send(EventName.DB_LOGIN_CHECK_ACCOUNT_RESPONSE,msg);
              })
              return;
            }

            var acc = account[0];
            if(acc.password == data.password)
            {
              //有该角色
              var msg = {};
              msg.error = 0;
              msg.client_id = acc.cid;
              msg.accountId = acc.accountId;
              server.event.send(EventName.DB_LOGIN_CHECK_ACCOUNT_RESPONSE,msg); 
            }
            else //密码错误
            {
              var msg = {};
              msg.error = ERROR_CODE.PASSWORD_ERROR;
              server.event.send(MessageName.LOGIN_CHECK_PLAYER_RESPONSE,msg);
            }

          })

        });












    }

};

server.dbagent = module.exports = DBagent;