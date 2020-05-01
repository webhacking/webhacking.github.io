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

얘기에 앞 서, 여러분은 어떤 스타일의 코드를 좋아하는가 ?

알다시피 코드 스타일은 굉장히 주관적이다. 
인덴트, 세미콜론 여부, 띄어쓰기, condition 표현식 등과 같은 문제들은 아주 오랜 시간 동안 개발자들 사이 분쟁의 대상이었다.
결론만 말하자면, 답은 없다. 누가 옳고 그르다의 문제가 아니다. 
다만 협업에 있어서는 문제가 발생한다. 혼자 작성한 코드는 자신에게는 잘 읽힐지 몰라도 제 3자는 아니다.

그래서 우리는 이러한 문제를 해결하기 위해 타협을 했다. 이를 `Code convention` 이라 부른다.
프로그래밍 언어가 권장하는 코드 스타일 또는 프로젝트에서 선택한 프레임워크가 권장하는 convention 을 따르는게 가장 이상적이다.
그게 아니라면 개발자들끼리 협의하여 code convention 을 정의해야한다.

convention 을 정의하지 않고 개발을 시작하면 서로 각기 다른 스타일의 코드를 작성하게 된다.
context 를 이해하기도 벅찬데, 이 눈에 들어오지 않는 코드를 읽어야 한다면 얼마나 생산성일 떨어질까.

블록을 어떻게 어디에 쌓을 것인지를 정해라.

![](/assets/images/posts/how-to-improve-node-product-quality/code-style.png)

컨벤션을 정했다면 `husky` 와 `prettier` 를 통해, `pre-commit` 시점에 `ESLint`에 정의한 포맷으로 리포맷 하는것을 추천한다.
이와 같이 컨벤션을 강제하면, 최종적으로 Remote repository 에는 깔끔한 코드 베이스를 유지할 수 있다.

여기서 **husky** 는 git trigging 에 따른 hook 을 설정할 수 있는 도구이며, **ESLint** 는 자바 스크립트 문법을 `검사`해주는 도구이다.
Prettier 는 코드를 자동으로 `정리`해주는 도구이다.

백문이 불여일견 위 내용들을 설정해보자.
우선 아래와 같이 위 도구들을 설치한다. 여기서 팁은 `-D` 옵션이 가르키는 것은 `dev dependency` 이다.
실질적으로 배포를 할 때, `devDependencies` 있는 항목은 제외가 되므로 공간 확보와 퍼포먼스를 위해 꼭 `dev dependency` 를 잘 구분하길 바란다.

```
npm install husky -D
npm install prettier -D
npm install lint-staged -D
npm install eslint -D
```

Dependency 들 설치가 끝났다면 우선 린트 설정을 아래와 같이 진행한다.
위 보일러 플레이트가 자바스크립트 문법을 검사하기 위한 설정 파일을 생성해준다. 기본적으로는 세미콜론 (;) 을 허용하지 않고 인덴트 4 외 엄격한 규칙들이 잡혀있다.
루트 디렉토리에 `.eslintrc.js`  가 생긴걸 확인할 수 있다.

```
./node_modules/.bin/eslint
? How would you like to configure ESLint? Use a popular style guide
? Which style guide do you want to follow? Standard
? What format do you want your config file to be in? JavaScript
```

만약 `Typescript` 환경이라면 아래 설정을 추천한다.
린트 설정이 끝났다면 자신이 사용하는 IDE 에 따라 린트 설정을 해주거나 재 시작을 통해 IDE 가 자동으로 인식할 수 있게 해야한다.
설정을 정상 확인하고자 한다면 규칙을 어긴 코드를 작성하여 빨간색 하이라이트가 등의 인식할 수 있는 표시가 뜬다면 정상적으로 적용된 것 이다.

```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
};
```

```
npm install @commitlint/cli @commitlint/config-conventional -D
```


