---
layout: post
title: "최빈값 알고리즘"
description: ""
categories : development
sub_categories : ""
date: 2015-10-23
tags: []
comments: true
share: true
---

데이터 인덱스 카운트의 채대값

  

    public class Mode{
           public static void main(String[] args){
                  // 1. 입력 
                  int[] data = { 1,3,4,4,1 };
                  int mode = 0;  // 최빈값 
                  int[] index = new int[data.length]; // data의 인덱스 카운터
                  int max = Integer.MIN_VALUE; // 최대값을 저장하기위한 변수 : 초기값은 정수형의 최소값 지정
                  // 2. process
                  for(int i=0;i<data.length;i++){
                          index[data[i]]++; // count
                  }
                  for(int i=0;i<index.length;i++){
                          if(max<index[i]){
                                 max = index[i];
                                 mode = i;
                          }
                  }
                  System.out.println("최빈값 : " + mode + " , " + max + "번");
           }
    }

  

