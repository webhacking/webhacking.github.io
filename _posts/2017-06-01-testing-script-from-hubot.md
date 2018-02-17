---
layout: post
title: "휴봇 스크립트 테스트 (TESTING HUBOT SCRIPTS)"
description: ""
categories : development
sub_categories : ""
date: 2017-06-01
tags: ['휴봇 스크립트 테스트']
comments: true
share: true
---

# 개요
  

일전에 [슬랙에서 휴봇 사용하기](http://blog.hax0r.info/744)라는 게시물을 포스팅한적있습니다.

아무래도 휴봇의 사용빈도가 높아지면서 사내에서 필요한 기능들이 터져나오기 시작했습니다.(기쁨)  
날씨 요약본을 간단하게 알려주는 용도로 개발되었습니다. (맨 아래 사진도 몇 장 등본했습니다.)  
  

  

# 설치

  

`hubot-test-helper`를 먼저 설치합니다.

  

    npm install hubot-test-helper --save-dev

  

CoffeeScript 를 위해 필요 의존성 도구를 설치합니다.

  

    npm install mocha --save-devnpm install co --save-devnpm install chai --save-devnpm install coffee-script --save-dev

  

  

이 후, 테스트를 원하는 스크립트를 아래와 같은 형태로 실행하면 됩니다.

아래는 정상적으로 테스트가 성공한 결과입니다.  
  
아래의 명령어를 통해, 테스트를 진행 할 수 있습니다.  
mocha --compilers "coffee:coffee-script/register" "{테스트할 대상 경로}"

  

    mocha --compilers "coffee:coffee-script/register" tests/test_hi.coffee  hello-world    user says hi to hubot      ✓ should reply to user  1 passing (152ms)

  

  

  
# 간단한 날씨 기능

  

아래는 팀원이 수기로 날씨를 알려주는 모습입니다...

  

  

![](/assets/images/posts/758/274DD8395930D26533A103.JPEG)

  

  

  

이제 자비스(휴봇)이 실시간으로 알려주고있습니다.  
간단한 스크립트이지만, 팀원에게 짐을 덜어준 것만 같아 여러모로 매우 뿌듯합니다.

  

![](/assets/images/posts/758/2328A3375930D387075462.JPEG)

  

![](/assets/images/posts/758/210AC6375930D387258D96.PNG)

  

  

## 참고

  

  * [TESTING HUBOT SCRIPTS](http://leapfrogonline.io/articles/2015-11-09-testing-hubot-scripts/)

