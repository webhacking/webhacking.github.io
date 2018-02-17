---
layout: post
title: "Webhacking.kr 7번 문제"
description: ""
categories : development
sub_categories : ""
date: 2016-01-28
tags: []
comments: true
share: true
---

이번에도 시간이 남아(? 근무중이라는게 함정)서 문제 풀이를 작성했습니다.

사실 블로그 포스팅을 생각하고 다시금 풀이를 하는거라 속도를 내어 빠르게 작성하고 싶지만 저에게 시간이 한정적이어서..

서론이 길었네요. 각설하고 풀이해봅시다.

  

  

소스를 보면 의미심장한 주석이 두개 있습니다 <!-- index.phps -->,<!-- admin mode : val=2 -->

index.phps 는 추가 정보를 의미하는 것 같고 admin mode val=2의 val은 파라미터
값('challenge/web/web-07/index.php?val=1')을 말합니다.

phps를 우선 먼저 봅시다. 긴 소스가 나옵니다.

  

     Challenge 7"); }$ck=$go;$ck=str_replace("*","",$ck);$ck=str_replace("/","",$ck);echo("admin pageAdmin page");if(eregi("--|2|50|\+|substring|from|infor|mation|lv|%20|=|!||sysM|and|or|table|column",$ck)) exit("Access Denied!");if(eregi(' ',$ck)) { echo('cannot use space'); exit(); }$rand=rand(1,5);if($rand==1){$result=@mysql_query("select lv from lv1 where lv=($go)") or die("nice try!");}if($rand==2){$result=@mysql_query("select lv from lv1 where lv=(($go))") or die("nice try!");}if($rand==3){$result=@mysql_query("select lv from lv1 where lv=((($go)))") or die("nice try!");}if($rand==4){$result=@mysql_query("select lv from lv1 where lv=(((($go))))") or die("nice try!");}if($rand==5){$result=@mysql_query("select lv from lv1 where lv=((((($go)))))") or die("nice try!");}$data=mysql_fetch_array($result);if(!$data[0]) { echo("query error"); exit(); }if($data[0]!=1 && $data[0]!=2) { exit(); }if($data[0]==1){echo("");echo("");}if($data[0]==2){echo("");@solve();} ?>

일단 소스를 보니 대략적인 로직이 보이네요. 그리고 최상단에 주석을 보면 "db에는 val=2가 존재하지 않습니다.union을 이용하세요"

union Based SQL Injection 을 통하여 val에 해당하는 부분에 2가 들어가게하여 풀이해야합니다.  
소스를 보듯이 약간의 필터링이 되있습니다. '/','space','*',--, 2, 50, +, substring, from, infor,
mation, lv, %20, =, !, <>, sysM, and, or, table, column, ' ' 등 스페이스의 경우
라인피드%0a로 우회(%0Aunion%0Aselect%0A3-1%23))가 가능하다.

  

1-5 의 랜덤수로 값을 감싸서 인젝션 이후 리프레쉬를 잘해야된다는 것 ㅋㅋ  

  

클리어 !

  

![](/assets/images/posts/498/25151C4D56A97B881A790D.PNG)

  

  

