---
layout: post
title: "Webhacking.kr 16번 문제"
description: ""
categories : development
sub_categories : ""
date: 2016-03-20
tags: []
comments: true
share: true
---

16 번 100점 짜리 문제입니다.

13번 이후 빠르게 풀고있습니다.. 그냥 언제 또 포스팅할지 몰라서 TT 바쁘다는게 핑계.

  

들어가니깐 왠 별이 보이네요.

새로고침할때만 알록달록 바뀌네요.

  

![](/assets/images/posts/540/230A2C3756EE3CDB31EC58.PNG)

  

소스를 볼까요?

document.body.innerHTML+="<font color=yellow id=aa
style=position:relative;left:0;top:0>*</font>";

  

function mv(cd)

{

kk(star.style.posLeft-50,star.style.posTop-50);

if(cd==100) star.style.posLeft=star.style.posLeft+50;

if(cd==97) star.style.posLeft=star.style.posLeft-50;

if(cd==119) star.style.posTop=star.style.posTop-50;

if(cd==115) star.style.posTop=star.style.posTop+50;

if(cd==124) location.href=String.fromCharCode(cd);

}

  

  

function kk(x,y)

{

rndc=Math.floor(Math.random()*9000000);

document.body.innerHTML+="<font color=#"+rndc+" id=aa
style=position:relative;left:"+x+";top:"+y+"
onmouseover=this.innerHTML=''>*</font>";

}

  

Body 태그에 onkeypress 일때 mv function 을 호출한다.

첫 번째 인자값으로 event.keyCode 값을 전달합니다.

  

event.keyCode 값이 100,97,119,115,124 때의 각기 다른 조건문이 구성되어있다.

이 중 우리가 참고하면 되는 건 124일때 조건이다.

아스키코드를 참고하자, 124 는 "|"는 값 이다. 콘솔창에 "location.href=String.fromCharCode(124);"
해당 조건의 참부분을 참고하여 입력한다.

그럼 패스워드가 나온다. 그 값으로 flag 하면 클리어

  

![](/assets/images/posts/540/2757774B56EE3EE41B2BCD.PNG)

  

  

  

  

![](/assets/images/posts/540/2557DE5056EE3FFE1838B3.JPEG)

  

