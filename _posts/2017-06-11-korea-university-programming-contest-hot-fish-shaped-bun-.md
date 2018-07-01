---
layout: post
title: "고려대학교 신입생 프로그래밍 경시대회 <뜨거운 붕어빵> 문제"
description: ""
categories : development
sub_categories : ""
date: 2017-06-11
tags: []
comments: true
share: true
---


**문제**

  

고려대학교에 입학한 새내기 호돌이는 안암역을 지나다가 한 붕어빵 장수를 만났어요.

  

“안녕, 안녕, 안녕하십니까, 아저씨! 붕어빵 두 개 주세요.”

  

“안녕을 세 번 외쳤으니 붕어빵 세 개!”

  

붕어빵 두 개의 값을 내고 세 개를 받은 호돌이는 기분이 좋았어요. 호돌이가 붕어빵 하나를 꺼내어 한 입 물었는데….

너무 뜨거워서 그만 붕어빵을 떨어뜨리고 말았어요ㅠㅠ

  

붕어빵은 자유 낙하운동을 하면서 땅에 떨어졌는데 신기하게도 좌우가 뒤집힌 모양으로 착지했답니다.

호돌이가 붕어빵을 한 입 물기 전의 모양이 입력으로 주어지면, 땅에 떨어졌을 때에는 어떤 모양일지 출력하세요.

  

**  
**

**입력**

  

첫째 줄에는 두 개의 정수 N과 M(0≤N,M≤10)이 주어집니다.

둘째 줄부터 N개의 줄에 걸쳐 붕어빵의 모양이 주어집니다.

각 행에는 공백을 나타내는 ‘0‘ 또는 붕어빵을 나타내는 ‘1’이 총 M개 주어집니다.

  

  

**출력**

  

입력으로 주어진 붕어빵이 좌우로 뒤집힌 모양을 출력하세요.

  

  

**예제 입력**

  

    5 700100000111010111111101110100010000

  

  

**예제 출력**

  

    00001000101110111111101011100000100

  

  

**힌트**

  

입력으로 주어지는 각 행을 반전시켜서 출력하면 됩니다.

입력의 1행 1열은 출력의 1행 M열로, 입력의 1행 2열은 출력의 1행 M-1열로 … 입력의 1행 M열은 출력의 1행 1열로 … 입력의
N행 M열은 출력의 N행 1열로 출력하세요.

  

  

**답**

  

주어진 입력 문자열 뒤집기

  

_S'[i][j] = S[i][M-j+1] or reverse(S[i]+1,S[i]+M+1)_

  

  

    #include #include using namespace std;#define MAXN 15int n, m;char fish[MAXN][MAXN];int main(void) {   scanf("%d%d", &n, &m);   for (int i = 0; i < n; i++) scanf("%s", fish[i]);   for (int i = 0; i < n; i++) reverse(fish[i], fish[i] + m);   for (int i = 0; i < n; i++) puts(fish[i]);   return 0;}

  
