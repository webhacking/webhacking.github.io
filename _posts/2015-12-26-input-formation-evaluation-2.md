---
layout: post
title: "입력 - 형성평가2"
description: ""
categories : etc
sub_categories : ""
date: 2015-12-26
tags: []
comments: true
share: true
---

## 문제

실수형 변수를 2개 선언한 후 각각에 80.5, 22.34를 대입한 후 두 수의 합을 구하여 각각의 숫자를 10칸씩 오른쪽에 맞추어 소수
둘째자리까지 출력하는 프로그램을 작성하시오.

  
## 출력 예

80.50 22.34 102.84

  
## 주의사항

공백을 넣을 경우 1칸을 차지한다.

    #include <stdio.h>
    
    int main(void){
    
        float a, b;
        
        a=80.5f; b=22.34f;
        
        printf("%10.2f%10.2f%10.2f",a,b,a+b);
        
        return 0;
    
    }

