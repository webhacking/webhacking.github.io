---
layout: post
title: "컴퓨터 프로그램의 구조와 해석"
description: ""
categories : etc
sub_categories : ""
date: 2015-12-07
tags: []
comments: true
share: true
---

이 책은 [SICP](https://ko.wikipedia.org/wiki/%EB%A6%AC%EC%8A%A4%ED%94%84)라고도
불리는데, MIT 대학의 교재로 사용되고 있습니다. UC버클리에서도 이 책을 바탕으로 강의도합니다.

목차와 이외 미리보기등으로 내용을 봤을때, 기대감도 있었고 조금은 주제가 무거워 걱정도많이됩니다.

그래도 여러번 보면서 스터디해야겠습니다.

  

  

![](/assets/images/posts/404/240939455664F2DD112CAA.PNG)

  

저자소개

Harold Abelson

매사추세츠 **공과대학(MIT)의 전기공학&컴퓨터과학 학부(Department of Electrical Engineering and
Computer Science)에서 컴퓨터과학을 가르치며**, 미국 전기전자기술자협회(IEEE)의 특별회원이다. Creative
Commons와 Public Knowledge, 자유소프트웨어연합(FSF)을 세우는 일을 이끌었으며, MIT 교육기술자문위원회의 공동의장으로
일한다.

  

  

1\. 프로시저를 써서 요약하는 방법

1.1 프로그램 짤 때 바탕이 되는 것

1.1.1 식

1.1.2 이름과 환경

1.1.3 엮은식(combination)을 계산하는 방법

1.1.4 묶음 프로시저(compound procedure)

1.1.5 맞바꿈 계산법(substitution model)으로 프로시저를 실행하는 방법

1.1.6 조건 식과 술어(predicate)

1.1.7 연습 : 뉴튼 법(newton method)으로 제곱근 찾기

1.1.8 블랙박스처럼 간추린 프로시저

1.2 프로시저와 프로세스

1.2.1 되돌거나(recursion) 반복하는(iteration) 프로세스

1.2.2 여러 갈래로 되도는 프로세스

1.2.3 프로세스가 자라나는 정도

1.2.4 거듭제곱

1.2.5 최대 공약수

1.2.6 연습 : 소수 찾기

1.3 차수 높은 프로시저(higher-order procedure)로 요약하는 방법

1.3.1 프로시저를 인자로 받는 프로시저

1.3.2 lambda로 나타내는 프로시저

1.3.3 일반적인 방법을 표현하는 프로시저

1.3.4 프로시저를 만드는 프로시저

2\. 데이터를 요약해서 표현력을 끌어올리는 방법

2.1 데이터 요약데이터 간추리기, 데이터 내용 감추기

2.1.1 연습 : 유리수를 위한 산술 연산

2.1.2 요약의 경계(abstraction barrier)

2.1.3 데이터란 무엇인가?

2.1.4 집중 과제 : 구간 산술 연산 만들기

2.2 계층 구조 데이터와 닫힘 성질

2.2.1 차례열의 표현 방법

2.2.2 계층 구조

2.2.3 공통 인터페이스로써 차례열의 쓰임새

2.2.4 연습 : 그림 언어

2.3 글자기호 데이터

2.3.1 따옴표 연산

2.3.2 연습 : 글자 식의 미분(symbolic differentiation)

2.3.3 연습 : 집합을 나타내는 방법

2.3.4 연습 : 허프만 인코딩 나무

2.4 요약된 데이터의 표현 방식이 여러 가지일 때

2.4.1 복소수 표현

2.4.2 타입을 표시한 데이터

2.4.3 데이터 중심 프로그래밍과 덧붙임 성질

2.5 일반화된 연산 시스템

2.5.1 일반화된 산술 연산

2.5.2 타입이 다른 데이터를 엮어 쓰는 방법

2.5.3 연습 : 기호 식 대수

3\. 모듈, 물체, 상태

3.1 덮어쓰기와 갇힌 상태(local state)

3.1.1 갇힌 상태변수(local state variable)

3.1.2 덮어쓰기가 있어서 좋은 점

3.1.3 덮어쓰기를 끌어들인 대가

3.2 환경 계산법

3.2.1 계산 규칙

3.2.2 간단한 프로시저 계산하기

3.2.3 물체에 상태를 넣어두는 곳, 변수 일람표

3.2.4 안쪽 정의

3.3 변형 가능한 데이터로 프로그래밍하기

3.3.1 변형 가능한 리스트

3.3.2 큐

3.3.3 표

3.3.4 디지털 회로 시뮬레이터

3.3.5 관계 알리기(constraint propagation)

3.4 병행성竝行性 : 시간은 중요하다

3.4.1 병행 시스템에서 시간의 성질본질

3.4.2 병행성을 다스리는 방법

3.5 스트림

3.5.1 스트림과 (계산을) 미룬 리스트

3.5.2 무한 스트림(infinite stream)

3.5.3 스트림 패러다임

3.5.4 스트림과 셈미룸 계산법

3.5.5 모듈로 바라본 함수와 물체

4\. 언어를 처리하는 기법

4.1 메타써큘러 실행기

4.1.1 언어 실행기의 알짜배기

4.1.2 식을 나타내는 방법

4.1.3 언어 실행기에서 쓰는 데이터 구조

4.1.4 언어 실행기를 보통 프로그램처럼 돌려보기

4.1.5 프로그램도 데이터처럼

4.1.6 안쪽 정의(internal definition)

4.1.7 문법 분석과 실행 과정을 떼어놓기

4.2 Scheme 바꿔보기 - 제때 계산법

4.2.1 식의 값을 구하는 차례 - 정의대로 계산법과 인자 먼저 계산법

4.2.2 제때 계산법을 따르는 실행기

4.2.3 제때셈 리스트와 스트림

4.3 Scheme 바꿔보기 - 비결정적 계산

4.3.1 amb와 찾기

4.3.2 비결정적 프로그램 짜기

4.3.3 amb 실행기 구현

4.4 논리로 프로그램 짜기

4.4.1 연역식 정보 찾기

4.4.2 쿼리 시스템의 동작 방식

4.4.3 논리 프로그래밍은 수학 논리를 따르는가?

4.4.4 쿼리 시스템 만들기

4.4.4.1 드라이버 루프와 쿼리 값 찍어내기(instantiation)

4.4.4.2 실행기(evaluator)

4.4.4.3 패턴 매칭으로 참말 찾아내기

4.4.4.4 규칙과 동일화

4.4.4.5 데이터베이스의 관리

4.4.4.6 스트림 연산

4.4.4.7 쿼리의 문법을 처리하는 프로시저

4.4.4.8 일람표와 정의

5\. 레지스터 기계로 계산하기

5.1 레지스터 기계 설계하기

5.1.1 레지스터 기계를 묘사하는 언어

5.1.2 기계 디자인에서의 속 내용 감추기(abstraction)

5.1.3 서브루틴

5.1.4 스택(stack)을 이용해 되돌기(recursion) 구현하기

5.1.5 명령어 정리

5.2 레지스터 기계 시뮬레이터

5.2.1 기계 모형

5.2.2 어셈블러

5.2.3 명령에 해당하는 실행 프로시저 만들기

5.2.4 기계 성능 지켜보기

5.3 메모리 할당(memory allocation)과 재활용(garbage collection)

5.3.1 벡터로 나타낸 메모리

5.3.2 무한히 많은 메모리인 양 보이기

5.4 제어가 다 보이는 실행기

5.4.1 제어가 다 보이는 실행기의 핵심부

5.4.2 시퀀스 계산과 꼬리 되돌기(tail recursion)

5.4.3 조건 식, 덮어쓰기(assignment), 정의

5.4.4 실행기 돌리기

5.5 번역(compilation)

5.5.1 번역기의 구조

5.5.2 프로그램 식의 번역

5.5.3 조합 식 번역하기

5.5.4 명령줄 한데 합치기

5.5.5 번역된 코드의 예

5.5.6 텍스트에서 변수의 정의를 파악하기(lexical addressing)

5.5.7 번역된 코드를 실행기에 연결하기

용어 대역표

연습문제 목차

참고문헌

찾아보기
