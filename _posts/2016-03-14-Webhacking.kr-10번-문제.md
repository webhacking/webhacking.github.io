---
layout: post
title: "[풀이] Webhacking.kr 10번 문제"
description: ""
date: 2016-03-14
tags: ['WebHacking', '웹해킹', '해킹']
comments: true
share: true
---

좋은 아침이네요. 저번에 9번 문제를 풀이했었죠.

9번 이후 13번 이전까지는 쉬어가는 문제들입니다. 상당히 난도가 낮습니다. 그래서 해당 포스팅에서도 그리 길게 내용을 담지 않으려 합니다.

문제의 주제는 로또를 사는 것 이군요. 그럼 사러가봅시다.

  

    O

  

![](/assets/images/posts/521/264D384556E6155C0E0C45.PNG)

풀이방법은 매우 간단합니다. 해당 태그에 온클릭시의 조건을 봅시다. this.style.posLeft==800

posLeft란 개체의 좌표값을 반환하는 속성입니다. 해당 조건에 맞게 값을 변경해주면 끝. 정말 쉽죵?

  

  

  

