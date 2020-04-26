---
title: Kubernetes health check
layout: post
categories : development
background_image: '/assets/images/posts/2019-12-30-kubernetes-healthy/1_Xfdw0lkT4CdPtnza4-0Z7Q.png'
---

![](/assets/images/posts/2019-12-30-kubernetes-healthy/1_Xfdw0lkT4CdPtnza4-0Z7Q.png)

쿠버네티스에서는 각 컨테이너의 상태를 주기적으로 확인하고 문제가 있는 컨테이너를 재시작하거나 pod를 서비스에서 제외시킬 수 있다. 
이러한 기능을 health check 라고 하는데 AWS ALB 를 사용해보았다면 어떠한 기능인지 알 수 있다. health check 에는 두 가지 방법이 있다. 
`Liveness probe` 와 `Readiness probe` Liveness probe 는 컨테이너가 살아있는 여부를 체크하고 Readiness probe 는 컨테이너가 현재 서비스 가능 상태인지 여부를 체크한다. Liveness Probe 에서는 애플리케이션의 요구에 맞춰 컨테이너가 새로 시작되는 시점을 결정할 수 있다.
Readiness Probe 에서는 애플리케이션이 많은 양의 데이터를 수행하다 락이 걸리거나 아직 어떠한 모듈이 bootstrapping 되지 않았을 때 (서비스 불가 상태) 애플리케이션의 상태를 쿠버네티스에 알린다. 다만, Readiness probe 는 Liveness probe 와는 달리 실패했다고 하더라도 컨테이너를 재시작하지 않는다.
재시작하지 않는 이유는 락이 걸렸거나 외부 주입된 모듈에 대해 이슈가 있으면 재시작한다해도 서비스가 불가한 상태이기 때문이다.

아래는 Liveness probe 와 Readiness probe 설정이다.
```
# Liveness probe
ports:
- name: liveness-port
  containerPort: 8080
  hostPort: 8080

livenessProbe:
  httpGet:
    path: /healthz
    port: liveness-port

# Readiness probe
readinessProbe:
  exec:
    command:
    - cat
    - /tmp/healthy
  initialDelaySeconds: 5
  periodSeconds: 5
```
