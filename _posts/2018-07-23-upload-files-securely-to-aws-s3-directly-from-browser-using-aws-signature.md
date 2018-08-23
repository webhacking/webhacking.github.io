---
title: Upload Files Securely To AWS S3 Directly From Browser Using AWS Signature
layout: post
categories : development
---

> 이 문서는 아직 작성 중에 있습니다.

# Introduction

S3에 파일 업로드 또는 다운로드 하는 행위에 대해 통상 우리는 서버를 경유해서 진행한다.
경유하는 이유는 AWS는 이러한 행위에 대해 인증 정보(Access Key, Secret Key)를 필요로하는데 이 정보는 외부에 노출이 되면 안되기 때문이다.
하지만 이러한 방법은 매 요청 마다 서버의 자원을 소모하기 때문에 트래픽이 많은 서버스의 경우 다소 부담스러울 수 있을 뿐만 아니라 전송되는 속도 또한 해당 경유 서버에 제약을 받기 때문에 퍼포먼스 이슈 또한 초례할 수 있다.
이때, `AWS Signature` 를 통해 파일 관리를 한다면 이러한 부담에서 상대적으로 벗어날 수 있다.
또한 이와 같은 방법은 클라이언트에서 주도적으로 S3 리소스를 활용할 수 있기에 제약사항을 두지않고 좀 더 자유롭게 시스템을 구축 할 수 있다.
그러나 이 방법으로 인해 꼭 서버가 불필요한 것은 아니다.
이 문서에서 담고자하는 내용에서는 별도의 Signature 서버를 필요로한다.
물론 `AWS Signature` 는 범용적으로 사용할 수 있기에 클라이언트 서버 둘다 사용이 가능하는므로 Signature 서버 또한 필수사항은 아니다.
하지만 Signing 서버를 두지 않고, 클라이언트가 주체가 되어 관리하는 것은 ***보안성 이슈***로인해 본인은 권장하고 싶지 않다.

이 문서에서는 본인이 `AWS Signature` 를 통한 파일 관리 시스템을 구현 하면서 겪은 내용을 담고 있다.
Signature 의 사용처는 S3의 국한되어있지 않고, 모든 AWS 인프라를 대상으로 한다.
하지만 이 문서에서는 오직 S3리소스에 대한 내용만을 담고자한다.

# Signature

Signature 는 식별을 위한 Access Token 이다.
여기서 Access Token 이라는 표현이 다소 거슬리는데, 식별을 위한 값(서명)이라 생각해두길 바란다.
Signature 생성 과정에는 두 가지의 버전(2, 4)이 존재하는데, 이 문서는 4 버전을 기준으로 하고 있다.

서명 생성 과정에는 Access Key, Secret Key 만 포함되는 것 이 아닌, 여러 안정장치를 위한 파라미터들이 존재한다.
이와 같은 과정을 통해 생성된 Signature 는 이후 AWS 에 요청 시, 계산되며 이로써 무결성을 지향한다.

![sign-to-sign](/assets/images/posts/upload-files-securely-to-aws-s3-directly-from-browser-using-aws-signature/signing-overview.png)

# How it works

생성 과정을 설명 하기 앞 서, Access 권한에 대해 설정이 필요하다.
왜냐하면 권한의 설정을 하지 않는다면 다른 리소스에 대한 접근 또한 가능하기에 유의해야한다.
권한에 설정은 AWS IAM 을 참고하면 된다.

이 후, 아래와 같은 IAM policy 를 추가해야한다. (bucket 명이 hax0r-bucket 이라 가정)

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket",
                "s3:ListAllMyBuckets",
                "s3:GetBucketLocation"
            ],
            "Resource": [
                "arn:aws:s3:::hax0r-bucket
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject"
            ],
            "Resource": [
                "arn:aws:s3:::hax0r-bucket/*"
            ]
        }
    ]
}
```

아래는 Signature 서명 절차를 자바 코드로 구현하 예 이다.

```java
static byte[] HmacSHA256(String data, byte[] key) throws Exception {
    String algorithm="HmacSHA256";
    Mac mac = Mac.getInstance(algorithm);
    mac.init(new SecretKeySpec(key, algorithm));
    return mac.doFinal(data.getBytes("UTF8"));
}

static byte[] getSignatureKey(String key, String dateStamp, String regionName, String serviceName) throws Exception {
    byte[] kSecret = ("AWS4" + key).getBytes("UTF8");
    byte[] kDate = HmacSHA256(dateStamp, kSecret);
    byte[] kRegion = HmacSHA256(regionName, kDate);
    byte[] kService = HmacSHA256(serviceName, kRegion);
    byte[] kSigning = HmacSHA256("aws4_request", kService);
    return kSigning;
}
```

# Reference

- [Signature Version 4 Signing Process](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html)
- [https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html](https://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-authenticating-requests.html)