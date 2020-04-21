---
layout: post
title: "HSTS (HTTP Strict Transport Security)"
description: ""
categories : development
sub_categories : ""
date: 2017-04-26
tags: ['HTTP Strict Transport Security Cheat Sheet']
comments: true
share: true
---

HTTP Strict Transport Security 를 사용하자.  
301 리다이렉트 비용을 피할 수 있다.

  

해당 응답 헤더를 추가하면 서버는 브라우저에게 해당 사이트는 오직 "HTTPS" 프로토콜만 허용한다고 알려주게된다.

이 후 브라우저는 HTTP를 통하여 매번 접속 시 스킵하고 HTTPS 로 이동하게된다.  
http / https 양쪽 세션을 공유하는 경우에 취약점을 보안할 수 도 있다.  
위키피디아에 기재된 HSTS 의 내용은 웹 사이트내 "Session Hijacking, agains downgrade attack" 을
대응하기 위해 만들어진 보안 매커니즘이라한다.

  

> HTTP Strict Transport Security (HSTS) is a web security policy mechanism
which helps to protect secure HTTPS websites against downgrade attacks and
cookie hijacking. It allows web servers to declare that web browsers (or other
complying user agents) should only interact with it using secure HTTPS
connections,[1] and never via the insecure HTTP protocol. HSTS is an IETF
standards track protocol and is specified in RFC 6797.

  

  

![](/assets/images/posts/740/227A6A50590003263EDA91.PNG)

  

  

Nginx 기준 아래 헤더를 추가하면된다.

  

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

참고한 자료

  * [HTTP Strict Transport Security Cheat Sheet](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security_Cheat_Sheet)

  

