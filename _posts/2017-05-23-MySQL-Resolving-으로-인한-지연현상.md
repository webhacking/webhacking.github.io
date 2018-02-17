---
layout: post
title: "MySQL Resolving 으로 인한 지연현상"
description: ""
categories : development
sub_categories : ""
date: 2017-05-23
tags: ['MySQL Resolving Problem', 'MySQL 느려짐', 'MySQL 속도 지연현상', 'skip_name_resolve', '갑자기']
comments: true
share: true
---

  

  

갑작스러운 MySQL 속도 지연현상이 발생했다.

제일 먼저, Slow Query 를 확인했고 이상 없음으로 판정했다.

이 후, 이전 이와 같은 예외 케이스를 경험한 적 이 있어서, 혹시 해서하니 역시 Resloving 문제였다.

  

MySql에서 접속 시, IP에 대한 Resloving(역질의)가 이루어진다.

하지만 대 부분의 IP는 등록되어 있지 않으며 DNS가 느리다면 이 부분은 더욱 심각한 속도 문제로 발생한다.

이 를 해결 할 수 있는 방법은 _역질의를 순서를 건너뛰는 방법_이다.

  

skip-name-resolve 설정을 하면된다.

  

  

위 옵션에 대해 부가 설명을 하자면,

클라이언트에서 서버로 접속시 DNS Lookup 과정을 생략해 줍니다.

localhost 로 접속하는 경우는 문제가 없지만 IP 로 접속하는 환경에서는 DNS 서버가 느리거나 아님 장애 발생시에 해당 옵션을
설정해 주므로써 DB 접속시에 문제점을 해결할 수 있습니다.

  

  

skip-name-resolve은 설정 파일에서 직접적으로 할 수 있고, 또는 아래 명령어를 통하여 설정할 수 있다.

  

    mysql> show global variables like 'skip_name_resolve';show global variables like '%timeout%';show variables like '%timeout';show processlist;

  

  

![](/assets/images/posts/748/215481445924102E209D81.JPEG)

(MySQL 접속 시, 간단 흐름도)

  

  

**참고 문서**

  * [Server Command Options](https://dev.mysql.com/doc/refman/5.7/en/server-options.html)
  * [skip-name-resolve to speed up MySQL and avoid problems](http://www.vionblog.com/skip-name-resolve-to-speed-up-mysql-and-avoid-problems/)

  

