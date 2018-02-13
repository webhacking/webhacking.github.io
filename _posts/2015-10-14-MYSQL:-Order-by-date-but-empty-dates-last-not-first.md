---
layout: post
title: "MYSQL: Order by date but empty dates last not first"
description: ""
date: 2015-10-14
tags: []
comments: true
share: true
---

You can do it in MySQL with the ORDER BY clause. Sort by NULL first, then the
date.

> SELECT * FROM your_table ORDER BY (date_column IS NULL), date_column ASC

**Note:** This assumes rows without a date are NULL.

