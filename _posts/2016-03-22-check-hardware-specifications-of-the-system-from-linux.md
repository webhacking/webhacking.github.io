---
layout: post
title: "linux 시스템의 하드웨어 사양 확인"
description: ""
categories : development
sub_categories : ""
date: 2016-03-22
tags: []
comments: true
share: true
---

Windows에서는 하드웨어 사양을 확인하는데 CPU-Z라는 프로그램만(심지어 무료) 있으면 CPU부터 시작하여 마더보드와 그래픽카드까지
모두 확인할 수 있다. 하지만, linux에서는 CPU-Z와 같은 프로그램이 없기 때문에 하드웨어 사양을 확인할 수 있는 방안을 소개한다.


> lshw, lspci


lshw 명령어를 통해서 하드웨어 정보를 알 수 있다. 아래는 가상화 환경에서 실행한 하드웨어 정보이다.
CPU, 메모리,메인보드와 그래픽카드까지 현재 시스템의 하드웨어 정보를 확인할 수 있다.
'lspci' 명령으로 linux에서 인식된 하드웨어 정보와 타입을 간단히 체크도 가능하다.

