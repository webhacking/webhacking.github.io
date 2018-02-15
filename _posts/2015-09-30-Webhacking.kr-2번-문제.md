---
layout: post
title: "Webhacking.kr 2번 문제"
description: ""
categories : ""
sub_categories : ""
date: 2015-09-30
categories : ""
sub_categories : ""
tags: ['블라인드인젝션', '뽐뿌', '심심', '심심할때', '올드좀비', '워게임', '웹해킹', '인젝션', '탈탈', '털림']
comments: true
share: true
---

2번 문제를 보면 아래와같이 길동이형(홍길동)이 명상하고있는 사진이 나온다.

  

우선 해당 문제는 _[Blind SQL injection](https://en.wikipedia.org/wiki/SQL_injection)_
문제이다.

[Blind SQL injection](https://www.owasp.org/index.php/Blind_SQL_Injection) 공격을
요약하자면

웹서버에서 SQL 인젝션을 대응하기 위해 내부 DB오류를 보여주지 않도록 설정했을때 참과 거짓을 구분할수있는 구문을 만들어놔서 데이터를
알아내는 방법이다.

  

좀 더 상세 설명을 덧 붙이자면 기존에 페이지오류(취약점)를 통한 SQL 인젝션 공격을 할수있었다면,

오류페이지 보안정책수립 후에도 공격이 가능할까?

  

시간이 소요될 뿐 "Blind SQL injection"공격이라면 가능하다.

블라인드 SQL인젝션이란 앞이 보이지 않는 상태로 공격한다는 뜻에서 붙여진 이름으로 참과 거짓 이론을 토대로, '& 1=1 -- 과 '&
1=2 등 이용하는 기법이다.

  

이 값을 요청해서 보여지는 페이지가 다르다면 해당 페이지에 취약점을 찾은 것 이다.

데이터를 열람하기 위해서는 데이터명, 테이블명, 컬럼명등을 알아야 하는데 아무런 정보가 없는 상태에서 데이터명, 테이블명, 컬럼명 등을
한문자 한문자 대입해봐서 찾아야하기 때문에 비효율적이다.  
  
뭐 프로그래밍적으로 언제든지 보안될수있는 부분이지만 무조건 대입하여 접근하는 방식은 서버에서 공격자를 빠르게 식별할수있기때문에 더욱더
조심해야한다.

  

아래는 본인이 와우해커에서 인젝션을 통한 문제풀이를 했었다.

간단한 예로 이 포스팅([7번 문제] 와우해커(WowHacker Webgemae.level7)
문제풀이,http://codekit.tistory.com/86)을 참고해도 좋다.

  

보통의 Blind SQLi는 한글자를 알아내기 위해서 수십번의 쿼리를 날려야한다.

서버의 상태가 좋지 않거나, 빠르게 알아내야하는 상황이 발생할 경우 이 기술을 사용하면 효과적인 공격이 가능하다.

  

2번 문제는 "500" 포인트 입니다.  

  

일단 2번문제에대한 나의 팁 요약

  

  * 소스를 잘 확인해보자.
  * 웹프로그래머들은 편의를 위해서 폼이름과 테이블/컬럼명을 동일하게 짓기도한다.(네이밍 센스부족)
  * 쿠키값을 잘봐라
  * 블라인드 인젝션 문제다.

  

* lpad 함수

: lpad(초기값, 횟수, 채울문자)

: 채울문자를 정해진 횟수의 길이에 도달할 때까지 초기값의 왼쪽에 붙여준다.

-> lpad(1,8,0) = 00000001

* bin 함수

: bin(숫자)

: 해당 값을 2진수의 형태로 변환해준다.

-> bin(97) = 1100001

* conv 함수

: conv(초기값, 초기진수, 바꿀진수)

: 해당 초기값을 초기진수에서 원하는 진수의 값으로 변환해준다.

-> conv(61,16,2) = 1100001

* ord 함수

: ord(문자)

: char 함수의 반대의 기능을 하는 함수이며 해당 값을 아스키 숫자로 변환해준다.

-> ord('a') = 97

* hex 함수

: hex(문자)

: 해당 값을 16진수로 변환해준다.

-> hex('a') = 61

  

  

![](/assets/images/posts/163/217A4336560BA2BD20F681.PNG)

  

  

일단 소스를 보자, 아래 소스를 보면 맵태그로 href 속성이 지정되있는걸 알수있다.

헌데, 어드민 페이지 값도 함께 노출되어있다. 추가로 아래의 시간값이 주석처리되어있다.

  

일단 알아낸 어드민페이지에 접근해보자.

  

  

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

22

23

24

25

26

27

28

29

30

31

32

33

34

35

36

37

38

39

40

41

42

<map name="main.jpg">

<area shape="rect" coords="15,8,517,54" href="index.php" target="" alt="" />

<area shape="rect" coords="339,63,403,93" href="about.php" target="" alt="" />

<area shape="rect" coords="413,63,490,92" href="member.php" target="" alt=""
/>

<area shape="rect" coords="500,63,582,92" href="research.php" target="" alt=""
/>

<area shape="rect" coords="592,63,651,92" href="bbs/index.php" target=""
alt="" />

<area shape="rect" coords="662,64,745,93" href="fun.php" target="" alt="" />

<area shape="rect" coords="756,63,825,93" href="contact.php" target="" alt=""
/>

<area shape="rect" coords="851,7,890,65" href="admin/" target="" alt="" />

</map>

<br><center><br>

</td><tr>

</table>

<table bgcolor=white width=976>

<td width=88></td>

<td width=800>

<br>

<center>

<a href=index.php><img src=img/new.jpg border=0></a><br>

<br><br>

<!--2015-09-30 05:43:35--></td>

[Colored by Color Scripter](http://colorscripter.com/info#e)

[cs](http://colorscripter.com/info#e)

  

  

콘솔에 document 쿠키값을 찍어보면 time값이 있을거다.

이 부분이 인젝션의 포인트되며 소스값에 주석으로 표시된 시간값이 참/거짓임을 알수있다.

  

심플한 어드민 페이지 접근, 포스트형식으로 짜진 심플 폼이하나보인다. time값을 통해서

  

참 일때<!--2070-01-01 09:00:01-->/ 거짓일때<!--2070-01-01 09:00:00-->

1443605996&1=0/1443605996&1=1

  

1443608178 and(select ascii(substring(password,1,1))from admin)> or 1443608178
and(select ascii(substring(password,1,1))from admin)=* PHP로짜던 C,RUBY,파이썬이던
자신한테 편한 언어로 짜면된다. 임의에 패스워드 값을 알아냈다면 블라인드 SQL 인젝션을 통해서 어드민 패스워드를 알아낸후 접근해보자.

![](/assets/images/posts/163/24768041560BA5F51C58CD.PNG)

  

![](/assets/images/posts/163/2626033D560D08EE0B6444.JPEG)

  

  

어드민 페이지에 접근하면 "메뉴얼 패스워드"를 획들할수있다.

이후에 board 메뉴에 들어가면 글이 한개있는데 board 제목이 FreeB0aRd로 되어있다.

table 이름일것이라고 추측해볼수있다.

  

그럼 table name을 FreeB0aRd, 그리고 컬럼을 패스워드로 해서 다시 블라인드 인젝션을 시도한다.

  

이 것 또한 언어를 짜서 사용해도된다.

얻은 패스워드를 통해서 비밀글을 읽으면 안에 압축파일이 하나있는데 그 압축파일 패스워드 번호가 어드민 페이지에서 획득한 "메뉴얼
패스워드"이다. 압축해제하면 그 안에 인증코드가있다. Clear!

  

  

  

![](/assets/images/posts/163/23015B47560D1F9E130C63.PNG)

  

  

  

![](/assets/images/posts/163/2401F13E568B601112D4B2.JPEG)

  

  

  

![](/assets/images/posts/163/275E383E568B6014314071.JPEG)

  

  

![](/assets/images/posts/163/2112473E568B6015069826.PNG)

  

