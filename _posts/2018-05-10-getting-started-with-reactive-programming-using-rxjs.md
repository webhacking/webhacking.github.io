---
title: Getting Started with Reactive Programming Using RxJS
layout: post
tags: ['reactive programming', 'RxJS', 'Rx']
background_image: '/assets/images/posts/getting-started-with-reactive-programming-using-rxjs/rxjs-logo.png'
---

`Reactive Programming` 에 대해 선행된 내용이 없으시다면 [이 문서](https://blog.hax0r.info/2018-05-09/reactive-programming/)를 참고해보시는건 어때요 ?
이 문서를 이해하는데 좀 더 도움이 되실거에요. 이 문서에서는 `RxJS` 를 통한 Reactive Programming 에 대해 말하고있습니다.
큰 맥락에 대해서 얘기하며, 추후에 상세한 부분들을 잘게 나누어 연재를 하고자 합니다.
본인이 `RxJS 를 학습한 내용을 바탕으로 정리하였습니다.
이 문서의 필요성에 대해 본인도 의아할 정도로 `RxJS` 공식 문서는 아주 잘 정리되어있고 여러 매체들에서 질 좋은 학습 내용들을 찾을 수 있습니다.
문서 내 References 을 항목을 참고하시면 학습에 있어서 좀 더 도움이 되실거에요.

# What is RxJS

> RxJS is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code

Observable sequences와 표현력있는 쿼리 연산자를 사용하는 비동기적, 이벤트 기반의 프로그램을 구성하기 위한 라이브러리입니다.
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


# Subject

Wait.. I will be ready soon..

# Operators

Rx의 강력한 Operators은 복잡한 비동기 작업을 우아하고 선언적인 해결책을 제공해줄 것 입니다.
Operators 의 분류는 아래와 같습니다.

- Combination
- Conditional
- Creation
- Error Handling
- Multicasting
- Filtering
- Transformation
- Utility

# Scheduler

Wait.. I will be ready soon..

# Examples

# Recommends
- [Reactive Programming](https://blog.hax0r.info/2018-05-09/reactive-programming)

# References
- [Learn RxJS](https://www.learnrxjs.io/)
- [What and Why RxJS](https://youtu.be/T9wOu11uU6U)
- [Reactive Programming using Observables](https://youtu.be/HT7JiiqnYYc)
- [RxJS 6 - What Changed? What's New?](https://www.academind.com/learn/javascript/rxjs-6-what-changed/)
