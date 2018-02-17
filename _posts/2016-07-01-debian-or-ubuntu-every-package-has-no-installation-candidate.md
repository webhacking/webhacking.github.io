---
layout: post
title: "Debian or Ubuntu Every package “has no installation candidate”"
description: ""
categories : etc
sub_categories : ""
date: 2016-07-01
tags: []
comments: true
share: true
---

http://packages.ubuntu.com/

  

유효한 패키지인데 설치가 안될 때가 있다.

그럴 때 해당 파일`/etc/apt/sources.list`을 확인한다.

  

아래와 같이 추가하고. 업데이트(`apt-get update`) 한다.

이후에 패키지를 다시 설치한다.

  

    deb http://archive.ubuntu.com/ubuntu/ trusty main restricted universe multiverse deb http://archive.ubuntu.com/ubuntu/ trusty-security main restricted universe multiverse deb http://archive.ubuntu.com/ubuntu/ trusty-updates main restricted universe multiverse deb http://archive.ubuntu.com/ubuntu/ trusty-proposed main restricted universe multiverse deb http://archive.ubuntu.com/ubuntu/ trusty-backports main restricted universe multiverse

