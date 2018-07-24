---
layout: post
title: "분산 처리 오픈 소스, Gearman에 대하여"
description: ""
categories : development
sub_categories : ""
date: 2016-03-15
tags: ['architecture', 'Gearman', '분산', '분산 처리 오픈 소스']
comments: true
share: true
---

회사에서 Gearman을 사용하고있다.

Gearman의 대하여 좀 더 이해할 겸 포스팅한다.

대용량 아키텍쳐를 구성할 때 생각해볼만한 프로그램인 것 같다.

  

Wiki의 기재된 [Gearman](https://en.wikipedia.org/wiki/Gearman)의 대한 설명이다.

> Gearman is an open source application framework designed to distribute
appropriate computer tasks to multiple computers, so large tasks can be done
more quickly.

  

Gearman은 분산 처리 오픈 소스이다.

Async Queue + Working 서버라 생각하면 쉽다. Request를 Queuing 했다가, 뒤의 Work Process로 넘겨줘서
작업을 비동기로 처리해주는 형식이다.

  

Gearman은 memcached, MogileFS으로 유명한 Danga Interactive에서 개발한 제품 중에 하나로 유명한 펄 해커인
Brad Fitzpatrick 씨가 제작했다.

초창기 Gearman은 순수하게 펄로 작성되었고 클라이언트 라이브러리도 주로 펄만 고려했다.

하지만 이후 Eric Day 씨가 Gearman을 C로 재작성하고 타 언어에 대한 클라이언트 라이브러리 지원 등을 강화하면서 지금의
Gearman은 언어 중립적이고 포괄적인 분산 프로세스 플랫폼(수 많은 언어를 지원하는 이유)으로 발전했다. Gearman은
c,php,perl,python 이외 여러 언어등을 지원하고있다. 따라서 상황에 적합한 언어를 선택하면 된다.

  

한대의 서버가 오류가 나더라도 다른서버로 접근 단, **addserver**로 추가해줘야한다.

  
  

  

![](/assets/images/posts/526/241A455056E79C500D4F2C.JPEG)

  

클라이언트 코드 : 함수를 문자 리터럴로 전송

    $client = new GearmanClient();$client->addServer();print $client->do("reverse", "Hello World!");

  

    워커 코드 : 함수를 문자 리터럴로 전송// Reverse Worker Code$worker = new GearmanWorker();$worker->addServer();$worker->addFunction("reverse", function ($job) {  return strrev($job->workload());});while ($worker->work());

  

**호출 흐름도**

  

![](/assets/images/posts/526/231DE74C56E79EA42F14B7.PNG)

  

  

**구성**

High Availibility와 Fault Tolerance의 분산 환경의 구성이 가능

  

![](/assets/images/posts/526/21670F4F56E79ED7066E0A.PNG)

  

  

  

  

**Gearman 서버**

클라이언트에서 전달받은 작업을 적절한 워커로 분배하는 역할, 초기 Gearman은 작업을 따로 저장하지 않고 메모리에서 처리했지만

현재는 다양한 영속 저장방법((libmemcached, libdrizzle, SQLite, Mysql, Postgres,
tokyocabinet, Redis, Mongodb))을 지원하고 있다.

Gearman 서버는 멀티서버를 지원하기 때문에 단일 장애지점 (Single Point of Failure)을 피해서 구성할수있다. 현재
Gearman 서버 구현체는 C로 작성된 gearmand와 펄로 작성된 Gearman::Server가 있다.

**  
**

**Gearman 워커**

실제로 우리가 원하는 작업을 수행하는 프로세스이다. 위에 언급한 것 처럼 다양한 언어로 작성될 수 있다.

  

**Gearman 클라이언트**

워커에게 작업을 시키는 프로세스이다. 마찬가지로 다양한 언어로 작성될 수 잇다.

  

  

밑에는 간단하게 짠 것들.. 돌려봄

`[supervisor](http://supervisord.org/)` 랑 함께 사용했습니다. 워커가 계속 x져서..

  

![](/assets/images/posts/526/23098350592B6805039B5D.PNG)

  

  

  

참고

  * [Gearman, from the worker's perspective](http://www.slideshare.net/brianaker/gearmam-from-the-workers-perspective)
  * <http://gearman.org/>
  * [열다섯번째 날: 자랑스러운 우리 회사의 숨은 일꾼 만들기](http://advent.perl.kr/2012/2012-12-15.html)

  

