---
layout: post
title: "Webhacking.kr 28번 문제"
description: ""
categories : ""
sub_categories : ""
date: 2016-05-02
tags: ['28번']
comments: true
share: true
---

500스코어 문제이며 파일 업로드 취약점에 관한 문제이다.

개인적으로 스코어에 비해서 난이도가 그리 높지는 않은 것 같다.

문제에 들어가면 아래와 같은 내용과 파일 업로드 폼이 보인다.

  

hint

upload/index.php

  

<?

$pw = "???";

?>

readme

  

이미지파일을 업로드하고 전송하면 아래와 같은 문자를 노출한다.

  

Done홈페이지 보안 문제로 파일내용은 표시해주지 않습니다.

부득이하게 이렇게 하드코딩으로 바꿔놨으나, 실제로 취약점이 있는 상황에서 사용할 수 있는 취약점이니 재밌게 풀어주세요.

  

hint : .htaccess

  

링크가 걸려있는 `upload/index.php`에 접속하면 단순히 'read me'라는 짧은 문구만 보이네요.

문제의 출제의도는 저 php파일을 읽는 것 같습니다. `.htaccess`파일에 아래와 같은 설정을 추가합니다.

  

php확장자를 실행을 끄는 간단한 설정입니다.

해당 파일을 업로드하면, 클리어.

  

php_flag engine off

AddType text/plain php

  

**참고**

[Using php_flag or php_value in .htaccess
files](https://support.tigertech.net/php-value)

  

![](/assets/images/posts/615/254FCE4E5726AC9605A3CD.PNG)

  

