---
layout: post
title: "MySQL Data Types"
description: ""
categories : development
sub_categories : ""
date: 2017-10-11
tags: []
comments: true
share: true
---

본 문서는 Github 에서도 공개되었으니,

블로그 UI 보단 Github UI가 가독성이 좋다고 여겨지시는 분들은 [여기](https://github.com/webhacking/lea
rn/blob/master/database/rdbms/data_type.md)를 참고해주세요.

# Data Types

프로그래머는 데이터 모델을 구성할 때, 자료형을 관과하여 설정하면 안된다.

자료형은 `성능`에 영향을 끼치기 때문입니다.

##

Numeric Data Types

  * `DECIMAL`은 주로 화폐 저장 용도로 사용합니다. (오차 미 발생)
  * `UNSIGNED` 사용가능합니다.
    * unsigned 선언 시 범위가 0부터 시작됩니다.(e.g. -128 ~ 127 to 0 ~ 127 )

Type

Description

TINYINT(n)

정수형 데이터 타입(1byte) -128 ~ +127 또는 0 ~ 255수 표현 가능

SMALLINT(n)

정수형 데이터 타입(2byte) -32768 ~ 32767 또는 0 ~ 65536수 표현 가능

MEDIUMINT(n)

정수형 데이터 타입(3byte) -8388608 ~ +8388607 또는 0 ~ 16777215수 표현 가능

INT(n)

정수형 데이터 타입(4byte) -2147483648 ~ +2147483647 또는 0 ~ 4294967295수 표현 가능

BIGINT(n)

정수형 데이터 타입(8byte) - 무제한 수 표현 가능

FLOAT(길이,소수)

부동 소수형 데이터 타입(4byte) -고정 소수점을 사용 형태

DECIMAL(길이,소수)

고정 소수형 데이터 타입고정(길이+1byte) -소수점을 사용 형태

DOUBLE(길이,소수)

부동 소수형 데이터 타입(8byte) -DOUBLE을 문자열로 저장

  

