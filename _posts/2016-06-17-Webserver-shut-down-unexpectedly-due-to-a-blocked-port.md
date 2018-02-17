---
layout: post
title: "Webserver shut down unexpectedly due to a blocked port"
description: ""
categories : development
sub_categories : ""
date: 2016-06-17
tags: []
comments: true
share: true
---

웹핵 문제풀려고 아무생각없이 그냥 작업컴에다 웹서버 설치하고 돌리려니깐..

`This may be due to a blocked port, missing dependencies` 에러 뜸.

Skype 를 사용한다면 아래 순서대로 설정하면되고, 아니라면 현재 네트워크 포트현황보면서 80으로 잡힌거 죽이면됨.

아니면 웹 서버 포트를 좀 바꾸면됨 (EX : 8080,3063)

  

  

  1. Go to Tools > Options > Advanced > Connection
  2. Disable the “Use port 80 and 443 for alternatives for incoming connections” setting
  3. Sign Out and close all Skype windows*
  4. Start Apache and it should work now

  

