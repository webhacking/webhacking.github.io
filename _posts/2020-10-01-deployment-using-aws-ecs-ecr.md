---
title: AWS ECS/ECR 을 통한 서비스 배포
layout: post
categories : development
background_image: '/assets/images/posts/2020-10-01-deployment-using-aws-ecs-ecr/diagram.png'
---

## 배경

최근 새로운 도전이라는 명목하에 병역을 해결하기 위해 새로운 회사로 이직했다.
이직 결정에 있어서 비단 병역에 대한 문제만이 아닌 여러 사항들이 작용했는데 이와 관련해서 다음에 따로 글을 작성하겠다.
현 회사에서 레거시에 대한 내용을 많이 강조했고 그와 관련해서 어느 정도의 레거시는 예상했으나, 실제로 마주한 레거시의 정도는 정말 역대라 표현할 만큼 거대했다.

가장 먼저 ***CI/CD 가 제대로 구현되지 못했고***, 개발자들은 Remote server 에 소스를 동기화 시키는 형태로 개발하고 있었다.
따라서 본인은 비효울적인 기술 스택들을 걷어내고, AWS ECS/ECR 를 통해 CI/CD 를 새로 적용했다.
본 글은 이를 구성하며 정리한 내용을 담고있다.

## 흐름

![](/assets/images/posts/2020-10-01-deployment-using-aws-ecs-ecr/diagram.png)

위 다이어그램은 실질적 배포 프로세스를 구성하기 앞 서, 이해를 돕기위해 흐름에 대해 따로 정의한 내용이다.
배포 순서는 아래와 같다.

- 게빌자는 본인의 로컬에서 작업한 내용을 Remote git server 로 Push 한다.
- AWS CodePipeline 은 해당 트리깅 이벤트에 따라 정의한 프로세스에 따라 작업을 수행한다.
  - 트리깅 포인트 때문인지, Source 를 가지고 올 수 있는 항목이 제한적이다. (AWS CodeCommit, AWS ECR, AWS S3, Bitbucket, Github)
- Build 된 도커 이미지 AWS ECR (Elastic Container Registry) 에 PUSH 한다.
- ECS(Elastic Container Service) 에서 해당 이미지를 Pull 받으며 Pod 들이 구동된다.

Pipeline 항목으로 이동하면 아래와 같이 정의한 Stage 에 대한 상태가 표기된다.

![](/assets/images/posts/2020-10-01-deployment-using-aws-ecs-ecr/pipeline-capture.png)

아래는 빌드 스펙이며, Node 환경에 맞추어져있다.
내용은 간단하다 프로젝트에 관련된 의존성들을 설치한 이후 Lint 와 Unit test 등을 수행하고 이후 빌드된 이미지를 ECR 에 Push 한다.

```
version: 0.2
phases:
  install:
    runtime-versions:
      nodejs: 12
    commands:
      - echo "Install all of dependencies"
      - npm install
  pre_build:
    commands:
      - npm run lint
      - npm run test
      - $(aws ecr get-login --region $AWS_DEFAULT_REGION --no-include-email)
  build:
    commands:
      - AWS_ACCOUNT_ID="$(aws sts get-caller-identity --output text --query Account)"

      - IMAGE_TAG="$(date '+%Y%m%d%H%M%S')"
      - echo $IMAGE_TAG

      - |
        docker build . \
        -f Dockerfile \
        --build-arg ENV=dev \
        --tag $AWS_ACCOUNT_ID.dkr.ecr.ap-northeast-2.amazonaws.com/{repo}:$IMAGE_TAG
      - docker push $AWS_ACCOUNT_ID.dkr.ecr.ap-northeast-2.amazonaws.com/{repo}:$IMAGE_TAG

      - |
        printf '[{"name":"{service name}","imageUri":"%s"}]' \
        $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/{repo}:$IMAGE_TAG > imagedefinitions.json

artifacts:
  files:
    - imagedefinitions.json
```

## CodePipeline

CodePipeline은 빠르고 안정적인 애플리케이션 및 인프라 업데이트를 위해 릴리즈 파이프라인을 자동화하는 데 도움이 되는 완전관리형 지속적 전달 서비스이다.
코드 변경이 발생할 때마다 사용자가 정의한 릴리즈 모델을 기반으로 릴리즈 프로세스의 빌드, 테스트 및 배포 단계를 자동화한다.

## ECR (Elastic Container Registry)

ECR 은 말 그대로 Container Registry 이다.
개발자가 Docker 컨테이너 이미지를 손쉽게 저장, 관리 및 배포할 수 있게 해주는 완전관리형 Docker 컨테이너 레지스트리이다. 
쉽게 생각하면 Private Docker Hub 라고 생각하면 된다.
ECS 에 사용하기 위해서 자신이 빌드한 Docker Image 를 ECR 에 업로드 하여 ECS 를 이용해서 배포 한다.

## ECS (Elastic Container Service)

