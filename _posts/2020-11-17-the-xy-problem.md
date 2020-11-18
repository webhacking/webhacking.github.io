---
title: The XY Problem
layout: post
categories : development
background_image: '/assets/images/posts/2020-11-17-the-xy-problem/images.jpeg'
---

[The XY Problem](https://xyproblem.info/) 이란 내가 `X`라는 문제를 풀려고 하고 있는 상황에서, `Y`가 해결책이 될 수 있을 것이라고 생각하기 때문에 실제 궁극적인 목표인 X에 대해서 묻는 대신 Y에 대한 질문을 하므로 발생하는 문제를 뜻한다.
이러한 문제는 주변에서 심심치않게 살펴볼 수 있는데, 이는 질문을 하는 당사자와 받는이로 하여금 많은 시간과 에너지 소모를 하게 만든다.
인류학자 레비 스트로스는 "과학자는 정답을 말하는 사람이 아니라, 올바른 질문을 하는 사람" 이라 주장하며 올바른 질문만이 올바른 정보를 얻을 수 있다 생각한다.
개인적으로 이러한 주장에 격하게 동감하며, 질문을 좀 더 잘하기 위해서는 ***XY Problem*** 상황 만큼은 피해야한다 생각한다.

그 상황이란 아래와 같이 연출된다.

- 유저는 X 를 하길 원한다. (User wants to do X)
- 유저는 X 를 어떻게 하는지는 모르지만, 만약 Y 를 해낼 수 있다면 X 의 해결책을 찾아낼 수 있을거라 생각한다. (User doesn't know how to do X, but thinks they can fumble their way to a solution if they can just manage to do Y)
- 유저는 Y 도 어떻게 해야할지 모른다. (User doesn't know how to do Y either)
- 유저는 Y 에 관해서 도움을 요청한다. (User asks for help with Y.)
- 다른 이들을 Y 에 관래 도움을 주려하지만, Y 라는 문제를 풀려는 이류를 이해하지 못해 혼란에 빠진다. (Others try to help user with Y, but are confused because Y seems like a strange problem to want to solve)
- 많은 상호작용과 시간 낭비 이후 마침내 유저는 X 에 관한 도움 필요를 인지하고, Y 는 사실 X 라는 문제를 해결하기에 적합한 해결책이 아니었다는 것이 명백해진다. (After much interaction and wasted time, it finally becomes clear that the user really wants help with X, and that Y wasn't even a suitable solution for X.)

위 연출된 상황을 보면 사람들은 `Y` 에 집작하게되고 최종적으로 문제를 돕고자하는 이들을 결국 좌절의 늪으로 빠트린다.

## An example

이해를 돕기 위해 한 가지 더 연출된 상황을 살펴보자.
질문자는 실질적으로 문자열에서 마지막 3개를 구하는게 아닌 파일 확장자를 구하고 싶어하는 상황(X)인데
문자열 3개 구하는 방법(Y) 을 물어보며 전형적인 XY Problem 에 직관한걸 알 수 있다.

- 질문자: How can I echo the last three characters in a filename?
- 답변자: If they're in a variable: echo ${foo: -3}
- 답변자: Why 3 characters? What do you REALLY want?
- 답변자: Do you want the extension?
- 질문자: Yes.
- 답변자: There's no guarantee that every filename will have a three-letter extension,
- 답변자: so blindly grabbing three characters does not solve the problem.
- 답변자: echo ${foo##*.}


## How to avoid it

1. 내가 궁긍적으로 질문을 통해 해결하고자 하는 바가 무엇인지 밝힌다.
2. 질문을 할 때에는 내가 이 질문을 하게된 주변 상황을 설명해야한다.
3. 질문에 최대한 많은 정보를 중요한 순서대로 나열한다.


