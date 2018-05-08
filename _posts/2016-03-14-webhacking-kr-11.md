---
layout: post
title: "Webhacking.kr 11번 문제"
description: ""
categories : development
sub_categories : ""
date: 2016-03-14
tags: [webhacking, 'webhacking.kr']
comments: true
share: true
background_image: /assets/images/posts/well-used/hacked.jpg
---

바로 다음 문제로 넘어갔습니다.

어차피 13번 이전까지는 쉬어가는 문제들이 빨리빨리 지나갑시다.

혹시 정규식 좋아하세요? 사실 어릴때(중딩)는 정규식을 봐도 그냥 내가 사용할일없을꺼야 아니 있어도 별로 많이 사용안하겠지하며 방관했었는데

여러분 안 할 거 같죠? 회사 들어오면 다~합니다. 어차피 할 거 지금 조금 예습해도 좋습니다. 정규식만 잘해도 좋은 프로그래머가 될 수
있습니다.

  

정규식에 대한 이해도가 낮다고 생각한다면 생활코딩 php
정규식('https://opentutorials.org/module/6/5141')을 정독하길 바래요.

추가로 정규식에 대해 구글에 검색만 해도 방대한 자료들이 쏟아집니다. 상위 링크들 몇 개 보면 아주 설명이 잘 된 글들이 매우 많습니다.

꼭 한번 참고해보실 바랍니다.

  

![](/assets/images/posts/522/247C783556E619F8311D0F.PNG)

  

문제를 볼까요. pat 이라는 변수 밑에 조건이 보이네요.

$pat="/[1-3][a-f]{5}_.*61.41.64.140.*\tp\ta\ts\ts/";

if(preg_match($pat,$_GET[val])) { echo("Password is ????"); }

  

get 메소드를 통해서 val파라미터를 php 내부 함수 preg_match를 통해서 정규표현식 매칭을 하네요.

일단 참 일 경우 slove 되는 것 같습니다.

$pat="/[1-3][a-f]{5}_.*61.41.64.140.*\tp\ta\ts\ts/";

  

바로 해석해보자면 \\[1-3](1 - 3값 중의 하나)[a-f](a-f값 중의 하나){5}(앞의 문자를 5번 이상 반복)_.(앞에 한
문자)*(앞에 문자 0회 이상 반복)

아이피.(앞에 한 문자)*(앞에 문자 0회 이상 반복)[\t](tab 이걸 스트링으로 표현할려면 url 인코딩해야함)

  

![](/assets/images/posts/522/2431D53856E6194F033CC5.PNG)

  

  

제가 표현한 정규식, 간단하게 클리어.

2ccccc_c아이피c%09p%09a%09s%09s

  

![](/assets/images/posts/522/254DFB3A56E61C260A8037.JPEG)

  

  

