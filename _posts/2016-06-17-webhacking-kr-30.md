---
layout: post
title: "Webhacking.kr 30번 문제"
description: ""
categories : development
sub_categories : ""
date: 2016-06-17
tags: [webhacking, 'webhacking.kr']
comments: true
share: true
background_image: /assets/images/posts/well-used/hacked.jpg
---

오랜만이죠? 30번 문제는 550 스코어 문제네요.

다소 쉽게 생각하면 쉬운 문제이고 어렵게 생각하면 한 없이 어려운 문제가 아닐까 생각이됩니다.

30번 문제를보면 파일 입력 폼과 힌트라고 기재된 문구아래에 링크가 하나있습니다.

  

http://webhacking.kr/challenge/web/web-15/upload/index.phps

해당 링크를 보면 아래의 코드를 볼 수있습니다.

  

  

그냥 코드 그대로 읽으세요. Mysql 연결(`challenge_30_answer`) 데이터베이스 셀렉트 유무를 확인하고,
`password` 컬럼에 값을 변수 q에 대입한다. q의 값을 `mysql_fetch_array('인출된 행을 배열로 반환하고, 앞으로
내부 데이터 포인터를 이동')` 함수를 통해서 다시 data라는 변수에 대입한다. data변수가 참이라면 pw 값을 보여준다. 여기서 pw
변수는 숨은 패스워드를 의미하는 것 같다.

  

자, 무엇을 먼저 생각해야하는가?

해당 테이블에 password 컬럼에 값을 Insert 한다? 이것또한 좋은 방법일 것 같다.

하지만 난 아쉽게도 시도해보지않았다. 좀 더 쉽게 생각한다면_ 저 연결되는 부분을 내 서버또는 로컬에 연결_시키면 어떨까 하는 생각이다.

  

    mysql_connect() or die();mysql_select_db("challenge_30_table") or die();$q=mysql_query("select password from challenge_30_answer") or die();$data=mysql_fetch_array($q) or die();if($data){$pw="????";echo("Password is $pw");}

  

그래서, 해당 웹서버가 아파치라는 것을 감안하여 ,

`.htaccess`를 통해 php_value 값을 넣어줄 예정이다.

  

  

아래는 설정 예이다.

기본 호스트를 내가 요청할 호스트를 적으면된다.

실제사용할때는 주석을 제거하길 바란다.

    #php_value mysql.default_host "호스트"#php_value mysql.default_user "root"#php_value mysql.default_password "passme"

  

연결할 곳, 로컬은 너무 귀찮다.(내 생각) 그래서 MySQL Free hosting 검색.

하나 찾음. 올ㅋ 39초만에 가입하고 활짝 웃으며 디비 만들려는데... 웁스?

  

누가 이미 만듬ㅋ; 올ㅋ

나랑 같은 생각하심?.. ( 같은 생각 = 귀차늠)

  

  

  

![](/assets/images/posts/658/2131F84D5763B6FD137435.PNG)

  

  

  

그래서 내 로컬에 환경을 구축함.

DB하고 테이블 만들고 해당 컬럼에 값('hax0r' = '닉네임') 하나 넣음.

후 에 http://webhacking.kr/challenge/web/web-15/upload/index.php 로 요청하면 패스워드 값
나옴.

클리어.

  

  

![](/assets/images/posts/658/246AEC505763BA610ECC16.PNG)

  

  

  

  

  

  

![](/assets/images/posts/658/2458204F57BBFBE41B4D83.PNG)

![](/assets/images/posts/658/2769F84F57BBFBE50CE2B6.PNG)

  

