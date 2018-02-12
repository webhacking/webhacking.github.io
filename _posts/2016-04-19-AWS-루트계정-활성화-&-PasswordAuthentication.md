---
layout: post
title: "AWS 루트계정 활성화 & PasswordAuthentication"
description: ""
date: 2016-04-19
tags: []
comments: true
share: true
---

AWS 보안상의 이유로 key pair file을 이용하도록 권장하고있다.

하지만 개발을 할때마다 너무 불편해서 ROOT 계정을 활성화한다.

  

    ubuntu@ip-172-31-30-99:~$ sudo passwd rootEnter new UNIX password: Retype new UNIX password: passwd: password updated successfullyubuntu@ip-172-31-30-99:~$ su

  

루트계정 패스워드를 설정한후에 해당 계정으로 로그인합니다.

그리고 ssh 설정 파일을 조금 수정해줍니다.

  

    vi /etc/ssh/sshd_config

  

    PasswordAuthentication yes

  

ssh 데몬을 다시 Restart 해줍니다.

    sudo service ssh restart

  
  
  

  

