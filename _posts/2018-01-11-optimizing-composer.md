---
title: Composer 속도 향상
layout: post
categories : development
sub_categories : ""
date: '2018-01-11'
tags:
- composer 성능 향상
- composer 속도
- 퍼포먼스
comments: true
share: true
---

# Optimizing composer

[Composer](https://getcomposer.org/) 는 상황에 따라 느리다는 평을 많이 받고있다.

더 이상 속도 때문에 괴로워하지 말고, 아래 방법을 통해서 속도를 향상 해보길 바란다.


## 첫 번째, Composer 자가 진단

  

composer 에는 [diagnose](https://getcomposer.org/doc/03-cli.md#diagnose) 라는 명령어가
존재한다.

diagnose 의 설명은 아래와 같다.

  

오작동 발생 시, 해당 명령어를 통해 일반적인 문제에 대한 자동 검사를 진행한다.

검사 이 후, 결과에 따라 개선이 필요한 부분들을 확인하고 개선할 수 있다.

  

> If you think you found a bug, or something is behaving strangely, you might
want to run the diagnose command to perform automated checks for many common
problems.

  

## 두 번째, 병렬처리 다운로드를 도와주는 prestissimo

  

우리와 같이 속도에 고통에 시달리는 일본의 개발자가
[prestissimo](https://github.com/hirak/prestissimo) 라는 Composer 플러그인을 제작했다.

해당 플러그인을 통해 의존성 라이브러리 설치시 병령 처리를 지원하여 속도를 대폭 개선해준다.

  

플러그인 설치는 아래 명령어를 통해 좀 더 쉽게 할 수 있다.

  

    composer global require hirak/prestissimo

  

아래와 같이 Benchmark 시, 288s -> 26s 결과라는 만족스러운 결과를 내주었다.

  

    composer create-project laravel/laravel laravel1 --no-progress --profile --prefer-dist

  

위 패키지 추가 후, install 또는 update 명령어 질의 시, 아래와 같이 병렬 처리하는 모습을 볼 수 있다.

  

    uyeongjun-ui-MacBook-Pro:logispot-application hax0r$ composer update    1/4:	http://packagist.org/p/provider-latest$fee645e58453403d5212d70302204c9f9b606d847ea55817c76d1117179c7e3c.json    2/4:	http://packagist.org/p/provider-2017-07$d8b448d6582f0ee302c1aada4e0af1fbf8d5a6e8e93e8fd5d841f31eeaaeb8d4.json    3/4:	http://packagist.org/p/provider-2016$a929eb9b103e9c74924c2816a3a8517709f19ef53b288fd781411f753ce858c6.json    4/4:	http://packagist.org/p/provider-2017-10$239c045ffd99b94a264287b5994f24f7c8b965591552532b203126f21d3ef0a1.json    Finished: success: 4, skipped: 0, failure: 0, total: 4Loading composer repositories with package informationUpdating dependencies (including require-dev)

  
  

## 세 번째, 최신 PHP & Composer

  

diagnose 를 통해서, 진단 시 최신 composer 버전으로 사용하길 권장한다.

PHP 는 정말 최신의 버전을 사용하길 바란다.

7은 5와 비교 불가하게 많은 것들이 개선되었다. 더 좋은 PHP 개발 환경을 원한다면 꼭 최신 버전을 사용하길 권장한다.

Composer 또한 PHP 로 제작된 프로그램이기 때문에 PHP 버전의 영향을 많이 받는다.

  

굳이 PHP7 아니어도 좋다.

페이스북에서 만든 PHP 가상머신 [HHVM](https://hhvm.com/) 또한 추천한다.

Prebuilt Packages를 지원하는 플랫폼이 아니라면 직접 빌드해야하므로 많이 귀찮을 수 있다

  

  

## 네 번째, 옵션을 활용하자

  

[\--prefer-dist](https://getcomposer.org/doc/03-cli.md#install) 옵션을 통해서 성능을
향상할 수 있다.

[Stack](https://stackoverflow.com/questions/26079571/installing-laravel-
prefer-
dist)[overflow](https://stackoverflow.com/questions/26079571/installing-
laravel-prefer-dist) 에서 발췌한 설명은 아래와 같다.

  

> \--prefer-dist and --prefer-source are the two options of **composer** which
included in various documentations with a lack of proper explanation.


> \--prefer-dist would try to download and unzip archives of the dependencies
using GitHub or another API when available. This is used for faster
downloading of dependencies in most cases. It doesn't download the whole VCS
history of the dependencies and it should be better cached. Also archives on
GitHub could exclude some files you don't need for just using the dependency
with .gitattributes exclude directive.

  

  

## 다섯 번째, Change Packagist Region

  

packagist repository 를 http://packagist.jp 로 설정하므로 속도 향상을 기대할 수 있다.

  

    composer config -g repositories.packagist composer http://packagist.jp

기본설정으로 변경하고자 한다면 아래 명령어를 사용하면 된다.

  

    composer config -g --unset repositories.packagist

  

## 여섯 번째, Disable Xdebug

  

Composer 는 Xdebug 의 영향을 많이 받는다.

만약 Xdebug 가 enable 되어있다면, 아래와 같은 메세지를 출력한다.

  

    $ composer updateYou are running composer with xdebug enabled. This has a major impact on runtime performance. See https://getcomposer.org/xdebug

  

답답한 Composer 의 성능 때문에 이만저만 속이 터지는 것이 아닐 것 이다.

위 여섯 가지의 방법 중, 제일 효과가 좋았던 것은 당연 병렬처리 다운 플러그인일 것 이다.

Composer [remote ](https://github.com/composer/composer)[repository](https://g
ithub.com/composer/composer) 를 보면 많은 성능 이슈들과 고군분투하는 모습을 볼 수 있다.

  

100% PHP로 작성된 라이브러리이기 때문에, PHP 엔진이 수를 가릴 것이라 생각한다.

위 방법을 통해 당신의 composer 에 대한 이슈가 해결 되었길 바란다.