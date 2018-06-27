---
layout: post
title: "Docker 빌드 할 때, 쉘 스크립트 에러"
description: ""
categories : development
sub_categories : ""
date: 2016-11-23
tags: ['docker', 'Docker build gearman not working', 'entrypoint', '도커']
comments: true
share: true
---

도커 파일 빌드 중에 쉘 스크립트가 동작하는데, 동작에 있어서 service `*` start 명령어가 실행되지않아  
stack overflow 통하여 질문해보니 답변이 왔다.  
  
혹시 나와 동일하게 이 와 같은 `RUN path/your-sh.sh` 형식으로 진행하였다면 아래와 같이 수정하길 바란다.  
**ENTRYPOINT ["path/your-sh.sh"] , `**ENTRYPOINT`는 컨테이너가 시작되었을 때 명령을 실행한다.

_`ENTRYPOINT`는 Dockerfile 에서 단 한번만 사용할 수 있다._  
  
  

![](/assets/images/posts/706/213F0F495835470D02A6DB.PNG)

  

