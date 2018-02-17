---
layout: post
title: "Webhacking.kr 34번 문제"
description: ""
categories : development
sub_categories : ""
date: 2017-06-01
tags: []
comments: true
share: true
---

34번 문제의 스코어는 400입니다.

스코어의 비해 문제의 난이도는 쉬운편에 속 합니다.

  

문제 페이지에 들어가면 "Wrong" 이라는 alert 이 발생한다.

중점으로 아래의 코드만 보면 된다.


    if (document.URL.indexOf("0lDz0mBi2") != -1) location.href = "Passw0RRdd.pww"; else alert("Wrong");

 

`document.URL.indexOf("0lDz0mBi2") != -1` 이 조건이 참이라면 "Passw0RRdd.pww" 로 리다이렉트하게되고, 거짓일시 "Wrong" alert을 띄어준다.

궁긍적으로 Passw0RRdd.pww 경로로 이동하면, 문제의 패스워드가 나오고 해당 패스워드를 auth 항목 기입하여 문제를 클리어할 수 있다.

  

![](/assets/images/posts/757/25185344592F7FBB29393A.PNG)

  

