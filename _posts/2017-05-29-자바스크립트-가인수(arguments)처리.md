---
layout: post
title: "자바스크립트 가인수(arguments)처리"
description: ""
categories : ""
sub_categories : ""
date: 2017-05-29
tags: []
comments: true
share: true
---

자바스크립트는 arguments를 통해서 가인수를 받아온다.

오버라이딩 처럼 사용가능함을 의미한다.

  

    function sum(){    /* 오버 라이딩 */    var s=0;    for(var i=0; i<arguments.length; i++){        s+=arguments[i];    }    alert(s);}/* 실인수 */sum(1,2,3,4,5,6);

  

