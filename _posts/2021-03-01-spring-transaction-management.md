---
title: Spring Transaction Management
layout: post
categories : development
background_image: '/assets/images/spring-transaction-management-2.png'
---

요즘 스프링으로 개발을하고있는데, 학습한 내용은 많으나 정리할 시간이 없다는 핑계로 이제서야 짤막한 정리글을 스멀스멀 올리려하고있다.

본문에서는 기본적인 isolation 레벨이나 이외 DB 에 관련된 개념보다는 간략한 스프링에서 트랜잭션 처리를 다루고 있다. 

스프링에서 트랜잭션 처리를 위해 선언적 트랜잭션을 사용한다. 선언적 트랜잭션 방법에는 설정 파일 또는 어노테이션 방식으로 간편하게 트랜잭션에 관한 행위를 정의할 수 있다. 본 문서에서는 @Transactional 어노테이션을 기준으로 다루겠다. 트랜잭션은 Spring AOP를 통해 구현되어있다. 정확하게 말하면, 어노테이션 기반 AOP 를 통해 구현되어있다.

```java
import org.springframework.transaction.annotation.Transactional;
```

따라서 아래와 같은 특징을 가지고 있다.

- 클래스, 메소드에 @Transactional 이 선언되면 해당 클래스에 트랜잭션이 적용된 프록시 객체 생성
- 프록시 객체는 @Transactional 이 포함된 메서드가 호출될 경우, 트랜잭션을 시작하고 Commit 또는 Rollback 을 수행
- CheckedException 또는 예외가 없을 때는 Commit
- UncheckedException이 발생하면 Rollback


![](/assets/images/spring-transaction-management-2.png)

또한 주의점으로 @Transactional 은 우선 순위를 가지고 있다. 클래스 메서드에 선언된 트랜잭션의 우선 순위가 가장 높고, 인터페이스에 선언된 트랜잭션의 우선 순위가 가장낮다. (우선 순위는 아래와 같다.)

> 클래스 메소드 -> 클래스 -> 인터페이스 메소드 -> 인터페이스

따라서 공통적인 트랜잭션 규칙은 클래스에 두고 특별한 규칙은 메서드에 선언하는 식으로 구성할 수 있다. 또한 인터페이스 보다는 클래스에 적용하는 것을 권고한다.

- 인터페이스나 인터페이스의 메서드에 적용할 수 있다.
- 다만, 인터페이스 기반 프록시에서만 유효한 트랜잭션 설정이 된다.
- 자바 어노테이션은 인터페이스로 부터 상속되지 않기 때문에 클래스 기반 프록시 or AspectJ 기반에서 트랜잭션 설정을 인식 할 수 없다.

직접 처리하고자한다면 TransactionTemplate 을 사용할 수 있는데 트랜잭션을 적용할 클래스에 TransactionTemplate 을 선언하고 트랜잭션을 묶을 지점에서 excute 메소드로 처리할 로직을 담으면 된다.

```java
transactionTemplate.execute(new TransactionCallback < xx > () {
  @Override public xxxResult doInTransaction() { // 처리할 로직 }
});
```

TransactionTemplate의 트랜잭션 처리 과정은 다음과 같다.

![](/assets/images/spring-transaction-management-1.png)

만약 doInTransaction 내에서 익셉션일 발생하면 TransactionTemplate에서 PlatformTransactionManager의 rollback 시킨 후, TransactionTemplate의 execute 메서드를 호출한 코드에 익셉션 전달한다.

throws를 통해 익셉션 발생을 설정하지 않기 때문에, RuntimeException, Error타입의 익셉션 만 발생시킬 수 있다.

트랜잭션 모드에 대해 말하자면 @Transactional은 Proxy Mode와 AspectJ Mode가 있는데 Proxy Mode가 Default로 설정되어있다.

Proxy Mode는 다음과 같은 경우 동작하지 않는다.

- 반드시 public 메서드에 적용되어야한다.
  - Protected, Private Method에서는 선언되어도 에러가 발생하지는 않지만, 동작하지도 않는다.
  - Non-Public 메서드에 적용하고 싶으면 AspectJ Mode를 고려해야한다.
- @Transactional이 적용되지 않은 Public Method에서 @Transactional이 적용된 Public Method를 호출할 경우, 트랜잭션이 동작하지 않는다.
