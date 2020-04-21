---
layout: post
title: "Connect to docker container from host"
description: ""
categories : development
sub_categories : ""
date: 2016-11-18
tags: []
comments: true
share: true
---

docker ps 를 통하여 현재 동작중인 컨테이너 목록을 출력합니다.

  

    root@ip-172-31-19-244:/home/docker# docker psCONTAINER ID        IMAGE                             COMMAND                  CREATED             STATUS              PORTS                         NAMES80376906269a        hax0r/nginx:latest   "nginx -g 'daemon off"   2 minutes ago       Up 2 minutes        0.0.0.0:80->80/tcp, 443/tcp   docker_nginx_1067bb179d53a        hax0r/tensorflow:0.1        "/bin/sh -c '/usr/sbi"   2 minutes ago       Up 2 minutes        9000/tcp                      docker_app_1

  

**exec**

해당 명령어를 통하여 접속합니다.

외부에서 컨테이너 안의 명령을 실행하는 exec 명령입니다.

  

    docker export    
    docker exec -it 80376906269a /bin/bash

