---
layout: post
title: "WowHacker Webgemae level4"
description: ""
categories : development
sub_categories : ""
date: 2015-09-03
tags: ['webhacking', 'wowhacker']
comments: true
share: true
background_image: /assets/images/posts/well-used/hacked.jpg
---

요즘 하기 싫은( = 배우고 싶지 않은) `ASP` 프로젝트 때문에 바빠서 블로그 연재를 못하고 있었습니다.

따라서 요즘, 진행 중이었던 개인적인 프로젝트도 모두 정지 상태입니다.

잡담은 그만하고, 이전 3번 문제풀이에 이어서 4번 문제로 넘어가겠습니다.
  

이번에는 Authentication 관련 문제인가봅니다.

아래 로그인 폼이 보입니다.

로그인 폼 밑으로는 공지사항이 있는데요.

2번 글을 보면 "Creating anonymous account (guest/guest)"

비회원을 위해 guest 계정을 만들었다고 합니다. 그럼 게스트권한으로 로그인해봅시다.

  

![](/assets/images/posts/58/237D474B55E6D7D62D9346.PNG)

  

로그인하니 왠 삽질하는 아저씨가 한명있네요.

왠지 내 미래의 모습을 보고있는것같네요.

먼저 제일 눈에 들어오는건 좌측 사이드메뉴에 "Query" 폼과 "LoginTime" 입니다.

공지사항은 뭐 로그인 전이랑 후랑 별반다를게 없네요.

  

근데 8월 26일로 찍혀있네요. 오늘 9월2인데. 흠 이게 힌트라는걸까요.

인젝션일까? 하는 기대로 "Query" 폼에 입력하려는 순간 클릭,포커스 이벤트 설정이 되어있었네요.

  

  

![](/assets/images/posts/58/24261E4455E6D88427DE3E.PNG)

  

  

  

  

![](/assets/images/posts/58/2417164455E6D96C37749D.PNG)

  

  

  

  

이전 회원가입과 로그인 폼만드는게 제일 싫었던 저에게 이 문제또한 귀차늠이 느껴졌네요.  

일단 쿠키부터 확인합시다. "WOWSESSIONID" 값이 로그인마다 바뀌고있다는걸 알았습니다.

"**084e0343a0486ff05530df6c705c8bb**?value" 공통된 텍스트를 제외한 뒤의 value 가 의미하는것이
무엇일까 생각해봤을때..

처음에 유추했듯이 시간 관련된 값인 것 같습니다.

64자리 16진수(Hex)코드 32자리의 16진수코드 해당 부분은 MD5를
의심해볼수있습니다. curren time을 timestamp값으로 바꿔서 md5로 인코딩한것같습니다.

일단 디코딩 고고!

우선 첫번째 로그인 세션값을 통해서 디코딩 해봤다. 얻은 값(df3468605d8e0225255fc2594bf537b8 =
1440588335)

일단 뒤에 밸류는 시간정보값고 그렇다면 공통된 부분은 뭘까, 그럴땐 그냥 디코딩하는게 최고, 고고!

그래서 얻은 값(084e0343a0486ff05530df6c705c8bb4 = guest) 흠 계정인가? 일단 이 geust 부분을 통해서
어드민으로 접근해보자

따라서 admin 해쉬 고고! 그래서 얻은 값 (21232f297a57a5a743894a0e4a801fc3)


첫번째 세션 값 : 084e0343a0486ff05530df6c705c8bb4df3468605d8e0225255fc2594bf537b8

두번째 세션 값 : 084e0343a0486ff05530df6c705c8bb4625d772a20628c1620cff77a2f55aced

세번째 세션 값 : 084e0343a0486ff05530df6c705c8bb45028f2b55c0a64a71b6a975ac3935624

  

![](/assets/images/posts/58/2130793D55E6DE1A041BB7.PNG)

  

이전에 admin md5로 해쉬했던거랑 이전 밸류 조합해서 접근했는데, 잘못된 세션이란다. 퍼*

예상은 했지만 역시 시간관련 문제라는걸 생각했을때 공지사항 확인 고고!

  

![](/assets/images/posts/58/227B2B3D55E6DE1D31138F.PNG)

  
  
아래는 공지사항. . 첫번째 공지사항을 등록한 시간(2008.06.10 09:12:21)

흠, 게시물 등록과 로그인은 다르다. 그렇다면 저 게시물을 작성하기전에 admin의 로그인 시간을 예상했을때

대략, * ~ 3분? 아까 삽을 들고있던 아저씨의 사진이 낯설어보이지않았다는건 바로 내미래여서 그런가.

  

얼마만큼의 디코딩을 해야하는지 모르니, php에 md5함수로 반복문을 통해서 삽입해보자.

  
  

![](/assets/images/posts/58/2465353955E6DEED187A7E.PNG)

  

간단한 반복문 코드를 짜자, md5해쉬에 admin 스트링과 타임스탬프값을 붙여서 돌린다.

![](/assets/images/posts/58/2612A04555E71BAA2B80C1.PNG)

  

해당 시간 기준으로 `-1` 초씩 줄여나간다.

나온값으로 삽질하다보면 어드민 세션을 얻습니다.

그렇다면 바로 어드민권한으로 뻘짓할거 찾아볼까요. 바로 로그인 정보부분에 유저리스트 링크가 걸려있네요. 클릭
  

![](/assets/images/posts/58/2126453A55E71BE706C034.PNG)

  

![](/assets/images/posts/58/226D0E5055E71D3D020A5E.PNG)

  

  

guest:guest

admin:nologin

level4:VeRY Good! My Friend!

  

좋아요, 레벨4를 클리어 하셨습니당.

마지막으로 저 삽질 아저씨를 선물로 가져갑시당.

  

  

![](/assets/images/posts/58/2376BB3855E71D6A27C5CE.PNG)

  

  

보너스, 저 아저씨의 정보가 궁금해서 캐봄, 어디서 많이 본것같은 느낌(?)

알고보니 반고흐 작품, 올ㅋ;

  

  

![](/assets/images/posts/58/2520E73455E71DB80AC515.PNG)

  

  

