---
layout: post
title: "PHP Coding Guidelines"
description: ""
categories : development
sub_categories : ""
date: 2017-02-06
tags: []
comments: true
share: true
---

기본적으로 Framework Interop Group에서 제시하는 Code Convention 룰을 따른다.

모든 코드는 일관성이 유지되어야하며, 타 개발자가 봐도 쉽게 구문이 이해되어야한다.

  

주석은 아래와 같이 표기한다.

/* 모든 주석은 이와 같이 표기 */

  

모든 조건구문에는 띄어쓰기가 필요하며, 전달하는 인자 값에 함수를 표기한다면 함수 내 인자 값 또한 띄어쓰기가 필요하다.

e.g. $this->n->z( hashkey( $variable ) );

  

  

  

**Overview**

  * 코드는 반드시 PSR-1을 따라야 한다. 
  * 코드 들여쓰기(indenting)은 반드시 4개의 스페이스 문자를 사용한다. 
  * 라인의 길이는 80또는 그 이하를 권장한다. 
  * namespace 다음에는 반드시 하나의 공백라인을 추가해야 한다.
  * use 다음에는 반드시 하나의 공백라인을 추가해야 한다.
  * 클래스에서 braces({})는 반드시 다음 줄에 추가한다.
  * 메서드에서 braces는 반드시 다음 줄에 추가한다.
  * 모든 메서드와 propertis에 반드시 visibility( public, protected ,private)를 선언해야 한다.
  * abstract와 final은 반드시 visibility 전에 선언해야 한다.
  * static는 반드시 visibility 다음에 사용해야 한다.
  * Control structure keywords (제어문 키워드) 다음에는 반드시 공백을 포함한다. 
  * Control structures(제어문) 다음의 braces({})는 반드시 하나의 공백을 포함하고, control structures(제어문)와 같은 라인에서 열고 반드시 다음 라인에서 닫는다.
  * Control structures(제어문)의 여는 괄호 다음과 닫는 괄호 이전에 반드시 공백을 두면 안된다

  

**Namespace and Class Names**

네임스페이스와 클래스 이름은 (구 PSR-0) PSR-4 규격에 따라서 “autoloading”을 지원하도록 만들어야 한다.

클래스 이름은 반드시 StudlyCaps형식을 따라야 한다.

**  
**

**Character Encoding**

UTF-8로 사용, BOM(Byte Order Mark)은 사용하지 않는다.

**  
**

**Php tags**

HTML 내 변수 출력 시, <?=${변수}?> 와 같은 형태로 구성한다.

  

**Class with Function brace**

클래스와 함수를 정의 할 때, 중괄호는 다음 라인에서 시작한다.

  

**Constant**

상수는 대문자로 표기한다.

하나 이상의 단어는 언더라인 “_” 으로 표기한다. (e.g. YOUNG_KING)

  

**Method Naming**

Methods 이름은 lowerCamelCase를 따른다.

