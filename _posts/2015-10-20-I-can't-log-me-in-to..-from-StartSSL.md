---
layout: post
title: "I can't log me in to.. from StartSSL"
description: ""
categories : development
sub_categories : ""
date: 2015-10-20
tags: []
comments: true
share: true
---

코모도 SSL 기간이 이제 끝난다. SSL 연장할까하다가 그냥 StartSSL 무료 발급받기로했다. 근데 왠 오류. .

https 서비스 제공시 인증서가 필요한데, StartSSL에서 무료로 발행하는 인증서를 사용할 경우, linux, mac에서는 문제가
없는데, windows 크롬에서 Insecure Contents로 인식되어 안전하지 못한 사이트로 인식되는 경우가 있다.

크롬에서는 **SHA-1 알고리즘의 인증서를 신뢰하지않고 Insecure Contents에러를 내도록 바뀌었는데, StartSSL에서
SHA-2 알고리즘으로 생성한 인증서를 windows 크롬에서 SHA-1 알고리즘으로 인식하여 Insecure Contents 에러를
발생**한다.

  

  * https://code.google.com/p/chromium/issues/detail?id=473105
  * https://forum.startcom.org/viewtopic.php?p=21707#p21707
  * http://serverfault.com/questions/684736/why-does-chrome-on-1-computer-say-my-certificate-is-invalid-insecure

  

