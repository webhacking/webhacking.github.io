---
layout: post
title: "Codility - PtrListLen 알고리즘 풀이"
description: ""
categories : development
sub_categories : ""
date: 2017-07-19
tags: ['Codility', 'Codility PtrListLen', '알고리즘 풀이']
comments: true
share: true
background_image: /assets/images/posts/785/2105CE33596F1E25249094.PNG
---
  

## PtrListLen

회사에서 면접 진행하기 앞 서, 면접자에게 문제를 주기 전

먼저 Codility 문제를 풀어보고 난이도를 판단해서 문제를 고르기로하여 간단하게 문제를 풀어보았다.


A pointer is called a linked list if:

  

  * it is an empty pointer (it is then called a terminator or an empty list); or
  * it points to a structure (called a node or the head) that contains a value and a linked list (called the tail).
  * The length of a list is defined as the total number of nodes it contains. In particular, an empty list has length 0.

  

For example, consider the following linked list:

  

A -> B -> C -> D ->

This list contains four nodes: A, B, C and D. Node D is the last node and its
tail is the terminator. The length of this list is 4.

  

Assume that the following declarations are given:

  

    class IntList {  var $value = 0;  var $next = NULL;}

  

Write a function:

  

    function solution($L);

  

that, given a non-empty linked list L consisting of N nodes, returns its
length.

  

For example, given list L shown in the example above, the function should
return 4.

  

Assume that:

  

N is an integer within the range [1..5,000];

list L does not have a cycle (each non-empty pointer points to a different
structure).

In your solution, focus on correctness. The performance of your solution will
not be the focus of the assessment.

  

## 작성한 코드


    function solution($m)
    
    {
    
         // var_dump($m);
    
         $counter = 0;
    
         while ( $m ) {
    
             $m = $m->next;
    
             $counter++;
    
         }
    
         
    
         
    
        //   var_dump($counter);
    
         return $counter;
    
    }


![](/assets/images/posts/785/2105CE33596F1E25249094.PNG)

  

  

