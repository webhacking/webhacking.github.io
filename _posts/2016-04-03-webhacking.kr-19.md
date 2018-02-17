---
layout: post
title: "Webhacking.kr 19번 문제"
description: ""
categories : development
sub_categories : ""
date: 2016-04-03
tags: ['문제풀이', '풀이']
comments: true
share: true
---

150 점 짜리 스코어라서 되게 가벼운 마음으로했는데, 좀 시간이 걸렸다.

저녁에 잠시 코드를짜다가 이전에 연재하고있던 문제풀이가 생각나서 급하게 풀어보았다.

다소 내용이 짧을수있고, 오타가 많을수있다는 점 미리 양해부탁한다.

  

19번 문제에 들어가면 작은 `인풋박스`와 `제출`버튼이 보인다.

  

아무값이나 대입하면 해당 대입한 값으로 `user_id`라는 쿠키값이 생긴다.

serid=MjUxMGMzOTAxMWM1YmU3MDQxODI0MjNlM2E2OTVlOTEwY2MxNzViOWMwZjFiNmE4MzFjMzk5
ZTI2OTc3MjY2MTlkZDRlNDYxMjY4YzgwMzRmNWM4NTY0ZTE1NWM2N2E2Y2ZjZDIwODQ5NWQ1NjVlZj
Y2ZTdkZmY5Zjk4NzY0ZGE0YjQzYjBhZWUzNTYyNGNkOTViOTEwMTg5YjNkYzIzMQ%3D%3D;

대입한 값은 'hax0r' 이라는 문자다.

저 쿠키값을 admin으로 변조한다면 이 문제를 해결할수있다.

  

base64 에 대한 지식있는 사람이라면 해당 값이 base64 인코딩된 값이라 유추할수있다.

내가 이전에 base64관련해서 개념 정리해둔게있다. 해당 지식이 없는 분은 한번 읽어보아도 좋다.

물론 내 블로그글을 읽지않고 구글링 통해 위키에서 읽기를 추천한다.

  

나처럼 `==`값으로 유추한사람이있을거다. 맞다.

%3D값은 `==` 값 이다.([ASCII Encoding
Reference](http://www.w3schools.com/tags/ref_urlencode.asp) 참고바람)

  

디코딩했을때 128자리의 값이나온다.

근데 저 값은 또 뭔가.

내가 대입한 값이 `hax0r`총 4자리의 수다. 해당 수와 첫 디코딩값을 나누어봤을때 32자리의 어떤 암호화가 더 되있을거라 생각할수있다.

md5 만 생각나서 md5로 한 문자씩 대입하니 내 추측이 맞았다는걸 알았다.

  

0cc175b9c0f1b6a831c399e269772661

8277e0910d750195b448797616e091ad

6f8f57715090da2632453988d9a1501b

865c0c0b4ab0e063e5caa3387c1a8741

7b8b965ad4bca0e41ab51de7b31363a1

  

해당 값을 다시 인코딩하고 %3D 치환한다.

코드는 파이썬으로 짜서 해결했다.

![](/assets/images/posts/570/2576E150570000E81193A0.PNG)

  

