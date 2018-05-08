---
layout: post
title: "Webhacking.kr 4번 문제"
description: ""
categories : etc
sub_categories : ""
date: 2016-01-12
tags: [webhacking, 'webhacking.kr']
comments: true
share: true
background_image: /assets/images/posts/well-used/hacked.jpg
---

안녕하세요.

요즘 바쁩니다.

  

그래도 10 - 20분 정도 짬을 내서 Webhacking.kr 4번 문제를 풀도록 하겠습니다.

저의 경우 2년 전부터 거의 풀었던 문제들이라.. 근데 어디까지 풀었는지 기억이 안 나네요.

아무튼 앞으로 문제를 풀면서 초급자분들이 많이 구글링해서 볼 것으로 예상하므로 단어 뜻 등을 따로 쉽게 기재해두겠습니다.

  

    "YzQwMzNiZmY5NGI1NjdhMTkwZTMzZmFhNTUxZjQxMWNhZWY0NDRmMg=="

  

위 에서 의미하는 스트링의 의미는 무엇일까요,

중요한건 바로 밑에 "Password" 와 "Input Box" and "Submit Button"이 보입니다.

최소 전두엽 장애 아닌 이상 왠만해서는 저 값이 패스워드를 의미한다는 것 을 알수있습니다. 기본적으로 저 값은 암호화 되어있는것으로
보입니다.

그래서 저는 이 값을 암호화 값이라 부르겠습니다.

  

우선 포스팅을 읽기전에 해시함수에 대해 조금 이해하고 들어가자.  
요약함수,message digest function 라고도 한다. 주어진 원문에서 고정된 길이의 의사난수를 생성하는 연산기법, 생성된 값을
'해시'값이라 칭합니다.  

  

  

아래의 암호화값은 Base64로 인코딩 되어있는 것으로보인다  
Base64인코딩을 식별하는 몇가지 방법은 Base64의 특징을 대조해보면된다. 아래는 Base64의 대표적 특징이다.  

  1. 2진 데이터를 ASCII형태의 텍스트로 표현가능  

  2. Web 인증 중 기본 인증에 사용  

  3. 끝 부분의 padding(==)으로 식별가능  

  4. 64개의 문자를 사용(영문 대, 소, 숫자, +-)  

  5. 데이터를 6bit단위로 표현

이제 특징을 봤으니, 다시 한번 위의 암호화 값을 보길바란다.

이해했다면 앞으로 당신도 유출된 암호화값을 얻었을때, 특징들을 유추해 암호화된 데이터를 쉽게 디코딩 할 수 있다.

자, 그러면 이제 인코딩된 값을 한번 디코딩(*https://www.base64decode.org/)해본다. 디코딩 결과 해당
값'c4033bff94b567a190e33faa551f411caef444f2'을 얻었다.

  

  

  

![](/assets/images/posts/485/261020365694C5CE14152B.PNG)

  

  

  

값 을 넣고, 쿼리를 전송했지만 묵묵부답, 그렇다면 이 중으로 인코딩 될 수있을 가능성을 먼저 의심해본다.  

40자리의 해시값을 볼 때, 16진수이고 40*4\160bit의 해시 함수값을 유추해볼수있다.  

160bit 해시 함수를 검색해보면 SHA-0과 SHA-1이나 올 것이다.  
SHA-1 로 디코딩해보자. 디코딩 후 얻은 결과 값을'c4033bff94b567a190e33faa551f411caef444f2' 한번 더
디코딩한다.

그러면 "****"패스워드가 나온다. 해당 패스워드를 폼 박스에 기입 후 전송한다.  

  

![](/assets/images/posts/485/262735395694C9E0284DBA.PNG)

  

  

또 해당 블로그를 보고, 문제를 풀었다면 네이버 D2에 포스팅된 "안전한
패스워드('http://d2.naver.com/helloworld/318732')"에 대해서 읽어 보길바란다.

  

  

![](/assets/images/posts/485/224EB93B5694CA5F31D9FD.PNG)

  

![](/assets/images/posts/485/2334683B5694CA60173BAB.PNG)

  

  

  

