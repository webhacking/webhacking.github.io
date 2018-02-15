---
layout: post
title: "Supervisor:: A Process Control System"
description: ""
categories : ""
sub_categories : ""
date: 2016-06-22
tags: ['Process Control', 'Supervisor', 'Supervisord']
comments: true
share: true
---

우선 포스팅하기 앞 서, 해당 포스팅 자체가 혼자 개념을 이해하자는 목적이 강하기에 자세한 설명을 담고있지않습니다.

[Supervisor 공홈](http://supervisord.org/index.html)에서 아주 자세하게 설명하고있으니, 입문으로 보는
개발자들이라면 한번 참고해보시길 바랍니다.

추가 읽어보신 분들중에 오타나 잘못된 부분 찾으신 분 있으시다면 댓글 부탁드립니다. "혼자 사용하는 일기" 라 생각하고 작성했기에.. 다소
문장 자체가 매끄럽지 않을 수 있습니다.

  

[Gearman ](http://blog.hax0r.info/526)덕분에
[Supervisor](http://supervisord.org/)에 대해 좀 알게되었다.

아래 사진은 최근 주말마다 조금 씩 만들고있는 프로젝트이다.

함수 네이밍은 저게 최선이었다;

  

Gearman을 사용하면서 나름 만족해하고있던 찰나에, 갑작스레 워커가 게속 죽었다.

`갑작스레 = 버그심음ㅋ` 따라서 워커가 해당 프로그램을 실행시키고 오류구문을 만나 죽은 것 같았다.

로그를 살펴보니 워커가 오류가 발생함에도 지속적으로 띄워서 서버 메모리 상당수를 차지하고있었다.

stackoverflow의 해당 버그를 요약 후 검색하다가 `Supervisor`를 알게되었고 지금은 잘 사용하고있다.

  

  

현재는 워커가 죽을때마다 Supervisor를 통해서 해당 프로세스를 다시 띄우는 방법으로 변경했다.

근데 그 (프로세스 = 워커)를 게속 띄워도 어차피 게속 죽는 워커가 있다. 대표적으로 구문에러가 있을 것 같다.

개발자가 이를 발견하고 수정한다면 늦게나마 재 실행되겠지만 그게 아니라면 ... 이 또한 메모리를 엄청 차지할 거다.

  

서버가 명령어 한 줄 제대로 못 치는 속도로 가는거다.. Supervisor는 일정 수 실행 후 안되면 포기한다고 한다. (휴..)

  

  

![](/assets/images/posts/662/27680050576A400420CEC5.JPEG)

  

  

  

Supervisor은 간단하게 말하자면 _프로세스 관리 시스템_이다.

해당 포스트에서는 따로 설치방법이나 설정 등에 대해서 깊게 설명하지 않는다.

간단한 개요와 개념 정도만 짚고 넘어가는 포스트이다.

설치 관련해서 궁금하다면 해당 포스트([Installing -
](http://supervisord.org/installing.html)[Supervisor 3.3.0
documentation](http://supervisord.org/installing.html))를 참고한다.

  

  

Supervisor is a client/server system that allows its users to **control a
number of processes** **on UNIX-like operating systems**.

It was inspired by the following:

  

  

아래는 Supervisor 의 몇가지 특징이다.

  1. Simple
    1. Supervisor is configured through a simple INI-style config file that’s easy to learn. It provides many per-process options that make your life easier like restarting failed processes and automatic log rotation.
  2. Centralized
    1. Supervisor provides you with one place to start, stop, and monitor your processes. Processes can be controlled individually or in groups. You can configure Supervisor to provide a local or remote command line and web interface.
  3. Efficient
    1. Supervisor starts its subprocesses via fork/exec and subprocesses don’t daemonize. The operating system signals Supervisor immediately when a process terminates, unlike some solutions that rely on troublesome PID files and periodic polling to restart failed processes.
  4. Compatible
    1. Supervisor works on just about everything except for Windows. It is tested and supported on Linux, Mac OS X, Solaris, and FreeBSD. It is written entirely in Python, so installation does not require a C compiler.
  5. Proven
    1. While Supervisor is very actively developed today, it is not new software. Supervisor has been around for years and is already in use on many servers.

  

  

Supervisor 의 설정은 매우 간단하다. 뭐 이전에 포스팅한 Travis 보다는 양호한 거 같다.

그 예로 내가 설정한 내용을 참고한다. [프로그램:*네임] 형태로 작성하면된다.

command 를 보면, node 형태(node.js 관련 프로그램이기에..)로 기재되어있는데, 저 부분은 자신이 실행할 프로그램의 맞게
알맞게 수정하면된다. (파이썬,php 등)

  

    [program:nodehook]command=/usr/bin/node /srv/http.jsdirectory=/srvautostart=trueautorestart=truestartretries=3stderr_logfile=/var/log/webhook/nodehook.err.logstdout_logfile=/var/log/webhook/nodehook.out.loguser=www-dataenvironment=SECRET_PASSPHRASE='this is secret',SECRET_TWO='another secret'

  

이용자에게 프로세스 모니터를 제공해준다. cli 도 있고 웹 페이지도있다.

필요에따라 아래 사진을 참고한다. 또한 Supervisor 사용해도 될까. 고민하고있다면 Supervisor특징에 나와있듯 이미 오래전부터
수많은 서버에서 사용하고있다. 릴리즈 버전을 보면 알겠지만 현재도 꾸준히 진행중이고 어느정도 안정된 상태이다. 호환성은 딱히 말할 필요없어서
말안하겠다. 거의 다되기 때문이다.

  

좌측의 보면 프로세스 상태가 나와있다.

프로세스 상태의 종류는 아래와 같다.

  

  * STOPPED
    * The process has been stopped due to a stop request or has never been started.
  * STARTING
    * The process is starting due to a start request.
  * RUNNING
    * The process is running.
  * BACKOFF
    * The process entered the STARTING state but subsequently exited too quickly to move to the RUNNING state.
  * STOPPING
    * The process is stopping due to a stop request.
  * EXITED
    * The process exited from the RUNNING state (expectedly or unexpectedly).
  * FATAL
    * The process could not be started successfully.
  * UNKNOWN
    * The process is in an unknown state (supervisord programming error).

  

  

![](/assets/images/posts/662/21131148576B36E11E361F.JPEG)

  

  

아래는 Subprocess State Transition 그래프이다.

상황에 따라서 참고하길 바란다.

  

![](/assets/images/posts/662/23622950576A3F1F20F5C1.PNG)

  

  

