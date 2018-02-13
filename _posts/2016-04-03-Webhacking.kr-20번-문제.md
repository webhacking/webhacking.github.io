---
layout: post
title: "Webhacking.kr 20번 문제"
description: ""
date: 2016-04-03
tags: ['200', '20번', '문제', '풀이']
comments: true
share: true
---

20번 문제는 200점 짜리 스코어이고, 개인적으로 쉽게 풀이했던 문제입니다.

난이도가 낮아서 잠깐 쉬는 문제라고도 할 수 있겠습니다.

  

문제에 들어가면 폼이 하나보입니다.

해당 폼에는 nickname, comment, code 인풋박스가 보이고 `code`옆에는 리로드할때마다 변하는 값이 있습니다.

상단에 `time limit : 2`라고 기재되어있습니다.

추가로 `st`라는 쿠키 값이 생겼고 해당 값에는 타임스탬프 값(st=1459669654;) 이 들어있습니다.

  

submit 했을 때, ck라는 함수가 실행됩니다.

  

1

2

3

4

5

6

7

8

9

function ck(){

if(lv5frm.id.value=="") { lv5frm.id.focus(); return; }

if(lv5frm.cmt.value=="") { lv5frm.cmt.focus(); return; }

if(lv5frm.hack.value=="") { lv5frm.hack.focus(); return; }

if(lv5frm.hack.value!=lv5frm.attackme.value) { lv5frm.hack.focus(); return; }

lv5frm.submit();

}

[Colored by Color Scripter](http://colorscripter.com/info#e)

[cs](http://colorscripter.com/info#e)

  

이를 통해서 우리는 2초안에 저 값들을 모두 입력하고 submit 해야한다는걸 알 수 있습니다.

해당 값들을 대입할 임의에 값들을 적고 리로드와 동시에 ck 함수를 실행, 클리어

  

  

![](/assets/images/posts/571/257631335700CC0D1A1239.PNG)

  

![](/assets/images/posts/571/2202AF335700CC1210242B.PNG)

  

  

