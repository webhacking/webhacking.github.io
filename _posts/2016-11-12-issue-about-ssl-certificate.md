---
layout: post
title: "SSL Certificate 이슈"
description: ""
categories : development
sub_categories : ""
date: 2016-11-12
tags: []
comments: true
share: true
---

> SSL: error:0B080074:x509 certificate routines:X509_check_private_key:key
values mismatch

  

위 에러는 두 모듈 정보가 달라서 생긴문제이다.

아래의 명령어를 통해서 두개의 정보가 서로 일치하는지 확인한다.

서로 다르다면 대칭할수없는 값이므로 발급받은 기관이나 키의 정보를 재확인해야한다.

  

openssl x509 -noout -text -in haxor.crt

openssl rsa -noout -text -in haxor.key

