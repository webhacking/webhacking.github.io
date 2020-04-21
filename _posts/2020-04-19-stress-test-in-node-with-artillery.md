---
title: Artillery 를 통한 NODE 환경에서 스트레스 테스트
layout: post
categories : development
background_image: '/assets/images/posts/2020-04-19-stress-test-in-node-with-artillery/artillery.jpg'
---

우리는 작성한 API 에 병목 현상과 얼마 만큼의 트래픽을 수용할 수 있는지에 대한 여부를 확인하고자 스트레스 테스트를 작성한다.
통상 자바환경에 익숙하다면 스트레스 테스트를 생각하면 ngrinder (또는 grinder) 를 먼저 생각하게 되는데, 본인은 Node 환경에서 아주 가볍게 스트레스 테스트를 구성하고 싶었고 그 요구 사항에 맞는 툴을 리서치하다 third party 로 제공하는 [Artillery](https://www.npmjs.com/package/artillery) 를 알게되었다.
본 문서에서는 Artillery 을 통해 스트레스 테스트를 진행하며 느낀 점과 그 방법에 대해 얘기해보고자한다.

문서 작성 시점 기준으로 Artillery 의 Github 스타는 3.6k 정도 되고, 아직 개선할 사항들이 많아 보이긴 하지만 사용에 있어 크게 불편한점은 찾지 못했다. 무료 버전과 유료 버전으로 나뉘는데 무료 버전을 사용해도 대세에는 크게 지장 없다.

- HTTP, Websocket 프로토콜을 지원한다
- Javascript 를 통해 필요에 따른 로직을 구성할 수 있다.
- 2번에 해당 하는 내용에 대해 아래와 같은 Trigging point 를 제공한다.
  - beforeScenario: called before a virtual user executes a scenario
  - afterScenario: called after a virtual user executes a scenario
  - beforeRequest: called before a request is sent; request parameters (URL, cookies, headers, body etc) can be customized here
  - afterResponse: called after a response has been received; the response can be inspected and custom variables can be set here
  - function: which can be inserted as a step at any point in a scenario
 - 외부 모니터링 시스템 Publish 가능하여 실시간으로 매트릭스 구성가능하다. (Datadog, StatsD, InfluxDB)
 - 시나리오 케이스를 추가할 수 있다.
 - 풍부한 CLI 커맨드를 제공한다.
 - 리포트 페이지를 제공한다.

2번에 해당하는 내용 때문에 Node 환경에서는 Artillery 를 사용하는게 이점이 더 크다.


# 설치

공식 문서에서는 `-g` 옵션을 통해 전역적으로 설치하기를 안내하지만, 개인적으로 전역 설치를 좋아하지 않는 본인이라 `npm run artillery -D` 해당 명령어를 통해 프로젝트 내 dev dependency 로 설치했다. (꼭 dev dependency 로 설치해주세요, 프로덕션 레벨에서 쓰이지 않습니다.)

```
Youngjunui-iMac:artillery-test youngjun$ npm i artillery -D
npm WARN deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142

> ajv@6.12.1 postinstall /Users/youngjun/artillery-test/node_modules/ajv
> opencollective-postinstall || true

Thank you for using ajv!
If you rely on this package, please consider supporting our open collective:
> https://opencollective.com/ajv/donate


> jsonpath@1.0.2 postinstall /Users/youngjun/artillery-test/node_modules/jsonpath
> node lib/aesprim.js > generated/aesprim-browser.js

npm WARN saveError ENOENT: no such file or directory, open '/Users/youngjun/artillery-test/package.json'
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN enoent ENOENT: no such file or directory, open '/Users/youngjun/artillery-test/package.json'
npm WARN artillery-test No description
npm WARN artillery-test No repository field.
npm WARN artillery-test No README data
npm WARN artillery-test No license field.

+ artillery@1.6.0
added 268 packages from 267 contributors and audited 433 packages in 12.806s

15 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

설치를 끝내고, CLI 를 통해 사용 설명을 실행해보니 아래와 같이 제공하는 여러 커맨드들이 나왔다.

- run [options] <script>    Run a test script. Example: `artillery run benchmark.json`
- quick [options] <target>  Run a quick test without writing a test script
- report [options] <file>   Create a report from a JSON file created by "artillery run" 
- convert <file>            Convert JSON to YAML and vice versa
- dino [options]            Show dinosaur of the day

이 커맨드를 보는 여러분도 `dino` 라는 커맨드에 눈길이 가실 것 같다.
프로젝트 개발자 이스터에그 정도로 보이고, 실행해보니 공룡이 나왔다. (힁..)

```
Youngjunui-iMac:artillery-test youngjun$ ./node_modules/.bin/artillery dino
 ------------
< Artillery! >
 ------------
          \
           \
                         .@
                        @.+
                       @,
                      @'
                     @'
                    @;
                  `@;
                 @+;
              .@#;'
         #@###@;'.
       :#@@@@@;.
      @@@+;'@@:
    `@@@';;;@@
   @;:@@;;;;+#
`@;`  ,@@,, @@`
      @`@   @`+
      @ ,   @ @
      @ @   @ @
```
  
궁금한건 못 참아서, 본 프로젝트랑 공룡이랑 뭔 상관이 있는지 좀 찾아보니 [artillery-dino](https://github.com/hassy/artillery-dino) 라는 프로젝트가 존재하고 artillery 를 베이스로 하며 사용하면 AWS Lambda에서 스트레스 테스트를 실행할 수 있다고 한다. (다만, 업데이트가 무려 4년전의 실험체라는 것..)
  
![gy dynogram](/assets/images/posts/2020-04-19-stress-test-in-node-with-artillery/dinogram.png)
  
# 간단한 테스트하기
  
# 시나리오 작성하여 테스트하기

![](/assets/images/posts/2020-04-19-stress-test-in-node-with-artillery/1_-zSHjtMy0RS5HZw5Pt1Nxw.png)

# 결과 확인하기