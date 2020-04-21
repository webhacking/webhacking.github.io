---
layout: post
title: "Javascript filename naming convention"
description: ""
categories : development
sub_categories : ""
date: 2017-01-11
tags: []
comments: true
share: true
---

  

주로 내가 사용했던 방법은 큰 분류의 디렉토리별로 묶고 그 항목 아래 트리 형식으로 구성하여 실질적으로 파일명에는 영향력을 미치지 않았다.
하지만 일관성이 없고 확장성이 없어 어떤식으로 해결할지 고민하다가 찾은 문서의 내용을 좀 참고하여 정리하고자한다.

  

일반적으로 한 모듈 당 버전 또한 따로 히스토리를 남기지 않는 경우가 많다.

업데이트 사항에 따라서 버전을 구분한다면 좀 더 유연한 프로그램을 구성할 수 있다.

아래 방식으로 jQuery가 사용하는 명명규칙이다.

물론 이전의 나와 같이 자신만의 규칙을 만들어 작업할 수 도 있다.

해당 구조를 본 떠 자신의 규칙을 좀 더 일관성있고 유연하게 만들 수 있다.

One possible naming convention is to use something similar to the naming
scheme jQuery uses.

It's not universally adopted but it is pretty common

  

    product-name.plugin-version.filetype.js

  

where the product-name \+ plugin pair can also represent a namespace and a
module.

The version and filetype are usually optional.

  

filetype can be something relative to how the content of the file is. Often
seen are:

  

  * min for minified files
  * custom for custom built or modified files

Examples:

  * jquery-1.4.2.min.js
  * jquery.plugin-0.1.js
  * myapp.invoice.js

  

**참고**

http://stackoverflow.com/questions/7273316/what-is-the-javascript-filename-
naming-convention

