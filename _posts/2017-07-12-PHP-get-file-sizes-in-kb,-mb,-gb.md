---
layout: post
title: "PHP get file sizes in kb, mb, gb"
description: ""
date: 2017-07-12
tags: []
comments: true
share: true
---

필요로 하는 이용자가 있을 것 같아,
[gist](https://gist.github.com/webhacking/25a43fbb7cc8957533883131bc06dccb) 에도
별도로 등록해두었다.

첫번째 인자 값으로는 해당하는 파일의 path 두번째 인자에는 반환 받길 원하는 단위를 기입하여 호출하면된다.

  

  

    function formatBytes(string $file, string $type) : int{   switch ( $type ) {       /* bytes to KB */      case \"KB\":         $filesize = filesize($file) * .0009765625;      break;      /* bytes to MB */      case \"MB\":         $filesize = (filesize($file) * .0009765625) * .0009765625;      break;      /* bytes to GB */      case \"GB\":         $filesize = ((filesize($file) * .0009765625) * .0009765625) * .0009765625;      break;   }      return round($filesize, 2).\' \'.$type;}

  

