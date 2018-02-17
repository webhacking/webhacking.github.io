---
layout: post
title: "MySQL 기본 명령어"
description: ""
categories : development
sub_categories : ""
date: 2015-10-15
tags: []
comments: true
share: true
---

# MySQL 접속

C:\> mysql -h호스트 -u계정 -p비밀번호 데이터베이스명

  

예) mysql -hlocalhost -uroot -pdbpass mysql

* -h는 생략하셔두 됩니다.

  

# 데이터베이스 생성

mysql> create database 데이터베이스명;

  

# 데이터베이스 보기

mysql> show databases;

  

# 데이터베이스 변경 및 접근

mysql> use 데이터베이스명;

  

# 데이터베이스 삭제

mysql> drop database 데이터베이스명;

  

* mysql을 접속 안한 상태

C:\> mysqladmin -u계정 -p비밀번호 drop 데이터베이스명

  

# 테이블 생성

mysql> create table 테이블명 (필드명 필드속성(필드길이) 기타옵션);

  

예)

create table test (

num int(11) NOT NULL auto_increment,

member varchar(50),

system int(2) DEFAULT '0',

tdate datetime,

PRIMARY KEY (num) );

  

# 테이블 보기

mysql> show tables;

  

# 테이블 구조 보기

mysql> desc 테이블명;

  

# 테이블 구조 추가

mysql> alter table 테이블명 add 필드명 필드속성(필드크기) 옵션;

  

예) alter table test add subject varchar(50) NOT NULL DEFAULT 'No';

  

# 테이블 구조 수정

mysql> alter table 테이블명 change 필드명 변경할필드명 필드속성(필드크기) 옵션;

  

예) alter table test change subject content text;

  

# 테이블 구조 삭제

mysql> alter table 테이블명 drop 필드명;

  

# 테이블 복사

mysql> create table 사본테이블명 as select * from 원본테이블명;

  

# 테이블 삭제

mysql> drop table 테이블명;

  

# 데이터베이스 백업

C:\> mysqldump -u 유저아이디 -p DB명 > 저장할파일명

  

[테이블 백업]

C:\> mysqldump -u 유저아이디 -p DB명 테이블명 > 저장할파일명

# 데이터베이스 복원

C:\> mysql -u 유저아이디 -p DB명 < 백업파일명

