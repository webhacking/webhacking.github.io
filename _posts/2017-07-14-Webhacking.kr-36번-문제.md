---
layout: post
title: "[풀이] Webhacking.kr 36번 문제"
description: ""
date: 2017-07-14
tags: []
comments: true
share: true
---

36 번 문제는 200스코어의 문제입니다.

페이지 로드 시 아래의 내용들이 보입니다.

  

힌트로 "vi", "blackout" 을 알려주고있네요.

  

vi + blackout

  

vi 를 자주 사용하는 사람은 알겠지만, 파일을 편집할 때 backup 파일로 "swp" 확장자의 복제본이 생성됩니다.

해당 백업본의 파일명으로 요청을 하니 패스워드를 알려줍니다.

  

본 패스워드를 auth 항목에서 submit 하면 클리어 입니다.

  

    hintviblackout

  

  

![](/assets/images/posts/778/271BB53359681F8E156B21.JPEG)![](/assets/images/po
sts/778/2646043359681F8E14577A.PNG)

  

