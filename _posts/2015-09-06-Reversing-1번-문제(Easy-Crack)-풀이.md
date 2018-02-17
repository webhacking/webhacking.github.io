---
layout: post
title: "[Reversing.kr] Reversing.kr - 1번 문제(Easy Crack) 풀이"
description: ""
categories : development
sub_categories : ""
date: 2015-09-06
tags: []
comments: true
share: true
---

리버싱관련 문제풀이를 올리겠다고 했었는데, Webhacking관련 워게임도 그렇고 약속을 지키지 못하는것같아서 죄송합니다.

흠, 풀이 연재를 시간을 좀 두고 해야될것같아요. 이번에 프로젝트랑 공부때문에 시간이 없어서 . . 자 각설하고 문제풀이 시작합니다.

  

Easy Crack은 포인트 백점의 문제입니다.

파일 다운로드 후, 실행합니다.

  

  

![](/assets/images/posts/71/255A795055EB2EE2011221.PNG)

  

  

  

아래와같은 입력폼이 주어지는데요. 임의에 텍스트값을 그냥 넣어서 확인버튼을 눌러봅니다.

그러면 "Incorrect Password" 라는 에러구문을 출력합니다. 이 Easy Crack은 해당 입력폼에 패스값을 넣으라는것같네요.
오키도키

  

![](/assets/images/posts/71/226FCE4B55EB2EB20AD820.PNG)

  

  

![](/assets/images/posts/71/2371464B55EB2EB5090FF3.PNG)

  

  

디버깅을 통해, 이 프로그램에서 사용하는 문자열을 찾아봅시다.

"Congratulation!!" 문자열이 참조되는 004011B 주소로 이동합시다.

앞에 나온 조건 분기문을 살펴본 결과, 키값확인을 위한 총 3번의 문자비교가 있었습니다.

  

![](/assets/images/posts/71/226F464A55EB2FAF0E084F.PNG)

  

  

  

  

