---
title: Nest 에서 gRPC
layout: post
categories : development
background_image: '/assets/images/posts/2020-06-23-grpc-with-nest/grpc-thumbnail.png'
---

본 문서는 gRPC 를 통해 Node 환경에서 마이크로 서비스를 개발하면서 느낀 고충에 대해 공유하고 있다.
NestJS 라는 특정 프레임 워크를 사용했으며, 참조되는 코드의 모듈들 또한 해당 프레임 워크와 연관되어 있다. 본인은 gRPC 를 프로덕트에 적용해보며 실제로 높은 성능과 혁신적인 생산성을 경험할 수 있었다 이 문서를 보는 구독자 또한 이와 같은 경험을 가질 수 있었으면 하는 바람이다. 

gRPC 는 HTTP/2 레이어 위에서 `Protocol Buffers` 를 사용해 직렬화된 바이트 스트림으로 통신하므로 기존 REST API JSON 또는 XML 기반의 통신 보다 더 가볍고 통신 속도 또한 빠르다. 또한 인증, 양방향 스트리밍, timeout, cancellation, 블럭킹, 넌블럭킹등의 기능을 제공한다.
때문에 internal 통신이 빈번한 마이크로 서비스 구조에서 gRPC 를 적용했을 때, latency 감소 및 더 많은 트래픽을 처리하는 성능의 이점을 기대할 수 있다.

![](/assets/images/posts/2020-06-23-grpc-with-nest/grpc-thumbnail.png)

gRPC 의 역사는 구글의 데이터 센터에서 실행되는 수 많은 마이크로서비스들이 10년 이상 사용한 단일 범용 RPC 인프라인 Stubby 에서 시작되었다. 구글은 오래전부터 마이크로서비스 아키텍처를 채택하여 연구해왔고, 내부 서비스들을 연결하기 위해 Stubby 를 만들었다. 2015년 3월에 Stubby 의 다음 버전을 계획하면서 오픈소스화를 결정했고, 구글의 내외부 서비스뿐만 아니라 모바일, IOT 등 다양한 환경에서도 활용하기 위해서 gRPC 를 만들었다. 클라우드 기반에서 운용되는 마이크로 서비스들의 상호운용성을 목표로 한 만큼 뛰어난 상호 운용성을 보장한다.  여기서 RPC 란 Remote Procedure Call의 약자로써 원격에 있는 함수를 호출해주는 기능을 말한다. RPC 는 일반적으로 request parameter와 response parameter를 알아야 하기 때문에, 양쪽의 인터페이스 규약을 IDL 등의 언어로 정의한후, 해당 프로그래밍 언어가 부를 수 있는 형태의 코드로 생성을 해줘야 하는데, 이를 **Skeleton**과 **Stub** 코드라고 한다.
gRPC 의 특징 중 하나는 C/C++ 뿐 아니라 자바나 Ruby, Node, Python 과 같은 대부분의 모던 프로그래밍 언어를 지원한다는 것 이다.


## Protocol Buffers

gRPC 는 JSON 과 같은 데이터 타입을 사용할 수 있지만 통상 구글의 오픈소스 직렬화된 프로토콜인 프로토콜버퍼(Protocol Buffers) 를 이용한다. 개발자는 `proto` 파일에 직렬화하려는 데이터의 구조를 정의하면 된다. Key/Value 로 구성된 필드를 포함하는 논리적 레코드 정보를 가지고 있다.

![](assets/images/posts/2020-06-23-grpc-with-nest/To-use-Protocol-Buffers-it-is-necessary-to-generate-code-for-each-message-that-needs.png)

```proto
# person.proto 

syntax = "proto3";

message Person {
  required string name = 1;
  required int32 id = 2;
  optional string email = 3;
}
```

이와 같이 만들어진 proto 파일은 프로토콜버퍼 컴파일러인 protoc 를 이용해서 원하는 언어의 데이터 액세스 클래스 코드로 만든다. 선택한 언어가 C++ 이라면 컴파일러는 Person 이라는 클래스를 만들 것 이다. 그 다음 응용 프로그램에서는 이 클래스를 이용하여 Person 프로토콜버퍼 메시지를 채우고 **직렬화** 할 수 있다.

팁을 드리자면 `syntax = "proto3";` 를 적지 않으면 기본적으로 `proto2` 로 인식한다.
proto3 는 모든 키 값에 대해 optional 로 간주한다.

Nest 에서 gRPC 를 사용하고자 한다면 우선 아래 dependency 를 설치하길 바란다.

```
npm i --save grpc @grpc/proto-loader
```

그리고 부트스트래핑 되는 `main.ts` 를 아래와 같이 수정한다.
마이크로 서비스 전송 계층 구현과 마찬가지로 transport, createMicroservice()메소드에 전달 된 옵션 객체 의 속성을 사용하여 gRPC 전송기 메커니즘을 선택한다.

기본적으로 `5000` 포트로 시작된다.

```javascript
const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  transport: Transport.GRPC,
  options: {
    package: 'person',
    protoPath: join(__dirname, 'person.proto'), // 아까 만든 person proto 경로
  },
});

await app.listenAsync();
```

아래와 같이 실행된 것을 확인할 수 있다.

```
[Nest] 33368   - 06/24/2020, 10:01:17 AM   [NestFactory] Starting Nest application...
[Nest] 33368   - 06/24/2020, 10:01:17 AM   [InstanceLoader] AppModule dependencies initialized +11ms
[Nest] 33368   - 06/24/2020, 10:01:17 AM   [NestMicroservice] Nest microservice successfully started +89ms
```


> 작성 중 ...