---
layout: post
title: "스타일시트 셀렉터"
description: ""
categories : development
sub_categories : ""
date: 2015-10-18
tags: []
comments: true
share: true
---

  

자꾸 까먹어서 포스팅하게됬다. . .

참고자료('http://www.w3.org/TR/CSS21/selector.html%23id-selectors')

  

**Pattern matching**

In CSS, pattern matching rules determine which style rules apply to elements
in the [document
tree](http://www.w3.org/TR/CSS21/conform.html#doctree)('돔트리'). These patterns,
called selectors, may range from simple element names to rich contextual
patterns. If all conditions in the pattern are true for a certain element, the
selector matches the element.

  

The case-sensitivity of document language element names in selectors depends
on the document language. For example, in HTML, element names are case-
insensitive, but in XML they are case-sensitive.

  

The following table summarizes CSS 2.1 selector syntax:

PatternMeaningDescribed in section

*
Matches any element.

Universal selector

E

Matches any E element (i.e., an element of type E).

Type selectors

E F

Matches any F element that is a descendant of an E element.

Descendant selectors

E > F

Matches any F element that is a child of an element E.

Child selectors

E:first-child

Matches element E when E is the first child of its parent.

The :first-child pseudo-class

E:link  
E:visited

Matches element E if E is the source anchor of a hyperlink of which the target
is not yet visited (:link) or already visited (:visited).

The link pseudo-classes

E:active  
E:hover  
E:focus

Matches E during certain user actions.

The dynamic pseudo-classes

E:lang(c)

Matches element of type E if it is in (human) language c (the document
language specifies how language is determined).

The :lang() pseudo-class

E + F

Matches any F element immediately preceded by a sibling element E.

Adjacent selectors

E[foo]

Matches any E element with the "foo" attribute set (whatever the value).

Attribute selectors

E[foo="warning"]

Matches any E element whose "foo" attribute value is exactly equal to
"warning".

Attribute selectors

E[foo~="warning"]

Matches any E element whose "foo" attribute value is a list of space-separated
values, one of which is exactly equal to "warning".

Attribute selectors

E[lang|="en"]

Matches any E element whose "lang" attribute has a hyphen-separated list of
values beginning (from the left) with "en".

Attribute selectors

DIV.warning

_Language specific._ (In HTML, the same as DIV[class~="warning"].)

Class selectors

E#myid

Matches any E element with ID equal to "myid".

ID selectors

  

