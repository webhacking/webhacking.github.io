---
layout: post
title: "고려대학교 신입생 프로그래밍 경시대회 <NN> 문제"
description: ""
categories : development
sub_categories : ""
date: 2017-05-29
tags: []
comments: true
share: true
---

**_NN_**

  

시간 제한 : 1초

메모리 제한 : 32 MB

  

**문제**

  

문제는 매우 간단하다.

N을 N번 출력하는 프로그램을 작성하여라.

다만, _답이 길어지는 경우 답의 앞 M자리만 출력_한다.

  

  

**입력**

  

첫 번째 줄에는 N, M이 주어진다. (1 ≤ N, M ≤ 2016)

  

  

**출력**

  

N을 N번 출력한다. 만약 답이 길어지면 답의 앞 M자리를 출력한다.

**  
**

**  
**

**답**

  

정소를 문자열로 표현해서 생각하면 쉽다.

Index 를 길이로 나눈 나머지 값에 해당하는 문자를 출력한다.

  

    #include#includechar str[30];int len, n, m;int main() {    int i;    scanf("%s%d", str, &m);    len = strlen(str);    for ( i = 0; i  n*len ) {        m = n*len;    }    for ( i = 0; i < m; i++ ) {        putchar(str[i%len]);    }    return 0;}

  

![](/assets/images/posts/753/21436036592B77A72BB50A.PNG)

  

