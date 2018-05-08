---
layout: post
title: "Codility - DeepestPit 알고리즘 풀이"
description: ""
categories : development
sub_categories : ""
date: 2017-07-19
tags: ['Codility', 'Codility DeepestPit', '알고리즘 풀이']
background_image: /assets/images/posts/786/2658E233596F1FA108FB17.PNG
---
  

# DeepestPit

회사에서 면접 진행하기 앞 서, 면접자에게 문제를 주기 전

먼저 Codility 문제를 풀어보고 난이도를 판단해서 문제를 고르기로하여 간단하게 문제를 풀어보았다.

  

전달 되는 인자 값은 array 형태이며 n 개의 정수로 구성되어있다.

max pit depth 값을 반환하면 된다.

  

메소드를 총 세개로 구성하였는데.. 퍼포먼스 이슈가 있어 이 부분에서 감점 받았다..힝


> Given an array of integers, find a bitonic sequence with maximal difference
between the middle term and the first and the last terms.

## Task description

A non-empty zero-indexed array A consisting of N integers is given. A pit in
this array is any triplet of integers (P, Q, R) such that:

  

  * 0 ≤ P < Q < R < N;
  * sequence [A[P], A[P+1], ..., A[Q]] is strictly decreasing, 
  * i.e. A[P] > A[P+1] > ... > A[Q];
  * sequence A[Q], A[Q+1], ..., A[R] is strictly increasing, 
  * i.e. A[Q] < A[Q+1] < ... < A[R].
  * The depth of a pit (P, Q, R) is the number min{A[P] − A[Q], A[R] − A[Q]}.

  

For example, consider array A consisting of 10 elements such that:

  

      A[0] =  0  A[1] =  1  A[2] =  3  A[3] = -2  A[4] =  0  A[5] =  1  A[6] =  0  A[7] = -3  A[8] =  2  A[9] =  3

  

Triplet (2, 3, 4) is one of pits in this array, because sequence [A[2], A[3]]
is strictly decreasing (3 > −2) and sequence [A[3], A[4]] is strictly
increasing (−2 < 0). Its depth is min{A[2] − A[3], A[4] − A[3]} = 2. Triplet
(2, 3, 5) is another pit with depth 3. Triplet (5, 7, 8) is yet another pit
with depth 4. There is no pit in this array deeper (i.e. having depth greater)
than 4.

  

Write a function:

  

    function solution($A);

  

that, given a non-empty zero-indexed array A consisting of N integers, returns
the depth of the deepest pit in array A. The function should return −1 if
there are no pits in array A.

  

For example, consider array A consisting of 10 elements such that:

  

      A[0] =  0  A[1] =  1  A[2] =  3  A[3] = -2  A[4] =  0  A[5] =  1  A[6] =  0  A[7] = -3  A[8] =  2  A[9] =  3

  

the function should return 4, as explained above.

  

Assume that:

  

  * N is an integer within the range [1..1,000,000];
  * each element of array A is an integer within the range [−100,000,000..100,000,000]

Complexity:

  

  * expected worst-case time complexity is O(N);
  * expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).
  * Elements of input arrays can be modified.

  

  

  

## 작성한 코드

  

본 코드는 ... 퍼포먼스 이슈로 인해 점수가 안습입니다 ㅠㅠ

  
    function decreasingA(array $a,int $p,int $q) : bool
    
        {
    
            for ( $i = $p; $i < $q; $i++ ) {
    
                if ( $a[$i] < $a[$i+1] ) {
    
                    return false;
    
                }
    
            }
    
    
    
            return true;
    
        }
    
    
    
    
    
    function increasingA(array $a,int $q,int $r) : bool
    
    {
    
        for ( $i = $q; $i < $r; $i++ ) {
    
            if ( $a[$i] > $a[$i+1] ) {
    
                return false;
    
            }
    
        }
    
    
    
        return true;
    
    }
    
    
    
    function solution(array $a) : int
    
    {
    
        /*
    
            PIT (P,Q,R)
    
    
    
            1) 0 <=  P  < Q < R < N
    
            2) A[P] > A[P+1] > ...  > A[Q]
    
            3) A[Q] < A[Q+1] < ... < A[R]
    
    
    
            pit depth = min{A[P] - A[Q], A[R] - A[Q]}
    
        */
    
    
    
        $p = 0;
    
        $q = $p+1;
    
        $r = $q+1;
    
    
    
    
    
        $result = [];
    
        $length = count($a);
    
        $maxDepth = -1;
    
    
    
        for ( $i = 0; $i < $length-2; $i++ ) {
    
            for ( $j = ($i+1); $j < $length; $j++ ) {
    
                for ( $k = ($j+1); $k < $length; $k++ ) {
    
                    $p = $i;
    
                    $q = $j;
    
                    $r = $k;
    
    
    
                    if ( decreasingA($a,$p,$q) && increasingA($a,$q,$r) ) {
    
                        if ( min($a[$p] - $a[$q], $a[$r] - $a[$q]) > $maxDepth ) {
    
                            $maxDepth = min($a[$p] - $a[$q], $a[$r] - $a[$q]);
    
                        }
    
                    }
    
                }
    
            }
    
        }
    
    
    
        /* return max pit depth */
    
        return $maxDepth;
    
    }
    

  

![](/assets/images/posts/786/2658E233596F1FA108FB17.PNG)

  

