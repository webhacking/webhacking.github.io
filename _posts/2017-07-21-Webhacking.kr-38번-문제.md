---
layout: post
title: "Webhacking.kr 38번 문제"
description: ""
date: 2017-07-21
tags: []
comments: true
share: true
---

**About 38 challenge**

  

38번 문제는 100스코어의 비교적 낮은 스코어의 문제이다.

문제를 보면 "LOG INJECTION" 크게 적혀있고, 아래 간단한 입력 폼이 있다.

  

login 과 admin 두개의 버튼이 존재하는데, login 은 폼의 submit 을 요청하고, admin은 페이지를 admin.php 로
리다이렉트 한다.

리다이렉트 된 페이지에서는 "log" 라는 짧은 메세지가 페이지에 출력되어있다.

  

이 후, 다시 이전 폼으로 돌아와서,

테스트 용도로 `hax0r` 이라 입력을 해보았다.

  

이 후, 다시 log 가 존재하는 페이지로 이동하니, 아래와 같은 로그가 생성되었다.

log 생성 기준은 입력 시 아래와 같은 포맷으로 저장되는 것으로 유추된다.

  

{요청 아이피}:{요청 값 = id}

  

    log1.{보안이슈로 가림}.24.49:hax0r 

  

hax0r 이 아닌 admin 으로 요청하니 이번의 새로운 output 이 나왔다.

  

> you are not admin  

  

궁극적으로 비 정상적 로그를 생성하여 본 문제를 Solve 해야 한다.

개행 문자를 사용해서 본 문제를 해결할거다.

  

아래와 같은 값을 생성하여 재 요청한다.

  

    hax0r\{본인 아이피}:admin

  

  

![](/assets/images/posts/789/2554FA4D5971C89F1ED30A.PNG)

  

  

**Glossary**

  

  * 개행 문자
    * 컴퓨터에서 줄바꿈을 나타내는 제어문자

  

