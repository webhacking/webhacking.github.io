---
layout: post
title: "Webhacking.kr 25번 문제"
description: ""
categories : development
sub_categories : ""
date: 2016-04-24
tags: ['150번', '25번', '정답', '풀이']
comments: true
share: true
---

25번문제는 150스코어 문제이다.

문제 난이도 상단히 낮아서 쉽게 클리어했다.

  

문제를 보면 file이라는 파라미터값에 기본값으로 hello라는 값이 대입되어있다.

확장자는 기재되어있지않다. password와 password.php를 대입해서 다시 요청해본다.

아무런 내용이 나오지않는것을보아 해당 파라미터값 마지막부분에 ".txt"확장자가 붙는 것 같다.

이 부분을 우회한다면 우리는 저 password파일을 볼 수 있을 것 이다.

이때는 'null' 값을 이용하면된다. 문자열의 끝으로 인식하기때문에 'password.php%00' 값으로 대입하고 요청하면 문제를
클리어할수있다.

  

합계 12

-rw-r--r-- 1 oldzombie users 12 5월 14 00:57 hello.txt 

-rw-r--r-- 1 oldzombie users 1158 9월 5 01:24 index.php 

-rw-r--r-- 1 oldzombie users 57 5월 14 00:57 password.php

  

![](/assets/images/posts/602/2240894A571C6CD90FBD66.JPEG)

  

  

