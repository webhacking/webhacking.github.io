---
layout: post
title: "Webhacking.kr 40번 문제"
description: ""
categories : ""
sub_categories : ""
date: 2017-07-27
tags: []
comments: true
share: true
---

**Challenge 40**

  

500 스코어 문제이며, 다른 문제에 비하여 상대적으로 높은 점수의 속한다.

"no","id","pw" 세개의 필드가 있고, 하단에는 로그인 버튼이 있는 폼이 존재한다.

  

기본적으로 필드에는 값들이 대입되어있다. 대입되어있는 값의 정보는 아래와 같다.

  

  * no : 1
  * id : guest
  * pw : guest

테스트를 위해 no 파라미터에 인젝션 쿼리를 대입하여 질의해 보았다.

응답 값은 "access dinied" 이다.

  

이번엔 조건을 거짓으로 만들어보니 "Failure" 를 응답한다.

  

응답 이후에, meta 태크를 통해서 2초 후 페이지를 이전 페이지로 리다이렉트한다.

  

    -1||if(no=2,1,0)

  

if 문을 이용해서 no 파라미터가 2 이면 1을 반환하도록 해보았다.

이후 페이지가 리다이렉트 되는데, 리다이렉트 된 페이지에는 admin password 라는 입력 폼이 보인다.

  

음.. password 를 알아낼 수 있는 힌트를 주지 않는다.

따라서 MySQL LIKE 구문을 사용하여 "pw like %" 와 같은 쿼리를 질의하여 패스워드를 알아낼거다.

  

우선 블라인드 인젝션을 위해 pw 필드의 길이를 알아야하기 파이썬 스크립트를 작성했다.

  

덕분에 패스워드 길이가 10이라는 것을 알아낼 수 있었다.

  

이후에 파이썬 스크립트를 다시 작성해, 패스워드를 알아내서 본 문제를 Solved 했다.

  

스크립트는 별도로 본인 [github](https://github.com/webhacking) 에 등록했다.

  

  

![](/assets/images/posts/792/266F1A335979D28608EBF0.PNG)

