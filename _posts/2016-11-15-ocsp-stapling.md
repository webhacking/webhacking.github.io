---
layout: post
title: "OCSP stapling"
description: ""
categories : etc
sub_categories : ""
date: 2016-11-15
tags: []
comments: true
share: true
---

> OCSP stapling, formally known as the TLS Certificate Status Request
extension, is an alternative approach to the Online Certificate Status
Protocol (OCSP) for checking the revocation status of X.509 digital
certificates.[1] It allows the presenter of a certificate to bear the resource
cost involved in providing OCSP responses by appending ("stapling") a time-
stamped OCSP response signed by the CA to the initial TLS handshake,
eliminating the need for clients to contact the CA

>

>  

OCSP 정보를 서버에 캐싱해두고 인증서와 함께 클라이언트게 응답함.

