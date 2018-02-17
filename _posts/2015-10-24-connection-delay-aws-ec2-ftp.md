---
layout: post
title: "AWS EC2 FTP 연결지연"
description: ""
categories : development
sub_categories : ""
date: 2015-10-24
tags: []
comments: true
share: true
---

얼만에 서버이전을 했다, 물론 동일한 AWS 인프라다.

그런데 작업을하다보니 AWS 업로드 속도가 극으로 느린것을 발견,

이래저래 찾아보니 이전에 pasv_address 등록한것을 잊어버리고있었다.

    # This option specifies the location of the RSA key to use for SSL
    # encrypted connections.
    rsa_private_key_file=/etc/ssl/private/ssl-cert-snakeoil.key
    pasv_enable=YES
    pasv_min_port=13000
    pasv_max_port=13100
    port_enable=YES
    pasv_address=변경된 인스턴스
    pasv_addr_resolve=YES

  

