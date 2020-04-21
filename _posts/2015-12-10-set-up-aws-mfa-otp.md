---
layout: post
title: "[AWS] MFA(*Multi-Factor Authentication)로 보안강화 OTP설정"
description: ""
categories : development
sub_categories : ""
date: 2015-12-10
tags: []
comments: true
share: true
---

블로그 초반에 개인 정보 관련("개인 정보 보안의 대한 나의 생각 " + "안전한 패스워드 ") 해서 포스팅한 적이 있다.

우선 AWS는 실 서비스를 하는 상태에서 유출된다면 피해가 상당히 크다. 서비스 자체가 먹통이 될 수 있으니 하지만 보안에 대한 개념을
조금만 더 주의 깊게 생각하면 1차 피해를 최소화할 수 있다. 서비스에서 개인 정보가 유출되지 않는 한 이용자가 이용하는 타 서비스들을 통해
공격자는 AWS 계정 값을 유추하여 공격한다. 이러한 공격을 맞기 위해서 이전에도 말씀드렸듯이 패스워드의 잦은 변경 그리고 OTP('one
time password') 서비스를 이용하는 방법이다. OTP는 일회용 비밀번호를 매번 생성한다. 이 일회용 비밀번호에는 유효기간이 있고
이용자의 휴대용 단말기를 통하여 생성할 수 있다.

  

AWS에서 OTP를 이용할수있는 방법은 크게 두가지있다.

AWS MFA를 지원하는 OTP생성기를 구매하는 것, Gemalto('http://onlinenoram.gemalto.com/')에서
구매할수있다.

보통은 이 방식은 이용하지않는다.

  

다른 방법은 가장 많이 이용하는 방식으로 자신의 스마트폰에 AWS 공식 지원 OTP 생성 어플을 사용한다.

아래는 OS마다 지원하는 어플이 당연히 다르겠지만, 쉬운설명을 위해 아래 표를 참고한다.

  

Android

AWS Virtual MFA, Google Authenticator

Apple iPhone

Google Authenticator

Windows Phone

Authenticator

Blackberry

Google Authenticator

  

  

AWS Management Console에 로그인 후, "Security Credentials"메뉴에서 Multi-Factor
Authentication (MFA) 클릭후 진행하면된다.

진행내용은 AWS 간단한 튜토리얼이있으니 부연설명은 짧게 드리겠습니다.

추가로 이미지 퍼가실려면 따로 댓글 주세요.

  

  

  

![](/assets/images/posts/424/2576CE4656694278088AA1.PNG)

  

![](/assets/images/posts/424/216988465669427A121690.JPEG)

  

자신의 기기에서 QR코드 스캔해주세요.

인증방식이 두가지있는데, QR코드 스캔이 제일 간단합니다.

  

인증후에 아래와 같이 나올꺼에요. 저는 회사에서 진행하는 프로젝트들도있어서 몇개더있는거구요.

기본적으로 하나가 추가됩니다. 약 1분간격으로 코드가 바뀌는 것 같네요.

  

![](/assets/images/posts/424/2120024B566944CA224E44.JPEG)

  

