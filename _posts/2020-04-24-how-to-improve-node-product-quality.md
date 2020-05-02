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
  - CHANGELOG 자동화
  - Console 로그 대신 Break point
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

### Code convention

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

서비스/프로젝트 이름, 파일/폴더 구조등은 린트로도 해결하기 힘든데 개인적으로는 _(Underscore) 보다는 -(Dash) 를 [지향](https://stackoverflow.com/questions/119312/urls-dash-vs-underscore)하길 바란다. 린트가 모든 부분을 해결해줄 수 없으니, 꼭 프로젝트를 들어가기전 프로젝트의 컨벤션을 정하길 권장한다. 

이후, Husky 를 통해 pre-commit 전에 prettier 를 통해 아래와 같이 포맷을 재정의한다.

> husky 가 기존 Git hook 을 덮어쓰기 때문에 husky 설정 이전에 repogitory 를 초기화 해야한다.

```
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "packages/**/*.{ts,json}": [
    "prettier --ignore-path ./.prettierignore --write"
  ]
},
```

### Commit message convention

Commit message 또한 간과하기 쉬운 요소인데, 뒤죽박죽 의미를 나타낼 수 없는 메세지들은 이후 릴리즈 노트 또는 오류/기능 트래킹에 있어 방해 요소가 된다. 
이해를 돕기위해 아래 엉터리 커밋 메세지들을 담은 내역을 가져왔다. 어떤가 이 메세지들은 오히려 흐름을 따라가는데 방해요소만 될 뿐이다.

![](/assets/images/posts/how-to-improve-node-product-quality/wrong-commit-eg.png)

우리는 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 을 통해 이를 강제할 수 있다. Conventional Commits 을 통해 git 으로 commit 시에 일괄된 양식을 유지하고 그 양식을 바탕으로 버전 관리나 Change Log 를 만들어 낼 수 있다.
아래와 같이 설치할 수 있다.

```
npm install @commitlint/cli @commitlint/config-conventional -D
```

설치가 끝났다면 아래와 같은 형태로 commit 을 해야한다.

```
<type>[optional scope]: <description>

# Examples

fix: allow login without uid
feat: add chat function
BREAKING CHANGE: 'extend' > 'inherit', must fix all the codes

# Examples with optional scope

fix(chat): broken emoji
feat(auth): add Google Play Auth
```

또는 좀 더 상세하게 관리하고 싶다면 `.commitlintrc.json` 을 통해 설정하면 된다.
아래는 본인의 설정 값이다. Angular universal 을 지향하는이에게 추천한다.

```json
{
    "extends": ["@commitlint/config-angular"],
    "rules": {
      "subject-case": [
        2,
        "always",
        ["sentence-case", "start-case", "pascal-case", "upper-case", "lower-case"]
      ],
      "type-enum": [
        2,
        "always",
        [
          "build",
          "chore",
          "ci",
          "docs",
          "feat",
          "fix",
          "perf",
          "refactor",
          "revert",
          "style",
          "test",
          "sample"
        ]
      ]
    }
  }
```

설정이 끝났다면 Husky 를 통해 아래와 같이 commit-msg 시점에 린트 검사를 진행한다.

```json
"husky": {
  "hooks": {
    "commit-msg": "commitlint -c .commitlintrc.json -E HUSKY_GIT_PARAMS"
  }
},
"lint-staged": {
  "packages/**/*.{ts,json}": [
    "prettier --ignore-path ./.prettierignore --write"
  ]
},
```

만약 아래와 같은 잘못된 커밋 메시지로 커밋을 하면 오류를 출력해준다.

```
➜  hax0r git:(master) ✗ git commit -m "Update something"
husky > commit-msg (node v10.16.2)
⧗   input: Update lint
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky > commit-msg hook failed
```

규칙에 맞추어 커밋 메세지를 정의했다면 무난하게 넘어간다.

```
husky > commit-msg (node v10.16.2)
[master 888baed] chore: update lint settings
 Date: Sat May 2 10:05:40 2020 +0900
 2 files changed, 4 insertions(+), 3 deletions(-)
```

![](/assets/images/posts/how-to-improve-node-product-quality/SemVer.png)

Conventional Commits은 SemVer 를 따르기 때문에 MAGER.MINOR.PATCH 에 해당하는 type 을 사용하면 추후에 릴리즈 할때 자동으로 해당 하는 버전이 올라간다.

