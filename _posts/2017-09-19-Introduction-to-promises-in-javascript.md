---
layout: post
title: "Introduction to Promises in Javascript"
description: ""
categories : development
sub_categories : ""
date: 2017-09-19
tags: ['Introduction to Promises in JavaScript', 'JavaScript Promises for beginner']
comments: true
share: true
---

**_Introduction to Promises in Javascript_**

  

이 문서는 `Promise` 구문에 대한 지식이 없는 분들께 도움을 드리고자 제가 이해한 내용을 공유합니다.

현재의 자바스크립트 시장은 격동의 시기라고 할 수 있습니다.

  
ECMAScript6 등 여러 새로운 표준 기술이 잇달아 나오고있습니다.

여기서 소개하고자하는 Promise 또한 이 표준 기술 중 하나입니다.

  

아래 참고 그림은 Promise 가 어떤 동작 방식을 취하고 있는지 잘 알려주고 있습니다.

자세한 내용은 목차에 기재된 "Promise 는 어떻게 사용해요?" 에서 다루겠습니다.

![](/assets/images/posts/819/9903113359C1DE6632CED4.PNG)

  

본 문서의 목차는 아래와 같이 구성 되어있습니다.

  

  * Promise 란 무엇인가
  * Promise 를 사용하면 장점이 뭔가요?
  * Promise 는 어떻게 사용해요?
  * Promise의 상태(State)에 대해서
  * Promise의 API 알아봐요 !

## **Promise 란 무엇인가**

자바스크립트는 모든 작업이 Async(비동기)로 이루어집니다.

"Promise" 객체에 대하여, 모질라 개발 문서에는 아래와 같이 기재되어있습니다.

  

> Promise 객체는 **비동기 계산을 위해 사용**됩니다.  
Promise는 아직은 아니지만 나중에 완료될 것으로 기대되는 연산을 표현합니다.

  

Promise는 비동기 처리 로직을 추상화 한 객체와 그것을 조작하는 방식을 말합니다.

