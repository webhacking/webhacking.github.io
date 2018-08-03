---
title: AWS CodeDeploy와 Bitbucket를 통한 배포 자동화
layout: post
categories : development
background_image: /assets/images/posts/automatically-deploy-from-bitbucket-using-aws-codedeploy/cover.png
---

> 작성 중....

이직한 회사에서 배포 시스템 구현 업무를 담당 받게 되었다. (야호 !)
전 회사에서 처음 배포 시스템을 주도적으로 구현 하면서 여러 애로 사항들을 겪으며 학습한 덕분에, 이번 배포 프로세스는 좀 더 무난히 구현할 수 있었던 것 같다.
이번을 계기로 백엔드 개발자에게 있어서 배포란 필연적 관계인 것 같다.

실제 배포 시스템을 구성하기전 아래와 같은 지향점을 논의하게 되었다.

- 쉽고, 용이
- 무중단
- 자동화
- 롤백
- 안정성
- AWS 리소스 최대한 활용

따라서 위 요건을 모두 충족하는 "AWS CodeDeploy" 를 통해 구성하기로 했다.
**AWS 리소스 최대한 활용** 이 아니 었다면, 전 회사 프로젝트에서 구현한 도커를 통한 무중단 배포 시스템을 구현했을 것 같다.
도커를 통한 무중단 배포에 대해서는 일전 블로그에 정리하여 포스팅한 적 있으니 참고 바란다.
그래도 해당 요소 덕분에 새로운 학습을 할 수 있어서 의미 있는 시간이었다.

# What is AWS CodeDeploy ?
![codedeploy](/assets/images/posts/automatically-deploy-from-bitbucket-using-aws-codedeploy/codedeploy-arch.jpg)

# How does it work?





