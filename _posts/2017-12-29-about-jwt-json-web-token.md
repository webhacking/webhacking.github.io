---
layout: post
title: "JWT(JSON Web Token)에 대해 알아보자"
description: ""
categories : development
sub_categories : ""
date: 2017-12-29
tags: ['json web token', 'jwt']
background_image: /assets/images/posts/850/99DB103A5A50BD9732FA29.PNG
---

단어가 모든걸 뜻을 나타내 듯, [JWT](https://jwt.io/)는 JSON을 이용한 Web Token 이며, 웹표준([RFC
7519](https://tools.ietf.org/html/rfc7519))이다.

Claim Base Token 이며, 두 개체에서 JSON 객체를 이용해 자가수용적(Self-contained)이며 가볍고 안전하다.

HTTP Authorization Hearder 또는 URI 쿼리 파라미터 등에 공백 사용이 불가능한 곳에서 사용하기 적합하다.

위에서 말한 Claim 이란 사용자에 대한 프로퍼티나 속성을 뜻 한다.

  

즉, 토큰 자체가 정보를 가지고있는 방식이다.

JWT의 경우 앞서 말했 듯 _Claim 을 JSON을 이용_해 다룬다.

  

> JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact
and self-contained way for securely transmitting information between parties
as a JSON object. This information can be verified and trusted because it is
digitally signed. JWTs can be signed using a secret (with the HMAC algorithm)
or a public/private key pair using RSA

  

Claim Base 와 다르게 OAuth 의 경우 발급되는 access_token 통상적으로 일반 랜덤 스트링이며, 아무런 의미를 가지고
있지 않다.

요청된 access_token 값을 통해서 서버는 이용자의 권한을 확인 후 허용해주는 구조를 가지고있다.

따라서 서버는 해당 access_token 관련 정보를 서버의 가지고 있어야한다.

  

Claim Base 의 경우 서버에 위와 같은 token과 연관된 정보를 저장하지 않으므로 이용자 요청에 대해 리소스를 절얄할 수 있는
반면에, 이는 동시에 서버가 가지는 통제력을 무력화 한다. 따라서 서버는 클라이언트에서 요청한 모든 정보를 모두 신뢰해야한다.

또한 서버측에서 개개의 JWT를 무효화 하는 것은 실상 너무 비효율적이다.

서명에 사용된 비밀키를 무효화할 경우 해당 키로 서명된 모든 JWT 키는 무효화가 된다.

  

  

### JWT의 구조

  

JWT는 아래와 같이 점을 기준으로 3개의 형태로 구분된 구조를 가지고있다.

형태는 각각 JOSE Header(JSON Object Signing and Encryption), JWT Claim Set,
Signature이라 부른다.

  
```
Header.Payload.Signature
```
  

  

![](/assets/images/posts/850/99DB103A5A50BD9732FA29.PNG)

  

  

  

위 구조에 Header와 Payload 는 암호화 되지 않았고 단순 Base64 URL Encoding이 되어있다.

암호화는 Signature에만 적용되어있다.

아래는 JWT Token 값 이다.

  

    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ

  

> JWT는 안전하다 얘기하지만, 보안적으로 결함의 소지는 있다.
> 엘런튜링이
[에니그마](https://ko.wikipedia.org/wiki/%EC%97%90%EB%8B%88%EA%B7%B8%EB%A7%88)를 통해
나치의 암호문을 해독하듯이 공격자가 당신의 암호문 또한 해독에 성공 할 수 있다.
> 따라서 토큰의 TTL 주기를 짧게 설정하기를 권장한다.
> 무결성(Integrity)을 보장방식으로 JWT는 HMAC 를 채택하고있다.
> HMAC은 Hash-based Message Authentication Code의 준말이며, Hash화 된 키를 사용하여 메세지의
무결성을 검증하는 방법이다.
> 추가로 'replay attack'을 방지하기 위해 timestamp 값을 통해서 보안 이슈를 예방할 수 있다.
> 즉 변조는 불가능하나 Hash 에 사용된 서버측 비밀키가 노출될 경우, 보안의 아주 치명적이다.


![](/assets/images/posts/850/998B574C5A50A8F9284637.PNG)



### Header

  

세 항목 중, 첫 번째인 헤더는 토큰의 인증방법과 암호화 알고리즘을 정의한다.

아래 데이터를 참고해보자.

  
'alg' 키와 'typ' 키값이 보일텐데, alg 는 보안알고리즘을 의미하고 typ 는 인증방법을 의미한다.

기재된 알고르즘은 토큰을 검증 할 때 사용되는 signature 부분에서 사용된다.

  

아래 예제 데이터셋에서 HS256 는 HMAC SHA-256이라는 의미한다.

HS256 외에도 HS512, RSASSA-PKCS1-v1_5 + SHA256, ECDSA + P-256 + SHA256 등의 알고리즘을
사용할 수 있다.

  

```
{
    "alg":"HS256",
    "typ":"JWT"
}
```

  

### Payload(Claims)

  

토큰에 담을 정보가 들어있다.

정보의 한 단위를 claim이라 말하고 key/value 한 쌍으로 이루어져있다.

  

클레임의 종류는 registered claim, public claim, private claim 세 가지가 있다.

  

1\. registered claim

  

토큰에 대한 정보들을 담기위하여 이미 정해진 클레임들이다.

모두 필수 값은 아니다.

  * iss(issuer) 토큰 발급자
  * sub(subject) : 토큰 제목
  * aud(audience) : 토큰 대상
  * exp(expiraton) : 만료시간
  * nbf(Not Before) : 토큰 활성 날짜
  * iat(issued at) : 발급시간
  * jti(JWT Identification) : JWT의 고유 식별자

2\. public claim

  

혹여 발생할 수 있는 conflit 방지를 위해 collision-resistant 이름을 가져야한다.

'__' 형식을 취하는 것도 좋다. (e.g. __hax0r_name)

  

3\. private claim

  

클라이언트와 서버간의 협의하에 사용되는 클레임들이다.

  

  

### Signature

  

Header 와 Payload를 Base64 인코딩한 값으로 합친 후, 비밀키를 통해 해쉬하여 생성한 값 이다.

아래는 pseudocode 로 나타낸 구조다.

  

```

headerMyHeaders = {
    "alg": "HS256", //denotes the algorithm (shorthand alg) used for the  signature is HMAC SHA-256
    "typ": "JWT" //denotes the type (shorthand typ) of token this is
}

Claims = {   
   "sub": "a@hax0r.info",   
   "name": "Woo YoungJun",   
   "role": "user"
}

var headers = base64URLencode(headerMyHeaders);
var claims = base64URLencode(Claims);
var payload = header + "." + claims;
var signature = base64URLencode(HMACSHA256(payload, secret));
var encodedJWT = payload + "." + signature;
```
  

### 마치며



`JWT`는 확실히 서버측의 부담을 덜어주는 것은 사실이다.

하지만 사용함에 있어서 주의할 점들이 몇가지 있다.

위에서 말 했듯이 클레임셋은 암호화 되지 않으니 이 곳에는 보안에 이슈가 생길 만한 데이터를 저장하면 안된다.

클레임셋에 데이터가 많으면 많을수록 토큰의 길이 또한 길어지니 이 점 또한 유의해야한다.

  

뭐든지 상황에 맞게 적재적소에 사용하는 것이 개발자의 덕목이다.

  

  

  

  

