---
layout: post
title: "이펙티브 모던 C++"
description: ""
categories : etc
sub_categories : ""
date: 2015-12-14
tags: []
comments: true
share: true
---

스콧 마이어스

저자 스콧 마이어스(SCOTT MEYERS)는 C++에 관한 세계 최고 전문가 중 한 명이다. 인기 있는 강사이자 자문가, 콘퍼런스 강연자인
그의 EFFECTIVE C++ 시리즈(EFFECTIVE C++, MORE EFFECTIVE C++, EFFECTIVE STL)는 20년 이상
C++ 프로그래밍 지침의 기준을 확립했다. 그는 BROWN UNIVERSITY에서 컴퓨터 과학 PH.D. 학위를 받았다. 그의 웹사이트는
ARISTEIA.COM이다.

  

  

![](/assets/images/posts/434/25684633566E0F510F62ED.JPEG)

  

1장 형식 연역

항목 1: 템플릿 형식 연역 규칙을 숙지하라

항목 2: auto의 형식 연역 규칙을 숙지하라

항목 3: decltype의 작동 방식을 숙지하라

항목 4: 연역된 형식을 파악하는 방법을 알아두라

  

2장 auto

항목 5: 명시적 형식 선언보다는 auto를 선호하라

항목 6: auto가 원치 않은 형식으로 연역될 때에는 명시적 형식의 초기치를 사용하라

  

3장 현대적 C++에 적응하기

항목 7: 객체 생성 시 괄호(())와 중괄호({})를 구분하라

항목 8: 0과 NULL보다 nullptr를 선호하라

항목 9: typedef보다 별칭 선언을 선호하라

항목 10: 범위 없는 enum보다 범위 있는 enum을 선호하라

항목 11: 정의되지 않은 비공개 함수보다 삭제된 함수를 선호하라

항목 12: 재정의 함수들을 override로 선언하라

항목 13: iterator보다 const_iterator를 선호하라

항목 14: 예외를 방출하지 않을 함수는 noexcept로 선언하라

항목 15: 가능하면 항상 constexpr을 사용하라

항목 16: const 멤버 함수를 스레드에 안전하게 작성하라

항목 17: 특수 멤버 함수들의 자동 작성 조건을 숙지하라

  

4장 똑똑한 포인터

항목 18: 소유권 독점 자원의 관리에는 std::unique_ptr를 사용하라

항목 19: 소유권 공유 자원의 관리에는 std::shared_ptr를 사용하라

항목 20: std::shared_ptr처럼 작동하되 대상을 잃을 수도 있는 포인터가 필요하면 std::weak_ptr를 사용하라

항목 21: new를 직접 사용하는 것보다 std::make_unique와 std::make_shared를 선호하라

항목 22: Pimpl 관용구를 사용할 때에는 특수 멤버 함수들을 구현 파일에서 정의하라

  

5장 오른값 참조, 이동 의미론, 완벽 전달

항목 23: std::move와 std::forward를 숙지하라

항목 24: 보편 참조와 오른값 참조를 구별하라

항목 25: 오른값 참조에는 std::move를, 보편 참조에는 std::forward를 사용하라

항목 26: 보편 참조에 대한 중복적재를 피하라

항목 27: 보편 참조에 대한 중복적재 대신 사용할 수 있는 기법들을 알아두라

항목 28: 참조 축약을 숙지하라

항목 29: 이동 연산이 존재하지 않고, 저렴하지 않고, 적용되지 않는다고 가정하라

항목 30: 완벽 전달이 실패하는 경우들을 잘 알아두라

  

6장 람다 표현식

항목 31: 기본 갈무리 모드를 피하라

항목 32: 객체를 클로저 안으로 이동하려면 초기화 갈무리를 사용하라

항목 33: std::forward를 통해서 전달할 auto&& 매개변수에는 decltype을 사용하라

항목 34: std::bind보다 람다를 선호하라

  

7장 동시성 API

항목 35: 스레드 기반 프로그래밍보다 과제 기반 프로그래밍을 선호하라

항목 36: 비동기성이 필수일 때에는 std::launch::async를 지정하라

항목 37: std::thread들을 모든 경로에서 합류 불가능하게 만들어라

항목 38: 스레드 핸들 소멸자들의 다양한 행동 방식을 주의하라

항목 39: 단발성 사건 통신에는 void 미래 객체를 고려하라

항목 40: 동시성에는 std::atomic을 사용하고, volatile은 특별한 메모리에 사용하라

  

8장 다듬기

항목 41: 이동이 저렴하고 항상 복사되는 복사 가능 매개변수에 대해서는 값 전달을 고려하라

항목 42: 삽입 대신 생성 삽입을 고려하라

  

  
