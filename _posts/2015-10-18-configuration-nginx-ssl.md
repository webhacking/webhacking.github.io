---
layout: post
title: "NGINX SSL 설정"
description: ""
categories : development
sub_categories : ""
date: 2015-10-18
tags: []
comments: true
share: true
---

작년에 SSL 설정을 따로해놨는데, 이번에 강제이전(?)을 하게되고 재 설정하게되었다.

`Configuring HTTPS Servers` 꽤 잘 설명되있는 [문서](('http://nginx.org/en/docs/http/configuring_https_servers.html'))를 가지고왔다.


  * .key - CSR 자동생성 신청시, 같이 자동 생성된 개인키 (SHA1 알고리즘, PEM 텍스트, 패스워드 없음)
  * .pfx - 개인키+서버응답인증서 패키징된 인증서 (설치시 암호 필요)
  * .pfx.txt - pfx 를 이용해서 인증서 설치시 필요한 해제 암호
  * .Chain.zip - 설치가 필수인 체인 인증서 모음 압축 파일 


    server {
    
    listen 443 ssl;
    
    server_name www.example.com;
    
    ssl_certificate www.example.com.crt;
    
    ssl_certificate_key www.example.com.key;
    
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    ...
    
    }


  

