---
title: ERD 를 통한 데이터베이스 모델링
layout: post
categories : ""
sub_categories : ""
date: '2017-12-21'
comments: true
share: true
---

## TL;DR

  
[ERD](https://www.smartdraw.com/entity-relationship-diagram/) 는 Entity
Relationship Diagram의 약자이며, 개체 관계 다이어그램 뜻 한다.

[Peter Chen](https://ko.wikipedia.org/wiki/%ED%94%BC%ED%84%B0_%EC%B2%B8)의 박사
학위 논문에 처음 등장했다.

  
## ERD 를 통한 데이터베이스 모델링


데이터베이스 모델링을 함에 있어, 시각적 다이어그램이 좀 더 명확한 모델링을 할 수 있게 도움을 준다는 것을 많이 깨달았다.

협업함에 있어 공유되는 정보 또한 빠르게 전달할 수 도 있다.

  

실무에서는 ERD를 많이 작성하게 된다.

Product 초기 단계에서는 특히나 많이 작성하게 되며, 잦은 구조 변경으로 업데이트도 자주하게 된다.

  

개인적으로 ERD 도구로써 [MySQL](https://www.mysql.com/products/workbench/)[
Workbench](https://www.mysql.com/products/workbench/) 를 채택하여 사용하고 있다.

[Workbench](https://www.mysql.com/products/workbench/) 는 익숙하고, 무료라서 좋아한다.

  

ERD 가 굉장히 어렵게 받아들려지곤 하는데, 절대 그렇지 않다.

_매우 쉽다. 데이터와 데이터간의 관계만 나타내면 된다_.

  

나타내는 과정에서 Relationship에 대한 여러 표기법과 식별자가 존재한다.

아래의 관계를 ERD로 표기하려면 어떤식으로 표기해야할까 ?

  

  * 1:1 (일대일) 
  * 1:N (일대다)
  * N:N (다대다)

  

주로 IE 표기법과 바커 표기법을 대표적으로 사용하는데, 그 중에서도 IE(Information Engineering(I/E)) 표기법을
가장 많이 사용한다.

바커표기법과 IE표기법에 대해 얘기해보자.

_  
_

_바커 표기법 (Baker Notation) _은 영국 컨설팅 회사 CACI에 의해 처음 개발되었고 리차드 바커(Richard
Barker)에 의해 지속으로 업그레이드 되었다.

오라클에서 Case Method로 채택하여 사용하고 있다

  

_I/E 표기법 (Information Engineering Notation)_ 은 1981년에 Clive Finkelstein과 James
Martin이 공동 저술로 발표하였으며, 80년대 중반에 James Martin에 의해 그 체계가 정리되면서 본격적으로 활용이 되었고,
정보시스템을 구축하는데 있어서 데이터 분석(Data Analysis)과 데이터베이스 설계(Database Design)를 위한 매우 유용한
기법으로 자리 잡게 되었다.

  

IE 는 까마귀 발(Crow’s Foot Model)로도 불린다.

그 이유는 Many 관계를 표기할 때 까마귀 발을 사용하기에 까마귀 발이라 불린다.

  

참 단순한 이유다.

  

또 하나 얘기하면 표기법은 정말 _선택 사항_이다.

하지만 비중이 좀 더 높은 쪽을 선택하는 것이 협업할때 여러므로 좋다.

서로 다르다한들 learning curve가 적기 때문에 걱정할 필요는 없다.

  

  

  

**About I/E 표기법**

  

아래 표기된 그림을 참고하면 좀 더 도움이 될 것 같다.

까마귀 발 부호는 Many 관계 쪽을 보여주는 데 사용되고, 타원(Oval), 해쉬 마크 및 까마귀발의 다양한 조합들은 아래를 참고하자.

  

![](/assets/images/posts/848/9929A44A5A53678925A681.JPEG)