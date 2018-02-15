---
layout: post
title: "Letsencrypt Certificates"
description: ""
categories : ""
sub_categories : ""
date: 2015-12-28
tags: []
comments: true
share: true
---

상세내용 : https://letsencrypt.org/certificates/

Let’s Encrypt will issue certificates to subscribers from its intermediate
CAs, allowing us to keep our root CA safely offline. IdenTrust has cross-
signed our intermediates. This allows our end certificates to be accepted by
all major browsers while we propagate our own root.

  

Under normal circumstances, certificates issued by Let’s Encrypt will come
from “Let’s Encrypt Authority X1”. The other intermediate, “Let’s Encrypt
Authority X2”, is reserved for disaster recovery and will only be used should
we lose the ability to issue with “Let’s Encrypt Authority X1”.

  

**Cross Signing**

Our intermediate “Let’s Encrypt Authority X1” represents a single
public/private key pair. The private key of that pair generates the signature
for all end-entity certificates (also known as leaf certificates), i.e. the
certificates we issue for use on your server.

  

Our intermediate is signed by ISRG Root X1. However, since we are a very new
certificate authority, ISRG Root X1 is not yet trusted in most browsers. In
order to be broadly trusted right away, our intermediate is also cross-signed
by another certificate authority, IdenTrust, whose root is already trusted in
all major browsers. Specifically, IdenTrust has cross-signed our intermediate
using their DST Root CA X3.

  

That means there are two certificates available that both represent our
intermediate. One is signed by DST Root CA X3, and the other is signed by ISRG
Root X1. The easiest way to distinguish the two is by looking at their Issuer
field.

  

When configuring a web server, the server operator configures not only the
end-entity certificate, but also a list of intermediates to help browsers
verify that the end-entity certificate has a trust chain leading to a trusted
root certificate. Almost all server operators will choose to serve a chain
including the intermediate certificate with Subject “Let’s Encrypt Authority
X1” and Issuer “DST Root CA X3.” The official Let’s Encrypt software will make
this configuration seamlessly.

  

The following picture explains the relationships between our certificates
visually:

  

  

![](/assets/images/posts/453/22193C4E5680AAD01C247E.PNG)

  

