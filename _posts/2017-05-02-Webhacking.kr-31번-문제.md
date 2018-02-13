---
layout: post
title: "Webhacking.kr 31번 문제"
description: ""
date: 2017-05-02
tags: []
comments: true
share: true
---

150 포인트의 문제다.

문제를 보면 `port` 라는 변수의 `rand(10000,10100)` 을 대입한다.

  

여기서 `rand` php 내부 함수는 정수 난수를 생성한다.

rand 는 0과 getrandmax 사이의 임의의 난수를 반환한다.

  

> If called without the optional min, max arguments rand() returns a pseudo-
random integer between 0 and getrandmax(). If you want a random number between
5 and 15 (inclusive), for example, use rand(5, 15).

  

이후 `socket` 이라는 변수에 fsockopen 함수를 대입한다.

위의 선언된 `port` 는 두번째에 위치해 있고, 첫 번째 인자에는 get 메소드의 server 파라미터가 담겨있다.

실질적으로 문제 페이지에 들어가면 아래 주소로 리다이렉트 된다.

  

challenge/web/web-16/?server=175.196.156.178

  

여기서 server 파라미터에 값은 현재 요청한 클라이언트의 아이피, 즉 본인의 아이피가 되겠다.

그리고 하단에는 연결관련한 에러 문구(Connection refused)가 나온다.

  

문제를 보면 알겠지만, 저 파라미터 값의 대상의 포트를 10000, 10100 에 해당하는 번호로 열면된다.

정말 쉽게, 클리어

  

$port=rand(10000,10100);

$socket=fsockopen("$_GET[server]","$port",$errno,$errstr,3) or die("error :
$errstr");

  

  

Warning: fsockopen() [function.fsockopen]: unable to connect to
175.196.156.178:10045 (Connection refused) in
/home/hosting_users/webhacking/www/challenge/web/web-16/index.php on line 24

error : Connection refused

  

