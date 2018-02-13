---
layout: post
title: "Webhacking.kr 14번 문제"
description: ""
date: 2016-03-20
tags: []
comments: true
share: true
---

13번 이후에 급격하게 쉬워진 문제들로 다소 당황스러울수있습니다.

풀이라고 하기도 쑥스러운...

  

  

![](/assets/images/posts/538/2711DA3656EE355E33ACD8.PNG)

  

소스를 보면 체크 시, ck function을 호출합니다.

ul 이라는 변수 document.URL('Get the full URL of the current') 현재 주소를 담고, indexOf를
통해서 해당 문자열의 찾을 인덱스를 리턴받아 다시 대입한다.

대입한 값을 30을 곱한다. 해당 값이 인풋박스 밸류와 같이 값다면 해당값*인풋박스 밸류값을 연산한값을 메세지박스로 보여준다.

  

위의 스크린샷 처럼 간단하게 아웃풋을 구할수있다.

얻은값을 auth 카테고리를 통해서 flag 한다.

  

  

    function ck(){
    var ul=document.URL;
    ul=ul.indexOf(".kr");
    ul=ul*30;
    if(ul==pw.input_pwd.value) { alert("Password is "+ul*pw.input_pwd.value); }
    else { alert("Wrong"); }
    }

  

  

  

