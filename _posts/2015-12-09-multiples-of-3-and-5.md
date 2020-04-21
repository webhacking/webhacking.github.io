---
layout: post
title: "Multiples of 3 and 5"
description: ""
categories : development
sub_categories : ""
date: 2015-12-09
tags: []
comments: true
share: true
---

If we list all the natural numbers below 10 that are multiples of 3 or 5, we
get 3, 5, 6 and 9. The sum of these multiples is 23. Find the sum of all the
multiples of 3 or 5 below 1000. ('10보다 작은 자연수 중에서 3 또는 5의 배수는 3, 5, 6, 9 이고,
이것을 모두 더하면 23입니다. 1000보다 작은 자연수 중에서 3 또는 5의 배수를 모두 더하면 얼마일까요?

')

  

내가 푼 답

  

    window.document.onload = function(e){
    var q = 0;//합계담을 값
        for(var i = 1; i < 1000; i++){
            if(i % 3 === 0 || i % 5 === 0){
                q = q + i;
            }
        }
    console.debug(q);
    }

  

