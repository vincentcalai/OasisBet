CREATE TABLE `tb_usr` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usr_nam` varchar(20) NOT NULL,
  `pwd` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact_no` varchar(30) NOT NULL,
  `del_ind` varchar(1) NOT NULL,
  `created_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `tb_acc` (
  `acc_id` bigint NOT NULL AUTO_INCREMENT,
  `usr_id` bigint NOT NULL,
  `balance` decimal(10,2) NOT NULL,
  `deposit_limit` decimal(10,2) NOT NULL,
  PRIMARY KEY (`acc_id`)
);

CREATE TABLE `tb_sequence` (
  `seq_name` varchar(30) NOT NULL,
  `seq_value` bigint NOT NULL,
  PRIMARY KEY (`seq_name`)
);

CREATE TABLE `tb_other_trx` (
  `trx_id` varchar(15) NOT NULL,
  `acc_id` bigint NOT NULL,
  `type` varchar(1) NOT NULL,
  `amount` decimal(6,2) NOT NULL,
  `trx_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`trx_id`)
);

CREATE TABLE `tb_bet_trx` (
  `trx_id` varchar(15) NOT NULL,
  `acc_id` bigint NOT NULL,
  `event_id` bigint NOT NULL,
  `event_desc` varchar(100) NOT NULL,
  `comp_type` varchar(30) NOT NULL,
  `start_time` datetime NOT NULL,
  `bet_type` varchar(30) NOT NULL,
  `bet_selection` varchar(30) NOT NULL,
  `bet_amt` decimal(4,2) NOT NULL,
  `odds` double NOT NULL,
  `potential_return` double NOT NULL,
  `is_settled` tinyint DEFAULT NULL,
  `trx_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`trx_id`)
);

CREATE TABLE `tb_bet_process_trx` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `trx_id` varchar(15) NOT NULL,
  `acc_id` bigint NOT NULL,
  `amount` double NOT NULL,
  `type` varchar(1) NOT NULL,
  `trx_dt` datetime NOT NULL,
  PRIMARY KEY (`id`)
);