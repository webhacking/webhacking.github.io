---
layout: post
title: "Got a packet bigger than 'max_allowed_packet' 해결 방안"
description: ""
categories : development
sub_categories : ""
date: 2017-01-12
tags: ['max_allowed_packet', 'MySQL']
comments: true
share: true
---

**문제원인**

max_allowed_packet은 클라이언트와 통신할 때 핸들링 할 수 있는 데이터의 양을 의미합니다.

기본 값은 16M 이므로 요청 데이터가 설정 값 이상으로 넘어가면서 발생하는 오류 사항입니다.

  

  

**해결방안**

mysql.cnf 설정 파일을 수정하여, 해결할 수 있습니다.

debian 기준으로 /etc/mysql/mysql.cnf 경로에 위치해있습니다.

16M 에서 128MB 로 수정하면 됩니다.

수정 이후, MySQL 데몬을 재 실행하면 됩니다.

  

위 방법 이외 mysqldump command 를 통하여 아래 명령어를 실행하여 해결할 수 있습니다.

    mysql --max_allowed_packet=128M -u user -ppass database < database.sql 

  

  

**참고**

  * error mysql : Got a packet bigger than 'max_allowed_packet' bytes
    * http://stackoverflow.com/questions/13218975/error-mysql-got-a-packet-bigger-than-max-allowed-packet-bytes

  

