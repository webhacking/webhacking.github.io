---
layout: post
title: "데이터베이스 서버  지연"
description: ""
categories : development
sub_categories : ""
date: 2016-12-01
tags: []
comments: true
share: true
---

해당 이슈 전달받았을 때, 간단히 서버 상태 먼저 확인함.

이후, 추려내린 문제점은 network bandwidth , DB 서버 응답 지연이라 생각하였고 실질적으로 확인해보니 DB 서버의 부하가
심하여 발생한 문제점이었음. 인스턴스 타입을 한 단계 업그레이드 한 이후 slow query log 설정 추가하여 실질적으로
transaction time 이 길어지는 문제점을 찾음. 이 후 전반적인 데이터베이스 최적화가 필요하다고 생각하여 작업함. 간단하게 작업한
내용을 누군가에게 도움이 될까 공유함..

  

전박적으로 개발 속도를 높이다보니, 데이터베이스 구조에 있어서 너무 아닐하게 확장한 면이 없지않아있는 것 같다는 생각에 처음부터 다시 꼼꼼히
살펴고 수정함. 슬로우 쿼리 로그를 보고 분포도를 확인하고 아래 내용 위주로 수정함.

  

  * query_cache_size
  * join_buffer_size
  * key_buffer
  * tmp_table_size
  * max_heap_table_size
  * innodb_buffer_pool_size

  

Connection Usage(%) = Threads_connected / max_connections * 100

Connection Usage(%)가 100% 라면 max_connections 를 증가시켜주세요.

  

mysql> show status like '%thread%';

mysql> show variables like '%connect%';

  

위 명령어를 통하여 확인 가능합니다.

  

