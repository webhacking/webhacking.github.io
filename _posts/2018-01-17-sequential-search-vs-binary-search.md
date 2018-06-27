---
title: Sequential Search vs Binary Search
layout: post
categories : development
background_image: /assets/images/posts/sequential-search-vs-binary-search/seqvsbinary.png
---

![seq-vs-binary](/assets/images/posts/sequential-search-vs-binary-search/seqvsbinary.png)

두 알고리즘의 시간 복잡도 기준으로 비교 시, 순차 탐색 알고리즘은 $O(n)$이고 이진 탐색 알고리즘은 $O(long)$ 이므로 당연히 퍼포먼스적 우위는 후자일 것이라 생각한다.
하지만 이는 언제 까지나 오름차순으로 `데이터가 정렬`되어 있다고 가정 되어야 한다.
일반적인 정렬 알고리즘은 $O(nlogn)$의 시간 복잡도를 가지기에 무조건적으로 이진탐색이 좋다고 단정지으면 안된다.
결론적으로 데이터가 정렬 되어있지 않다면 이진탐색을 권장 안하는게 좋다.
이진 탐색은 결론적으로 정렬된 데이터의 집합을 이분화 하면서 탐색하기 때문이다.

