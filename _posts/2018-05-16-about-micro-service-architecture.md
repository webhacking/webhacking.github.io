---
title: Micro Service Architecture
layout: post
categories : development
background_image: /assets/images/posts/micro-service-architecture/mono-micro.png
---

근래 대용량 트래픽이나 동시성 이슈등의 관심이 생기면서 `Micro Service Architecture`(이하 MSA) 에 대해 학습할 기회가 생겼다.
일전에 넷플릭스, 아마존 국내 기술 기업들이 앞다퉈 MSA 를 적용하는 모습을 보며 간략하게 내용을 살펴본적 있지만
당시 실제 필요성에 대해 회의적이여서 그렇게 깊게는 들여다 보지 못한 것 같다.
본인이 머물렀던 곳은 대부분 스타트업이었고, 적은 인원으로 task 를 처리해야했기에 관리 포인트를 늘리는 수고는 지양했다.
하지만 지금와서 생각해보면 이 또한 잘 못된 생각이었다 느끼고 있다.
환경만 잘 구성한다면 적은 인원으로 충분히 소화해낼 수 있다 생각한다.
모든 개념이 그렇 듯, `Micro Service Architecture` 또한 갑자기 생겨난 개념은 아니다.
아주 오래전부터 이를 행에 왔던 무수한 기업이 있고 지금에 와서야 화두가 되고있다.
이와 같은 형태는 기술들의 일반화라는 순리에 맞추어 다가왔다 생각한다.

# What is micro service architecture

`Micro Service Architecture` 는 단어가 모든 뜻을 나타내고 있다.
통상 전통적인 에플리케이션 개발 방식의 `Monolithic Architecture` 와 반대되며, 큰 모형(어플리케이션)을 잘게 쪼개어 추상화한다 생각하면 이해하기 쉽다.

![mono-msa](/assets/images/posts/micro-service-architecture/msa-ma.png)

어떤 형태로 추상화할까 ? 커머스를 예를 들어보자.
커머스를 모형이라 칭 하고, 이 모형을 구성하는 컴포넌트(서비스)들을 살펴보자.
매우 많은 컴포넌트의 구성으로 이루어져있다는걸 잠깐 생각해도 알 수 있다.
상품을 구성하는 컴포넌트, 결제, 인증, 주소 정제, 검색 등등. 이와 같은 형태로 컴포넌트를 구성할 수 있다.
`Monolithic Architecture` 의 경우 이와 같은 컴포넌트를 모두 한 모형의 담고있다.
이 컴포넌트들을 하나의 독립된 모형으로 구분하는 것이 MSA 라 말 할 수 있다.

# Why should I use it?

위 예를 든 커머스 모형에서, 컴포넌트들이 모두 한곳에 담겨져 있다면 어떠한 애로 사항이 있을까 ?
작은 규모의 애플리케이션에서는 납득이 안가는 내용일 수 있다.
많은 개발자, 복잡성이 높은 시스템을 다룬다면 납득이 많이 갈 것이다.
하지만 앞서 말했듯 소규모의 조직에서도 MSA 를 지향한다하여 `Over Engineering` 이 되는 것은 아니다.
오히려 유연함을 보장하고 생산성을 더 올려줄 것이라 생각된다.

주소 정제 하나의 기능에 대해 수정 시, 모든 시스템에 대해 QA를 진행 해야하고 시스템내 서로 의존하는 모듈들에 대해 사이드 이펙트가 발생할 수 있으며 이는 전체 코드에 대해 디버깅하는데 시간 소요에 부담을 준다.
또한 큰 애플리케이션이라고 가정했을 때, 방대한 코드로 빌드 시간 또한 오래 걸린다.
이는 서버 구동시간에도 영향을 미치고, 소수의 인원의 실수로 전체 시스템의 배포 실패를 유발하기에 협업에도 지장을 준다.
모두 call-by-reference 형태를 취하기 때문에 굉장히 tight 한 관계이고 전체 시스템을 이해하지 못한 상태로 코드를 작성한다면 퍼포먼스 이슈를 초래한다.
시스템의 규모가 커지면 커질수록 시스템을 이해하기란 더 더욱 이해하기 힘들어진다.
이는 재활용 가능한 컴포넌트를 놓치게 되고 결국엔 이로써 중복된 코드들이 생기며 기술 부채를 양산하는 구조가 된다.
모든 코드가 다양한 형태로 관계를 취하고 있으므로 간단한 수정작업에도 큰 사이드 이펙트를 대비해야하는 구조가 되기에 생산성에 있어서는 절대적으로 지양해야할 부분이다.
엎친데 덥친격으로 초기에 잘못 선택한 프로그래밍 언어, 프레임워크등에 대하여 마이그레이션을 진행한다고 했을 때, 거의 미션 임파서블급으로 어렵다.

앞서 말한 작은 규모의 조직에서 MSA 를 지향할 경우, 위와 같은 애로 사항으로 추후 발생할 부분을 사전에 방지할 수 있습니다.
이 내용만으로는 MSA를 마다할 이유가 없다. 하지만 MSA 도 단점이 존재하는데, 각 서비스 별 통신에 대한 추가적 비용이 발생한다는 것 이다.

# References

- [Microservices Architecture: What, When, and How](https://dzone.com/articles/microservices-architecture-what-when-how/)