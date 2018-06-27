---
layout: post
title: "Webhacking.kr 33번 문제"
description: ""
categories : development
sub_categories : ""
date: 2017-05-29
tags: [webhacking, 'webhacking.kr']
comments: true
share: true
background_image: /assets/images/posts/well-used/hacked.jpg
---

33번 문제는 정확히 "스무고개' 문제이다.

스테이지 별로 좀 다른 것 같지만 아무래도 상위 스테이지로 갈 수록 조금의 난이도가 추가되는 것은 사실인 것 같다.

정확히 10개의 스테이지(?)가 존재한다.

  

모든 항목들을 정리하기는 시간 상 다소 무리이니 간단하게 조건을 충족시키는 방법에대해 얘기하고자한다.

  

  * ( $_GET[get]=="hehe" )
    * get 메소드의 get 파라미터의 hehe를 대입해서 요청하면 된다.
  * ( $_POST[post]=="hehe" && $_POST[post2]=="hehe2" )
    * 문제 내에서 간단하게 Html 폼을 작성해서 해당 파라미터에 조건이 충족되는 값을 기입 후 요청하면 된다.
  * ( $_GET[myip]==$_SERVER[REMOTE_ADDR] )
    * myip 라는 파라미터의 본인 아이피를 대입해서 요청하면 된다.
  * ( $_GET[password]==md5(time()) )
    * 이 항목에서 `hint`에 현재 타임스탬프가 보여지고있다. 약 10 초 후의 타임 스탬프를 MD5로 암호화후에 요청하면 클리어된다.
  * ( $_GET[imget] && $_POST[impost] && $_COOKIE[imcookie] )
    * imget, impost 에 임의에 값을 입력하고 imcookie 를 생성 후 요청하면 클리어 됩니다.
  * ( $_COOKIE[test]==md5("$_SERVER[REMOTE_ADDR]") && $_POST[kk]==md5("$_SERVER[HTTP_USER_AGENT]") )
    * test 쿠키에 자신의 ip를 md5 로 암호화한 값을 대입하고 post 메소드에 kk 파라미터의 hint 항목에 나온 User Agent 값을 md5로 암호화 후 요청하면 클리어된다.
  * ( $_GET[$_SERVER[REMOTE_ADDR]]==$_SERVER[REMOTE_ADDR] )
    * 상단 코드를 보면 '.'이 '' 로 치환되는데 이 치환된 아이피 정보의 파라미터의 키로 그리고 값으로 대입해서 요청하면 된다.
  * ( $addr=="127.0.0.1" )
    * extract($_GET) 이 상단에 위치되어있는데, 코드의 내용을 보면 addr 파라미터로 127.0.0.1 을 대입해서 요청하면 된다.
  * 9번 항목은 아래 코드를 참고한다.
    * $i+2와 $answer .= $ch; 라인을 보고, 아스키코드 표를 참고하면된다. "acegikmoqsuwy"
  * 출력되는 값의 경로를 wehacking.kr 경로와 치환하여 요청하면 패스워드가 노출된 페이지에 간다.
    * 노출된 패스워드의 값을 Auth 항목으로 이동하여 제출하면 33번 문제 클리어

  

  

  

9번 항목 내용 중 ..

    for($i=97;$iNext");}else{echo("Wrong");}

  

  

10번 항목 내용 중 ..

  

    $ip=$_SERVER[REMOTE_ADDR];for($i=0;$i<=strlen($ip);$i++){$ip=str_replace($i,ord($i),$ip);}$ip=str_replace(".","",$ip);$ip=substr($ip,0,10);@mkdir("answerip/$ip");$answer=$ip*2;$answer=$ip/2;$answer=str_replace(".","",$answer);$pw="###";$f=fopen("answerip/$ip/$answer.$ip","w");fwrite($f,"Password is $pw\n\nclear ip : $_SERVER[REMOTE_ADDR]");fclose($f);

  

  

스무고개 나름 재밌었다..ㅎㅎ

  

  

![](/assets/images/posts/754/24327537592BBBEE1C83D4.JPEG)

  

  

  

![](/assets/images/posts/754/21380037592BBBEE1194C5.PNG)

  

