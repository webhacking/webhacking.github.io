---
layout: post
title: "고려대학교 신입생 프로그래밍 경시대회 <파일 옮기기> 문제"
description: ""
categories : development
sub_categories : ""
date: 2017-05-26
tags: ['Korea University Programming Contest', '고려대학교 신입생 프로그래밍 경시대회']
comments: true
share: true
---

**_파일 옮기기_**

**  
**

**  
**

**문제**

  

두 개의 바구니에 사과와 오렌지가 있다.

첫 번째 바구니에는 사과 A개와 오렌지 B개가 있으며 두 번째 바구니에는 사과 C개와 오렌지 D개가 있다.

당신은 한 바구니에 있는 과일 하나를 집어서 다른 바구니로 옮길 수 있다.

  

이런 식으로 과일을 옮길 때, 한 바구니에는 사과만 있게 하고 다른 쪽에는 오렌지만 있게 하려고 한다.

앞서 말한 조건을 만족하도록 과일을 옮길 때, "과일을 옮기는 최소 횟수"를 구하는 프로그램을 작성하여라.

  

  

**입력**

  

첫 번째 줄에는 첫 번째 바구니에 있는 사과와 오렌지의 수 A, B가 주어진다. (0 ≤ A, B ≤ 1,000)

두 번째 줄에는 두 번째 바구니에 있는 사과와 오렌지의 수 C, D가 주어진다. (0 ≤ C, D ≤ 1,000)

  

  

**출력**

  

사과와 오렌지를 옮기는 최소 횟수를 출력한다.

  

**  
**

**답**

  

`File` 이 아니라 `Pile` 이다.

min(A+D+ , B+C) - (Orange, Apple), (Apple, Orange)

  

    #include#includeint a, b, c, d; # 첫째 바구니 (사과, 오렌지,) 둘째 바구니 (사과, 오렌지)int main() {    scanf("%d%d%d%d", &a, &b, &c, &d);    printf("%d", std::min(a+d, b+c));    return 0;}

  

![](/assets/images/posts/749/275B044C592B7CD51C44E4.PNG)

  

  

**  
**

**문제 링크**

  * <https://www.acmicpc.net/problem/11943>

  

