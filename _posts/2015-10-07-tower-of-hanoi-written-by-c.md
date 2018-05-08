---
layout: post
title: "[C] 하노이탑 (Tower of Hanoi) - 재귀함수 활용"
description: ""
categories : development
sub_categories : ""
date: 2015-10-07
tags: []
comments: true
share: true
---

```
#include <stdio.h>

void Hanoi(int n, char A, char B, char C)

{ //NumberOfDisk: n, from:A, temp:B, to:C

if ( n < 1 )

return;

Hanoi(n-1, A, C, B);

printf("%c -> %c\n", A, C);

Hanoi(n-1, B, A, C);

}

int main()

{

Hanoi(4, 'A', 'B', 'C');

return 0;

}
```
  

  

**OUTPUT**

  

A -> B

A -> C

B -> C

A -> B

C -> A

C -> B

A -> B

A -> C

B -> C

B -> A

C -> A

B -> C

A -> B

A -> C

B -> C

  

  

