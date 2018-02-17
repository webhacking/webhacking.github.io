---
layout: post
title: "[Mysql] 테이블명세서 쿼리문"
description: ""
categories : development
sub_categories : ""
date: 2016-05-12
tags: []
comments: true
share: true
---

SELECT

ORDINAL_POSITION '필드순번',

COLUMN_NAME '필드명',

DATA_TYPE '데이터 TYPE',

COLUMN_TYPE '데이터 LENGTH',

COLUMN_KEY 'KEY',

IS_NULLABLE 'NULL값여부',

EXTRA '자동여부',

COLUMN_DEFAULT '디폴트값',

COLUMN_COMMENT '필드설명'

FROM INFORMATION_SCHEMA.COLUMNS

WHERE

TABLE_SCHEMA = '사용자가 작성한 데이터베이스이름'

AND TABLE_NAME = '사용자가 작성한 테이블이름'

ORDER BY TABLE_NAME, ORDINAL_POSITION

