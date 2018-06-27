---
layout: post
title: "C. Propagating tree"
description: ""
categories : development
sub_categories : ""
date: 2015-10-15
tags: []
comments: true
share: true
---

time limit per test2 seconds

memory limit per test256 megabytes

inputstandard input

outputstandard output

  

  

출처 : 이번 [팀원 ](https://www.wixsoft.com)들이랑 같이 풀 문제 찾고있는 중
발견('http://codeforces.com/problemset/problem/383/C')  

Iahub likes trees very much. Recently he discovered an interesting tree named
propagating tree. The tree consists of n nodes numbered from 1 to n, each node
i having an initial value ai. The root of the tree is node 1.

  

This tree has a special property: when a value val is added to a value of node
i, the value -val is added to values of all the children of node i. Note that
when you add value -val to a child of node i, you also add -(-val) to all
children of the child of node i and so on. Look an example explanation to
understand better how it works.

  

This tree supports two types of queries:

  

  * "1 x val" — val is added to the value of node x;
  * "2 x" — print the current value of node x.

In order to help Iahub understand the tree better, you must answer m queries
of the preceding type.

  

**Input**

The first line contains two integers n and m (1 ≤ n, m ≤ 200000). The second
line contains n integers a1, a2, ..., an (1 ≤ ai ≤ 1000). Each of the next n–1
lines contains two integers vi and ui (1 ≤ vi, ui ≤ n), meaning that there is
an edge between nodes vi and ui.

  

Each of the next m lines contains a query in the format described above. It is
guaranteed that the following constraints hold for all queries: 1 ≤ x ≤ n, 1 ≤
val ≤ 1000.

  

**Sample test(s)**

input

1

2

3

4

5

6

7

8

9

10

11

5 5

1 2 1 1 2

1 2

1 3

2 4

2 5

1 2 3

1 1 2

2 1

2 2

2 4

[cs](http://colorscripter.com/info#e)

  
output

  

1

2

3

3

3

0

[cs](http://colorscripter.com/info#e)

  

**Note**

The values of the nodes are [1, 2, 1, 1, 2] at the beginning.

  

Then value 3 is added to node 2. It propagates and value -3 is added to it's
sons, node 4 and node 5. Then it cannot propagate any more. So the values of
the nodes are [1, 5, 1, - 2, - 1].

  

Then value 2 is added to node 1. It propagates and value -2 is added to it's
sons, node 2 and node 3. From node 2 it propagates again, adding value 2 to
it's sons, node 4 and node 5. Node 3 has no sons, so it cannot propagate from
there. The values of the nodes are [3, 3, - 1, 0, 1].

  

You can see all the definitions about the tree at the following link:
http://en.wikipedia.org/wiki/Tree_(graph_theory)

  

  

