---
layout: post
title: "성능 향상을 위한 InnoDB File-Format Management"
description: ""
categories : ""
sub_categories : ""
date: 2017-04-04
tags: ['MySQL Barracuda']
comments: true
share: true
---

DB 설계, 필요 INDEX 생성, Optimizer 실행 계획 생성 등이 원활한 경우

남은 성능 최적화 작업 중 하나는 DISK I/O 를 줄이는 방법입니다.

  

MySQL 에서 InnoDB 엔진을 사용하는 경우 Barracuda Format을 사용하여 DB의 크기를 50% 이상 감소 시킬 수
있습니다.

해당 포맷을 적재적소에 활용만 잘 한다면 데이터 저장 공간을 크게 절약하실 수 있습니다.

(MySQL 5.1 이하 버전은 따로 플러그인을 설치해야한다.)

* 단 Barracuda 는 데이터 압축 및 해제하기 위해 CPU 자원을 소모한다는 것을 유의해야합니다.

  

기본적으로 InnoDB 에서 기본으로 설정 되어있는 파일 포맷은 "Antelope" 입니다.

  

Antelope 과 Barracuda 의 차이점은 아래와 같습니다.

Barracuda 파일 포맷에서는 "Compact" 이외에 "Dynamic", "Compressed" Row 포맷을 지원합니다.

  

Compact

가변 길이 컬럼의 767 byte 까지만 B-Tree에 저장하고, 나머지는 Off-Page에 저장

Dynamic

Page 사이즈와, Row 사이즈를 고려하여, 길이가 긴 컬럼들은 전체를 Off-Page에 저장하되, B-Tree에는 20 byte의
포인터만 저장 (전체 칼럼을 데이터 트리에 넣도록 시도하고 그렇지 못한다면 별도의 페이지에 저장한다.)

Compressed

Dynamic과 거의 유사하지만 KEY_BLOCK_SIZE 옵션을 통해 16KB의 데이터 Page를 압축 가능

(KEY_BLOCK_SIZE = 1, 2, 4, 8, 16 기본값 : 8)

KEY_BLOCK_SIZE = 16인 경우 기본적으로 데이터 Page를 압축하지 않지만, VARCHAR, TEXT, BLOB 컬럼만
선택적으로 압축

  

  

아래 설정 튜토리얼을 참고하여 설정해주시면 됩니다.

  

    mysql> select version();+------------+| version()  |+------------+| 5.5.21-log |+------------+1 row in set (0.00 sec)mysql> show variables like "%innodb_file%";# 기본 값은 Antelope 입니다.+--------------------------+----------+  Variable_name            | Value    |+--------------------------+----------+| innodb_file_format       | Antelope || innodb_file_format_check | ON       || innodb_file_format_max   | Antelope || innodb_file_per_table    | ON       |+--------------------------+----------+ 4 rows in set (0.00 sec)mysql> SET GLOBAL innodb_file_format = barracuda;Query OK, 0 rows affected (0.00 sec)mysql> show variables like "%innodb_file%";+--------------------------+-----------+| Variable_name            | Value     |+--------------------------+-----------+| innodb_file_format       | Barracuda || innodb_file_format_check | ON        || innodb_file_format_max   | Antelope  || innodb_file_per_table    | ON        |+--------------------------+-----------+4 rows in set (0.00 sec)mysql> SET GLOBAL innodb_file_format_max = barracuda;Query OK, 0 rows affected (0.00 sec)mysql> show variables like "%innodb_file%";+--------------------------+-----------+| Variable_name            | Value     |+--------------------------+-----------+| innodb_file_format       | Barracuda || innodb_file_format_check | ON        || innodb_file_format_max   | Barracuda || innodb_file_per_table    | ON        |+--------------------------+-----------+4 rows in set (0.00 sec)

  

  

  

  

**참고**

  * [InnoDB File-Format Management](https://dev.mysql.com/doc/refman/5.5/en/innodb-file-format.html)
  * [Benchmarking InnoDB page compression performance](http://www.tocker.ca/2013/10/31/benchmarking-innodb-page-compression-performance.html)

  

