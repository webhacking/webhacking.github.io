---
layout: post
title: "입력 - 형성평가1"
description: ""
categories : development
sub_categories : ""
date: 2015-12-26
tags: []
comments: true
share: true
---

세 개의 정수형 변수를 선언하고 각 변수에 10, 20, 30을 대입한 후 그 변수를 이용하여 출력 예와 같이 출력하는 프로그램을
작성하시오. 10 + 20 = 30  
  
  

    #include <stdio.h>
     
    int main(void){
      int a, b, c;
      a=10; b=20; c=30;
      printf("%d + %d = %d", a, b, c);
      return 0;
    }