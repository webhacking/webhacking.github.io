---
layout: post
title: "STL 벡터와 배열 차이"
description: ""
categories : development
sub_categories : ""
date: 2015-12-23
tags: []
comments: true
share: true
---

**벡터(STL) 정의**

동적 배열 구조로 C++에서 구현한 것. C++ STL 중의 하나이 템플릿 클랫.

  

C의 배열처럼 빠른 랜덤 접근이 가능하지만 자동으로 배열의 크기 조절과 객체의 추가 삭제가 가능하다.

요소에 접근, 앞뒤에 요소를 추가하거나 삭제할 수 있고 크기를 알아낼 수 있다.

  

**배열과 차이점**

C++의 배열은 메모리에 연속적. 배열의 모든 요소는 같은 타입을 가진다.

  

벡터는 at()함수를 사용해 존재하지 않는 요소에 접근하면 에러를 발생.

템플릿 클래스기때문에 원하는 모든 타입의 일반적인 배열(generic array)을 만들 수 있다.

벡터는 데이터를 선형적으로 유지한다. 저장공간보다 많은 데이터를 추가하면 현재 보유하고 있는 메모리의 두 배만큼

이를 할당하기 때문에 단순한 할당으로 선형적인 공간을 못 만들때가 있다.(복사에 엄청난 성능 저하)

우측 값 참조(rvalue reference)로 성능저하 해결.

  

  

