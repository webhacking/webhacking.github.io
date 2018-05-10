---
title: Reactive Programming
layout: post
tags: ['Reactive Programming', 'Functional Reactive Programming']
background_image: /assets/images/posts/reactive-programming/stream.jpg
---

[Rx(Reactive Extensions)](https://archive.codeplex.com/?p=rx) 를 다루기전, `Reactive programming` 에 대해 학습한 내용을 토대로 정리하여 공유합니다.
Rx 의 약자로 Reactive Extensions, Reactive x 둘 다 맞습니다. (Historically, Reactive Extensions. Recently, Reactive x. So, both are correct)
따라서 이 문서에 Rx의 glossary 는 Reactive Extensions 으로 정의하겠습니다.
이와 같이 학습에 혼선을 주는 내용들이 많아서 조금 당혹스러웠습니다 (e.g. 리액티브 프로그래밍과 함수형 리액티브 프로그래밍과 혼동).
이 문서에서 다룰 Observable 이 [Promise](https://blog.hax0r.info/2017-09-19/Introduction-to-promises-in-javascript/)와 개념적으로 유사합니다 따라서 일전 작성한 Promise 글을 참고하시면 더 도움이 될 것 같습니다.

# What is reactive programming ?

> Reactive programming is programming with asynchronous data streams. You can listen to that stream and react accordingly

이 관점으로 볼 때, Reactive Programming 은 Asynchronous dataflow programming 으로도 불립니다.
애매모호한가요?
좀 더 본질에서 얘기하자면 기존의 Imperative Programming(명령형 프로그래밍)은 절차지향 적인 반면 Reactive Programming 에서는 데이터 흐름을 먼저 정의하고 데이터가 변경되었을때 연관되는 함수나 수식이 업데이트 되는 방식입니다.
Reactive programming 에서는 기본적으로 모든 데이터는 흐르는 강물이라 간주하고, 그 데이터의 흐름을 stream 으로 봅니다.
결론적으로 stream 은 연속된 데이터의 흐름을 일컫습니다.

![stream](/assets/images/posts/reactive-programming/stream.jpg)

비동기 데이터 스트림이라 칭하니, 조금 어색한데, 전혀 새로운 개념은 아닙니다.
`이벤트 처리`를 예제로 삼아 얘기해봅시다.
아래와 같이 클릭 이벤트를 처리한다고 가정할 때, 우리는 다음과 같이 처리할 수 있습니다.

```javascript
const button = document.getElementById('my-button');
button.addEventListener('click', (e) => { /* DO SOMETHING */ });
```

이벤트 리스너, 이벤트 핸들러 등을 통해 이벤트를 구독하고, 예제와 같이 비동기적 이벤트를 처리할 수 있습니다.

```
click stream : ---c---c---c-c---c----c-->
```

이벤트 리스너와 비슷한 측면에서 비동기 데이터 스트림 또한 마찬가지로 구독 가능하며, 이를 통해 데이터 혹은 사이드 이펙트를 안전하게 처리할 수 있습니다.
다른점이라 하면 비동기 데이터 스트림은 좀 더 많은 연산을 수행할 수 있습니다.

각각의 stream 은 branch 되어 새로운 스트림이 될 수 있고, merge 될 수 도 있습니다.
또한 map, filter 와 같은 함수형 메소드를 이용하여 stream 을 정제할 수 있습니다. 이 내용은 아래 예제에서 조금 더 상세하게 다뤄보겠습니다.


![rx-streams](/assets/images/posts/reactive-programming/rx-streams.png)


이러한 stream 을 관측(observation)하고 반응하는 방식으로 동작하는 프로그래밍을 reactive programming 이라 합니다.
이는 우리가 직면하고 있는 프로그래밍 문제에 직접적으로 적용될 수 있음을 알 수 있습니다. (CPU라는 것도 단지 명령과 데이터로 구성된 스트림을 처리하는 장치일 뿐)

어떻게 적용할지 궁금한가요 ?
그렇다면 위의 그림을 예제 삼아 얘기하자면, `buffer(clickStream.throttle(250ms))` 의 경우 250ms "이벤트 침묵" 이 발생하면 클릭을 리스트에 누적 시킵니다.

코드를 참고 하면 좀 더 쉽게 이해할 수 있겠죠 ?
그렇다면, 아래 예제 코드를 참고해주세요.
해당 코드는 `RxJS` 라이브러리를 활용하여 작성 하였습니다. 코드의 내용은 250ms 내, 클릭 이벤트가 발생하면 클릭을 리스트에 누적 시키는 로직입니다.
로직 내 `map()`은 각각의 리스트를 그 리스트의 길이를 가진 정수 값으로 mapping 합니다. `filter(x >= 2)` 함수를 사용하여서 정수 1을 무시하도록 합니다.

```javascript
// Make the raw clicks stream
var button = document.querySelector('.this');
var clickStream = Rx.Observable.fromEvent(button, 'click');
var throttle = 250;

// The 4 lines of code that make the multi-click logic
var multiClickStream = clickStream
    .buffer(function() { return clickStream.throttle(throttle); })
    .map(function(list) { return list.length; })
    .filter(function(x) { return x >= 2; });

// Same as above, but detects single clicks
var singleClickStream = clickStream
    .buffer(function() { return clickStream.throttle(throttle); })
    .map(function(list) { return list.length; })
    .filter(function(x) { return x === 1; });

// Listen to both streams and render the text label accordingly
singleClickStream.subscribe(function (event) {
    document.querySelector('h2').textContent = 'click';
});
multiClickStream.subscribe(function (numclicks) {
    document.querySelector('h2').textContent = ''+numclicks+'x click';
});

Rx.Observable.merge(singleClickStream, multiClickStream)
    .throttle(throttle)
    .subscribe(function (suggestion) {
        document.querySelector('h2').textContent = '';
    });
```

조금은 내용들이 이해되셨나요 ?
그렇다면, 이제 `Observable`, `Subscribe` 에 대해 설명해드릴게요.
설명에 앞 서, `Pull-scenario`, `Push-scenario` 에 대해 먼저 설명해드릴게요.

- `Pull-scenario`는 외부 환경에 요청하고 응답 대기 후, 응답을 획득하는 방식이며 제어 흐름의 주체는 애플리케이션이다.
- `Push-scenario`는 `Pull-scenario` 와 반대로 외부 환경 요청 후, 응답 대기 상태가 아닌 외부 응답이 올 시 반응합니다.

push-scenario 의 장점은 제어의 흐름 주체를 외부로 위임함으로써 응답 대기 비용을 줄일 수 있습니다. 따라서 비동기 처리에서 유리합니다.

reactive programming 은 `Push-scenario` 로 동작합니다.

이 때, 외부에서 내부로 흘러오는 데이터 스트림을 생성하는 객체를 `Observable`, stream 을 구독하여 사용하는 객체를 `Observer` 라 합니다.
좀 더 쉽게 얘기하자면, 스트림은 observed 되는 대상, `Observable`은 Streaming 역할, `Observer` 는 stream 을 처리하는 역할을 합니다.
`Observer`는 `Observable`을 `Subscribe`합니다.
이는 [Observer Design Pattern](https://en.wikipedia.org/wiki/Observer_pattern) 과 동일합니다.
아래 그림을 통해 이해하면 좀 더 쉽게 이해할 수 있습니다.


![about-observable-observer](/assets/images/posts/reactive-programming/about-observable-observer.jpg)


Observer는 Observable에 subscribe하고 onNext, onError, onCompleted를 Observer에 구현하면 이를 Observable이 호출 합니다.


![onNext-onError-onCompleted](/assets/images/posts/reactive-programming/ob-ob.png)


# Why is it necessary ?

> Apps nowadays have an abundancy of real-time events of every kind that enable a highly interactive experience to the user. We need tools for properly dealing with that, and Reactive Programming is an answer

탄생 배경 또한 이 질문의 답을 주고 있습니다.
오늘날의 소프트웨어는 더 정교하고 UI 인터랙션과 더 빠른 반응 속도를 요구합니다.
따라서 오늘날 앱들은 실시간 작업을 수행하고있죠. 이를테면 "좋아요" 를 누르면, 다른 연결되어 있는 유저에게 실시간으로 반영될 수 있습니다.

Reactive Programming 은 코드의 추상화 레벨을 올려줌으로써, 비즈니스 로직을 규정하는 이벤트들 간의 상호 관계에만 집중할 수 있게 도와줍니다.
그리고 여러분을 `Callback Hell` 에서 벗어나게 해줄거에요.
이는 `Promise` 또한 존재하지만 Promise는 단 하나의 value를 다룰 수 있지만, Observable은 다수의 value를 다룰 수 있습니다.
또한 퍼포먼스 측면(Since all your code is asynchronous, multiple tasks can be accomplished at the same time. This better utilizes your computers resources and makes your applications run faster)에서도 좋습니다.
OS에 있어 쓰레드는 아주 귀한 친구이니까요.

# Ended

Recommends 항목에 있는 `Getting Started with Functional Reactive Programming Using RxJS` 를 읽어보길 추천합니다.
해당 문서에서는 조금 많은 예제들로 좀 더 이해를 돕기 위해 작성했습니다.

Functional Reactive Programming 에 대해서도 한번 짚고 넘어가겠습니다.

> Functional Reactive Programming 이란 어떠한 문제를 해결 하기 위한 과정이나 공식에 치중하기 보다 이미 만들어진 함수를 활용하는 방식을 일컫습니다.

따라서, 이어서 `Rx` 를 다룬다면 그 것은 Functional Reactive Programming 입니다.

제가 부족한 부분이 많아서, 문서 내 본래 내용과 상이한 내용이 있을 수 있습니다. 발견하시면 아래 코멘트를 통해 알려주시면 조금 더 성숙한 문서를 만드는데 기여해 주실 수 있습니다.
부족한 글 읽어주셔서 감사합니다.

내가 원하는 데이터는 어디에서 오는가를 한번 생각해보시면서 즐겁게 코딩하시길 바랍니다.

# Recommends

- [Getting Started with Reactive Programming Using RxJS](https://blog.hax0r.info/2018-05-10/getting-started-with-functional-reactive-programming-using-rxjs/)
- [Introduction to Promises in Javascript](https://blog.hax0r.info/2017-09-19/Introduction-to-promises-in-javascript/)

# Special thanks

데이터는 흐르는 강물이라 했다.

머릿속에 `강물` 이라는 단어가 떠나지 않아, 잠재의식속에서 연어 장인의 `거꾸로 강을 거슬러 오르는 저 힘찬 연어들처럼` 이라는 노래가 쉴새 없이 replay 되었다.

<iframe width="100%" height="315" src="https://www.youtube.com/embed/ccPGT05-jHA?rel=0&amp;controls=0&amp;showinfo=0&amp;start=20" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

# References

- [The introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)
- [What is reactive programming and why should I use it?](https://www.cocoawithlove.com/blog/reactive-programming-what-and-why.html)
- [The Only Introduction to Reactive Programming You Need](https://dzone.com/articles/only-introduction-reactive)
- [Reactive Manifesto](https://www.reactivemanifesto.org/)