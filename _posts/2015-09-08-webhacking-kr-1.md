---
layout: post
title: "Webhacking.kr 1번 문제"
description: ""
categories : development
sub_categories : ""
date: 2015-09-08
tags: [webhacking, 'webhacking.kr']
comments: true
share: true
background_image: /assets/images/posts/well-used/hacked.jpg
---

와우해커에 이어서 올드좀비님의 Webhacking.kr을 연재하도록 하겠습니다.

추억을 회상할겸..

  

13년도쯤에 많이 했었는데, 어디까지 클리어했는지 기억이안나네요.

그때는 챌린지가 40개정도였던걸로기억하는데 문제가 많이 출제되었네요.

각설하고 문제를 봅시다.

  

1번 문제는 "200" 포인트 입니다.  

  

![](/assets/images/posts/84/22019C4655EEBA750542D4.PNG)

  

  

레벨 1(http://webhacking.kr/challenge/web/web-01/) 입니다.

문제 의도를 모르겠으니 일단 소스를 보죠.

소스를 보니 "index.phps"에 location.href='index.phps' href 태그가 설정되있네요.

해당 경로로 접근합니다.

  

  

![](/assets/images/posts/84/221A744A55EEBAC1342F70.PNG)

  

![](/assets/images/posts/84/214B5F3855EEBAFE179BF4.PNG)

  

  

아래와 같은 PHP 코드를 볼수있습니다.

  

  

"user_lv"의 1이라는 쿠키값이 설정되네요.

이 문제는 단순히 쿠키값을 변경해주면 됩니다. php구문의 조건을 확인해봅시다.

  

  

  

6과 같거나 작다, 5보다 크다, 그렇다면 5.1 ~ 6사이의 숫자를 user_ly값의 대입해주면됩니다. 5.5로 잡아서 대입하죠.

  

  

![](/assets/images/posts/84/2315713D55EEBF7B2921EC.PNG)

  

  

![](/assets/images/posts/84/25103A3455EEBF6A2F33E2.PNG)

  

  

![](/assets/images/posts/84/2135A83855EEBB412A612C.PNG)

아래와 같이 클리어됩니다.

  

  

![](/assets/images/posts/84/23265F3B55EEBF8E09AFCF.PNG)

  

  

