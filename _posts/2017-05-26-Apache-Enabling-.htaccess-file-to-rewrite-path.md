---
layout: post
title: "Apache Enabling .htaccess file to rewrite path"
description: ""
date: 2017-05-26
tags: ['Apache Enabling .htaccess file to rewrite path']
comments: true
share: true
---

중학교 2학년 때 잠시 게임 서버 때문에
[A](https://httpd.apache.org/)[pache](https://httpd.apache.org/) 웹 서버를 사용했던 적
있는데,

시간이 지나니 자연스럽게 다른 플랫폼을 이용하다 이번에 로그 시스템 개발을 진행하게 되면서 사용하게되었다.

  

설치가 간단해서 참 좋다.

  

자체적인 로그시스템이라하면,

따로 로그 인스턴스의 Access log 기반으로 매일 주기적으로 데이터를 정리해 파일을 압축해 클라우드에 올리는 흐름으로 정리 구성
되어있다. 궁극적으로 우리 시트템의 이용자를 Tracking 하기 위해 구성되어있다.

그런데 여기서 애로 사항은 CORS 문제 때문에 옵션을 추가해줘야하는데, `.htaccess` 에 해당 헤더 값 을 추가해도 동작하지 않아
확인해보니

이전 설정과 조금 변동사항이있었다.

  

로그 시스템 코드는 Github 에 오픈 소스로 등록해두었다.

https://github.com/Logispot/analyze-traffic-for-truckup

  

본 문제는 검색하니 금방 나와서 블로그에 짧게 나마 적어본다.

  

> New apache version has change in some way.

>

> If your apache version is 2.4 then you have to go to /etc/apache2/.

>

> There will be a file named apache2.conf.

>

> You have to edit that one(you should have root permission). Change directory
text like this

  

2.* 버전대 이용자라면 "/etc/apache2/apache2.conf" 해당 경로의 설정파일의 옵션값을 변경해주자.

AllowOverride 옵션이 Disabled 되어있을텐데, AllowOverride All 로 변경해준다.

이 후 새로 바뀐 설정값으로 웹 서버를 reload 한다.

  

    service apache2 reload

  

