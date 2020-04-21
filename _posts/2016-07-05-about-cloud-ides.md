---
layout: post
title: "클라우드 IDE Cloud 에 대하여.. (Cloud9,koding,Nitrous,구름 IDE)"
description: ""
categories : development
sub_categories : ""
date: 2016-07-05
tags: ['C9', 'cloud 9', 'IDE', 'node.js', 'PHP', 'Python', 'ruby', '구름', '구름 IDE', '무료 클라우드', '클라우드 IDE']
comments: true
share: true
---

이번에 해외 `[rails](http://rubyonrails.org/)` 프로젝트에 참여하게되었다.

어떤 언어를 막론하고 ATOM 만 사용했는데 어떤계기(`환경변수 꼬임`)로 인해

Workspace가 필요했고 문득 생각났던게 `[C9(Cloud9)](https://c9.io)` 이 었습니다.

따라서 해당 포스팅은 `[C9](https://c9.io/)`에 대한 설명을 목적으로 작성되었지만..

작성하다보니 클라우드 IDE 서비스들을 대략 정리하게되었습니다..^^;

클라우드 IDE는 장단점이 확실히 있습니다. 호불호도 많이 갈리는 편 이구요.

  

> Your development environment, in the cloud

>

>  

  

아래에 클라우드 IDE 서비스들을 크게 5개로 추려보았습니다.

현재는 `koding`이 조금 우위를 선점하는 것 같다.

여러가지 이유가 있겠지만 개인적으로 수 많은 `devops tools`들과의 연동을 지원하는게 현재의 우위를 선점한 이유가 아닐까 싶습니다.

  

  1. [koding](http://www.koding.com/)
    1. Say Goodbye to localhost
    2. 현재 `1,745,021`명의 엔지니어들이 이용중이다.
    3. 지원하는 devops tools and another service 목록입니다. 거의 다 사용하고있는 것 들이네요.
      1. [OpenStack](https://www.openstack.org/)
      2. [Github](https://github.com/)
      3. [Slack](https://slack.com)
      4. [DOCKER](https://www.docker.com/)
      5. [Cloudflare](https://www.cloudflare.com/)
      6. [AWS](http://aws.amazon.com/ko/) (Full access to AWS API, EC2, RDS, S3, VPC, SNS, SQS and much more.)
      7. [CHEF](https://www.chef.io/solutions/devops/)
      8. [Digital Ocean](https://www.digitalocean.com/)
  2. Cloud9
  3. Nitrous
  4. 구름 IDE
  5. [orionhub](https://orionhub.org/mixloginstatic/landing.html?redirect=https%3A%2F%2Forionhub.org%2F&key=FORMOAuthUser)

세개모두 UI/UX는 비슷합니다. 또한 여타 다른 IDE들과 비슷합니다.

클라우드 IDE 장점이라면 로컬자원을 사용하지않아도 되고, 어떤 환경에서도 네트워크만 된다면 언제든지 작업할수있습니다.

  

Nitrous,orionhub는 사용해보지않았지만 평이 그렇게 나쁘지는않습니다.

구름 IDE는 국내에서 만들어졌습니다.

  

장점이라면 Region이 서울이라 빠릅니다.

그리고 커뮤니케이션을 모국어로 할 수 있다는 장점과 타 클라우드 IDE보다 자원을 조금 더 줍니다.

C9는 Region이 United Arab Emirates이다. RAM 512MB,Disk 2GB 를 지원합니다.

구름은 RAM은 C9과 동일하고 Disk는 3GB 추가(5GB)로 더 제공합니다.

  

  

![](/assets/images/posts/680/2609BB41577B2C8E30524A.JPEG)

  

![](/assets/images/posts/680/246C343D577B2C23246AD5.PNG)

  

  

대부분의 클라우드 IDE를 통해 Pair 프로그래밍 또한 가능하다.

즉 협업측면을 고려할때 클라우드 IDE를 많이 사용합니다.

workspace 공유를 통해서 친구들과 작업화면을 공유할수있고 함께 코드를 작성할 수 도 있습니다.

  

단점이라면 아무래도 브라우저의 영향을 많이 받기 때문에 다운현상등이 예기치않게 발생할 수 있습니다.

하지만 다행히 아직까지 한번도 그런적이없었습니다.

클라이언트 발전속가 매우 빠르기때문에 시간이 지나면서 위 걱정도 많이 줄어들거라 기대합니다.

저도 처음에는 무의식적으로 거부반응이 생겼는데.. 막상 사용하고보니 오히려 더 긍정적으로 생각하게된 계기가 되었습니다.

  

아직까지 크로스브라우징 측면에서는 개선할 부분이 많아보입니다

아무래도 보안적인 측면에서 몇몇개의 `명령어`를 제한했는데 이에따라서 작업할때 다소 자유도가 떨어질 수 있습니다.

  

`C9` 은 Google Cloud 인프라위에서 작동하고있으며, koding은 AWS인프라를 사용하고있습니다.

사용법은 매우 간단하다. 다른 IDE를 사용한 경험이있다면 아마 쉽게 적응 할 수 있을것이다.

경험이 없는 유저도 이해하는데 그리 긴 시간이 필요하지않다.

  

새로운 workspace를 만들기전 아래와 같은 template을 제공한다.

  * HTML5
  * Node.js
  * PHP
  * Python
  * Python with Django
  * Ruby with rails
  * C++
  * Wordpress
  * Blank
  * CS50(Harvard University)

  

Remote 서버에서 git repo가 있다면 해당 서버에 ssh 키를 등록한다.

ssh 키는 계정설정에 기재되어있습니다.

  

아래는 `C9`의 인터페이스입니다.

회사라.. 윈도우 환경의스크린 샷 죄송합니다.(윈송합니다.)

  

  

![](/assets/images/posts/680/24645F40577B29940865E7.JPEG)

  

  

  

현재 수 많은 클라우드 IDE 서비스가 있고, 공룡IT 기업들에서 현재 실 서비스하고있는 것도 많습니다.

저희 개발자들도 한번씩 거부감없이 사용해보면 좋겠습니다.

  

![](/assets/images/posts/680/2669BE36577B2FDB1CB0D6.JPEG)

  

  

