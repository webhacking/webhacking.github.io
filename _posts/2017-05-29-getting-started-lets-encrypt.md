---
layout: post
title: "Lets' Encrypt로 무료로 HTTPS"
description: ""
categories : development
sub_categories : ""
date: 2017-05-29
tags: ["How To Secure Apache with Let's Encrypt on Ubuntu 14.04", "Lets' Encrypt", '설치']
comments: true
share: true
---

**개요**

  

[HTTPS](https://www.instantssl.com/ssl-certificate-products/https.html) 는 더 이상
선택이 아닌 필수입니다.

[Lets' Encrypt](https://letsencrypt.org/) 는 SSL을 무료로 제공해
[HTTPS](https://www.instantssl.com/ssl-certificate-products/https.html) 의 보급율을
높이기 위해 만들어졌습니다

[Let’s Encrypt](https://letsencrypt.org/) 는 점유율 0.1% 미만의 인증기관입니다.

점유율이 매우 낮지만 절차 방법 또한 간단하고 최상위 발급 기관 중에 하나입니다.

  

대표적으로 무료 SSL을 지원하는 기관은 아래와 같습니다.

  

  * [Startssl](https://www.startssl.com/)
  * [Wosign](https://www.wosign.com/English/)
  * [Let’s Encrypt](https://letsencrypt.org/)

위 인증기관마다 각자의 장단점의 내용 간략하게 적어봅니다.

  

  * StartSSL
    * 인증서 기간은 1년이다. (1년 마다 재발급 가능하다.)
    * 분실시, 재 발급은 유료이다.
  * Wosign
    * 인증서 기간을 1~3년까지 지정할 수 있다.
    * 꽤 많은 브라우저에서 해당 인증서를 신뢰할 수 없다.
  * Let's Encrypt's
    * 인증서 기간은 90일이며, 설치가 매운 간단하다.

  

이번에 자체 로그 시스템을 개발하게되어 아파치 웹 서버로 구성하여 개발하였다.

테스트 환경은 아래와 같습니다.

  

본 문서는 자동 갱신의 대해서는 따로 기재하지 않았습니다.

  

참고 문서 내용 중..

> Let's Encrypt's certificates are only valid for ninety days. This is to
encourage users to automate their certificate renewal process. We'll need to
set up a regularly run command to check for expiring certificates and renew
them automatically.

  

Let's Encrypt's 는 3개월만 유효하며, 이후에는 자동으로 갱신을 진행해야합니다.

매번 갱신 과정이 귀찮으신분은 cron 을 통해 해당 문제를 해결할 수 있습니다.

설정 작업 또한 간단하니 필요하신분은 참고 문서 내용을 통해서 개별적으로 작업을 진행하시면 되겠습니다.

  

  

**테스트 환경**

  

Distributor ID : Ubuntu

Description : Ubuntu 14.04.5 LTS

Release : 14.04

Codename : trusty

  

  

**설치**

  

설치 과정은 매우 간단하니, 아래 절차되로 진행하면 됩니다.

  

  

1\. git 설치

  

    // 이미 git 이 설치되어있다면, 아래 명령어는 무시하시면 됩니다.sudo apt-get install git

  

2\. 저장소 Clone

  

    cd /optgit clone https://github.com/letsencrypt/letsencrypt

  

3\. 디렉토리 이동후 자동설치

  

    cd letsencrypt./letsencrypt-auto --help

4\. 자동으로 도메인 설정

  

    ./letsencrypt-auto --apache -d yourdomain.com

  

도메인 설정 진행 중 아래와 같은 다이얼로그가 출력됩니다.

  

  1. 이메일을 입력하세요.
  2. 약관에 동의하세요.

  

설치일로부터 3개월이 인증서 만료일입니다.

위 와 같은 방식으로 매번 갱신을 진행하면됩니다.

  

  

**참고**

  

  * [How To Secure Apache with Let's Encrypt on Ubuntu 14.04](https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-ubuntu-14-04)
  * [Lets' Encrypt Documentation](https://letsencrypt.org/docs/)

  

