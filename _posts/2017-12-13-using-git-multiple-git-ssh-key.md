---
layout: post
title: "Git 복수의 SSH Key 사용하기"
description: ""
categories : development
sub_categories : ""
date: 2017-12-13
tags: []
comments: true
share: true
---

여러개의 저장소를 사용하는 경우 여러개의 키를 사용해야하는 경우가 있다.

이 경우 ssh 에서 "i (identity_file)" 옵션을 통해서 매번 지정할 수 있지만 번거롭기에 ssh 설정파일을 통한 해결을
선호한다.

  

$HOME/.ssh/config 위 경로의 설정파일을 생성한다.

아래와 같이 Host 에 따라 개인 키를 설정한다.

  

    Host github.com-youngjun   
    HostName github.com    
    PreferredAuthentications publickey    
    IdentityFile ~/.ssh/github-key/youngjun/id_rsa
    IdentitiesOnly yes Host github.com-hax0r    
    HostName github.com    
    PreferredAuthentications publickey    
    IdentityFile ~/.ssh/github-key/hax0r/id_rsa
    IdentitiesOnly yes 

  

  

