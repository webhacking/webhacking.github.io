---
title: Node 프로덕트 퀄리티를 높이는 협업 방법
layout: post
categories : development
background_image: '/assets/images/posts/how-to-improve-node-product-quality/tetris-same-thing.jpg'
---

# TL; DR

여러분은 협업에대해 어떻게 생각하는가 ?
모두가 알다시피 협업은 절대 만만한 일이 아니다, 어쩌면 프로젝트를 진행하면서 맞닥뜨리는 가장 큰 과제이다.
본 문서에서는 노드 환경에서 프로젝트를 진행하며 협업에 대해 고민하고 시도했던 내용들을 공유해보고자한다.
다만, 본문에서 다루는 내용들이 꼭 노드 환경에 국한되어 있지 않다.
또한, 어떠한 방법론에 대해서도 강요하지 않을 것이며 언급되는 내용과 생각들은 굉장히 주관적인 부분이라는 것을 이해해주고 읽어주길 바란다.

본인은 협업을 다수와 함께 하는 **테트리스** 라 생각한다.
혼자하기도 힘든데, 여러 블록들이 우리 의지와 다르게 쏟아진다면 분명 우리 모두 멘붕에 빠질테고 야속하게 쏟아지는 블록들은 천장을 뚫을 듯 높게 쌓일거다.
블록이라는 단위를 태스크로 본다면, 야속하게 쌓인 레거시들(블록들)은 다음 블록을 내려야하는 개발자에게 큰 고충일 될 것이다.

그렇다면 우리는 어떻게 멘붕에 빠지지 않고 성공적으로 테트리스라는 이 게임을 잘 끝낼 수 있을까 ?

![](/assets/images/posts/how-to-improve-node-product-quality/tetris-same-thing.jpg)

## 목차
- 아니 코드를 왜 그 따위로 쓰세요 ?
  - Code convention
  - Commit message convention
- Console.log 좀 찍지말아주실래요?
  - Break point 를 찍어보세요.
- 안되는데요?
  - Unit test
  - E2E test
  - Stress test
- 우리 리뷰 좀 할까요 ?
  - 코드 리뷰
  - Git flow
- 우리들은 대화가 필요해요.
- 마치며


## 아니 코드를 왜 그 따위로 쓰세요?

코드 스타일은 굉장히 주관적이다. 
인덴트, 세미콜론 여부, 띄어쓰기, condition 표현식 등등 이러한 문제들은 이미 아주 오랜 시간 동안 개발자들끼리의 분쟁 대상이었다.
하지만 답은 없다. 누가 옳다 그르다의 문제가 아니다. 결국에 어느 부분에 대해서 서로 타협을 할 줄 알아야한다.

그래서 우리는 보통 이러한 타협을 `Code convention` 이라 부른다.
Javascript 가 권장하는 코드 스타일 또는 프로젝트에서 선택한 프레임워크가 code convention 을 따르는게 가장 이상적이다.

그게 아니라면 개발자들끼리 협의하여 code convention 을 정의해야한다.
convention 을 정의하지 않고 개발을 시작하면 서로 각기 다른 스타일의 코드를 작성하게 된다.
context 를 이해하기도 벅찬데, 이 눈에 들어오지 않는 코드를 읽어야 한다면 얼마나 생산성일 떨어질까.
블록을 어떻게 어디에 쌓을 것인지를 정해라.

![](/assets/images/posts/how-to-improve-node-product-quality/code-style.png)
