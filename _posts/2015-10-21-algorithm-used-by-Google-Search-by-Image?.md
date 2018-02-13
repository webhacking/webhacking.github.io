---
layout: post
title: "algorithm used by Google Search by Image?"
description: ""
date: 2015-10-21
tags: []
comments: true
share: true
---

[팀](http://www.wixsoft.com/)에서 검색엔진때문에 자료를 찾고있다가 구글 이미지 검색엔진이 궁금해서 자료를 찾아봤다.

  

My guess is that Google probably uses some combination of the following
techniques and ranks the results using a proprietary algorithm.

  

**Feature Detection (Image fingerprinting to look for exact match) & Search by Color & Visual Similarity Search**

  

There are three commonly used feature detection algorithms for matching image
deformation such as blur, rotation, scale, and illumination change.

They are SIFT, PCA-SIFT and SURF

  

  * SIFT is slow and not good at illumination changes, while it is invariant to rotation, scale changes and affine transformations.
  * SURF is fast and has good performance as the same as SIFT, but it is not stable to rotation and illumination changes.
  * PCA-SIFT is the best but it has problems with image blur.

There is no perfect algorithm, so the choice depends mainly on the
application, and what kind of trade-offs the application can tolerate.

  

Example: PixID http://ideeinc.com/products/pixid/

  

더보기 : https://www.quora.com/What-is-the-algorithm-used-by-Google-Search-by-
Image-1

