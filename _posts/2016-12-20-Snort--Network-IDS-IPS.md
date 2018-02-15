---
layout: post
title: "Snort  Network IDS-IPS"
description: ""
categories : ""
sub_categories : ""
date: 2016-12-20
tags: ['IDS', 'IPS']
comments: true
share: true
---

snort 는 공개 네트워크 침입탐지시스템(NIPS. Network IDS/IPS)이며, 'Sniffer and more'라는 말에서
유래되었다. (콧방귀 흥킇흨킁)

오픈소스이며, 실시간으로 트래픽 분석과 패킷을 기록하는 시스템이다.

호환성이 좋으며 탐지 Rule을 직접 지정할 수 있다.

  

KISA에서 정의한 IDS/IPS는 아래와 같다.

사용자 및 외부 침입자가 컴퓨터 시스템, 네트워크 자원을 권한 없이 불법으로 사용하기 위한 시도 또는 내부 사용자가

권한을 오용하여 권한 이외의 자원을 사용하기 위한 시도를 탐지하여 그 피해를 최소화하는 시스템

  

방화벽과의 큰 차이점은 방화벽은 일정한 규격에 의해 완전 접근을 차단하는 반면에 IDS는 직접 차단하는 기능을 제공하지않고

탐지하여 경고를 해주는 역할을 한다. IPS 같은 경우는 차단을 하지만 L7까지 볼 수 있다.

  

  

![](/assets/images/posts/712/231C05435858B6E52DCC18.PNG)

  

  

  

**기능**

  * 패킷 스니퍼 모드
    * tcpdump 와 같은 네트워크의 TCP/IP 패킷을 읽어 보여줌
  * 패킷 로거 모드
    * 모니터링 한 패킷을 저장하고 로그를 기록하는 기능으로 트래픽 디버깅에 매우 유용하게 사용
  * Network IDS 모드
    * 침입탐지시스템(IDS)이며, 패킷 분석 및 공격 탐지 기능을 제공
  * Snort Inline
    * 침입방지시스템(IPS) 이며, 패킷 분석 공격 차단 기능을 제공

**  
**

**용도**

패킷 Sniffer / Logger

네트워크의 패킷을 읽고 출력 기능, 모니터링 한 패킷을 저장

  

  

**옵션**

-v : Snort를 패킷 Sniffing 모드 동작(TCP)

-d : 모든 네트워크 계층 포함

-e : 데이터 링크 계층 헤더 포함

  

  

**구조**

  * 스니퍼
    * Snort 를 통과하는 모든 패킷을 수집
  * Preprocessor
    * 효율적인 공격 탐지를 위해 제공되는 플러그인
  * 탐지엔진 Rule
    * 기반으로 정의된 탐지 룰과 매칭 여부를 확인
  * 로깅
    * 정의된 탐지 룰과 매칭된 트래픽이 감지 될 경우 로그를 남김

  

**룰(Rule)**

Snort는 룰기반으로 탐지를 하며, 사용자가 정한 룰대로 Snort가 탐지 활동을한다.

이 룰에는 헤더와 옵션으로 구성되어있다.

  

_헤더_

_  
_

Alert

알람을 발생시키고 로그에 남긴다.

Log

로그에 남긴다

Pass

무시한다

Activate

알람을 발생시키고, 대응하는 다이나믹 액션을 활성화 한다.

Dynamic

Activiate에 의해 활성화되면, 로그에 남긴다.

Drop

iptables를 통해 패킷을 차단하고 로그에 남긴다.

sdrop

Iptables를 기반으로 패킷을 차단하고 로그를 남기지 않는다.

reject

drop 과 동일하지만 메시지를 남긴다.

  

**설치**

Autosnort 를 통해 설정하고 설치를 진행하면됩니다.

  

>  

>

> Autosnort is a series of bash shell scripts designed to install a fully
functional, fully updated stand-alone snort sensor with an IDS event review
console of your choice, on a variety of Linux distributions. The script is
very meticulously commented in order for users to fully understand all the
changes the script performs on a given system. That way if a user wants to
make their own customizations, or gain a better understanding of the install
process, that information is present.

  

  

**참고**

  1. [Do you need an IDS or IPS, or both?](http://searchsecurity.techtarget.com/Do-you-need-an-IDS-or-IPS-or-both)

  2. [Network Intrusion Detection & Prevention System](https://www.snort.org/)

  3. [Autosnort](https://github.com/da667/Autosnort)

  

