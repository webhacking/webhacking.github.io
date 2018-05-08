---
layout: post
title: "Webhacking.kr 13번 문제"
description: ""
categories : development
sub_categories : ""
date: 2016-03-20
tags: [webhacking, 'webhacking.kr']
comments: true
share: true
background_image: /assets/images/posts/well-used/hacked.jpg
---

주말이네요.

오늘 13번 문제 풀이를 하려고합니다. 13번 문제는 1000점 짜리 문제입니다.

2번하고 13번이 다소 어렵게 느껴질수있습니다. 그럴때는 문제를 차례대로 풀려하지말고 쉬운문제부터 푸시는 것을 추천드립니다.

해당 문제를 클리어하면, Rank급 상승합니다.

  

13번 문제를 보면, SQL INJECTION 이라 적혀있습니다.

네, 이번에도 인젝션이네요.

  

13번 문제는 다른 인젝션 문제와 달리 필터링 수준이 높습니다.

따라서 공격자는 이 점을 유의해야합니다.

  

해당 인풋에 0,1,* 를 입력했을때

0은 아무 값도 리턴하지않고 1은 1을 리턴하고 0과 1이 아닌 다른 값들은 0을 리턴한다.

띄어쓰기 부분을 %0a로 우회하여 값을 참으로 만들어 요청하니 1을 리턴받았다. 따라서 row count를 리턴하는것으로 유추해볼수있다.

문제에서 친절하게 힌트도 제공해주고있습니다.

  

HINT : select flag from prob13password

  

반가운 쿼리문이보이네요. 이를 통해서 테이블명과 컬럼명을 얻었습니다.

위의 결과를 통래서 Flag 컬럼에 있는 값을 알아내면 될 거 같다.

![](/assets/images/posts/537/262D803D56EE2BCE206CC0.PNG)

  

  

쿼리문 잘 아는 사람에게 꽤 유리한 문제다.

난 별로 잘 알지못해서 삽질했다.

  

파이썬으로 간단하게 짜서 클리어했다.![](/assets/images/posts/537/2444B43D56EE2F561A25F6.JPEG)

  