ECS는 완전 관리형 컨테이너 오케스트레이션 서비스이다.
다양한 오케스트레이션 서비스가 있으며 ECS 의 경우는 AWS 에서 자체 개발한 서비스 이다.
ECS의 장점은 다양한 AWS 기능과 통합이 쉽고 다른 서비스에 비해서 쉽게 적용이 가능하다.

컨테이너 오케스트레이션 도구에는 Docker에서 만든 Docker Swarm, 구글의 Kubernetes, 하시코프의 Nomad등 다양한 오케스트레이션 도구가 있다.

### 시작 유형

- FARGATE: 컨테이너에 적합한 서버리스 컴퓨팅 엔진 으로 ECS 및 EKS 에 사용할 수 있으며 서버를 관리 할 필요 없이 어플리케이션 별로 리소스를 지정하여 관리 비용을 지불하는 방식으로 앱에 집중하여 인프라가 아닌 어플리케이션을 배포 관리 할수 있다.
  - Lambda 와 매우 유사한데, AWS 에 가지고 있는 Fargate Pool 에서 하나를 가지고와서 도커 이미지를 실행한다. Lambda 처럼 초당 과금이지만 상대적으로 많이 비싸다. 그리고 프리티어 대상도 아니다.
- EC2: EC2 컨테이너 인스턴스를 연결하여 ECS 서비스 구성하기 때문에 위의 FARGATE 보다 비용을 저렴하나 설정이 복잡하고 인프라 확장이 Farget 에 비해서 적다.

시작 유형에 있어서 적합성에 대해 고민 된다면 아래 항목을 참고하여 자신에게 맞는 유형을 선택해보길 바란다.

### FARGATE 가 적합한 경우

- 단기간에 엄청난 CPU 연산이 필요한 상황
- 15분을 넘겨 Lambda 에서는 실행이 불가능한 상황
  - 이와 관련해서 일전에 문서([나는 코드를 쓸테니, 너는 인프라를 맡거라.](https://blog.hax0r.info/2018-11-28/i-will-write-the-code-you-will-be-in-charge-of-the-infrastructure/))를 작성했다.
- 주기적으로 실행되는 스크립트

### EC2가 적합한 경우

- 각 컨테이너들이 동일한 디스크를 공유해야 하는 상황
- 세밀한 인스턴스 세팅이 필요한 상황
- 항상 실행되는 스크립트

아래 아키텍쳐를 참고하면 이해에 도움이 편할 것 같다.

![](/assets/images/posts/2020-10-01-deployment-using-aws-ecs-ecr/ecs_architecture.png)

### ECS 사용 이점

- 간단한 API 호출을 사용하여 컨테이너 기반 애플리케이션을 시작 및 중지할 수 있다.
- 중앙 집중식 서비스를 사용하여 클러스터 상태를 확인할 수 있다
- 다수의 친숙한 EC2 기능에 액세스할 수 있다.
- 일관된 배포 및 구축 환경을 생성하고, 배치 및 ETL(Extract-Transform-Load) 워크로드를 관리 및 크기 조정하고, 마이크로 서비스 모델에 정교한 애플리케이션 아키텍처를 구축할 수 있다.

## Task definition

![](/assets/images/posts/2020-10-01-deployment-using-aws-ecs-ecr/Task-Definitions.png)

Docker 리포지토리 및 이미지, 메모리 및 CPU 요구 사항, 공유 데이터 볼륨, 컨테이너가 서로 연결되는 방식 을 지정한 JSON 템플릿의 정의 문서이다.
서비스에 등록할 수 있는 단일 작업 정의 파일에서 원하는 만큼의 작업을 실행 할수 있다. 
또한 작업 정의 파일을 사용하면 애플리케이션 사양의 버전을 관리할 수도 있다.

## 맺음말

- 정신건강을 위해 CloudWatch 를 통한 로그를 활성화 시키길바란다.
- 빌드 속도가 답답하다면  Codebuild 에서 Docker Layer Cache 를 하길란다.

![](/assets/images/posts/2020-10-01-deployment-using-aws-ecs-ecr/codebuild_blogpost_2.png)

Dockerfile 에서 이미지 빌드를 하다보면 수 많은 `Run` 명령어를 사용한다. 해당 명령어는 도커에서 이미지 레이어를 생성하게 되고 이 이미지 레이어는 게임에서 세이브 포인트 역할을 한다고 이해하면 편하다.
따라서 다음 번 도커 이미지 빌드 시, 해당 이미지를 캐싱하여 사용하기에 빌드 시간을 단축 시킨다. 다만 캐싱을 사용하지 않고 수행하는 경우도 존재하는데, Remote repository 에서 소스 코드를 받아와서 사용하는 경우 캐싱된 이미지 레이어를 사용하는 경우
변경된 소스가 반영되지 않는다. 따라서 `CodeBuild` 에서 `Artifacts` 항목에 `Cache type` 옵션을 설정해주길 바란다. (기본 값은 No Cache 이다)


