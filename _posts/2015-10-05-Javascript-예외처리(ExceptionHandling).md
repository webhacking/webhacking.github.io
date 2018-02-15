---
layout: post
title: "Javascript 예외처리(ExceptionHandling)"
description: ""
categories : ""
sub_categories : ""
date: 2015-10-05
tags: []
comments: true
share: true
---

**Javascript 예외처리(ExceptionHandling)**

참고자료(*https://msdn.microsoft.com/ko-kr/library/4yahc5d8(v=vs.94).aspx)

한 블록에서 throw된 오류가 다른 블록에서 처리되는 코드 블록을 설정합니다.

try 블록 내부에서 throw되는 오류는 catch 블록에서 catch됩니다.

  

***예외처리(Exception Handling)**

  * 프로그램이 실행되는 동안 문제가 발생할 때 대처할수있게 처리하는 것
  * 예외(Exception) : 프로그램 실행 중 발생하는 오류
  * 에러(Error) : 프로그래밍 언어의 문법적인 오류
  * 기본 예외 처리, 고급 예외처리 두 가지 방법으로 처리

  

**1.기본 예외처리**

  * 예외가 발생하지 않게 사전에 해결하는 것

  

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

<script type="text/javascript">

function registerEventListener(node, event, listener) {

if (node.addEventListener) {

node.addEventListener(event, listener, false); // 파이어폭스, 크롬, 사파리, 오페라

} else if (node.attachEvent) {

node.attachEvent('on' + event, listener); // 익스 플로러

} // if

}

function whenClick(e) {

var event = window.event || e;

var willAlert = '';

willAlert += 'clientX : ' + event.clientX + '\n';

willAlert += 'clientY : ' + event.clientY + '\n';

alert(willAlert);

}

</script>

[Colored by Color Scripter](http://colorscripter.com/info#e)

[cs](http://colorscripter.com/info#e)

  

**2.고급 예외처리**

  * try키워드,catch키워드.finally키워드로 예외를 처리
  * try 구문안에서 예외가 발생하면 catch 구문에서 처리, finally구문은 필수사항은 아니고, 예외가 발생 여우와 상관없이 수행돼야하는 작업을 처리

  

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

<!-- exception2.html -->

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>exception2</title>

<script type="text/javascript">

try {

alert('try 구문');

abcd.run(); // 없는객체의 없는 메서드이기 때문에 예외 발생

alert('try 구문 끝'); // 예외로 인해 실행 되지 않음

} catch (exception) {

alert('예외 발생시 실행 되는 catch 구문');

} finally {

alert('예외 발생 여부 상관없이 실행 되는 finaylly 구문');

}

</script>

</head>

<body>

</body>

</html>

[Colored by Color Scripter](http://colorscripter.com/info#e)

[cs](http://colorscripter.com/info#e)

  

**3.예외객체**

  * try catch 구문을 사용할때 catch 괄호안에 입력하는 식별자
  * e, 또는 exception 식별자를 사용
  * 예외 객체의 속성

  

** 속성명**

** 설명 **

message

예외 메시지

description

예외 설명

name

예외 이름

  

  

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

<!-- exception3.html -->

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>exception3</title>

<script type="text/javascript">

try {

var array = new Array(99999999999999999999999);

} catch (exception) {

var output = '';

for (var i in exception) {

output += i + ' : ' + exception[i] + '\n';

}

alert(output);

}

</script>

</head>

<body>

</body>

</html>

[Colored by Color Scripter](http://colorscripter.com/info#e)

[cs](http://colorscripter.com/info#e)

  

**4.에러와 예외**

예외 : try catch 구문으로 해결할 수 있는 것

에러 : try catch 구문으로 해결할 수 없는 것

  

**5.예외 강제 발생**

예외를 강제로 발생시킬때는 "throw" 키워드를 사용

에러와 다르게 예외는 try catch 구문으로 처리할 수 있음

  

