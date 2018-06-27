---
layout: post
title: "Fail2Ban 통하여 브루트 포스 예방"
description: ""
categories : development
sub_categories : ""
date: 2017-07-04
tags: ['fail2ban']
comments: true
share: true
---

[Fail2Ban](https://www.fail2ban.org/wiki/index.php/Main_Page) 은 로그기반의 무료
소프트웨어이며, [브루트
포스](https://namu.wiki/w/%EB%B8%8C%EB%A3%A8%ED%8A%B8%20%ED%8F%AC%EC%8A%A4) (무차별
로그인 공격)에 대한 보안 역할을 합니다.

지정 시간 내 지정 횟수 만큼 실패할 경우 별도의 차단 시스템이 작동하며,

이외 개별적으로 선택한 알림(e.g. 메일, 슬랙) 메커니즘을 통하여 관리자에게 알림이 갑니다.

  

  

> Fail2Ban is an intrusion prevention software framework that protects
computer servers from brute-force attacks

  

  

![](/assets/images/posts/772/257ED644595B63542DCD50.PNG)

  

  

  

위에 말했 듯 로그 기반의 시스템 입니다.  
따라서 로그가 생성되는 시점을 기준으로 계산됩니다. (iptables을 이용해 서버접근을 차단한다.)

  

이 때문에 발생하는 fail2ban maxretry별 최대 로그인 시도가능 횟수는 아래와 같습니다.

  

  

> 1 => 1번

>

> 2 => 7번

>

> 3 => 13번

>

> 4 => 19번

>

> 5 => 25번

>

> 6 =>31번

>

>  

>

> n => 6*(n-1) + 1 번

  

  

SSH 경우 로그인이 실패하면 재시도 5회까지 허용합니다. 재시도는 카운트 되지 않습니다.

뭐, 당연한 얘기겠지만요.

  

  

fail2ban 을 설치하면 전연적 패킷 컨트롤이 가능해집니다.

기본 설정 값으로 진행한다면 SSH 연결에 대해서 최근 10분간 6회이상 비밀번호가 틀릴 시, 10분동안 ssh 접속차단 됩니다.

  

  

fail2ban은 데몬이 재 시작 시 이전 차단 목록을 초기화되기 때문에 이 점 유의해야할 것 같습니다.

차단 목록이 휘발성을 띄우고있네요. 이 점은 다소 아쉽습니다.

