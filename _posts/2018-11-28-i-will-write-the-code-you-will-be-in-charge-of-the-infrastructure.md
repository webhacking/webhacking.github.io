---
title: 나는 코드를 쓸테니, 너는 인프라를 맡거라.
layout: post
categories : development
---

이 문서는 PageCall Console 을 개발하면서 인프라 구성이 귀찮았던 개발자 우 모씨가 Lambda, API Gateway, Cloud Formation 등의 AWS 리소스를 활용해 Serverless Architecture 를 구현 하면서 인프라 구성이라는 귀찮은 굴레 속에서 벗어나 코드 본연의 집중할 수 있었던 경험을 공유하고 있다.

## 뭐가 그렇게 귀찮아 ?

제품을 생산하고 배포하고 유지하는 과정을 높은 가용성과 확장성 있게 구성하는 것은 **매우 중요한 일인 반면 꽤나 귀찮은 일**이기도하다. 더욱이 자원이 한정적인 소규모 그룹의 경우에는 관리 포인트가 늘어남에따라 퍼포먼스 이슈 또한 배제할 수 없는 걸림돌이 된다.
> serverless architecture 는 이러한 문제를 해결 할 수 있는 **좋은 솔루션**이다.
위 과정 중, 개발자에게는** 생산에만 집중할 수 있도록 도와주기 때문**이다.
이로써 개발자는 코드 본연에 신경쓸 수 있기에 비약적인 생산성 향상과 높은 품질의 제품을 생산할 수 있다.

