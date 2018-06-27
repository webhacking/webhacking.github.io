---
layout: post
title: "Dynamo 내부 파티션 관련"
description: ""
categories : development
sub_categories : ""
date: 2016-04-14
tags: []
comments: true
share: true
---

파티션 1개는 최대 3,000 읽기 용량 단위 또는 1,000 쓰기 용량 단위를 지원할 수 있습니다.

테이블 생성시 파티션의 초기 번호를 다음과 같이 표현할 수 있습니다.

    ( readCapacityUnits / 3,000 ) + ( writeCapacityUnits / 1,000 ) = initialPartitions (rounded up)

  

예를 들어 1,000 읽기 용량 단위와 500 쓰기 용량 단위를 수용하는 테이블을 생성했다고 가정하겠습니다.

이 경우 파티션의 초기 번호는 다음과 같습니다.

  

    ( 1,000 / 3,000 ) + ( 500 / 1,000 ) = 0.8333 --> 1

  

따라서 단일 파티션은 테이블의 프로비저닝된 처리량 요구 사항을 모두 수용할 수 있습니다.

그러나 1,000 읽기 용량 단위 및 1,000 쓰기 용량 단위를 수용하는 테이블을 생성했다면 파티션 1개는 지정된 처리 능력을 지원할 수
없습니다.

  

    ( 1,000 / 3,000 ) + ( 1,000 / 1,000 ) = 1.333 --> 2

이 경우 테이블에는 500 읽기 용량 단위와 500 쓰기 용량 단위의 파티션이 각각 하나씩 필요합니다.

  

* 이 공식으로 한번 늘어나면 capacity를 줄여도 파티션이 줄어들지 않는다고 합니다.

그래서 구매해 둔 capacity가 파티션마다 균등하게 분할되어서 10개의 파티션이 있고 1000 capacity가 있으면 파티션마다 100
capacity만 할당되어서 실제로 1000을 쓰지 못하더라도 throttle이 발생한다고 합니다.

그리고 파티션이 늘어나게 될 때 문서 상으로는 백그라운드 작업으로 늘어난다고 하는데 실제로는 수십초~수분 정도 dynamodb가 응답하지
않는 경우가 많습니다. 따라서 이 정보를 감안하여, **capacity **값을 잘 설정해야 합니다.

  

참고

  * http://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/GuidelinesForTables.html

  

