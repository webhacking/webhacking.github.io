---
layout: post
title: "Webhacking.kr 49번 문제"
description: ""
date: 2017-09-29
tags: ['hacking', 'WebHacking', 'webhacking.kr']
comments: true
share: true
---

49번 문제는 300스코어의 문제이며, 이전의 문제 풀이 했을때 같은 쉬운 편에 속하는 문제와 비슷한 유형이다.

거의 데자뷰급..

  

페이지를 보면, 머리말에 `SQL INJECTION` 이라 기재되어있다.

그렇다. 본 문제는 SQL Injection 문제이다.

  

페이지내 작은 입력 폼이 보이고, "level" 이라는 라벨 옆 한개의 인풋 필드가 존재하는데, 이 필드의 기본 값은 "1" 이다.

기본값으로 요청을 해보니, 입력 폼 하단에 "zzibong" 이라는 값이 추가되어 응답한다.

  

이 후, 다른 값으로 요청해 보았을 때 위의 문자열을 더 이상 응답해주지않고있다.

"||", "&&" 등의 연산자를 테스트겸 추가하여 요청해보니 추가된 연산자에 따라서 "zzibong"값이 응답되었다.

  

문제 내 소스를 보니, 힌트 페이지가 숨겨져있었고, 숨겨진 힌트 내용은 아래와 같다.

  

    if(time()<1258110000) exit();if($_GET[lv]){if(eregi("union",$_GET[lv])) exit();if(eregi("from",$_GET[lv])) exit();if(eregi("select",$_GET[lv])) exit();if(eregi("or",$_GET[lv])) exit();if(eregi("and",$_GET[lv])) exit();if(eregi("\(",$_GET[lv])) exit();if(eregi("\)",$_GET[lv])) exit();if(eregi("limit",$_GET[lv])) exit();if(eregi(",",$_GET[lv])) exit();if(eregi("/",$_GET[lv])) exit();if(eregi("by",$_GET[lv])) exit();if(eregi("desc",$_GET[lv])) exit();if(eregi("asc",$_GET[lv])) exit();if(eregi("cash",$_GET[lv])) exit();if(eregi(" ",$_GET[lv])) exit();if(eregi("%09",$_GET[lv])) exit();$q=@mysql_fetch_array(mysql_query("select id from members where lv=$_GET[lv]"));echo($q[0]);if($q[0]=="admin") @solve();}

  

eregi 라는 method의 설명은 아래와 같다.

  

> Case insensitive regular expression match  

  

대소문자 구별 없이, 첫 번째 인자 값에 해당하는 문자열을 두번째 인자값에 찾는다.

이 후 참이라면 exit <strike>method</strike> keyword 를 통해 프로세스를 종료한다.

  

따라서 아래 목록에 있는 문자열은 사용할 수 없다는 것 이다.

  

  * union
  * from
  * select
  * or
  * and
  * \\(
  * \\)
  * limit
  * ,
  * /
  * by
  * desc
  * asc
  * cash
  *   * %09

  

이 후 'q' 라는 Variable 에 질의한 쿼리 응답 값을 대입하고, q의 첫번째 인덱스에 해당하는 값이 admin(select 구문
id 참고) 이라면 문제를 Solve 할 수 있다.

질의 되는 쿼리의 내용은 아래와 같다.

  

  

    select id from members where lv={Get method lv parameter}

  

아래와 같은 형식으로 쿼리를 질의하면 문제를 해결할 수 있습니다.

  

    select id from members where lv={Get method lv parameter} or id = "admin"

  

어때요, 참 쉽죠 ?

그렇다면 이제 우회해서 파라미터를 전송해야겠군요.

  

"or" 은 필터링 되어있으니, "||" 로 치환하여 요청합니다.

음.. 안되는군요. 이전 문제와 같은 맥락인데, 서버의 magic quotes 옵션이 켜져있는 것으로 추정되니 `char` 내부 함수를
인용해 아래와 같이 우회해봅니다.

  

  

    lv=1||id=char(97,100,109,105,110)select id from members where lv={Get method lv parameter} or id = char(97,100,109,105,110)

  

음.. 요청된 내용은 이상이 없는데, 동작을 안합니다.

좀 더 살펴보니, "\\(","\\)" 항목 덕분에 char 함수를 사용할 수 없었습니다.

  

그렇다면 hex 값으로 표현하여 우회해봅니다.

admin 값을 16진수로 바꾸면 61636D696E 입니다.

본 값으로 치환하여 재 요청하면, 해결됩니다.

  

    lv=1||id=61636D696Eselect id from members where lv={Get method lv parameter} or id = 61636D696E

  

  

![](/assets/images/posts/823/99D4C33359CE117D236099.PNG)

  

