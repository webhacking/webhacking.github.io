---
layout: post
title: "[탑코더] Single Round Match 643, Division 2, Level 1: TheKingsArmyDiv2"
description: ""
date: 2016-04-13
tags: []
comments: true
share: true
---

원본 문제

https://community.topcoder.com/stat?c=problem_statement&pm=13597&rd=16086

  

The King of Byteland has an army that consists of R*C soldiers. He has just
arranged the soldiers into a grid with R rows and C columns. Two soldiers are
neighbors if they stand next to each other in a row or in a column.

  

Each of the soldiers is currently either happy or sad. You are given their
current states in a String[] **state** with R elements, each containing C
characters. The character **state**[i][j] is either 'H' (if the soldier in row
i, column j is happy) or 'S' (if that soldier is sad).

  

Happiness is contagious. Whenever two neighbors are both happy, they will tell
each other jokes and after a minute that will make all of their neighbors
happy as well.

  

Here's an example. There are two happy neighbors among many sad soldiers:

  

{"SSSSS",

"SSHHS",

"SSSSS"}

  

This is the situation after one minute: all of their neighbors are happy now.

  

{"SSHHS",

"SHHHH",

"SSHHS"}

  

And this is the situation after another minute. Now all the neighbors of the
soldiers that are currently happy became happy as well.

  

{"SHHHH",

"HHHHH",

"SHHHH"}

  

After another minute, all the soldiers in the King's army would be happy.

  

The King wants all his soldiers to be happy. Sometimes it's easy, as in the
above example: all he has to do is wait for a while and all soldiers will
become happy. However, it is not always the case. For example, in the
situation below the happiness would not spread anywhere, each soldier would
remain in his original state forever. (Note that a single happy soldier does
not make his neighbors happy.)

  

{"SSSSS",

"SSHSH",

"HSSSS"}

  

The King can make a soldier happy by giving him an award for excellent
service. Obviously, the King could make all soldiers happy by giving awards to
all of them. But the King is smart and knows that there is a better solution.
He will only give the awards to a few carefully selected soldiers and then he
will simply wait until the happiness spreads to the rest of the army.

  

You are given the String[] **state**. Compute and return the smallest number
of awards the king has to give to make all soldiers happy in the end.

  

  

    public class TheKingsArmyDiv2 {    public int getNumber(String[] state) {        int rtn = 2;        int H = state.length;        int W = state[0].length();                for (int i = 0; i < H; i++) {            for (int j = 0; j < W; j++) {                                if (state[i].charAt(j) == 'H') {                    rtn = 1;                                        if (j+1 < W  && state[i].charAt(j+1) == 'H')                        return 0;                                        if (i+1 < H && state[i+1].charAt(j) == 'H')                        return 0;                }            }        }                return rtn;            }
    }

  

