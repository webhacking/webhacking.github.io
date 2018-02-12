---
layout: post
title: "슬랙에서 휴봇 사용하기 (Slack Developer Kit for Hubot)"
description: ""
date: 2017-05-14
tags: ['Getting Started With Hubot', 'Hubot', 'Slack Developer Kit for Hubot']
comments: true
share: true
---

**휴봇이란 ?**

태초는 Github 에서 사내용으로 만든 봇 입니다.

여러 수 많은 이슈들을 통해 발전을하여 지금과 같은 형태를 갖추었고, 현재는 오픈 소스로 공개되어있습니다.

  

Hubot은 Node.js 기반에 CoffeeScript 로 개발되어있습니다.

휴봇은 AI 가 아닌, 단순 봇 이라는걸 알아두셔야합니다.

  

아래와 코드와 같이 개발자가 직접 명령어를 정규식 등으로 listen 한 이후,

로직에 따라서 메세지등을 다시 반환하는 형식입니다.

  

    module.exports = (robot) ->  robot.respond /(.*) 영준이잘생김!/i, (msg) ->

  

예를 들어 아래와 같이 휴봇에 명령어를 추가하여 유용하게 사용할 수 있습니다.

@휴봇 오늘 날씨 알려줘 , @휴봇 오늘 점심 메뉴 추천해줘 , @휴봇 운영부서가 하는일좀 알려줘

  

  

일단 본인은 Heroku 클라우드를 통해서 애플리케이션을 배포할 예정입니다.

Heroku 가입 방법은 따로 기재하지 않겠습니다.

  

  

**휴봇 시작하기**

시작에 앞 서, 저의 환경을 말하자면 아래와 같습니다.

  

  * Node.js
    * 0.10.37
  * NPM
    * 4.2.0
  * Ubuntu
    * 14.04

  

* Node.js 버전 충돌 일 어 날 수 있으니 환경 변수 설정 확인 바래요.

  

1\. Repositories 를 업데이트 합니다.

  

    sudo apt-get update

  

  

2\. Prerequisites 를 설치합니다.

  

    sudo apt-get install build-essential

  

3\. Node.js 를 설치합니다.

  

#최신 버전 설치가 필요하다면 아래 repository 를 추가 *(선택 사항), 이후 다시 업데이트

  

    sudo add-apt-repository -m ppa:chris-lea/node.js 

  

    sudo apt-get update

  

    sudo apt-cache show nodejs | grep Version

  

    node -v

  

이 후, NPM (node package manager) 을 설치합니다.

  

    sudo apt-get install npm

  

  

휴봇을 설치하기 앞 서, git 을 먼저 설치합니다. (* 설치 되있는 분은 건너 뛰시면 됩니다.)

  

    sudo apt-get install git-core

  

  

    sudo apt-get install libssl-dev redis-server libexpat1-dev

  

  

    sudo npm install -g coffee-script

  

  

    cd /opt/hubot && sudo npm install

  

    npm ls

  

  

아래 명령어를 사용하여 휴봇을 실행합니다.

  

    yo hubot

  

  

기본적으로 아래 4가지의 정보를 받습니다.

Owner,Bot name, Description, Bot adapter

Bot adapter 의 경우 slack 으로 입력합니다. 이외 입력사항은 원하시는 내용을 추가하면 됩니다.

  

  

![](/assets/images/posts/744/227E1B4359182199197056.PNG)

  

  

  

**Slack Token 발급**

  

슬랙에서 토큰을 발급해야합니다.  
https://your-app.slack.com/apps 해당 링크로 이동 후에 `hubot`을 검색하여 추가합니다.

Configuration 을 통해서 봇을 설정하고, Api Token을 copy 합니다.

  

  

**Heroku toolbelt 사용하여 dyno 생성 및 Slack 연동**

  

    #heroku 로그인heroku login#dyno 생성, 아웃풋에 ****.herokuapp.com 이 와 같은 형태로 출력되니 본 주소 기억해두세요.heroku create#이 후, 아래 명령어를 통해 설정을 추가합니다.

  

    heroku config:add HUBOT_URL=herokuapp주소heroku config:add HUBOT_SLACK_TOKEN=발급 받은 토큰 값

  

  

*** 발생한 문제점들**

  1. [Hubot appears as user, but is offline](https://github.com/slackapi/hubot-slack/issues/161)
    1. 특정 시간이 지난면 휴봇이 오프라인되는 현상이 발견 됨. heroku 에서 특정시간이 지나도 이벤트가 발생하지 않는 인스턴스는 자동으로 슬립 모드에 들어가는 것 같음. 그래서 나의 경우 cron을 통해서 특정시간(매 10분)마다 휴봇에게 요청을 보냄
    2. 1번의 방법이 다소 귀찮다면, 현재 github repository에서 위 이슈관련하여 인기있는 repository('hubot-heroku-keepalive')를 받아주시면 됩니다.

  

  

저희 회사는 슬랙을 나름 잘 활용하고있습니다.

프로그램 오류 사항이나 또는 로직의 오류 내용등을 슬랙으로 피드백 받고 있고 또 전 사원이 슬랙을 통해서 커뮤니케이션하고있습니다.

휴봇을 추가함으로써 뭔가 더 슬랙을 잘 활용하게 된 것 이 아닌지 나름 기쁩니다. ㅎㅎ  
  

  

  

![](/assets/images/posts/744/236F1B49591840EF0E2E29.PNG)

  

  

  

이름은 쟈비스로함. (최근에 아이언맨 다시 봄)

  

![](/assets/images/posts/744/2738EA4B591839C31C9DD9.PNG)

  

  

  

  

**참고**

  * [Getting Started With Hubot](https://hubot.github.com/docs/)

  

