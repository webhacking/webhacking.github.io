---
layout: post
title: "Modern PHP, Laravel"
description: ""
categories : ""
sub_categories : ""
date: 2017-12-20
tags: ['beyond hompage tool']
comments: true
share: true
---

> Modern PHP, Laravel.

>

> Beyond Personal Hompage Tool

  

위 문장을 앞으로 연재될 문서들의 슬로건으로 삼아,

_Modern PHP 을 통한 [Laravel](https://laravel.com/) 웹 어플리케이션 제작 과정을 공유_하고자한다.

  

앞으로 만들 웹 어플리케이션은 티스토리와 같은 형태의 여러사람이 사용할 수 있는 블로그 어플리케이션이다.

내가 구상한 목차는 아래와 같다.

  

  * [개요](http://blog.hax0r.info/846)
  * 안녕, Laravel
  * Laravel Request 라이프사이클
  * Laravel 구성 디렉토리
  * Laravel 설정
  * 개발환경 설정
  * 라우팅
  * 미들웨어
  * 컨트롤러
  * 뷰
  * 블레이드
  * 모델
  * 쿼리빌더
  * DB 마이그레이션
  * 엘로퀀트 ORM
  * 에러
  * 블로그 제작
    * 회원가입
    * 로그인
    * 목차
    * 문서 작성
    * 문서 수정
    * 문서 읽기
    * 문서 삭제
    * 문서 공유
    * 댓글

  

기존 잘못된 PHP의 낡고 잘못된 정보들을 접한 프로그래머들이 같은 실수를 반복하는 것을 방지하고,

옳바른 길로 인도하여 기존 악순환을 끊고 양질의 정보를 생성하고 공유하며 더 좋은 PHP 시장이 형성되길 바라며 글을 적는다.

  

아쉽게도 이 문서는 처음 PHP를 입문하는 개발자에게 적합하지 않다.

만약 본인이 PHP 를 처음 입문한다면 생활코딩의 [PHP 기본
수업](https://opentutorials.org/index.php/course/62)을 공부하고 다시 이 문서를 보기 추천한다.

PHP의 기본 문법도 웹 프로그래밍 일반론, OOP, 디자인패턴등은 여기서는 다루지 않을 것 이다.

  

위에서 언급한 기존의 잘못된 낡고 잘못된 정보들이란 무엇인가.

  

PHP 는 언어중에서 유독 [Hater 들이 아주 많은 언어](https://www.quora.com/Why-is-PHP-hated-by-
so-many-developers)인 것 을 아는가 ?

아이러니하게도 나도 Hater 중 한명이다.

  

Hater 가 된 이유는 PHP 의 내부 메소드들의 이름은 함축된 의미를 잘 나타내고 있지 않고,

네이밍 컨벤션 또한 지켜지지 않은 메소드들이 존재한다.

  

또한 오래된 버전에서는 여럿 취약점들이 존재하는데, 만약 이 취약점들이 궁금하다면 이 블로그 "Security" 카테고리에
"[W](http://blog.hax0r.info/search/webhacking)[ebhacking S](http://blog.hax0r.
info/search/webhacking)[olve](http://blog.hax0r.info/search/webhacking)" 문제들을
참고하면 도움이 될 것 같다. 이외 많은 결함들이 존재했는데 이는 개발자로 하여금 예측성을 떨어트려 실질적 중요시 해야하는 기능 구현 보다
요리 조리 결함을 피하는데 소요되는 시간이 컸다.

  

하지만 PHP 는 필요이상으로 많은 괴롭힘을 받고있다.

이는 이전의 부정적 인식으로 생긴 문제 같다.

  

그 것이 자의든 타의든 중요치 않다.

하지만 그 인식을 현재 대입하여 비난할 필요는 없다.

  

최근 만난 PHP Hater분이 지적한 PHP의 단점은 아래와 같다.

"PHP는 내장 웹서버가 없다.", "PHP는 오류 추적이 힘들다", "PHP는 딱히 내세울 프레임워크가 없다.'

  

PHP는 내장 웹서버가 없다 ?

\- PHP 5.4 부터 Built-in web server 를 지원하고 있다.

  

PHP는 오류 추적이 힘들다 ?

\- PHP 는 오래전부터 [Xdebug](https://github.com/xdebug/xdebug) 라는 훌륭한 디벙기 툴을
가지고있습니다. Xdebug 와 jetbrains 사 에서 제작한 PHP IDE [PHPStorm 과
연동하면](https://www.jetbrains.com/help/phpstorm/configuring-xdebug.html) 강력한 개발
환경을 구축 할 수 있습니다.

  

PHP는 딱히 내세울 프레임워크가 없다 ?

\- [Laravel](https://github.com/laravel/laravel)

  

![](/assets/images/posts/846/990E3B3B5A5758B0124DFA.PNG)

  

  

이상의 잘못된 디자인 프렉탈이나 여러 단점들을 늘어 놓으면 내용이 많이 길어질 것 같으니 다루지 않겠다.

'PHP 잘못된 디자인 프렉탈', 'PHP 결함', 'PHP가 욕 먹는 이유' 등을 검색하면 여러 문서들을 발견할 수 있다.

  

지금부터는 PHP 의 시작과 현재 가고자 하는 길에 대해서 얘기해보고자한다.

  

태초에 PHP 언어가 담고 있는 Personal Homepage Tool *(현 "[Hypertext
Preprocessor](https://stackoverflow.com/questions/3043179/what-is-php-as-
personal-home-page-and-php-hypertext-preprocessor)" )을 보더라도,

초기 PHP 설계는 먼 미래를 내다본 설계가 아닌 단순 함수 모음에서 시작되었다.

  

> PHP was written in the C programming language by Rasmus Lerdorf in 1994 for
use in monitoring his online resume and related personal information. For this
reason, PHP originally stood for “Personal Home Page”. Lerdorf combined PHP
with his own Form Interpreter, releasing the combination publicly as PHP/FI
(generally referred to as PHP 2.0) on June 8, 1995. Two programmers, Zeev
Suraski and Andi Gutmans, rebuilt PHP’s core, releasing the updated result as
PHP/FI 2 in 1997. The acronym was formally changed to PHP: HyperText
Preprocessor, at this time. (This is an example of a recursive acronym: where
the acronym itself is in its own definition.)

  

출처 : [Stack Over Flow](https://stackoverflow.com/questions/3043179/what-is-
php-as-personal-home-page-and-php-hypertext-preprocessor)

  

PHP 를 고안한 Rasmus Lerdorf 는 한 컨퍼런스에서 아래와 같은 말을했다.

이 발언을 보더라도, 태초의 PHP의 언어의 의미를 잘 나태고 있다고 생각한다.

  

> I actually hate programming, but I love solving problems

  

현재의 릴리즈된 PHP 최신 버전은 7.2 이며 전 5.*의 버전과 비교 했을때 상당한 성능을 자랑한다.

여러 이슈들을 수정했고, [새로운 기능](http://php.net/manual/en/migration70.new-
features.php)들을 여럿 추가되었다.

  

기존의 보수적 탈을 벗었다고 한 들, 여전히 10년전의 코드가 돌아갈 정도로 PHP는 경제성있는 언어다.

  

좋은 PHP 어플리케이션을 만들고자 한다면, [PHP The Right Way](http://modernpug.github.io/php-
the-right-way/) 문서를 읽어보는 것을 추천한다.

또한 PHP 서적 중, [Morden PHP](http://blog.hax0r.info/783?category=650299) 책을 추천한다.

  

잘못을 알아야, 더 좋은 방향으로 나아갈 수 있다 생각한다.

그렇다면, Modern PHP 라 불리는 것은 이전의 그렇게 욕먹던 PHP와 다른가 ?

  

> 그렇다. 다르다.

  

하지만 지금의 PHP 에 대해 습득할 지식을 검색해보면 상당수가 옛날 방식 코드들이 대 다수이다.

도구는 향상되었는데, 향상된 도구를 사용하기는 커녕 10전 도구를 그대로 사용하고있다.

  

이것은 국내 PHP 개발자들의 고질적 문제일 수 도 있다 생각이된다.

새로 PHP를 배우고자하는 입문자는 결국 10년전 도구를 받고 실망하고 최신 도구들을 찾아 길을 떠난다.

  
이제라도 향상된 도구를 쥐어줘야할때다.

  

도구란 언제든 바뀔 수 있는 것 이다.

지금은 양질의 자료 또한 많아 learning curve 최소한으로 쉽게 타 프로그래밍 언어를 배울 수 있다.

  

개발자란 항상 배움을 먹고 자라는 사람이라 개인적으로 생각한다.

똥인지 된장인지 한번 먹어보고 신명나게 까도 늦지 않다.

  

자, 그럼 Modern PHP는 무엇인가 ?

말 그대로 Modern + PHP 이다.

  

직역하면 현대적인 PHP가 되겠다.

그렇다면, PHP의 현대적은 어떤 시점 이후인가 ?

정답은 버전 [5.3](http://php.net/releases/5_3_0.php) 이다.

  

오랜 정체기 끝에 [5.3](http://php.net/releases/5_3_0.php) 버전이 릴리즈 되었고,

이 시점 이후 부터의 PHP 개발 방법은 많이 개선되었다.

  

현재까지 객체지향, 네임스페이스, 트레이트, 클로저 등의 현대적 기능과 풍부한 컴포넌트 라이브러리들이 추가되었고 새로운 언어로 탈 바꿈했다.

개인적으로 현재 시점의 Morden 을 붙이고자한다면, 아래를 준수해야 할 것 이다.

  

  * 클래스 추상화의 정도
  * [PSR(PHP Standards Recommendations)](http://www.php-fig.org/psr/) 준수
  * 패키지 매니저

  

내가 생각하는 Modern PHP의 가장 적합한 프로젝트는 `Laravel`이다.

그럼 다음 시간에는 "[Laravel](https://laravel.com/)" 을 만나보자.

  

  

  

