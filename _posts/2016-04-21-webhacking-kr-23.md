---
layout: post
title: "Webhacking.kr 23번 문제"
description: ""
categories : development
sub_categories : ""
date: 2016-04-21
tags: [webhacking, 'webhacking.kr']
comments: true
share: true
background_image: /assets/images/posts/well-used/hacked.jpg
---

이제 슬슬 문제 풀이하는게 좀 귀찮아지고있다.

푸는건 쉬워도 푸는 과정을 블로그에 포스팅하는건 좀 귀찮은 과정이다. 그래서 내 풀이글들을 보면 처음에는 정성 스럽게

사진 하나하나, 개념 하나하나 모두 짚고 넘어가는 글들이많은데 후반부로 갈수록 글들이 매우 짧아진다.

일 때문에 몸도 마음도 많이 지쳐있어서 그런걸지도 모르겠다. 조금 쉬고 돌아오면 활력을 되 찾을지도...

자, 각설하고 문제 풀이를 시작한다.

  

23번문제는 200 스코어 문제다.

들어가면 폼과 함꼐 아래와같은 문구가 기재되어있다.

보아하니 XSS('Cross-site scripting') 문제다.

XSS자체는 난이도가 매우 낮은 공격이지만 상황에 따라서 치명적인 피해를 입힐수도있는 공격법이다.

예전에는(제 얘기아닙니다만..) 주로 게시물이나 프로필 이외 취약점등을 통해서 많이 공격했고 해당 공격법을 통해서 제2차피해

예를 들어 브라우저 취약점('최신 브라우저 쓰세요.')을 통한 공격등으로 어마어마한 피해를 입힐수있다.

  

해커는 수 많은 카드를 가지고있다.

그 카드들중의 XSS가 하나의 카드가 될 수도 있다.

하지만 요즘은 왠만한 서비스에서 XSS하기 힘들다. 오랜시간동안 수많은 보안법이 나왔고 이제는 쉽게 필터링만으로도 걸러낼수있다.

여기서 필터링을 우회한다면 얘기는 또 달라지겠지만..

  

  

  

![](/assets/images/posts/597/2208704F571898F016BCA4.PNG)

  

  

  

`Your mission is to inject <script>alert(1);</script>`

  

우리는 폼에 저 스크립트를 넣어주면 된다.

일단 다 넣어봤다. "no hack" 이 출력된다.

script,scrip,scri,scr,sc 를 입력해보았다. 결과는 "no hack"

s === 1

하나씩 보내야겠군.. NULL값으로 연결해서 요청하면된다. 그럼 쉽게 클리어

  

ASCII Character

  

![](/assets/images/posts/597/215761505718A0A223DDD5.PNG)

  

  

  

  

클리어. 회사에서 포스팅하는거라..이만 후다닥...

  

![](/assets/images/posts/597/2133874A57189D6E2E0AF4.PNG)

  

