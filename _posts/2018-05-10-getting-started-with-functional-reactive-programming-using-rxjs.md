---
title: Getting Started with Functional Reactive Programming Using RxJS
layout: post
categories : development
tags: ['reactive programming', 'Functional Reactive Programming', 'RxJS', 'Rx']
background_image: '/assets/images/posts/getting-started-with-functional-reactive-programming-using-rxjs/rxjs-logo.png'
---

`Reactive Programming` 에 대해 선행된 내용이 없으시다면 [이 문서](https://blog.hax0r.info/2018-05-09/reactive-programming/)를 참고해보시는건 어때요 ?
이 문서를 이해하는데 좀 더 도움이 되실거에요. 이 문서에서는 `RxJS` 를 통한 Reactive Programming 에 대해 말하고있습니다.
큰 맥락에 대해서 얘기하고 있으며, 추후 상세 내용들을 잘게 나누어 연재를 하고자 합니다.
큰 맥락이라하면, RxJS가 무엇인지 그리고 주요 특징들과 이를 활용한 간단한 예제들을 간략히 담고 있습니다.
문서 내 References 을 항목을 참고하시면 학습에 있어서 좀 더 도움이 되실거에요.
이벤트 기반의 비동기 처리 프로그래밍 방식이 낯설거나 방대한 API로 인해 learning curve 가 다른 라이브러리와 비교했을 시 좀 더 발생할 수 있습니다.

# What is RxJS

> RxJS is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code.

Observable Sequences 와 표현력있는 쿼리 연산자를 사용하는 비동기적, 이벤트 기반의 프로그램을 구성하기 위한 라이브러리입니다.
즉, Reactive Programming 을 위한 MS 제공하는 Reactive Extension 중 JavaScript 라이브러리입니다.
이로써 이벤트 스트림과 데이터를 일관성있고 쉽게 다룰 수 있습니다.

Angular 2 에서 `RxJS 5` 가 사용되서면서 대중적으로 알려졌고, 현재는 RxJava,RxSwift,Rx.Net 등등 여러 Reactive Extension 등이 관심을 받으면서 함께 부상되고있습니다.
JavaScript 개발의 복잡성이 더욱 증가할 예정으로 앞으로 더 더 많은 관심을 받을 수 있을 거라 믿어 의심치 않습니다.
자바스크립트를 사용해보신 분들은 아시겠지만 자바스크립트에서 비동기 처리 방식에는 여러 단점들이 존재합니다.
이러한 단점들을 RxJS가 해결해줄 거예요.

현재 시점 기준으로 stable 버전 6가 릴리즈 되었습니다.
이전 버전과의 변경 사항에 대해 좀 더 상세 내용을 알고자한다면 이 문서 References 항목에 `RxJS 6 - What Changed? What's New?` 를 참고해주세요.
간단히 정리하자면 아래와 같습니다.

- Import Update Statement Path
- Renamed Operators
- Update pipe method

버전마다 내용이 상이할 수 있으니, 이 부분 유의해주세요.

# Subject

> The Subject class inherits both Observable and Observer, in the sense that it is both an observer and an observable.

Subject는 Observable과 Observer 두개의 역할을 수행할 수 있는 존재(Subject class 는 Observable과 Observer를 모두 상속 받음)입니다. 프록시 정도로 생각해두죠.
EventEmitter와 동일한 Multicast 이므로 `Observers`에 값 또는 이벤트를 멀티 캐스팅 할 수 있습니다.
단순 Observable은 Unicast 방식 이기에 Observer 하나만 subscribe 할 수 있습니다.
이런식으로 Subject는 Subscriber Group 과 source에 대한 proxy 를 수행할 수 있습니다.
기본적으로 Subject는 thread간에 Synchronization를 수행하지 않습니다.
따라서 이 측면에 있어 overhead를 줄이고 성능을 향상시킬 수있다는 장점이 있습니다.

아래와 같이 Subject의 종류에는 아래 3가지가 있습니다.
각각의 Subject는 특정 상황에 맞도록 설계되어있습니다.

- [AsyncSubject](http://reactivex.io/rxjs/class/es6/AsyncSubject.js~AsyncSubject.html)
- [BehaviorSubject](http://reactivex.io/rxjs/class/es6/BehaviorSubject.js~BehaviorSubject.html)
- [ReplaySubject](http://reactivex.io/rxjs/class/es6/ReplaySubject.js~ReplaySubject.html)

## AsyncSubject

![s-async-subject](/assets/images/posts/getting-started-with-functional-reactive-programming-using-rxjs/s-async-subject.png)


Complete 된 후, Source Observable 마지막 데이터를 Emit 합니다.
Source Observable 가 아무런 값을 응답 하지 않을 경우, `AsyncSubject` 역시 아무값도 응답하지 않습니다.


![s-async-subject-e](/assets/images/posts/getting-started-with-functional-reactive-programming-using-rxjs/s-async-subject-e.png)


아의 예제 코드는 "Next: 3" 이라는 문자열을 콘솔에 출력 할 것 입니다.

```javascript
const { AsyncSubject, Observable, Subject, from, fromEvent, of, range } = rxjs;
const { map, filter, switchMap } = rxjs.operators;

var subject = new AsyncSubject;

var i = 0;
var handle = setInterval(function () {
    subject.next(i)
    if (++i > 3) {
        subject.complete();
        clearInterval(handle);
    }
}, 500);

var subscription = subject.subscribe(
    function (x) {
        console.log('Next: ' + x.toString());
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        console.log('Completed');
    })
```

## BehaviorSubject

![s-async-subject-e](/assets/images/posts/getting-started-with-functional-reactive-programming-using-rxjs/s-behavior-subject.png)

BehaviorSubject는 반드시 값을 초기화 해야합니다.
Observer에게 Subscribe 하기 전 마지막 이벤트 혹은 초기 값부터 emit 하게합니다.
아래와 같이 만약 Source Observable `Complete` 또는 `Error` 가 발생하면 응답하지 않고 소스 Observable 에서 발생한 오류를 그대로 전달합니다.

![s-async-subject-e](/assets/images/posts/getting-started-with-functional-reactive-programming-using-rxjs/s-behavior-subject-e.png)

아래는 `BehaviorSubject` 의 예제 코드입니다.
설명에 이해를 도와줄 것 입니다. 아래 코드는 "Next: 42", "Next: 56", "Completed" 세 개의 문자열을 출력합니다.

```javascript
const { BehaviorSubject, Observable, Subject, from, fromEvent, of, range } = rxjs;
const { map, filter, switchMap } = rxjs.operators;

/* Initialize with initial value of 42 */
var subject = new BehaviorSubject(42);

var subscription = subject.subscribe(
    function (x) {
        console.log('Next: ' + x.toString());
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        console.log('Completed');
    });

// => Next: 42

subject.next(56);
// => Next: 56

subject.complete();
// => Completed
```

## ReplaySubject

![s-replay-subject](/assets/images/posts/getting-started-with-functional-reactive-programming-using-rxjs/s-replay-subject.png)

ReplaySubject는 Observer가 구독을 시작한 시점과 관계 Observable들이 Emit한 모든 항목들을 모든 Observer에게 Emit 합니다.
또한 Observable의 complete or error 영향을 받지 않습니다.
아래 예제 코드를 보면 쉽게 이해할 수 있습니다. 아래 코드는 "Next: b", "Next: c", "Next: d" 세개의 문자열을 콘솔에 출력합니다.


```javascript
var subject = new ReplaySubject(1 /* buffer size */);
```


buffer size 변경을 위해, ReplaySubject 인자를 1로 할 경우 "Next: c", "Next: d" 두개의 문자열을 콘솔에 출력합니다.


```javascript
const { ReplaySubject, Observable, Subject, from, fromEvent, of, range } = rxjs;
const { map, filter, switchMap } = rxjs.operators;

var subject = new ReplaySubject(2 /* buffer size */);

subject.next('a');
subject.next('b');
subject.next('c');

var subscription = subject.subscribe(
    function (x) {
        console.log('Next: ' + x.toString());
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        console.log('Completed');
    });

// => Next: b
// => Next: c

subject.next('d');
// => Next: d
```

# Operators

Rx의 강력한 Operators은 복잡한 비동기 작업을 우아하고 선언적인 해결책을 제공해줄 것 입니다.
Operator는 Observable을 생성, 분리, 합치는 역할을 하기도 합니다.

Operators 의 분류는 아래와 같습니다.
모든 Operators 들은 다 다룰 수 없겠지만, 자주 사용하는 걸 기준으로 이 문서 Examples 항목에서 다뤄보겠습니다.

`Learn RxJS` 에서 연사자에 따른 풍부한 예제들을 담고 있으니, 훑어보는 것 도 도움이 많이 될 것 같습니다.

- [Combination](https://www.learnrxjs.io/operators/combination/)
    - 조합 연산자는 여러 Observable을 결합 할 수 있게 도와줍니다.
- [Conditional](https://www.learnrxjs.io/operators/conditional/)
    - 조건 연산자는 조건에 따른 정제를 도와줍니다.
- [Creation](https://www.learnrxjs.io/operators/creation/)
    - 생성 연산자는 새로운 Observable을 만드는걸 도와줍니다.
- [Error Handling](https://www.learnrxjs.io/operators/error_handling/)
    - 오류 처리 연산자는 오류 대응을 도와줍니다.
- [Multicasting](https://www.learnrxjs.io/operators/multicasting/)
    - Multicasting 연산자는 Observable multicast 를 도와줍니다.
- [Filtering](https://www.learnrxjs.io/operators/filtering/)
    - 필터 연산자는 Observable의 필터 도와줍니다.
- [Transformation](https://www.learnrxjs.io/operators/transformation/)
    - 변형 연산자는 Observable의 값의 형태 변형을 도와줍니다.
- [Utility](https://www.learnrxjs.io/operators/utility/)
    - 유틸리티 연산자 Obserable과 함께 동작하는 유용한 도우미 연산자 집합입니다.

# Examples

일전 [Reactive Programming](https://blog.hax0r.info/2018-05-09/reactive-programming) 문서에서 예를 든, 클릭을 주제 삼아볼까요 ?
당장으로써는 예를 들만한 사항들이 떠오르지 않아, 추후에 생각이 난다면 그와 관련된 예제들을 추가 하도록 하겠습니다.
이 예제가 좋은 예제일지 잘 모르겠습니다.
예제에 사용된 Operators 들은 예제가 끝나는 하단에 기재해 놓았습니다.

hit-me 라는 아이디 속성을 가진 엘레멘트가 있다고 가정해봅시다.
아래와 같은 코드에서 해당 버튼을 연속적으로 클릭 시, 누적된 클릭 수가 콘솔에 출력 됩니다.

```javascript

const { fromEvent } = rxjs;

const btn = document.getElementById('hit-me');
var source$ = fromEvent(btn, 'click')

source$.subscribe((val) => {
  const currentClicked = ( val.currentTarget.getAttribute('number-of-clicked') ) ? val.currentTarget.getAttribute('number-of-clicked') : 1;
  val.currentTarget.setAttribute('number-of-clicked', parseInt(currentClicked) + 1);
  console.log(parseInt(currentClicked))
})

```

그렇다면 조금 더 나아가 n초 이내에 클릭된 수를 알고자 한다면 어떻게 구현해야할까요 ?
3초라 가정해보고 아래 예제 코드를 확인해봅시다. 이 코드는 3초 이내 클릭된 클릭 수 를 콘솔로그에 출력 할 것입니다.

```javascript

const { fromEvent, interval } = rxjs;
const { map, buffer } = rxjs.operators;

const btn = document.getElementById('hit-me');
var stream$ = fromEvent(btn, 'click');

stream$
  .pipe(
    buffer(interval(3000)),
    map(val => val.length)
  )
  .subscribe((val) => {
    console.log(val)
  })

```

이번에는 클릭 형태를 더블클릭으로 한정 지어 볼까요 ?
그렇다면 코드는 아래와 같습니다.


```javascript
const { fromEvent, interval } = rxjs;
const { map, buffer, filter } = rxjs.operators;

const btn = document.getElementById('hit-me');
var stream$ = fromEvent(btn, 'click');

stream$
  .pipe(
    buffer(interval(3000)),
    map(val => val.length),
    filter(x => x > 1)
  )
  .subscribe((val) => {
    console.log(val)
  })
```

또 어떤 예를 들 수 있을까요 ?
만약 콘솔창에 타이핑 되는 스트림을 정제해보는 건 어떨까요 ?
아래는 임의로 정의한 타이핑 스트림입니다.

```
acbqibekboabkdnopenmenuckofqamdqlvopenmenuasdqweascqwekasdcnaskdeqweqwcasdopenmenu
```

여기서 `openmenu` 라는 키워드와 매치되는 스트림을 count 해 봅시다.
이와 관련된 코드는 아래와 같습니다. 해당 코드는 콘솔에 3을 출력할 것 입니다.

```javascript
const { from } = rxjs;
const { bufferCount, filter, count } = rxjs.operators;

let source = 'acbqibekboabkdnopenmenuckofqamdqlvopenmenuasdqweascqwekasdcnaskdeqweqwcasdopenmenu';
let sequence$ = from(source);
let matchSequence = 'openmenu';

sequence$
  .pipe(
    bufferCount(matchSequence.length, 1),
    filter((x) => {
      return ( x.join('') === matchSequence )
    }),
    count(),
  )
  .subscribe((val) => {
    console.log(val)
  })
```

또 하나의 추가적인 예를 들어봅시다.
이번에는 `클릭` 좌표 스트림들을 정의된 distance 간격에 따라 콘솔로그에 출력해보는 코드를 작성해봅시다.

임의에 좌표 스트림은 아래와 같습니다.

```
{x: 1, y: 1},
{x: 1, y: 2},
{x: 3, y: 5},
{x: 6, y: 9},
{x: 2, y: 1},
{x: 3, y: 5},
{x: 8, y: 5},
{x: 2, y: 3},
{x: 1, y: 2},
{x: 9, y: 7}
```

이 때, 유용하게 사용할 수 있는 Operator 가 `distinctUntilChanged` 입니다.
아래 코드와 같이 피타고라스의 정리를 통해 좌표값의 거리를 정의하고 비교하면 테스트 목적에 따른 코드를 작성할 수 있습니다.

```javascript
const { from } = rxjs;
const { distinctUntilChanged } = rxjs.operators;

let source = [
  {x: 1, y: 1},
  {x: 1, y: 2},
  {x: 3, y: 5},
  {x: 6, y: 9},
  {x: 2, y: 1},
  {x: 3, y: 5},
  {x: 8, y: 5},
  {x: 2, y: 3},
  {x: 1, y: 2},
  {x: 9, y: 7},
];
let sequence$ = from(source);
let distance = 2.5;

sequence$
  .pipe(
        distinctUntilChanged((prev, next) => {
          return Math.sqrt((prev.x - next.x)**2 + (prev.y - next.y)**2) < distance
        })
  )
  .subscribe((val) => {
    console.log(val)
  })
```

RxJS 에는 매우 유용하고 강력한 Operators들이 구현되어있습니다.
문서에서 다 담을 수 없어 아쉽지만, 이 후 문서들에서 조금씩 쪼개어 연재 할 계획입니다.


## Operators Used

- [buffer](https://www.learnrxjs.io/operators/transformation/buffer.html)
- [bufferCount](https://www.learnrxjs.io/operators/transformation/buffercount.html)
- [map](https://www.learnrxjs.io/operators/transformation/map.html)
- [filter](https://www.learnrxjs.io/operators/filtering/filter.html)
- [count](http://reactivex.io/documentation/operators/count.html)
- [distinctUntilChanged](https://www.learnrxjs.io/operators/filtering/distinctuntilchanged.html)

# Questions

- 왜 변수명의 postfix로 dollar symbol 을 사용할까요 ?

> Syntactically, the dollar ($) character has no special meaning in [JavaScript identifiers](https://www.ecma-international.org/ecma-262/7.0/index.html#sec-names-and-keywords)
> sometimes used by convention to indicate that a variable holds an Observable or that a function will return an Observable

# Advice

RxJS를 테스트 할 때, [RxVisotion](https://jaredforsyth.com/rxvision/examples/playground/) 을 이용해보세요.
좋은 Playground 를 제공합니다. Visual하게 Observable 스트림 또한 보여줍니다.


![s-replay-subject](/assets/images/posts/getting-started-with-functional-reactive-programming-using-rxjs/screen-shot-2018-05-10-RxVision.png)


# Recommends
- [Reactive Programming](https://blog.hax0r.info/2018-05-09/reactive-programming)

# References
- [Learn RxJS](https://www.learnrxjs.io/)
- [What and Why RxJS](https://youtu.be/T9wOu11uU6U)
- [Reactive Programming using Observables](https://youtu.be/HT7JiiqnYYc)
- [RxJS 6 - What Changed? What's New?](https://www.academind.com/learn/javascript/rxjs-6-what-changed/)
- [What does $ sign at the end of function name indicate?](https://stackoverflow.com/questions/43083577/what-does-sign-at-the-end-of-function-name-indicate/43083604)
- [Rx Book from gitbook](https://xgrommx.github.io/rx-book)