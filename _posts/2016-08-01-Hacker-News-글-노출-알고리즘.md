---
layout: post
title: "Hacker News 글 노출 알고리즘"
description: ""
date: 2016-08-01
tags: ['How Hacker News ranking algorithm works']
comments: true
share: true
---

Hacker News의 랭킹 알고리즘이 궁금하다

그래서 찾아 봄 ㅋ

  

![](/assets/images/posts/690/2540D83F579EF4142789F5.GIF)

  

  

***스코어 **= (P-1) / (T+2)^G

**P = **글의 점수, 추천-반대 글쓴이의 추천도 고려하여 1을 뺌 (points of an item (and -1 is to negate submitters vote)

**T** = 글을 쓴 뒤 지난 시간 (time since submission (in hours)

**G** = 중력계수 .news.arc.에선 보통 1.8을 사용한다고함. (Gravity, defaults to 1.8 in news.arc)

  

글 추천이 많을 수록(분자) 오래 살아남고, 시간이 많이 지나거나, 중력계수가 클수록 (분모) 빨리 소멸된다.

가속도를 제공하기 때문에 Linear한 알고리즘보다 역동적인 것이 특징이다.

  

  

  * 참고 링크 

https://medium.com/hacking-and-gonzo/how-hacker-news-ranking-algorithm-
works-1d9b0cf2c08d#.1mux4qa3u

  

  

