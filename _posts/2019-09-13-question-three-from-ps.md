---
title: 레벨 3 문제
layout: post
categories : development
tags: ['algorithm']
---

국가의 역할 중 하나는 여러 지방의 예산요청을 심사하여 국가의 예산을 분배하는 것입니다. 국가예산의 총액은 미리 정해져 있어서 모든 예산요청을 배정해 주기는 어려울 수도 있습니다. 그래서 정해진 총액 이하에서 가능한 한 최대의 총 예산을 다음과 같은 방법으로 배정합니다.

1. 모든 요청이 배정될 수 있는 경우에는 요청한 금액을 그대로 배정합니다.
2. 모든 요청이 배정될 수 없는 경우에는 특정한 정수 상한액을 계산하여 그 이상인 예산요청에는 모두 상한액을 배정합니다. 
   상한액 이하의 예산요청에 대해서는 요청한 금액을 그대로 배정합니다. 
예를 들어, 전체 국가예산이 485이고 4개 지방의 예산요청이 각각 120, 110, 140, 150일 때, 상한액을 127로 잡으면 위의 요청들에 대해서 각각 120, 110, 127, 127을 배정하고 그 합이 484로 가능한 최대가 됩니다.
각 지방에서 요청하는 예산이 담긴 배열 budgets과 총 예산 M이 매개변수로 주어질 때, 위의 조건을 모두 만족하는 상한액을 return 하도록 solution 함수를 작성해주세요.

## 내 풀이

자바스크립트로 작성했음.
레벨 4부터는 좀 어려워질 것 같은데

```javascript
/*
    지방의 수는 3 이상 100,000 이하인 자연수입니다.
    각 지방에서 요청하는 예산은 1 이상 100,000 이하인 자연수입니다.
    총 예산은 지방의 수 이상 1,000,000,000 이하인 자연수입니다.
 */
function solution(budgets, M) {
    var answer = 0,
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
