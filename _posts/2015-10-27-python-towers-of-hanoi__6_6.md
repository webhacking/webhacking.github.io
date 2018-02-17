---
layout: post
title: "python towers of hanoi__6_6"
description: ""
categories : development
sub_categories : ""
date: 2015-10-27
tags: []
comments: true
share: true
---


    def hanoi_imp(n, curr, dest, rest):
        if n == 0: return
        hanoi_imp(n - 1, curr, rest, dest)
        print("move %n from %s to %s" % (n, curr, dest))
        hanoi_imp(n - 1, rest, dest, curr)
        return
    def hanoi_fun(n, curr, dest, rest):
        return [] if n == 0 else (
            hanoi_fun(n - 1, curr, rest, dest) + 
            [(n, curr, dest)] + 
            hanoi_fun(n - 1, rest, dest, curr))
    def hanoi_gen(n, curr, dest, rest):
        if n == 0: return
        for _ in hanoi_gen(n - 1, curr, rest, dest): yield _
        yield (n, curr, dest)
        for _ in hanoi_gen(n - 1, rest, dest, curr): yield _
        return
    def hanoi_cps(n, curr, dest, rest, acc=[], cont=lambda acc: acc):
        return cont(acc) if n == 0 else hanoi_cps(
            n - 1, curr, rest, dest, acc, lambda acc: hanoi_cps(
                n - 1, rest, dest, curr, acc + [(n, curr, dest)], cont))
    if __name__ == "__main__":
        hanoi_imp(3, "A", "B", "C")
        print(hanoi_fun(3, "A", "B", "C"))
        print(list(hanoi_gen(3, "A", "B", "C")))
        print(hanoi_cps(3, "A", "B", "C"))
        pass

