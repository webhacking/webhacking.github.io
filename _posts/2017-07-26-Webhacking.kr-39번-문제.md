---
layout: post
title: "[풀이] Webhacking.kr 39번 문제"
description: ""
date: 2017-07-26
tags: []
comments: true
share: true
---

100 스코어의 문제이다.

문제의 힌트코드는 아래와 같다.

  

  

    $pw="????";if($_POST[id]){$_POST[id]=str_replace("\\","",$_POST[id]);$_POST[id]=str_replace("'","''",$_POST[id]);$_POST[id]=substr($_POST[id],0,15);$q=mysql_fetch_array(mysql_query("select 'good' from zmail_member where id='$_POST[id]"));if($q[0]=="good") @solve();}

  

post 메소드의 id 파라미터를 두번 치환한다.

치환하는 항목은 아래와 같다.

  

  * \\\을 공백으로 치환
  * '를 "로 치환

  

$_post[id] = substr($post[id],0,15); 는 0 ~ 15에 열까지를 출력한다는 것 이다.

  

이 후 데이터를 가져온다.

가져온 데이터가 good 이라면 Solve 된다.

select 문을 보면 "'"가 안닫혀 있는 것을 확인할 수 있다.

  

즉, 입력할 때 '를 반드시 입력해야 한다는 것 이다.

  

substr 함수를 통해 15글자를 잘라낸다.

이 말은 즉 15번째 글짜가 "'" 이면 총 16글자가 되므로 마지막 두글자는 " " " 이다.

  

따라서 입력 값은

`admin '` 이 된다.

  

  

  

![](/assets/images/posts/791/270547335977FDD61FB983.PNG)

  

