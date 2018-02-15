---
layout: post
title: "Webhacking.kr 50번 문제"
description: ""
categories : ""
sub_categories : ""
date: 2017-10-10
tags: []
comments: true
share: true
---

50번 문제는 이전 문제보다 150스코어 높은 450스코어의 해당하는 문제이다.

문제를 보면 폼이 하나 보이고, 그 위에 큰 글자로 "SQL INJECTION" 이라 적혀 있다.

그렇다.

  

이 문제 또한 "[SQL
INJECTION](https://ko.wikipedia.org/wiki/SQL_%EC%82%BD%EC%9E%85)" 문제인 것 이다.

폼은 "id", "password" 란이 보이고 기본 값으로는 "guest" 로 기재되어있다.

  

Get parameter 의 id 키 값을 mb_convert_encoding 함수를 통해 재 대입하는데,

이 때 euc-kr 인코딩에서 utf-8인코딩으로 변환하는 과정에서의 취약점이 존재합니다.

  

    ",$ck)) exit();if(eregi("");if($data[0]=="2") echo("level : 2");} if($data[0]=="3"){@solve();}  if(!$data){echo("Wrong");} } ?>

  

  
php 에서 magic_quotes_gpc 설정하여 ', ", /, %00등의 값이 들어가게 되면 /와 함께 붙게 되어 injection을
방어합니다.

멀티바이트를 사용하는 언어셋 환경에서는 함수가 \ 앞에 %a1~%fe의 값이 들어오게 되면 %a1\이 한 개의 문자로 취급하여 인코딩해서
\를 치환해버린다.

  

pw 를 md5로 인코딩 하는 부분을 주석 처리하여 id와 pw가 이어지게하여 인젝션을 시도한다.

  

    select lv from members where id='%a1'/*' and pw=md5('*/union select 3 #') 

  

