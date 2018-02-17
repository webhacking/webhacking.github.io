---
layout: post
title: "도커 명령어 정리"
description: ""
categories : etc
sub_categories : ""
date: 2016-11-13
tags: []
comments: true
share: true
---

**#컨테이너**

  * docker run 컨테이너를 생성한다.
  * docker stop 컨테이너를 정지시킨다.
  * docker start 컨테이너를 다시 실행시킨다.
  * docker restart 컨테이너를 재가동한다.
  * docker rm 컨테이너를 삭제한다.
  * docker kill 컨테이너에게 SIGKILL을 보낸다. 이에 관련된 이슈가 있다..
  * docker attach 실행중인 컨테이너에 접속한다. * docker wait 컨테이너가 멈출 때까지 블럭한다.

* _일시적인 컨테이너를 생성_하고자 할 때는 docker run -rm 명렁어를 사용해 컨테이너를 생성할 수 있다. 이 컨테이너는 멈춰지면 삭제된다.

  

  * docker ps 명령어는 실행중인 컨테이너 목록을 보여준다.
  * docker inspect ip 주소를 포함한 특정 컨테이너에 대한 모든 정보를 보여준다.
  * docker logs 컨테이너로부터 로그를 가져온다.
  * docker events 컨테이너로부터 이벤트를 가져온다.
  * docker port 컨테이너의 특정 포트가 어디로 연결되어있는지 보여준다.
  * docker top 컨테이너에서 실행중인 프로세스를 보여준다.
  * docker diff 컨테이너 파일 시스템에서 변경된 파일들을 보여준다.
  *   

**#이미지**

  * docker images 모든 이미지 목록을 보여준다.
  * docker import tarball 파일로부터 이미지를 생성한다.
  * docker build Dockerfile을 통해 이미지를 생성한다.
  * docker commit 컨테이너에서 이미지를 생성한다.
  * docker rmi 이미지를 삭제한다.
  * docker insert URL에서 이미지로 파일을 집어넣는다. * docker load 표준 입력으로 tar 파일에서 (이미지와 태그를 포함한) 이미지를 불러온다.(0.7부터 사용가능).
  * docker save 모든 부모 레이어와 태그, 버전 정보를 tar 형식으로 표준출력을 통해 @@@ (0.7부터 사용가능).
  * docker import와 docker commit 파일 시스템만 셋업하고 Dockefile과 같은 CMD, ENTRYPOINT, EXPOSE는 포함하지 않는다.

  

  

