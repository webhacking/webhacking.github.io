---
layout: post
title: "Webhacking.kr"
description: ""
date: 2015-09-06
tags: ['webhacking.kr', 'writeup', '문제', '소개', '올드좀비', '워게임', '웹보아', '웹해킹', '웹해킹케이알', '해킹', '회원가입']
comments: true
share: true
---

중학생때 알게된 webhacking.kr 입니다.

당시에는 엄청 열의를 가지고 한 것 같은데, 시간이 지나니 어린 시절의 제 모습이 귀엽네요.

  

회원가입을 해야하는데, 로그인 버튼외 회원가입 버튼은 보이지 않습니다.

Html 태그를 살펴보니 회원가입 버튼이 부분이 주석처리되어있네요.

herf 를 참고하여 회원가입을 진행하면 됩니다.

  

  

![](/assets/images/posts/73/2728C43555EC0AFA3C4539.PNG)

  

  

  

![](/assets/images/posts/73/2770DB3755EC0B37015CC7.PNG)

  

  

아이디,패스워드,이메일, 그리고 자신을 해석해달라는 구문의 폼으로 구성되어있습니다.

Decode me는 base64로 인코딩되어있는것같네요. 디코딩해주면됩니다.

  

  

![](/assets/images/posts/73/2744F54255EC0B9018BD72.PNG)

  

  

3번 정도 디코딩하니깐, 아이피 정보가 나오네요.

해당 아이피를 decode me부분에 넣어주고 회원가입하면됩니다.

  

  

![](/assets/images/posts/73/24023F4155EC0CC425255A.JPEG)

  

  

앞으로 66개의 문제들을 만날수있습니다.

이 중 몇개는 시간이 지남에 따라서 동작하지 않는 문제도 존재합니다.

  

  

![](/assets/images/posts/73/26403B3355EC0D070B8D9B.PNG)

  

  

