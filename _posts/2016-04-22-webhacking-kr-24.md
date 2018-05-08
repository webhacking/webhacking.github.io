---
layout: post
title: "Webhacking.kr 24번 문제"
description: ""
categories : development
sub_categories : ""
date: 2016-04-22
tags: [webhacking, 'webhacking.kr']
comments: true
share: true
background_image: /assets/images/posts/well-used/hacked.jpg
---

24번문제는 100 스코어 문제이며 잠시 쉬어가는 문제라고도 할 수 있다.

해당 문제를 보면 client ip,agent 기재되어있고 상단에는 틀린 아이피라는 문구를 볼 수 있습니다.

소스코드를 보면 `index.phps`가 주석되어있는걸 볼수있습니다. 해당 파일로 접근합니다.

  

접근하면 아래와 같은 코드가 보입니다.

  

    extract($_SERVER);extract($_COOKIE);if(!$REMOTE_ADDR) $REMOTE_ADDR=$_SERVER[REMOTE_ADDR];$ip=$REMOTE_ADDR;$agent=$HTTP_USER_AGENT;if($_COOKIE[REMOTE_ADDR]){$ip=str_replace("12","",$ip);$ip=str_replace("7.","",$ip);$ip=str_replace("0.","",$ip);}echo("client ip$ipagent$agent");if($ip=="127.0.0.1"){@solve();}else{echo("Wrong IP!");}

  

`if($_COOKIE[REMOTE_ADDR]){` 이 구문을 참고하면 어떤식으로 문제를 solved 할수있는 알수있습니다.

solve 조건은 ip라는 변수에 값이 `127.0.0.1`이어야합니다.

`REMOTE_ADDR` 값이있고 ip라는 변수에 해당 값과 함께 '12','7.','0,'값을 replace 합니다.

따라서 우리는 해당 조건을 만족하기 위해 REMOTE_ADDR쿠키값에 해당 값(`112277..00..00..1`)을 대입해주면 됩니다.

112277..00..00..1 replace되는 값을 보고 이와같이 수정하면 해당 조건을 만족시킬수있습니다.

  

console 을 통해서 간단히 입력하고 클리어

docum ent.cookie="REM O TE_ADDR= 112277..00..00..1;";

  

**참고**

  * extract : 배열에서 현재 심볼 테이블로 변수를 입력

  

![](/assets/images/posts/600/25073733571A0A612B52BE.PNG)

  

  

  