그전까지 나는 위의 모든 과정을 수행해야했다.
대표적으로 우리의 서비스 [PageCallAPI(이하 PCA)](https://www.pagecall.io/en) 의 배포 과정을 한 사례로 들어 수고스러움을 얘기해보겠다.

기본적으로 PCA 배포과정에서는 “Codedeploy”, “Elastic Load Balancer(이하 ELB)”, “Auto Scaling Group(이하 ASG)”, “S3” 등의 리소스를 필연적으로 사용하고있다.

개발자가 Remote git server master 브랜치에 push 하면 CI 는 이를 배포로 간주하고 정의된 프로세스가 구동된다. 그 과정 중 PCA에 패키지들은 압축되어 S3의 업로드되고 Codedeploy 클라이언트를 통해 배포가 진행된다.
이 절차를 수행하는 코드는 아래와 같다.

<script src="https://gist.github.com/webhacking/5d1ec3732c17092571a54145f13270e7.js"></script>

아래는 Codedeploy 의 배포 절차이다.

* Provisioning replacement instances

* Installing application on replacement instances

* Rerouting traffic to replacement instances

* Terminating original instances

이 과정에서 우리는 Blue/Green 배포 방식을 채택 하였기에 무중단 배포가 이루어진다. Provisioning 과정에서 대체 인스턴스는 *appspec.yml* 에 정의된 내용을 참고하여 이벤트 훅들을 실행하는데, 이 과정에서 우리가 정의해 놓은 dependency 들이나 환경변수등을 설정할 수 있다.
배포 소요시간은 대체 인스턴스와 정의된 스크립트 수에 비례된다.

아래 그림은 위 배포 절차에 대한 이해를 돕기 위해 첨부하였다.
그림 좌측이 전반적인 배포 절차이고, 우측이 Blue/Green 배포 형태에 대한 내용이다.

![](https://cdn-images-1.medium.com/max/2000/1*eOuknBV_UeVekgABC6DTlA.png)

![](https://cdn-images-1.medium.com/max/2000/1*rPQcC71UzOJV6Ry4xbKHuA.png)

필요로하는 dependency , 환경변수들이 늘어난다면 우리는 매번 appspec.yml 의 정의한 이벤트 훅 스크립트에 내용을 추가해야한다.

위 과정에 대한 학습 비용이 필요 없다는 전제하에 현재 클라우드 르네상스 시대에 살고 있는 우리에게 1시간 이내면 끝난다.
> 하지만 당신이 serverless architecture 를 지향한다면, **이제 위 과정은 생략**해도 좋다.

당신이 코드에만 집중할 수 있도록 Lambda, API Gateway, CloudFormation 등AWS 리소스들 이 serverless architecture 을 구현할 수 있도록 도움을 줄 것 이다. (Lambda, API Gateway, CloudFormation에 대한 간략한 설명은 밑에 기재해두었다.)

위 리소스들을 쉽고 간편하게 구성하고자 한다면 프레임워크를 사용하자. 우리는 서버리스 프레임워크들 중 Serverless 프레임워크를 채택하여 개발했다. (Serverless 프레임워크 이름이 Serverless 다..)

이외 프레임워크들은 Chalice, Apex 등도 존재한다.
플링크가 Serverless 프레임워크를 선택한 이유는 잘 구성된 문서와 활발한 커뮤니티 그리고 Typescript 지원이었다. (플링크의 모든 제품들은 대부분 Typescript 를 베이스로 개발되고있다.)

그렇다면 어떻게 기존의 배포 방식과는 다르게 배포할 수 있다는말인가 ?
그냥 코드를 작성하고, **아래 명령어 한 줄을 통해 배포**하면된다.
> **serverless deploy**

<iframe src="https://giphy.com/embed/3XR0chfiSTtAI" width="480" height="365" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
(신입 개발자 우모씨가 배포 방법에 대한 문서를 읽고 있다.)

## 거 좀 편해 보이네, 좀 더 자세히 말해봐.

위 비교글만 보면, 아주 간편하고 강력한 도구가 아닐 수 없다.

우리는 그저코드를 작성하고, 배포 명령어만 질의하면 뚝딱 **높은 가용성과 확장성을 보장하는 서버 앱**을 만들 수 있다.

**그럼, 아주 간단한 앱을 만들어볼까?**

본래 Pagecall Console 앱에 사용된 코드를 인용하고자했는데, 오히려 이해하는데 방해요소가 될까봐 배제했다.
또한 IAM 설정이나, Credentials 설정내용도 모두 배제했다.(이러한 설명은 오히려 [공식 문서](https://serverless.com/framework/docs/providers/aws/guide/credentials/)를 참고하는게 더 정확하다.)

대신 특정 리소스를 요청하면 “Hello i’m hax0r” 이라는 텍스트를 응답하는 간단한 함수를 만들어보자. 단 간단한 함수 또한 Typescript 로 작성할거다.

[serverless cli](https://serverless.com/framework/docs/providers/aws/cli-reference/) 가 설치되어있고 cli를 통해 앱을 만들었다는가정하에, 추가적으로 “serverless-plugin-typescript”을 추가한다.

그리고 아래 sample tsconfig.json 을 추가한다.

<script src="https://gist.github.com/webhacking/5466b197831da793715d30c79fa5072e.js"></script>

이후, handler.js 를 handler.ts 로 치환하고 아래와 같이 간단한 코드를 작성할 수 있다.

<script src="https://gist.github.com/webhacking/daac127734451f07d35dbfa18abd9879.js"></script>

그리고 serverless.yml 에 아래와 같이 핸들러를 추가한다.

<script src="https://gist.github.com/webhacking/5a47af45812fc4a7b6957dc6da067db7.js"></script>

이제 마지막으로 아래와 같이 End point 만 추가하면된다.
“/hello” 라는 경로로 요청 시, 우리가 기술한 hello 메소드가 질의될 것이다.

<script src="https://gist.github.com/webhacking/0db284d078e41fa9c7bbdffea6ffbd8c.js"></script>

그리고 아래 명령어를 통해 배포하면 APIGateway 를 통해 할당된 경로를 터미널 상에 출력할 것이다.
> serverless deploy

어떤가 정말 너무 간단하지 않은가 ?

해당 프레임워크는 serverless.yml 설정 파일을 통해 함수 및 메모리크기 그리고 Route parameter 등의 여러 속성들은 제공하여 쉽고 간편하게 구성할 수 있다.

아래는 이 문서에서 담고 있는 용어들이 낯선 분들을 위해 간략한 설명을 적어 놓았다.

### Serverless architecture 란 ?

서버를 따로 띄우지 않고, 코드를 업로드 하여 기존 서버에서 문제점이였던 관리, 스케일링과 같은 이슈를 해결해준다. 따라서 개발자는 코드 본연의 집중할 수 있어 양질의 코드를 생산할 수 있다.

### Lambda 란?

Lambda는 AWS 에서 제공하는 FaaS(Function as a Service) 서비스 이다.
이를 통해 AWS 에서 Serverless architecture 를 구성할 수 있다. 현재까지의 FaaS 서비스 중, AWS 에서 제공하는 Lambda 가 독보적으로 인기가 많다.
Lambda 의 장점은 Serverless, Scaling, Demand-based Pricing 이다.
요금과 관련해서는 아래에 좀 더 자세히 다루겠다. 이외 다른 컴퓨팅 자원과 유연하게 연동할 수 있고 여러 트리거들을 제공한다는 이점이있다.

### API Gateway 란?

API Gateway 는 Router 쯤으로 여기면 이해가 쉽다.
Endpoint를 단일화하고 관리를 맡김으로써 사용자는 핵심 비즈니스 구현에 집중할 수 있도록 도와주는 역할을 한다.
그리고 다른 컴퓨팅 서비스들과 유연하게 연동할 수 있다. (e.g. Lambda, Beanstalk) 결국에 Lambda는 독립적으로 사용되기 보다는 RETSful API를 구성을 위해 사용되는 경우가 일반적이다.

![출처: [https://docs.aws.amazon.com/ko_kr/apigateway/latest/developerguide/welcome.html](https://docs.aws.amazon.com/ko_kr/apigateway/latest/developerguide/welcome.html)](https://cdn-images-1.medium.com/max/2000/1*3wR26BPrv1nrZjhbNUJX-g.png)*출처: [https://docs.aws.amazon.com/ko_kr/apigateway/latest/developerguide/welcome.html](https://docs.aws.amazon.com/ko_kr/apigateway/latest/developerguide/welcome.html)*

### CloudFormation 이란 ?

CloudFormation은 인프라 형상 관리를 제공한다.
형상관리는 별도의 템플릿을 통해 이루어지며 공식으로 제공하는 템플릿이나 개발자가 작성한 템플릿을 이용해 리소스들을 쉽게 관리하는 방법을 제공한다. 템플릿에는 리소스의 생성과 관련된 설정은 물론 기타 관련 종속성 또는 런타임 매개변수에 관해 기술할 수 있으며 AWS 서비스 프로비저닝 순서나 이러한 종속성이 적용될 수 있도록 거쳐야 하는 세부 절차의 순서를 파악할 필요가 없다.

## 단점은 없어?

### Warm start and cold start

Lambda 의 상태는 “Warm start” 와 “Cold start” 로 구분할 수 있다.
단어가 뜻하는바가 명확하기에 아마 짐작했을거라 생각한다.

이 상태에 따라 **퍼포먼스 이슈**가 존재한다.

아래 머신건으로 비유하면 이해가 편할 것 같다.
머신건은 발사전 천천히 회전을하고 이후 엄청난 추진력을 받아 총알을 내뿜는다. 발사를 잠시 멈춘다하더라도 회전이 멈추지 않은 상태, 예열된 상태라면 머신건은 다시 빠르게 총알을 내뱉는다.

Lambda 도 똑같다.
람다는 5분동안 요청이 없으면 Cold start 상태로 변한다.
이 경우 초기에 지연시간이 발생하고 Warm start 상태가 되면 다시 빠르게 응답한다.

이는 Heroku 인스턴스 성질과 비슷하다.
만약 이러한 지연시간에 민감하다면 아래와 같은 방법으로 해결 할 수 있다.

* ColudWatch를 통해 Lambda를 매 5분 한번씩 지속적으로 호출 한다.

* Route 53에서 Health Check를 Lambda 함수 API Gateway Endpoint 에 설정해둔다.

* 별도의 프로그램을 작성하여 매 5분마다 요청하다.

플링크팀은 두 번째 방법을 통해 해당 이슈를 해결했다. (월 마다 프리티어가 존재하여 현재까지는 비용이 발생하지 않지 않는다.)

<iframe src="https://giphy.com/embed/hmlPfL3D6qgAo" width="480" height="381" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

### **무거운 작업**

Lambda 는 정의한 자원으로 최대 15분까지 사용할 수 있다.
결국에 15분이 초과되는 작업들은 Lambda 로 수행할 수 없다.
한마디로 **단시간의 많은 자원을 필요로 하는 작업**은 Lambda 와 맞지 않는다.

이럴때 해결 방법은 [ECS Fargate](https://aws.amazon.com/ko/fargate/)를 사용하는 방법이다.
ECS Fargate는 단 시간 많은 자원을 필요로 하는 작업에 적합하다. ECS Fargat e 사용자가 만든 도커이미지를 별도의 설정없이 실행하고 실행된 시간만큼만 금액을 지불한다.

또 한가지의 해결 방안은 기다림이다.
몇달 전까지만 해도 Lambda 에 최대 사용시간은 5분이었다.
게속해서 발전해나아가고있다.
사실 단정 지을 수는 없으나 전의 지표들을 볼 때, 지속적으로 최대 사용시간이 증가했다.

## 그.. 그거 비싸지?

람다는 공식문서에서 “**사용한 시간에 대해서만 비용 지불**" 강조한다.

EC2의 경우에는 현재 “인스턴스 수 x 인스턴스 타입의 비용 x 서버가 운영중인 기간 (1시간 단위)”으로 과금이 이루어 지는 반면, Lambda 의 경우 과금은 요청 요금과 컴퓨팅 요금의 합으로 계산된다.

EC2 와 비교했을 때, EC2 는 이벤트가 있으나 없으나 모든 시간에 대한 요금을 부과하지만 Lambda 는 코드가 실행되지 않을 때는 요금이 부과되지 않는다.
정말 사용한 리소스에 대한 값만 요구한다.

여기서 요청 요금은 Lambda 함수를 질의한 수에 대해 요금을 부과하고, 컴퓨팅 요금은 이 함수의 소요시간에 대해 부과한다. 컴퓨팅** 요금은 사용자가 설정한 메모리 크기에 선형 비례하여 다르게 부과된다**.

메모리 크기는 최소 **128MB 최대 3008MB 까지 지원**한다.
메모리 **크기가 높을 수록 더 큰 CPU 파워를 제공**한다.

아래는 메모리 크기별 요금표이다.

![](https://cdn-images-1.medium.com/max/2000/1*lcInn9flR8PO4mT54NY3UQ.png)

128MB 메모리에서는 100ms당 0.000000208$이고 256MB는 128MB의 약 두 배인 0.000000417$이다. 그리고 512MB에서는 256MB의 두 배인 0.000000834$이다.

이 처럼 Lambda는 함수가 수행된 시간을 100ms 단위로 올림하여 과금한다.
API Gateway의 경우 100만 요청 당 3.5 USD가 과금된다.

상황에 따라, Lambda 와 API Gateway 를 통해 엄청난 비용을 세이브할 수 있다. PageCall Console 은 제품 특성상 시간대별로 이벤트가 잦지 않기 때문에 이 구성이 안성맞춤인 것 같다 라는 생각을 한다.

## 삽질한거 있으면 공유 좀.

### CloudFormation’s 200 Resource Limit

Pagecall Console 에는 40개 정도의 함수가 존재하는데, 그 중 Route path 가 가장 긴 함수로 인해 배포과정에서 오류를 마주쳤다. CloudFormation 은 스택 당 리소스를 200으로 제한하기 때문에 마주친 오류다.
> The CloudFormation template is invalid: Template format error: Number of resources, 201, is greater than maximum allowed, 200

![](https://cdn-images-1.medium.com/max/2000/1*KV8pJwr4BQxstpsvdGkU8Q.png)

[serverless-plugin-split-stacks](https://github.com/dougmoscrop/serverless-plugin-split-stacks) 이라는 플러그인을 통해 **Nested Stacks 을 사용하여 스택 계층**을 만들 수 있다.

### Timeout

질의한 요청이 절대 무거운 요청이 아닌데, Timeout 되어 의아했다.
Stackoverflow 에 검색해보니 꽤나 많이 걸리는 트랩인 것 같다.
context callbackWaitsForEmptyEventLoop 속성에 false 를 주는 것으로 문제를 해결했다. 람다에서의 콜백은 기본적으로는 이벤트 루프 안의 모든 작업이 비워질때까지 호출되지 않는다.

아래는 Stackoverflow 답변을 발췌했다.

By default calling the callback() function in a NodeJS Lambda function does not end the function execution. It will continue running until the event loop is empty. A common issue with NodeJS Lambda functions continuing to run after callback is called occurs when you are holding on to open database connections. You haven’t posted any code, so I can’t give specific recommendations, but you would need to determine if you are leaving database connections open in your code or something similar.

Alternatively, you can change the behavior such that the execution ends as soon as the callback}}function is called by

답변 출처: [https://stackoverflow.com/questions/46061612/why-does-my-lambda-function-time-out-even-though-the-api-gateway-callback-has-al](https://stackoverflow.com/questions/46061612/why-does-my-lambda-function-time-out-even-though-the-api-gateway-callback-has-al)

## 마치며

모노리스의 단점이 곧 서버리스에 장점이었다.
서버리스를 도입하면서 가장 좋았던 것은 역시 새로운 것을 배우고 맛보는 것도 있겠지만, 정말 순수하게 **Business Logic 에만 집중할 수 있는 시간**이 생겨서 좋았다.

서버리스는 현재 태동기를 지나 성장기에 접어들었다 생각한다.
우리가 지향하는 미래를 볼 때, 앞으로의 눈부신 성장이 예상된다.
서버리스 도입을 고려하는 팀이라면, 이 문서가 조금이나마 도움이 되었길 바란다.

**다음 시간에는 모니터링 시스템과 테스트에 대해 얘기를 해보고자한다.**

## 참고

* [AWS Lambda Features](https://aws.amazon.com/lambda/features/)

* [Getting Started Lambda](https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html)

* [AWS Lambda Pricing](https://aws.amazon.com/lambda/pricing/?nc1=h_ls)

* [Working with Nested Stacks](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-nested-stacks.html)

* [KUSH & ZION.T — ‘MACHINE GUN’ (feat. MINO) 0610 Mnet SHOW ME THE MONEY 5](https://youtu.be/ZsiGpkO7sDQ)
