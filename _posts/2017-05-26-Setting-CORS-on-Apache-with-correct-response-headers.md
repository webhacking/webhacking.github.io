---
layout: post
title: "Setting CORS on Apache with correct response headers"
description: ""
date: 2017-05-26
tags: []
comments: true
share: true
---

아래 게시물의 연장선상이다.

http://blog.hax0r.info/750

  

CORS 를 설정안하고있었다니 !

SSL 설정하는라 제일 기본적인걸 건너뛰었다. 그래서 바로 추가함.

  

    Header set Access-Control-Allow-Origin "Origin 호스트"Header set Access-Control-Allow-Methods "허용 메소드 (e.g GET, POST, PUT 등등)"

