
-- CREATE DATABASE IF NOT EXISTS `gamedb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
-- USE `gamedb`;

-- ----------------------------
-- 玩家账号表
-- ----------------------------
-- DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
	`accountId` VARCHAR(255) NOT NULL,
	`password` VARCHAR(255) NULL DEFAULT '',
	`ctime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`accountId`)
)
ENGINE=InnoDB DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci;


-- ----------------------------
-- 玩家角色表
-- ----------------------------
-- DROP TABLE IF EXISTS `account`;
CREATE TABLE `player` (
	`pid` int(10) NOT NULL AUTO_INCREMENT,
	`accountId` VARCHAR(255) NOT NULL,
	`ctime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`pid`)
)
ENGINE=InnoDB DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- 玩家角色属性表
-- ----------------------------
-- DROP TABLE IF EXISTS `playerex_data`;
CREATE TABLE `playerex_data` (
	`aid` int(10) NOT NULL,
	`ctype` int(10) NULL DEFAULT 0,
	`data` int(10) NULL DEFAULT NULL,
	PRIMARY KEY (`aid`,`ctype`)
)
ENGINE=InnoDB DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci;
