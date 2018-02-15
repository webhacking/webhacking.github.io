---
layout: post
title: "Webhacking.kr 22번 문제"
description: ""
categories : ""
sub_categories : ""
date: 2016-04-18
tags: ['22번', 'MD5', '개념', '문제', '알고리즘', '풀이']
comments: true
share: true
---

22번 문제는 500스코어 문제입니다.

이번 문제도 [Blind SQL
Injection](https://www.owasp.org/index.php/Blind_SQL_Injection) 관련 문제입니다.

아침에 회사에서 풀이하고있네요. 문제를 보면, login,join 두개의 폼이있고 맨 아래 힌트가 기재되어있다.

    echo("hi! $id");echo("your password is $pw");if($id=="admin") echo("good! Password is $solution");

admin 계정으로 몇번의 로그인 삽질 후, 테스트 계정("hax0r , passme") 생성 후

해당 계정으로 로그인했습니다.

  

`user key` 에 fa1b7a72586b7dfde844a4a2b8ea1bfe 값이 출력되네요.

32자(128bit)로 구성된 값으로 MD5를 유추해볼수있습니다.

이전 풀이에서 hash와 base64의 개념을 짚었습니다. 이번에는 MD5의 개념을 간략하게 짚고넘어가겠습니다.

  

MD5(Message-Digest algorithm 5)는 128비트 암호화 해시 함수입니다.

초창기 시절 안전하다 평가되었지만 컴퓨터의 엄청난 발전으로 인해 해쉬크래쉬를 통한 MD5크랙이 가능해졌습니다.

때문에 현재는 사용을 권장하지않고있습니다. 하지만 아직도 일부 오래된 서비스에서는 MD5로 패스워드를 암호화하고있으며 이를 통해
공격자(해커)는 쉽게 유저의 패스워드를 알수있습니다.

추가로 패스워드는 대부분 공통으로 사용하는 유저들이 많아 타 서비스 (구글,페이스북,인스타그램)등에도 제2의 피해가 발생할수있으니
프로그래머는 이를 가볍게 여겨서는 절대 안됩니다.

  

네이버D2게시물 중 "안전한 패스워드 저장(http://d2.naver.com/helloworld/318732)"이라는 포스트가 있습니다.

한번씩 읽어보면 아주 좋은 내용이니 참고하실분은 참고하시길 바랍니다.

  

md5의 가장 큰 특징은, 어떤길이의 문자라도 _128비트로 만들어서 출력_시킨다는 점입니다.

  

![](/assets/images/posts/590/231C3C5057144D17155F18.PNG)

  

  

  

해당 값을 디코딩 했을때, passmezombie 값이 출력됩니다.

패스워드값에 zombie 라는 값이 추가되는 것을 알았습니다. 그렇다면 다른 계정 패스워드에도 zombie라는 값이 추가된다는것을

예측할수있습니다. 몇번 시도 끝에 fail

  

인간은 도구를 사용해야합니다.

파이썬으로 짧게 코드 작성, 클리어.

  

  

![](/assets/images/posts/590/222C354057143B0011B0FD.JPEG)

  

![](/assets/images/posts/590/223FD74357143B0C15179F.JPEG)

  

  

