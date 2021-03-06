---
layout: post
title: "수학(math.h) 함수"
description: ""
categories : development
sub_categories : ""
date: 2016-01-26
tags: []
comments: true
share: true
---

함수설명

삼각 함수

double **sin** ( double x );

사인 x를 구한다.

double **cos** ( double x );

코사인 x를 구한다.

double **tan** ( double x );

탄젠트 x를 구한다.

역 삼각 함수

double **asin** ( double x );

아크 사인 x를 구한다.

double **acos** ( double x );

아크 코사인 x를 구한다.

double **atan** ( double x );

아크 탄젠트 x를 구한다.

double **atan2** ( double y, double x );

아크 탄젠트 y/x를 구한다.

쌍곡선 함수

double **sinh** ( double x );

하이퍼볼릭 사인 x를 구한다.

double **cosh** ( double x );

하이퍼볼릭 코사인 x를 구한다.

double **tanh** ( double x );

하이퍼볼릭 탄젠트 x를 구한다.

지수 · 대수 함수

double **exp** ( double x );

ex를 구한다.

double **[frexp](http://ko.wikipedia.org/wiki/%EB%B6%80%EB%8F%99%EC%86%8C%EC%8
8%98%EC%A0%90)** ( double x, int * exp );

지수를 exp가 가리키는 변수에 저장하고 가수를 반환한다.

double **ldexp** ( double x, int exp );

x * 2exp를 반환한다.

double **log** ( double x );

loge x를 구한다.

double **log10** ( double x );

log10 x를 구한다.

double **modf** ( double x, double * intpart );

정수부를 intpart가 가리키는 변수에 저장하고 소수부를 반환한다.

거듭제곱 · 거듭제곱근 · 올림 · 내림 · 절댓값 · 나머지 함수

double **pow** ( double x, double y );

xy를 구한다.

double **sqrt** ( double x );

![\\sqrt{x}](/assets/images/posts/494/bf3ad54d060ca456987fdccfe6705c7b.png.PNG
)를 구한다.

double **ceil** ( double x );

x보다 작지 않은 가장 작은 정수를 구한다.

double **floor** ( double x );

x보다 크지 않은 가장 큰 정수를 구한다.

double **abs** ( double x );

x의 [절댓값](http://ko.wikipedia.org/wiki/%EC%A0%88%EB%8C%93%EA%B0%92)을 구한다.

double **fmod** ( double x, double y );

x를 y로 나눈 나머지를 구한다.