개념은_ [E 언어](https://en.wikipedia.org/wiki/E_\(programming_language\))에서 처음
고안_됐으며 병렬 및 병행 프로그래밍을 위한 일종의 디자인입니다.

이 디자인을 자바스크립트 환경에서 얘기를 해보려고합니다.

  

Promise를 사용하여 비동기 함수를 체계적으로 활용 할 수 있습니다.

활용만 잘한다면 Async 보다 깔끔하게 코드 정리가 가능합니다.

Promise는 전통적인 콜백 패턴이 가진 단점을 일부 보완하며 비동기 처리 시점을 명확하게 표현할 수 있습니다.

이 부분에 대해서는 아래에 조금 더 자세히 풀어보겠습니다.

  

우선 `Sync(동기)`, `Async(비동기)`의에 대해서 잠깐 얘기해볼까요 ?

  

Sync(동기) 방식은 _순차적으로 일을 스스로 끝내 나가는 방식_입니다.

Async(비동기) 방식은 _해야 할 일을 위임하고 기다리는 방식_입니다.

  

자바스크립트는 Single-Thread(단일 스레드) 입니다.

이 말은 동시에 하나의 작업만을 처리할 수 있다는 얘기입니다.

  

인간으로 비유하면, 인간은 Multi-Thread(다중스레드) 입니다.

컴퓨터를 하며 여러개의 손가락을 움직일 수 있고, 움직임과 동시에 옆에 있는 친구와 대화도 할 수 있죠.  
친구가 없다면 혼잣말을 할 수 도 있겠군요.

  

## **Promise 를 사용하면 장점이 뭔가요?**

Promise를 통해서 _콜백 패턴이 가진 단점을 보완_할 수 있다고 말했습니다.

_Callback Hell_ 이라는 말을 들어 본 적 이 있나요 ?

  

Callback 함수가 그 결과 값을 가지고 Call back을 다시 호출하고,

다시 결과으로 Callback을 호출하게 되면 발생하는 것을 일컫습니다.

  

호출되는 Callback 의 양이 많아지면 HELL이 되는 것 입니다.

클린코드를 좋아하는 개발자들로써는 용서할 수 없는 일 이죠.

  

눈으로 따라가기도 힘들고, 유지보수 또한 힘들어져 효율성이 떨어집니다.

코드가 간결해지면 가독성이 좋아집니다.

조금 뒤에 말씀드릴 내용이지만, Promise 를 사용하면 코드의 일관성도 향상 됩니다.

  

그래서 이를 보완하여 나온 개념이 `Promise` 입니다.

이 것이 `Promise`의 탄생배경이자 목적입니다.

  

자, 그럼 코드를 보면서 얘기를 나눠볼까요 ?

  

아래 코드는 제가 말한 [Callback hell](http://callbackhell.com/) 코드 입니다.

이어지는 콜백 함수들이 많으면 얼마나 고통스러울지 조금은 상상이 되실 겁니다.

저 이어지는 콜백안에서의 오류와 에러처리들 ... 생각만해도 머리가 아프네요.

    getData(function(x) {      getMoreData(x, function(y) {          getMoreData(y, function(z) {               ...          });      });});

  

여러 브라우저 엔진에서 Promise를 지원하지 않는 동안 한 동안은 아래의 라이브러리를 통해서 구현했습니다.

대표적인 라이브러리들은 아래와 같습니다.

  

  * [Q](https://github.com/kriskowal/q)
  * [When](https://github.com/cujojs/when)
  * [Winjs](https://msdn.microsoft.com/en-us/library/windows/apps/br211867.aspx)
  * [Rsvp](https://github.com/tildeio/rsvp.js)

  

위의 라이브러리나 엔진에서 제공하는 Promise 객체는 Promises/A+라는 일반적인 표준화된 동작을 공유합니다.

자바스크립트 표준화 단체인 ecma는 Promise라는 새로운 비동기 프로그래밍 방식을 표준으로 채택한 것은 정말 기쁜 소식이 아닐 수
없습니다.

  

하지만 단점도 있답니다.

바로 브라우저의 크로스브라우징 이슈인데요. 이 경우 위에서 말씀드린 라이브러리를 통해서 감안이 가능합니다.

하지만 브라우저 내 지원 객체를 사용하려면 현재 시점에서의 최신 브라우저 버전을 사용해야합니다.

  

이외 Promise는 단일 _인터페이스, 강력한 에러 처리 메커니즘_ 등 많은 장점을 가지고 있습니다.

전통적인 콜백 패턴에서는 비동기 처리 중 발생한 오류를 예외 처리하기 힘듭니다.

같은 맥락이지만 이를 통해서 Callback 패턴에서의 애로 사항들을 개선할 수 있습니다.

  

Promise 객체에서 제공하는 메서드만 사용하기 때문에 기존 콜백 패턴 처럼 자유롭게 인자를 전달하는게 아니라 코드의 일관성이 보장됩니다.

## **Promise 는 어떻게 사용해요?**

아주 간단해요.

"new Promise()" 를 통하여 `Promise` 객체를 생성하면 됩니다.

Promise의 정적 메소드`resolve`를 사용하면 new Promise() 구문을 단축해 사용 할 수 있습니다.

간단한 예제 코드를 볼까요 ?

  

    Promise.resolve('a@hax0r.info').then(function(email){	console.log(email);})

  

resolve(value) 메소드는 then 메소드를 이용해 등록한 콜백 함수가 바로 호출 됩니다.

Fulfilled 상태인 promise 객체를 반환하므로 위와 같이 사용이 가능한 것 입니다.

상태값의 대해서는 아래 "Promise의 상태(State)에 대해서" 를 참고해주세요.

  

아래는 예제 [코드](https://jsfiddle.net/079a7965/)입니다.

  

저의 블로그의 포스트를 가지고 오는 예제를 만들었습니다.

아래 코드는 저의 블로그 RSS data 를 가져옵니다.

개발자는 코드를 보고 말하라는 말이 있던데, 어떤가요 도움이 되시죠 ?

  

    'use strict';function hax0rBlogPosts(){/* 인스턴스 생성 */	return new Promise(function(resolve,reject)	{		var request = new XMLHttpRequest(),			hax0rBlogRssUrl = 'http://blog.hax0r.info/rss';		request.open('GET',hax0rBlogRssUrl,true);		request.onload = function()		{			if ( request.status === 200 ) {				resolve(request.responseText);			} else {				reject(new Error(response.statusText));			}		}		request.onerror = function ()		{			reject( new Error(request.statusText) );		}		request.send();			});}hax0rBlogPosts().then(function(posts){	/* resolve */	console.log(resolve);	console.log('영준이 블로그 포스팅');	console.log(posts);},function(message){	/* reject */	console.log('reject 시');	console.log(message);}).catch(function(reason){	/* Exception */	console.log('예외 처리 시,');	console.log(reason);})

  

여러개의 비동기 작업들이 모두 완료 되었을 때, 콜백 함수를 호출 하고 싶다면 `all` 메소드를 사용하세요.

아래와 같이 사용할 수 있어요.

  

    var p1 = Promise.resolve(3);var p2 = 1337;var p3 = new Promise(function(resolve, reject){setTimeout(resolve, 100, "foo");}); Promise.all([p1, p2, p3]).then(function(values){ /*아웃풋 : [3, 1337, "foo"] */      console.log(values); // [3, 1337, "foo"] });

## **Promise의 상태(State)**

Promise 객체는 Pending 상태로 시작해 Fulfilled나 Rejected 상태가 되면 다시 는 변화하지 않습니다.

그래서 이 두개의 상태의 도달하면 `Settled` 상태라고 부릅니다.

  

정말 간단하죠 ?

아래 Flow chart 를 보면 좀 더 이해하기 쉬울 것 같습니다.

  

![](/assets/images/posts/819/99E7FF335A0594BF156908.PNG)

  

  

상태

의미

처리됨(fulfilled)

프라미스 관련 작업이 성공

거부됨(rejected)

프라미스 관련 작업이 실패

보류됨(pending)

resolve 또는 reject 함수가 아직 호출되지 않은 상태

해결됨(settled)

처리되거나 거부 (resolve 또는 reject 함수가 호출 된 상태)

## **Promise의 API 알아봐요 !**

첫 번째, 정적 메소드 !

전역 객체인 Promise에는 Promise.all()이나 Promise.resolve() 같은 정적 메서드가 있습니다.

이 메소드들은 Promise를 다루는 데 필요한 보조 메소드입니다.

  

아래 표를 참고해주세요.

  

메소드 명 인자 값

설명

resolve(promise)

프라미스를 반환 ( promise.constructor == Promise 일 때)

resolve(thenable)

thenable에서 새 프라미스 객체 생성 (thenable은 `then()` 메서드가 있다는 점에서 프라미스와 유사)

resolve(obj)

obj에 대해 수행되는 프라미스 객체 생성

reject(obj)

obj에 대해 거부되는 프라미스 객체 생성 (일관성 및 디버깅(예: 스택 추적)을 위해 obj는 instanceof Error여야 합니다.)

all(array)

배열의 모든 항목이 처리될 때 처리되고 어떤 항목이 거부될 때 거부되는 프라미스 객체 생성

race(array)

어떤 항목이 처리되자마자 처리되거나 거부되자마자 거부되는 프라미스를 발생 순서에 상관없이 생성

  

  

두 번째 인스턴스 메소드 !

new 연산자로 생성한 Promise의 인스턴스 객체는 resolve,reject 했을 때 호출될 콜백 함수를 등록할 수 있는

promise.then()이라고 하는 인스턴스의 메소드가 있습니다.

  

이 또한 아래 표를 참고해주세요 !

  

메소드 명 인자 값

설명

then(onFulfilled, onRejected)

성공 시 onFulfilled가 호출 ! 실패했을 때는 onRejected가 호출  
  
이 둘 모두 선택 사항이므로 생략 할 수 있습니다.  
만약 오류를 처리하고자 한다면 catch(onRejected) 를 통하여 처리 할 수 있습니다.

catch(onRejected)

promise.then(undefined, onRejected)의 보완

  

  

지금 까지 제가 Promise 에 대해 알아본 내용을 공유했습니다.

최대한 초심자의 입장에서 이 글을 볼때를 감안하고 글을 작성하려 노력했습니다.

하지만 담을 내용은 너무 많고, 놓친 부분들이 많습니다.

  

조금 더 상세한 정보를 원하시는 분들은 별도의 서적을 구비해보는 것도 추천해드리고싶습니다.

그럼 이만 서버 개발자가 맛 본 자바스크립트의 Promise 입니다.

즐거운 코딩 하세요 !

  

