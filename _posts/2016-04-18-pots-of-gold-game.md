---
layout: post
title: "Pots of gold game"
description: ""
categories : etc
sub_categories : ""
date: 2016-04-18
tags: ['Pots of gold game', '구글', '기술', '전화면접']
comments: true
share: true
---

Pots of gold game: Two players A & B. There are pots of gold arranged in a
line,

each containing some gold coins (the players can see how many coins are there
in each gold pot - perfect information).

They get alternating turns in which the player can pick a pot from one of the
ends of the line.

The winner is the player which has a higher number of coins at the end.

The objective is to "maximize" the number of coins collected by A, assuming B
also plays optimally.

  

A starts the game.

  

The idea is to find an optimal strategy that makes A win knowing that B is
playing optimally as well. How would you do that?

At the end I was asked to code this strategy!

  

구글전화 면접으로도 유명한, Pots of gold game

이 게임의 목표는 A가 먼저 게임을 시작할 때 A가 가장 많은(Maximize) 금화를 가질 수 있도록 하는 것이다.

B 역시 최적의 알고리즘으로 항아리를 선택한다고 가정한다.

  

탐색트리가 너무 많아서 depth가 커지는 경우가 발생한다..

    pots = [...] cache = {}def optimal(left, right, player):    if left > right:        return 0    if (left, right, player) in cache:        return cache[(left, right, player)]    if player == 'A':        result = max(optimal(left + 1, right, 'B') + pots[left],                     optimal(left, right - 1, 'B') + pots[right])    else:        result = min(optimal(left + 1, right, 'A'),                     optimal(left, right - 1, 'A'))    cache[(left, right, player)] = result    return result answer = optimal(0, len(pots)-1, 'A')

  

참고

  * https://www.quora.com/Dynamic-Programming-DP-How-do-you-solve-the-pots-of-gold-game

  

