---
layout: post
title: "Scalar Type Hints"
description: ""
categories : development
sub_categories : ""
date: 2017-06-27
tags: []
comments: true
share: true
---

  

PHP 7이 릴리즈되면서 [Scalar
types](https://www.tutorialspoint.com/php7/php7_scalartype_declarations.htm)
추가되었습니다. (아래 항목 참고)

  * int
  * float
  * bool
  * string
  * interfaces
  * array
  * callable

type hinting은 변수의 타입을 명시적으로 지정하는 것을 말합니다.

타입을 명시하게 되면 프로세스가 실행하는 시점에 명시된 타입의 변수가 아닌 다른 타입의 경우 에러를 반환하고 프로세스를 중단 시킵니다.
명시된 type으로써 좀 더 정확한 정보를 얻을 수 있고 [self documenting](http://terms.naver.com/entr
y.nhn?docId=1588313&cid=50372&categoryId=50372) php 프로그램을 만드는데 한걸을 다가설 수 있습니다.

  

php7 이전 type hinting은 아래와 같이 메소드의 매겨변수 안에 class 타입과 array 타입 형태로만 지원하고 있었습니다.

  

    function enroll(Student $student, array $classes) {    foreach ($classes as $class) {        echo "Enrolling " . $student->name . " in " . $class;    }}/* Catchable fatal error: Argument 1 passed to enroll() must be an instance of Student, string given */enroll("name",array("class 1", "class 2"));/* Catchable fatal error: Argument 2 passed to enroll() must be of the type array, string given */enroll($student,"class");enroll($student, array("class 1", "class 2"));

스카랄 변수의 type hinting은 strict mode가 아닙니다.

다른 타입의 변수가 전달되는 경우 명시된 type으로 자동 형변환(type cast)을 시도하게 됩니다.

  

  

글을 마치며 .. 변수나 프로퍼티 선언시 타입 명시는 아직 지원하지않는 것은 아쉬운 점 입니다.

  

![](/assets/images/posts/768/270DDF3B595621D811265B.PNG)

  

  

  

> In PHP 7, a new feature, Scalar type declarations, has been introduced.
Scalar type declaration has two options.

>

> Whereas type hints ensure input consistency, return type declarations ensure
output consistency.

>

> We use a colon before the opening curly brace of a function to hint the
return type

  

**참고**

  * [5 New Features in PHP 7](http://blog.teamtreehouse.com/5-new-features-php-7)
  * [Type Hinting in PHP (Version is 5)](https://www.sitepoint.com/type-hinting-in-php/)

  

