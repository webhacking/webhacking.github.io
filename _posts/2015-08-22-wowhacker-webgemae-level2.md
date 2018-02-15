---
layout: post
title: "WowHacker Webgemae level2"
description: ""
categories : ""
sub_categories : ""
date: 2015-08-22
categories : ""
sub_categories : ""
tags: ['2번', 'write up', '문제', '와우해커', '워게임', '웹해킹', '풀이']
comments: true
share: true
---

흠, 1번 문제가 너무 쉬워서 뭔가 포스팅을 끝내기 아쉬워서 2번문제도 풀었습니다.

저 강아지 보니깐 옛생각이나네요. 요즘은 한찬 [hack-me](http://hack-me.org/)에서 활동해서 . .

각설하고 2번 문제 풀이를 시작하겠습니다.

  

기재되어있는 링크로 이동해주세요.

http://webgame.wowhacker.com/levelii/

  

![](/assets/images/posts/42/2359F34455D8355F0AF02C.PNG)

  

  

게시판이 하나보이네요. 흑 , 난 게시판 싫은뎅.. .

일단 제일 먼저 눈에보이는 'Admin'에 공지를 들어가봅시다.

  

![](/assets/images/posts/42/2349AC3755D835E004AE87.PNG)

  

"특정 Level 이상만 글을 읽을 수 있습니다." 권한값이 주어진것으로 보입니다.

흠,

  

![](/assets/images/posts/42/216FCD3E55D836161A247E.PNG)

  

다음은 NO.7에 있는 '문제풀이 방식입니다.'를 클릭했습니다.

Level5이상 읽을 수 있다고합니다. 혹시 해서 쿠키값을 확인해봅시다.

  

![](/assets/images/posts/42/260E103D55D8363A0755AA.PNG)

  

  

  

저의 경우, 크롬 웹스토어에있는 확장프로그램을 이용중입니다.

쿠키를 편하게 수정할수있는 'Edit this cookie' 를 설치하셔도되지만, 일단 해당 확장프로그램이없다는 전제하에 풀이하겠습니다.

콘솔창을 이용해서봅시다. 로그를 document.cookie 로 찍고 확인해봅니다.

  

![](/assets/images/posts/42/2128EF4A55D8375503CF82.PNG)

  

  

group_level=3; user_level=3; 을 얻었습니다.

우리는 저 글을 읽기 위해서는 level5의 권한이 되어야합니다. 그렇다면 변경합시다.

  

  

![](/assets/images/posts/42/2356114455D837CF154C34.PNG)

"user_level" 값의 5를 대입해서 이제 문제풀이 게시물에 접급해봅시다.

접근 성공, 공유하지말라는 문구가 보입니다. "당연하죠 ㅋ!"  
다운로드 파일이있습니다. 해당 텍스트 파일을 열어봅시다.

  

![](/assets/images/posts/42/221C6F4855D837FD167B6B.PNG)

  

  

??????????

  

![](/assets/images/posts/42/2601E64D55D838BC18C3CE.PNG)

  

  

영준님이 분노를 참았습니다.

다음은 Answer 게시물에 접근합니다.

Ansewer 게시물에도 파일이 첨부되어있네요. Answer.txt 파일이었습니다.

텍스트 파일을 여러보니 아래와 같은 문구가 있습니다.

  

"Do you want answer? :-)"

  

너네 . . 참 나쁜아이들이구나 . . .

게시물 작성자 닉네임을 지금 확인했습니다. '강태공'

인내심을 가지고 Password.txt 에도 접근해봅니다.

흠, level7을 원하네요. 변경하고 다시 접근했는데 접근이안되네요. "불법접근입니다." 라는 짧은 메세지 박스가 뜨네요.

아까전에 Answer.txt 의 경로를 따면 되겠다. 생각이들어서 해당 경로에서 파일명을 Password.txt로 변경후 다운했습니다.

  

  

  

![](/assets/images/posts/42/2129164955D838D007F3F4.JPEG)

  

  

  

흠, 해쉬값이네요.

열심히 디코딩 하러가야겠습니다. 몇개 생각하다가 base64로 디코딩을 시작했습니다.

https://www.base64decode.org/ 해당 페이지에서 base64 인코딩및 디코딩할수있습니다.

  

디코딩하다보니 패스값이 나왔습니다. 안녕 ㅎㅎ

'Password : Where is fckorea?!'

  

fckorea는 password 게시물의 작성자인데 . .흑 설마 아까 공지에 . . 그 그 그 댓글에 도망자가 . . .

![](/assets/images/posts/42/276D334455D839F30CBD29.PNG)

  

  

![](/assets/images/posts/42/2527D64255D83A3E20222E.PNG)

  

