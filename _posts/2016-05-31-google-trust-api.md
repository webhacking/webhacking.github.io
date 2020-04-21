---
layout: post
title: "구글의 새로운 자동 사용자 인증 API, Trust API"
description: ""
categories : development
sub_categories : ""
date: 2016-05-31
tags: ['Trust API']
comments: true
share: true
---

이제 모든 계정에서 비밀번호가 사라질 수도 있습니다.

  

지난 주 끝마친 Google IO 2016에서 구글은 자동 사용자 인증 API, Trust API를 공개한다고 발표했습니다.

  

요즘 웹사이트에서 점점 더 복잡한 비밀번호를 요구하면서 사용자는 비밀번호를 잘 기억하지 못하게 되었습니다. 한 사이트에 로그인을 할 때
평균적으로 비밀번호를 2.4번 잘못 입력한다고 합니다. 게다가 은행이나 공공기관 로그인에서는 비밀번호 외에도 휴대폰 인증, 이메일 인증 등
추가적인 사용자 인증 절차를 요구하고 있습니다. Project Abacus는 이런 불편함을 해결하기 위해 휴대폰의 여러 센서를 이용해
사용자를 인식하는 자동 로그인을 구현하려고 합니다.

  

구글에서는 이미 사용자를 자동으로 인식해 로그인하는 Smart Lock서비스를 출시한 적이 있습니다. 이 서비스는 사용자의 얼굴과 위치
정보를 인식해 자동으로 잠금이 풀리도록 하는 서비스였습니다. Project Abacus에서는 여기서 더 나아가 더 다양한 사용자 정보를
백그라운드에서 지속적으로 트레이닝 하게 하였습니다. 어플리케이션이 백그라운드에서 계속 작동되며, 사용자의 타이핑 패턴, 걷는 패턴, 현재
위치, 음성 패턴, 얼굴 패턴 등의 데이터를 받아들여 이것으로 사용자의 Trust Score를 산출하는 알고리즘을 만들게 됩니다. 그리고
로그인시 사용자의 패턴을 인식해 Trust Score가 특정 수치보다 높으면 자동으로 로그인하게 하고, 낮으면 비밀번호 입력창으로
이동시킵니다. 또한, 서비스 마다 Trust Score의 기준을 달리하여, 금융 관련 어플에서는 더 높은 Trust Score를 요구하게
하고, 게임에서는 낮은 수치를 요구하게 조절할 수 있습니다.

  

2015 Google IO에서 처음 Project Abacus가 소개되었을 때, 당시에 가장 좋은 지문인식보다 10배 더 보안 성능이 좋다고
발표되었습니다. 또한, 핀을 이용한 로그인보다도 훨씬 더 좋은 성능을 보였습니다. 이번 Google IO에서 구글은 이 Project
Abacus를 안드로이드 API의 형태로 개발자들에게 제공한다고 발표했습니다. Trust API라 불리는 이 API 덕분에 이제
안드로이드에서도 애플의 지문인식과 같이 비밀번호 없이 자동으로 잠금을 해제할 수 있고, 더 안전하게 웹사이트에 자동로그인 할 수 있게
됩니다. 구글에서는 다음달부터 일부 은행들을 대상으로 시범적으로 서비스를 운영하기로 했습니다. 이제 금융서비스에서도 자동으로 사용자를
인증하기 때문에 복잡한 인증절차 없이 바로 서비스를 이용할 수 있게 됩니다.

  

이렇게 비밀번호를 없애려는 시도는 다른 기업에서도 하고 있습니다. 영국기반 스타트업인 Nok Nok Labs에서도 이와 비슷한 서비스를
만들어 운영하고 있습니다. 점점 더 디바이스의 숫자가 늘어나며 사람들이 기억해야하는 비밀번호가 많아지고 있습니다. 현재 사람들은 평균적으로
100가지 사이트의 비밀번호를 가지고 있다고 합니다. 이렇게 기억해야하는 비밀번호가 많기 때문에 오히려 사람들은 서비스에 가입을 하는 것에
거부감을 느낀다고 합니다. 앞으로 점점 더 많은 디바이스와 서비스가 생겨나며 로그인을 해야될 기회가 많아질 것입니다. 이렇게 사용자
인증절차를 간단하게 하는 시도는 단순히 사용자 경험을 개선하는 것 외에도 서비스의 다양성을 위해 필수적인 것 같습니다.

  

Nok Nok Labs

https://www.noknok.com/

  

참고기사

Google plans to bring password-free logins to Android apps by year-end

http://techcrunch.com/2016/05/23/google-plans-to-bring-password-free-logins-
to-android-apps-by-year-end/

Google aims to kill passwords by the end of this year

https://www.theguardian.com/technology/2016/may/24/google-passwords-android

  

아래 영상은 작년 Google IO의 Project Abacus 소개 영상입니다.

  

