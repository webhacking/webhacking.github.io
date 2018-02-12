---
layout: post
title: "Avoid Character Encoding Problems, 엑셀 한글 파일명 깨짐 현상"
description: ""
date: 2016-12-09
tags: ['Avoid Character Encoding Problems', 'php 엑셀', 'php 인코딩', '엑셀 한글깨짐', '인코딩 문제']
comments: true
share: true
---

**문제점 :**

엑셀 다운로드 시, 한글이 기재된 파일이름이 깨지는 현상. 이 현상은 캐릭터셋이 동일하지 않아 발생하는 경우가 대부분 입니다.

  

**해결방안 :**

따라서 PHP 내부 함수 중, `iconv` 를 통하여 UTF-8 캐릭터셋으로 변경(인코딩)합니다.

  

string iconv ( string $in_charset , string $out_charset , string $str )

  

  

    $ExName = iconv('UTF-8', 'UTF-8', '파일명');
    header('Content-Type: application/vnd.ms-excel;charset=utf-8');
    header('Content-Disposition: attachment;filename="' . $ExName. '.xls"');
    header('Cache-Control: max-age=0');
    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
    $objWriter->save('php://output');

