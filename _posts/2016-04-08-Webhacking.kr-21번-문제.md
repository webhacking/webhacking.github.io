---
layout: post
title: "[풀이] Webhacking.kr 21번 문제"
description: ""
date: 2016-04-08
tags: []
comments: true
share: true
---

21번 문제는 "BLIND SQL INJECTION" 관련 250 스코어 문제다.

BLIND SQL INJECTION 관련해서는 블로그에 몇개 포스팅 해둔게있다. 개념이 잘 안잡힌다면 전에 작성했던 게시물을 찾아보길바란다

  

https://www.owasp.org/index.php/Blind_SQL_Injection

  * Blind SQL (Structured Query Language) injection is a type of [SQL Injection](https://www.owasp.org/index.php/SQL_Injection) attack that asks the database true or false questions and determines the answer based on the applications response. This attack is often used when the web application is configured to show generic error messages, but has not mitigated the code that is vulnerable to SQL injection.

  

쉽게 요약하자면,

sql injection은 DB구조를 알아야 저극적인 공격이 가능하다. 반면에 blind sql injection 은 _입력/제출한 값의
서버측의 응답을 통해서 DB내용을 거꾸로 유추_하는 방법이다.

  

no 파라미터 값에 1,2 이외에 값을 대입했을 때 결과는 0이고, 1,2의 경우는 결과가 1이다.

그 먈은 즉, 해당 두개의 row가 있다는 것을 유추해볼수있다. 서버에서는 아래와 같이 쿼리를 보낼 것 이다.

  

SELECT * FROM table name WHERE no=$_GET[no];

  

현재 id,pw값을 null 값으로 요청했다, 이제 두개 row 에 id,pw 값을 알아야한다.

substr,ascii 함수를 이용해서 id,pw가 몇글자로 이루어진지 알아야한다. 해당 문자열 길이를 리턴해주는 length 함수를
사용해본다.

첫 번째 로우와, 두번째 로우의 아이디를 몇번의 삽질 끝에 알아냈다. 알아냈다고 말하기보다는 유추했다고 표현해야되는게 맞을지도 모르겠다.

1번 로우는 id값이 gest 였고, 2번째 로우가 admin 이 었다. 따라서 1번을 배제하고 2번의 패스워드를 찾는 간단한 프로그램을
파이썬으로 작성했다.

  

어째 갈수록 풀이가 짧아지는 것 같다.

아마 요즘 시간도 많이 안나서 블로그에 투자를 못 하고있다.

  

  

![](/assets/images/posts/580/2717B84B570DD20F095743.PNG)

  

  

클리어

  

  

![](/assets/images/posts/580/2458FC3B570DDC7805E86C.PNG)

  

