---
title: 프로그래머스 레벨 3
layout: post
categories : development
tags: ['algorithm']
background_image: '/assets/images/posts/2019-09-13-question-three-from-ps/screen-shot-1.png'
---

사이드 프로젝트(=갬성) 개발하다가 환기좀 시킬겸 프로그래머스 들어가서 문제 풀었다.

![screen-shot](/assets/images/posts/2019-09-13-question-three-from-ps/screen-shot-1.png)

첫번째 문제는 **보행자 천국** 이다. `카카오 코드 페스티벌 예선 4`번에 해당하는 내용이다.

카카오내비 개발자인 제이지는 시내 중심가의 경로 탐색 알고리즘 개발 업무를 담당하고 있다. 최근 들어 보행자가 자유롭고 편리하게 걸을 수 있도록 보행자 중심의 교통 체계가 도입되면서 도심의 일부 구역은 자동차 통행이 금지되고, 일부 교차로에서는 보행자 안전을 위해 좌회전이나 우회전이 금지되기도 했다. 복잡해진 도로 환경으로 인해 기존의 경로 탐색 알고리즘을 보완해야 할 필요가 생겼다.

도시 중심가의 지도는 `m × n` 크기의 격자 모양 배열 `city_map` 으로 주어진다. 자동차는 오른쪽 또는 아래 방향으로 한 칸씩 이동 가능하다

`city_map[i][j]`에는 도로의 상황을 나타내는 값이 저장되어 있다.

- 0인 경우에는 자동차가 자유롭게 지나갈 수 있다.
- 1인 경우에는 자동차 통행이 금지되어 지나갈 수 없다.
- 2인 경우는 보행자 안전을 위해 좌회전이나 우회전이 금지된다. (왼쪽에서 오던 차는 오른쪽으로만, 위에서 오던 차는 아래쪽으로만 진행 가능하다)

도시의 도로 상태가 입력으로 주어졌을 때, 왼쪽 위의 출발점에서 오른쪽 아래 도착점까지 자동차로 이동 가능한 전체 가능한 경로 수를 출력하는 프로그램을 작성하라. 이때 가능한 경로의 수는 컴퓨터가 표현할 수 있는 정수의 범위를 넘어설 수 있으므로, 가능한 경로 수를 20170805로 나눈 나머지 값을 출력하라.

입력은 도시의 크기를 나타내는 m과 n, 그리고 지도를 나타내는 2차원 배열 city_map으로 주어진다. 제한조건은 아래와 같다.

![screen-shot](/assets/images/posts/2019-09-13-question-three-from-ps/oneway500.png)

- 1 <= m, n <= 500
- `city_map`의 크기는 `m × n`이다.
- 배열의 모든 원소의 값은 `0`, `1`, `2` 중 하나이다.
- 출발점의 좌표는 `(0, 0)`, 도착점의 좌표는 `(m - 1, n - 1)`이다.
- 출발점과 도착점의 `city_map[i][j]` 값은 0이다.

> 왼쪽 위부터 오른쪽 아래까지 도달할 수 있는 경우의 수를 세는 문제로, 동적 계획법(Dynamic programming)으로 풀 수 있다.

```
H[i][j]: i행 j열에서 오른쪽으로 갈 수 있는 경우의 수
V[i][j]: i행 j열에서 아래쪽으로 갈 수 있는 경우의 수
```

![screen-shot](/assets/images/posts/2019-09-13-question-three-from-ps/code-festival-round-1-oneway.png)

두번째 문제는 **예산**이다.
국가의 역할 중 하나는 여러 지방의 예산요청을 심사하여 국가의 예산을 분배하는 것입니다. 국가예산의 총액은 미리 정해져 있어서 모든 예산요청을 배정해 주기는 어려울 수도 있습니다. 그래서 정해진 총액 이하에서 가능한 한 최대의 총 예산을 다음과 같은 방법으로 배정합니다.

1. 모든 요청이 배정될 수 있는 경우에는 요청한 금액을 그대로 배정합니다.
2. 모든 요청이 배정될 수 없는 경우에는 특정한 정수 상한액을 계산하여 그 이상인 예산요청에는 모두 상한액을 배정합니다. 
   상한액 이하의 예산요청에 대해서는 요청한 금액을 그대로 배정합니다. 
예를 들어, 전체 국가예산이 485이고 4개 지방의 예산요청이 각각 120, 110, 140, 150일 때, 상한액을 127로 잡으면 위의 요청들에 대해서 각각 120, 110, 127, 127을 배정하고 그 합이 484로 가능한 최대가 됩니다.
각 지방에서 요청하는 예산이 담긴 배열 budgets과 총 예산 M이 매개변수로 주어질 때, 위의 조건을 모두 만족하는 상한액을 return 하도록 solution 함수를 작성해주세요.

이 문제는 아래와 같이 간단하게 풀 수 있다.
다음은 레벨 4풀이를 가져와보겠다.

```javascript
/*
    지방의 수는 3 이상 100,000 이하인 자연수입니다.
    각 지방에서 요청하는 예산은 1 이상 100,000 이하인 자연수입니다.
    총 예산은 지방의 수 이상 1,000,000,000 이하인 자연수입니다.
 */
function solution(budgets, M) {
    let answer = 0,
        mid = 0,
        minimum = 0,
        maximum = 100000,
        total = budgets.reduce((a, b) => a + b);

    budgets.sort();
    if (total < M) {
        return budgets[budgets.length - 1];
    }
    while (true) {
        total = 0;
        mid = (maximum + minimum) / 2;

        for (let i = 0; i < budgets.length; i++) {
            total += budgets[i] < mid ? budgets[i] : mid*(budgets.length- 1 - (i - 1));
            if (budgets[i] > mid) {
                break
            }
        }

        if (mid === answer) {
            return Math.floor(answer);
        }

        total > M ? maximum = mid : minimum = mid;
        answer = mid;

    }

    console.log('budgets', budgets, M);
    return Math.floor(answer);
}

// console.log(solution([120, 110, 140, 150], 485));
```

레벨 3은 클리어했는데, 4부터는 조금 어려울 것 같다.
