---
layout: post
title: "Console 객체"
description: ""
categories : development
sub_categories : ""
date: 2015-12-28
tags: []
comments: true
share: true
---

  

console 객체에서, log 메소드를 가장 많이 사용한다.

log 메소드 이외 10여개의 메소드들이 더 존재한다.

  

궁금해서 한번 정리해보았다.

물론 모든 브라우저가 지원하는 것 은 아니다.

  

주로 디버깅할때, log보다 debug 메소드를 이용하는데 현재는 deprecated상태로 대신 log를 사용하도록 권장하고있다.

  

  1. console.log(obj1 [, obj2, ..., objN]); => ex) console.log("a = ", a, ", b = ", b);
  2. console.log(msg [, subst1, ..., substN]); => ex) console.log(" a is [%d], b is [%s]", a, b);

  

log메소드 인자는 두가지 방식을 예로 들 수있다.

첫번째 방식은 일반적인 객체의 toString()을 호출하여 문자열 합치기로 표현되며, 두번째 방식은 C언어의 printf()함수에서
제공되는 format문자열로 출력할 수 있는 방법(치환문자열,Substitution string)을 제공하고 있다. 치환 문자열로 사용할 수
있는 값들은 다음과 같다.

  

  

%o

Javascript Object HypterLink

%d

Integer

%i

Integer

%s

String

%f

Floating-point

  

  

Filtering console output

  

You can filter console output by its severity level by selecting one of the
filter options. Activate filters under the filter funnel icon located in the
upper-left corner of the console panel. The following filter options are
available:

  

  * All

Shows all console output.

  * Errors

Only show output from console.error().

  * Warnings

Only show output from console.warn().

  * Info

Only show output from console.info().

  * Logs

Only show output from console.log().

  * Debug

Only show output from console.timeEnd() and console.debug().

