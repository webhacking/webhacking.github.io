---
layout: post
title: "Webhacking.kr 12번 문제"
description: ""
categories : development
sub_categories : ""
date: 2016-03-14
tags: [webhacking, 'webhacking.kr']
comments: true
share: true
background_image: /assets/images/posts/well-used/hacked.jpg
---

12번 문제네요. 바로 다음이 기다리는 13번 문제입니다.

오늘은 10,11,12까지 포스팅을 하겠습니다. 13은 왠지 어려울거같아요. 자신이없어요 못 풀 자신이요.

12번 문제는 250점 짜리 문제입니다. "javascript challenge" 라고 써저있네요. 그러면 클라이언트 소스를 참고해봅시다.
아래는 해당 문제 소스코드입니다.

  

    WorkTimeFun=String.fromCharCode(118,97,114,32,101,110,99,111,61,39,39,59,13,10,118,97,114,32,101,110,99,111,50,61,49,50,54,59,13,10,118,97,114,32,101,110,99,111,51,61,51,51,59,13,10,118,97,114,32,99,107,61,100,111,99,117,109,101,110,116,46,85,82,76,46,115,117,98,115,116,114,40,100,111,99,117,109,101,110,116,46,85,82,76,46,105,110,100,101,120,79,102,40,39,61,39,41,41,59,13,10,32,13,10,32,13,10,102,111,114,40,105,61,49,59,105,60,49,50,50,59,105,43,43,41,13,10,123,13,10,101,110,99,111,61,101,110,99,111,43,83,116,114,105,110,103,46,102,114,111,109,67,104,97,114,67,111,100,101,40,105,44,48,41,59,13,10,125,13,10,32,13,10,102,117,110,99,116,105,111,110,32,101,110,99,111,95,40,120,41,13,10,123,13,10,114,101,116,117,114,110,32,101,110,99,111,46,99,104,97,114,67,111,100,101,65,116,40,120,41,59,13,10,125,13,10,32,13,10,105,102,40,99,107,61,61,34,61,34,43,83,116,114,105,110,103,46,102,114,111,109,67,104,97,114,67,111,100,101,40,101,110,99,111,95,40,50,52,48,41,41,43,83,116,114,105,110,103,46,102,114,111,109,67,104,97,114,67,111,100,101,40,101,110,99,111,95,40,50,50,48,41,41,43,83,116,114,105,110,103,46,102,114,111,109,67,104,97,114,67,111,100,101,40,101,110,99,111,95,40,50,51,50,41,41,43,83,116,114,105,110,103,46,102,114,111,109,67,104,97,114,67,111,100,101,40,101,110,99,111,95,40,49,57,50,41,41,43,83,116,114,105,110,103,46,102,114,111,109,67,104,97,114,67,111,100,101,40,101,110,99,111,95,40,50,50,54,41,41,43,83,116,114,105,110,103,46,102,114,111,109,67,104,97,114,67,111,100,101,40,101,110,99,111,95,40,50,48,48,41,41,43,83,116,114,105,110,103,46,102,114,111,109,67,104,97,114,67,111,100,101,40,101,110,99,111,95,40,50,48,52,41,41,43,83,116,114,105,110,103,46,102,114,111,109,67,104,97,114,67,111,100,101,40,101,110,99,111,95,40,50,50,50,45,50,41,41,43,83,116,114,105,110,103,46,102,114,111,109,67,104,97,114,67,111,100,101,40,101,110,99,111,95,40,49,57,56,41,41,43,34,126,126,126,126,126,126,34,43,83,116,114,105,110,103,46,102,114,111,109,67,104,97,114,67,111,100,101,40,101,110,99,111,50,41,43,83,116,114,105,110,103,46,102,114,111,109,67,104,97,114,67,111,100,101,40,101,110,99,111,51,41,41,13,10,123,13,10,97,108,101,114,116,40,34,80,97,115,115,119,111,114,100,32,105,115,32,34,43,99,107,46,114,101,112,108,97,99,101,40,34,61,34,44,34,34,41,41,59,13,10,125,13,10);eval(WorkTimeFun);

  

  

으으음?? 아스키코드가 제 눈을 괴롭히고있습니다.

클라이언트에서 해석해보죠. ck변수

  

String.fromCharCode,eval에 대해서 짧게 짚고 넘어갑시다.

String.fromCharCode함수는 매개 변수에 아스키 값으로 구성된 문자열을 반환한다.

eval은 텍스트를 자바스크립트 문장으로 변환한다.

  

조건에 ck == *CODES* 부분에서 ck의 값과 *CODE*의 값과 같아야 패스워드를 보여줍니다.

그렇다면 ck변수를 참고하고 콘솔창에서 한번 실행해봅시다.

javascript:console.debug(ck)

  

    console.debug(String.fromCharCode(enco_(240))+String.fromCharCode(enco_(220))+String.fromCharCode(enco_(232))+String.fromCharCode(enco_(192))+String.fromCharCode(enco_(226))+String.fromCharCode(enco_(200))+String.fromCharCode(enco_(204))+String.fromCharCode(enco_(222-2))+String.fromCharCode(enco_(198))+"~~~~~~"+String.fromCharCode(enco2)+String.fromCharCode(enco3))

  

1이라는 값이 나옵니다. 해당 조건값 코드를 대입하면 "youaregod~~~~~~~!"이라는 스트링이 출력됩니다.

따라서 패스워드는 "youaregod~~~~~~~!"입니다. 해당 패스워드값을 Auth카테고리에 flag에 넣고 submit하면 sloved

  

  

  

  

![](/assets/images/posts/524/223BF73A56E6271A08DAD4.PNG)

  

  

  

![](/assets/images/posts/524/2654AF3B56E629E620449A.PNG)

  

  

  

참고

  * [String.fromCharCode](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)
  * [eval](http://www.w3schools.com/jsref/jsref_eval.asp)

  

