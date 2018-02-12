---
layout: post
title: "MySQL Locked 확인"
description: ""
date: 2017-06-20
tags: []
comments: true
share: true
---

  

  * show open tables;
    * MySQL 전체 테이블 잠금여부
  * show open tables from 'db명' 
    * 해당 DB의 테이블 잠금 여부
  * show open tables from 'db명' like '테이블명'
    * 해당 DB의 특정 테이블의 잠금 정보

  

  

_What is `show open tables` command ?_

  

> SHOW OPEN TABLES lists the non-TEMPORARY tables that are currently open in
the table cache

  

락 상태의 테이블 확인

\- SHOW OPEN TABLES WHERE in_use>0;

  

특정 상태의 테이블 확인

\- SHOW OPEN TABLES WHERE in_use>0 AND `Table`='your_table_name';

  

**참고**

[MySQL 5.7 Reference Manual SHOW OPEN TABLES
Syntax](https://dev.mysql.com/doc/refman/5.7/en/show-open-tables.html)

