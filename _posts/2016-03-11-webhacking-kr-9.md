---
layout: post
title: "Webhacking.kr 9번 문제"
description: ""
categories : development
sub_categories : ""
date: 2016-03-11
tags: ['9번', 'Apache', 'Hack', 'Python', 'pythonhack', 'WebHacking', '문제풀이', '우회', '인젝션', '정답', '코드', '파이썬', '파이썬해킹', '풀이', '해킹']
comments: true
share: true
---

저번주 까지는 날씨가 따듯해서 좋았는데, 요 몇일 정말 추워졌네요. 후덜덜 사무실에 다들 퇴근하고 혼자 남아있네요.

금요일 날 하라는 퇴근은 안 하고 문제풀이하고 블로그 포스팅 하고있네요.

집에가기전에 생각이나버려서.. 나름 집중하느라 시간도 빨리가서 다행히도 지옥철은 피한거같습니다.

  

9번 문제는 **900스코어** 짜리 문제입니다.

제가 이전에 webhacking.kr에서 최고 점수라했는데 아니었네요.13번이 1000점입니다.

우선 웹서버를 식별하기위해 Response 값을 참고합시다.

  

Date:Fri, 11 Mar 2016 11:52:41 GMT

Server:Apache/2.4.4

  

[아파치](http://www.apache.org/)네요. 중딩때의 추억 새록새록ㅋ 그 때가 아니었으면 전 지금 서버 프로그래머가
되지않았겠죠.

물론 처음에는 클라이언트(게임)쪽에 관심이많았었는데.. 각설하고 게속 문제를 풀어보죠.

혹시 Http Methods 몇개나 알고있나요? 4개? 5개?

알고는 있지만 별로 사용할일없는Methods? 노노 요즘은 Restful api 지향합니다. 그래서 필드(?)에서

많이 사용하는 구조입니다. 복습도 할겸 Http Methods 나 볼까요? 영어공부할겸 ..

  

**GET**

The GET method is used to retrieve information from the given server using a
given URI. Requests using GET should only retrieve data and should have no
other effect on the data.

**HEAD**

Same as GET, but transfers the status line and header section only.

**POST**

A POST request is used to send data to the server, for example, customer
information, file upload, etc. using HTML forms.

**PUT**

Replaces all current representations of the target resource with the uploaded
content.

**DELETE**

Removes all current representations of the target resource given by a URI.

**CONNECT**

Establishes a tunnel to the server identified by a given URI.

**OPTIONS**

Describes the communication options for the target resource.

**TRACE**

Performs a message loop-back test along the path to the target resource.

  

아파치 웹 인증은 아직도 다수의 사이트에서 인증(Authentication) 수단으로 쓰이는 방법입니다.

간단하면서 강력하기로 알려진 아파치 웹 인증, 하지만 취약점이 존재합니다. 이 취약점을 통해 공격자('해커') 는

개인 자료나 회사 기밀자료 등을 획득할 수 있다. 따라서 절대 관리자들은 이를 간과하면 안 된다.

아파치 웹 인증 설정 중 <Limit></Limit>의 속성으로 제한하고자 하는 메서드를 설정하고 인증 방식을 설정할 수 있다.

일반적으로 사용자들은 <Limit GET POST>로 설정한다. 그 이유로는 대부분이 개발자들이 GET, POST 메서드를 많이 사용해서도
적지 않은 영향이 있을 것이며 대부분의 문서들이 GET, POST 메서드만으로 설명된 문서들이 주로 검색된다는 것을 들 수 있다. 따라서
get, post != '메서드' 해당 메서드가 아닌 다른 메서드를 통하여 우회할 수 있다.

  

그럼 우리는 이제 메소드를 변조해야한다.

변조에는 여러방법을 뽑을수있다.

  

프로그래밍 언어(c,파이썬,자바)등으로 직접 프로그램을 만들어 요청하는 방식과 이미 나와있는 클라이언트 프로그램또는 온라인 서비스를
이용할수도있다. 크롬을 이용하는 이용자라면 크롬 웹 스토어에서 getpostman 등의 앱을 다운 받아도된다.

아니면 살아있는 역사 파로스를 이용해도 좋다. 난 오래만에 추억에 흠뻑 젖고 싶어서 파로스를 다운받았다.

물론 추억에 젖지못하고 팬티만 젖은 점에 대하여 상당히 마음 아프게 생각하고있다.

만약 이 글을 통해 문제를 푸는 유저라면 내 환경을 맞춰서 해도된다. 난 헤더변조로는 파이썬으로 프로그램을 짯고, 파로스도 이용했다.

이전에 와우해커 문제 풀이할때도 파로스 이용방법을 간단히 설명한 적있으니 설명은 건너 뛰겠다.

그래도 혹시 프로그램이 없는 사람이있을수있으니 다운로드 [링크](https://sourceforge.net/projects/paros/)는
기재하겠다.

  

  

![](/assets/images/posts/518/2474623A56E2B0F830BB41.PNG)

  

  

  

![](/assets/images/posts/518/251F313456E2B89E10F645.PNG)

  

  

![](/assets/images/posts/518/2679CC3A56E2BA0918EE54.JPEG)

  

  

  

로컬에 프록시 설정하고 OPTIONS or PUT 메소드를 이용해서 요청했다.

그런데 뭐징.. 간단한 폼이 나온다. 난 저런 간단한 폼이 싫다. 우리는 또 인젝션을 해야한다.

우회는 그냥 파티 초대장이었다고 생각하시면 편합니다. 허허..ㅋㄷ

1,2,3 a 태그에 href속성 주소로 이동하면 1번에 사과 2번 바나나 그리고 마지막 3번에는 Secret이라면 힌트아닌 힌트를 준다.

  

hint : length=11

column : id,no

  

컬럼값도 없고, 길이도 알았으니 이제 만족하고 SQL Injection을 해보자.

인젝션 텍터는 변수 no밖에 없다.

변수 no 파라미터에 입력되는 데이터(1, 2, 3)에 따라 보여주는 내용이 다르기 때문에 이를 이용해서 Blind SQL
Injection을 수행하면된다.

그런데, 왠만한 키워드는 모두 필터링 되고 있어 좀 까다로울 수 있다.

  

Blind SQL Injection 문제이다 보니, 직접 프로그램을 작성해서 공격하는 것이 효율적이다.

HTTP 메소드를 바꾸기 위해 urllib, urllib2라이브러릴 사용하면 된다. 물론 파이썬 기준이다.

쿼리문이 참일 경우의 아웃풋 3, 거짓일 경우 0 또 1,2가 되겠다.

거듭 말하지만 필터링이 많아 쿼리문을 짜는데 꽤 고생할 것 이다.

  

그럼 굿 럭.

  

파이썬으로 코드를 짜고, 유추한 값을 pw 파라미터에 기입하고 request하면 해당 문제를 Solved한다.

나의 [파이썬](https://www.python.org/) 버전은 2.7.11이다. 이로써 9번 문제를 풀었네요.

사실 다음주에 풀어야지 생각했었는데, 어찌 오늘 풀게되었네요. 으아아악 10시라니.. 포스팅하니 10시라니..!

집 가야겠다..

  

  

![](/assets/images/posts/518/2271C24056E2C05433E3E0.JPEG)

  

  

  

  

**참고 문서**

  * [Apache HTTP Server Version 2.2](https://httpd.apache.org/docs/2.2/ko/howto/auth.html)

  * [HTTP - Methods](http://www.tutorialspoint.com/http/http_methods.htm)

  * [HOWTO Fetch Internet Resources Using urllib2](https://docs.python.org/2/howto/urllib2.html)

  * [[WEBHACKING.KR #9] BLIND SQL INJECTION WITH BYPASSING APACHE AUTHENTICATION](http://xiphiasilver.co-story.net/hack3r/?p=1112)

  

  

![](/assets/images/posts/518/27494C3356E2B98B23D5B5.JPEG)

  

  

  

![](/assets/images/posts/518/2121FD3456E2B89E0E725A.PNG)

  

  

  

