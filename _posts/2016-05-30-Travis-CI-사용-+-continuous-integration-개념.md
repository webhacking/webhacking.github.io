---
layout: post
title: "Travis CI 사용 + continuous integration 개념"
description: ""
categories : ""
sub_categories : ""
date: 2016-05-30
tags: ['CI', 'Continuous Integration', 'Jenkins', 'Travis', 'travis vs Jenkins', '영준스텔라', '지속적 통합']
comments: true
share: true
---

  

![](/assets/images/posts/635/2376CE50574C06B3303C8D.PNG)

  

  

우선 Travis CI에 대해 애기하기전에 CI에대한 개념을 한번 더 짚고 넘어가려고합니다.

좀 더 친근하고 재밌게 포스트하려고했는데, 다소 불쾌감을 느끼실수도있습니다.

생각나는대로 쓴 글이라 다소의 오타나 오역이 존재할수있습니다. 이런 경우 피드백 부탁드립니다.

  

너무나 익숙한 이 내용 continuous integration 은 건너뛰고 밑에서부터 읽으셔도 무관합니다.

  

  

**지속적인 통합(continuous integration, CI).**

  

  * 소프트웨어 공학에서의 [continuous integration](https://ko.wikipedia.org/wiki/%EC%A7%80%EC%86%8D%EC%A0%81_%ED%86%B5%ED%95%A9)은 지속적으로 퀄리티 컨트롤*(품질관리)을 적용하는 프로세스를 실행하는 것 이다.
  * 모든 개발을 완료한 뒤에 퀄리티 컨트롤을 적용하는 고전적인 방법을 대체하는 방법으로서 _소프트웨어의 질적 향상과 소프트웨어를 배포하는데 걸리는 시간을 줄이는데 초점_을 둔다.
  * 초기 그리고 자주통합으로 인해 발생하는 여러가지 _문제점을 조기에 발견_하고, 피드백 사이클을 짧게 하여 소프트웨어 개발의 품질과 생산성을 향상시키는 것

  

우리 이해하기 쉽게 한번 예를 들어볼까요 ?

  

CI 시스템이 구축되었을 경우, 구축되지않았을경우를 아래 예를 통해서 이해해봅시다.

전자가 제일 일반적인 경우라 할 수 있겠네요.

  

_구축하지않은 경우_(일반적) : 프로그래머들이 각자 작업한 소스코드를 형상관리(SVN) 서버에 커밋하면 별도의 품질관리를 거치지않고 개발이
끝난 막바지에 통합하여 테스트를 진행.

개발 중 별도의 품질관리를 수행하지 않았기 때문에 잘못된 소스코드를 형상 관리 시스템에 반영하였을 경우. 오류를 찾지못하고 후반분에 이렇게
심어진 오류들로 인해 디버깅 시간이 소요됨.

  

_구축되어있는 경우_ : CI서버는 형상관리 서버에 Commit된 소스코드를 주기적으로 폴링하여 컴파일,단위테스트,코드 인스펙션등의 과정을
수행하며 신규 또는 수정된 소스코드가 결함이 있는지의 여부를 지속적으로 검증한다.

  

검증 결과는 이메일등의 피드백 메커니즘을 통해 개발자들에게 전달되고,

이를 통해 개발자는 조기에 결함을 발견하여 해결할 수 있는 것 이다.

  

간략한 흐름을 요약하자면 아래와 같습니다.

  

1\. 프로그래머가 버전 관리 저장저장소에 코드를 커밋함.

2\. 커밋 후, CI 서버가 버전 관리 저장소에 변경내역을 감지('CI서버는 이 저장소를 지속적으로 확인'), CI서버는 저장소에서 최신
소스코드 복사본을 가져와서

빌드 스크립트를 실행하고 소프트웨어를 통합합니다.

3\. CI서버는 지정된 프로젝트 구성원들에게 검증결과를 위의 적었듯이 이메일등의 피드백 메커니즘을 통해 전달함.

4\. CI서버는 버전 관리 저장소에 변경사항이 들어왔는지 지속적으로 폴링(Polling)함.

  

  

![](/assets/images/posts/635/251D7C49574BEABD0402F0.JPEG)

  

  

프로그래머들이 작성한 잘 동작하는 모듈도 한데 모으면 동작하지않는 경우가 허다하다.

조기에 오류가 발견되지 못하고 오류들이 쌓이게 되면 생각하기도 끔찍한 상태가 발생한다. (밤샘야근, 어디서 야근하는 소리가 들리네요.?)

  

  

상황극으로 얘기해볼까요.. ?

아직 신입 프로그래머이지만 가끔 회사에서 이런 경우가 있습니다.

=> "아..내가 저 오류를 조금만 더 일찍알았더라면... ", "다 내탓이야 하ㅠㅠㅠ"

우리는 주기적으로 컴포넌트를 `통합` 하고 `관찰` 하고 `디버깅` 해야합니다.

  

  

[CI가 없을 경우, 요약]

  

product owner : Youngjun what are you doing??

programmer : Docking..!

  

  

![](/assets/images/posts/635/272D3C4E574BE10B05B749.JPEG)

  

  

  

나에게 _continuous integration_가 왜 필요할까?

아마 이 질문은 저 말고도 여러분 자신에게 할 수 있을거같습니다.

현재의 저는 회사 이외의 공간에서도 개인적으로 프로젝트를 진행하고있습니다. 물론 어디까지나 주말에만허용되는 얘기지만요.

주말등의 시간을 이용해서 아이디어를 구상하고 실제 구상된것들을 한번 실 서비스를 해보자는 취지로 작업하게되었습니다.

문법적 오류 또는 논리적 오류로 인해(여기서는 문법적 오류에 해당하겠죠.)서 프로그램에 버그가 심어져있다면 개발자인 저는 그 버그를
발견하는데 많은 시간이 소요될수도있으며 해당 버그를 통해서 2차 적인 피해가 발생할수도있습니다. 따라서 작업하는 동안에 지속적으로 내
프로그램이 제대로 동작하는지 검증해야합니다.

  

이러한 이유로 Travis CI를 선택했습니다.(응?)

Travis CI를 선택한이유에서는 여러가지가 존재하겠지만, 그 중 Github과의 친밀도와 단순히 간단하고 편해보여서 선택했다.
(jenkins 설치하기 귀찮은것도 한 몫.. 깃헙에 월 돈내는것도 한 몫 .. )

Travis CI는 오픈소스 커뮤니티를 위한 지속적인 통합이다.

  

  

Public Repositories 연결하려면 `https://travis-ci.org` 를 이용한다.

private repositories 연결하려면 `https://travis-ci.com` 를 이용한다.

  

  

차이점, 무료와 유료의 차이다.

해당 포스트에서 놓치는 내용들이 많으니 [Getting started](https://docs.travis-
ci.com/user/getting-started/) 문서를 한번은 정독 하길 바란다.

  

  

![](/assets/images/posts/635/2116E44C574BFB181AC85B.PNG)

  

  

  

비공개 저장소를 만들려면 Remote 서버마다 차이가 있겠지만, Github 기준으로 매달 얼마씩 빠져나간다.

근데 정작 얼마인지 모른데.. 해외 결제 문자 너무 많이온다.

  

  

  

  

![](/assets/images/posts/635/220E5C4C574BFB1923E643.PNG)

  

  

  

  

Oauth 인증방식을 통해서 Github과 연결한다.

읽기/쓰기 권한을 요청하는데 쓰기 권한은 오직 저장소의 Hook기능을 사용하기 위함이다.

  

Travis CI 문서를 보면 3단계로 간단하게 요약해 놨다.

자, 그럼 이제 2단계를 진행해봅시다. 자신의 저장소 최상단(*루트위치)에 `.travis.yml` 을 생성해주세요.

`.travis.yml` 파일은 YAML파일로 Travis CI의 빌드 설정 및 테스트 환경등에 대한 모든 설정을 기록하는 파일이다.

  

YAML은`YAML Ain’t Markup Language’의 약자이다.

마크업 언어의 하나이다. YAML은 쉽게 읽을 수 있다.(가독성 굿), 속도가 상당히 빠르며 다양한 프로그램과 이식이 용이하다.

  

아래는 python 기준으로 작성한 것.

  

    language: pythonpython:  - "2.6"  - "2.7"  - "3.2"  - "3.3"  - "3.4"  - "3.5"  - "3.5-dev" # 3.5 development branch  - "nightly" # currently points to 3.6-dev# command to install dependenciesinstall: "pip install -r requirements.txt"# command to run testsscript: nosetests

Travis CI는 가상머신을 스냅샷해서 각 빌드를 수행한다. 빌드가 끝나면 롤백한다.

자세한 환경은 해당 링크(`https://docs.travis-ci.com/user/ci-environment/`)를 확인하세요.

travis.yml를 자신의 환경에 맞게 수정했다면 해당 파일을 커밋하고 버전관리 저장소에 푸시한다.

Travis CI는 해당 정보들을 통해서 빌드하고 검수내용(`응 너 실패`)을 여러분에게 알려줄거다.

  

아래는 Travis CI가 지원하는 언어이다.

  

  1. C
  2. C++
  3. Cloujure
  4. C#
  5. D
  6. Dart
  7. Erlang
  8. F#
  9. Go
  10. Groovy
  11. Haskell
  12. Java
  13. Javascript (Node.js) 
  14. Julia
  15. Objective-C
  16. Perl
  17. PHP
  18. Python
  19. R
  20. Ruby
  21. Rust
  22. Scala
  23. Visual Basic

  

_1\. Activate GitHub Repositories_

Once you're signed in, and we've initially synchronized your repositories from
GitHub, go to your profile page for open source or for your private projects.

  

You'll see all the organizations you're a member of and all the repositories
you have access to. The ones you have administrative access to are the ones
you can enable the service hook for.

  

Flip the switch to on for all repositories you'd like to enable.

_  
_

_2\. Add .travis.yml file to your repository_

In order for Travis CI to build your project, you need to tell the systems a
little bit about it. You'll need to add a file named .travis.yml to the root
of your repository.

  

If .travis.yml is not in the repository, is misspelled or is not valid YAML,
Travis CI will ignore it.

  

Here you can find some of our basic language examples.

  

_3\. Trigger your first build with a git push_

Once the GitHub hook is set up, push your commit that adds .travis.yml to your
repository. That should add a build into one of the queues on Travis CI and
your build will start as soon as one worker for your language is available.

  

To start a build, perform one of the following:

  

  * Commit and push something to your repository
  * Go to your repository's settings page, click on "Webhooks & Services" on the left menu, choose "Travis CI" in the "Services", and use the "Test service" button.

NOTE: You cannot trigger your first build using Test Hook button. It has to be
triggered by a push to your repository.

  

  

다시한번 아래 그림을 통해서 동작 흐름을 보자.

순차적으로 따라가보자. 아까 설명한 위의 내용과 같다.

  

프로그래머가 버전 관리 저장저장소에 코드를 커밋함.

커밋 후, CI 서버가 버전 관리 저장소에 변경내역을 감지,

CI서버는 저장소에서 최신 소스코드 복사본을 가져와서 빌드 스크립트를 실행하고 소프트웨어를 통합함.

CI서버는 지정된 프로젝트 구성원들에게 검증결과를 팀원들 메일이나 스케줄러 등에 등록또는 보냄.

  

  

  

![](/assets/images/posts/635/221F6147574BFDC6359A40.PNG)

  

  

Travis CI 와 Jenkins의 차이는 아래와 같다.

확실히 Travis 가 Jenkins보다 상대적으로 쉽다.

  

아무래도 Jenkins를 사용하면서 설정에 대한 귀찮음을 느꼈다면 Travis를 사용하는것을 추천해보고싶다.

  

  

![](/assets/images/posts/635/24191C3A574BD88128CF43.JPEG)

  

