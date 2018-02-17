---
layout: post
title: "[MySQL] length() vs char_length()"
description: ""
categories : development
sub_categories : ""
date: 2016-04-08
tags: []
comments: true
share: true
---

LENGTH function returns the _length of the string measured in bytes._

CHAR_LENGTH() returns the _length of the string measured in characters._

  

1\. LENGTH() : 길이를 bytes로 나타낸다.

SELECT LENGTH('한글') -> 6

SELECT LENGTH('abc') -> 3

  

2\. CHAR_LENGTH() : 글자의 수를 나타낸다.

SELECT CHAR_LENGTH('한글') -> 2

SELECT CHAR_LENGTH('abc') -> 3

  

3\. BIT_LENGTH() : 길이를 bit로 나타낸다.

SELECT BIT_LENGTH('한글a') -> 56

SELECT BIT_LENGTH('한글') -> 48

  

