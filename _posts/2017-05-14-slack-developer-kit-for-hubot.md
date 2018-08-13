---
layout: post
title: "슬랙에서 휴봇 사용하기 (Slack Developer Kit for Hubot)"
description: ""
categories : development
sub_categories : ""
date: 2017-05-14
tags: ['Getting Started With Hubot', 'Hubot', 'Slack Developer Kit for Hubot']
comments: true
share: true
---

## What is hubot

[Hubot](https://hubot.github.com/) 은 본래 깃헙 사내용으로 제작된 챗봇이지만, 많은 발전을 거듭하며 현재 오픈소스로 공개되어 있다.
Node 기반이며 슬랙에 친화되어 있으며, 왠만한 기능들을 모두 갖춘 챗봇 프레임워크 역할로써 빠른 개발의 도움을 준다.

본인의 경우 전 회사와 현재 회사에서 모두 `Hubot` 을 채택하여 사내용 챗봇을 개발했다.
이를테면 매일 오전 오늘 전국의 날씨를 알려준다거나, 태스크 통계를 내준다거나, elasticache redis 관련 명령어를 질의한다거나등 필요에 따른 기능들을 추가하여 재밌게 가지고 놀았다.
이러한 짧은 경험에서 내가 느낀 휴봇의 가장 큰 장점은 간단한 스크립트(CoffeeScript, JavaScript) 작성을 통해 강력한 기능을 추가할 수 있다는 점 이다.

스크립트는 coffeescript 또는 javascript로 작성할 수 있으며, ***특정 단어, 문장, 행동등의 따라 이후의 프로세스를 정의*** 할 수 있다.
스크립트를 직접 작성할 수 도 있겠지만, 휴봇에서는 여러 [스크립트들](https://github.com/hubot-scripts)을 제공하고 있어 구현하고자하는 명령어에 따라 손쉽게 스크립트를 추가하여 구현할 수 있다.
아래는 스크립트에 대한 설명을 돕고자 몇가지 예를 들 수 있는 작은 항목들을 기재해 두었다.
더 자사한 내용은 [공식 문서](https://hubot.github.com/docs/scripting/)에서 확인 가능하다.

개념이 모호할 수 있으니, 특정 행동(룸 입장, 퇴장)에 대한 아래와 같은 코드 예를 살펴보자.

```
enterReplies = ['Hi', 'Target Acquired', 'Firing', 'Hello friend.', 'Gotcha', 'I see you']
leaveReplies = ['Are you still there?', 'Target lost', 'Searching']

module.exports = (robot) ->
  robot.enter (res) ->
    res.send res.random enterReplies
  robot.leave (res) ->
    res.send res.random leaveReplies
```

이와 같이 정말 코드가 간단하다.
비개발자분들도 간단하게 학습하여 작업할 수 있다.
이 문서에서는 스크립트 작성에 대한 내용을 다루지는 않지만, 이러한 스크립트를 작성 후 "Local" 또는 "Heroku" 를 통해 배포하여 슬랙과 연동하는 내용을 담고자 한다.
node, npm 이 기본적으로 설치되어 있고, 슬랙에 휴봇 앱 토큰을 발급 받았다는 가정하에 문서를 작성한다.

## Deploying to local

Hubot 은 [yeoman](http://yeoman.io/) 위에서 돌아가는 [hubot generator](https://github.com/hubotio/generator-hubot) 를 제공하고 있다.
따라서 매우 쉽게 프로젝트를 구성할 수 있다.
아래 명령어를 통해 제너레이터를 설치 합니다.

```
npm install -g yo generator-hubot
yo hubot
```

hubot은 external-scripts.json에서 사용할 외부 스크립트들을 선어하는데, 기본적인 내용에서 불필요한건 필요에 따라 제거하면 된다.
설치 완료 후, 아래와 같이 파일을 실행하면 hubot 을 만날 수 있다.

```
bin/hubot
```

슬랙과 연동하고자 한다면, 슬랙에서 휴봇으로 발급 받은 토큰을 아래와 같이 기재하여 질의하면 된다.

```
HUBOT_SLACK_TOKEN=xoxb-~~ bin/hubot --adapter slack
```

데몬으로 실행하고자 한다면, 아래와 같이 질의하면 된다.

```
HUBOT_SLACK_TOKEN=xoxb-~~ nohup bin/hubot --adapter slack &
```

## Deploying to heroku

가장 먼저, heroku 계정을 만든다.
이후, 생성된 계정 정보를 아래와 같이 기입 후 실행한다.

```
% heroku login
Enter your Heroku credentials.
Email: youremail@example.com
Password:
Could not find an existing public key.
Would you like to generate one? [Yn]
Generating new SSH public key.
Uploading ssh public key /Users/you/.ssh/id_rsa.pub

```

그 다음, heroku 애플리케이션을 생성한다.
dyno 다이렉트 링크를 응답할 것 이다.

```
heroku create
```

이후, 환경 변수를 설정합니다.

```
heroku config:set HUBOT_CAMPFIRE_ACCOUNT=yourcampfireaccount
heroku config:set HUBOT_CAMPFIRE_TOKEN=yourcampfiretoken
heroku config:set HUBOT_CAMPFIRE_ROOMS=comma,separated,list,of,rooms,to,joi
heroku config:set HEROKU_URL=dyno direct link
```

마지막으로 git push 를 하면 끝난다.

```
git push heroku master
```

## Problems

- [Hubot appears as user, but is offline](https://github.com/slackapi/hubot-slack/issues/161)


## Reference

- [Getting Started With Hubot](https://hubot.github.com/docs/)

## In conclusion

운 좋게도 흥미에서 끝나지 않고, 실제 사내에 여러 기능들을 붙이며 학습할 수 있어 매우 의미 있고 재밌었다.
욕심이 나는 부분이 있다면, 현재 까지는 개발 직군의 한정되어 기능들이 추가되고 있지만 추후에는 비 개발직군에 일원들도 손 쉽게 개발할 수 있는 환경을 구성하고 싶다.
