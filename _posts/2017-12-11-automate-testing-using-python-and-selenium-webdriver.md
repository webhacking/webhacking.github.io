---
title: Python & Selenium 을 이용한 QA 자동화
layout: post
date: '2017-12-11'
tags:
- Test Automation
comments: true
share: true
---

일련의 검증 절차(unit test, stress test, etc..)를 걸친 이 후, 우리는 통상적으로 프로그램을 배포한다.

그 검증 절차 중, QA(Quality Assurance) 도 포함되는데 다른 절차에 비해 상대적으로 소요되는 시간이 크다.

QA는 소프트웨어 품질 보증을 말하며, 이 작업을 수행함으로써 소프웨어의 결함을 사전의 발견하여 배포 전 결함을 보안할 수 있게하는 역할을
한다.

주위에서 이 작업을 굉장히 간과하는 분들도 많지만, 실질적으로 배포 절차 중 가장 중요한 단계라 본인은 생각한다.

  

정해진 규격이 없다보니 팀 마다 진행하는 방법도 천차만별이다.  
QA 부서가 따로 존재 할 수 도 있고, 개발자가 진행하는 경우도 있다.

통상적으로 인력으로 진행하다보니 기능에 수의 따라 공수도 증가한다.

  

인력으로 모든 단위를 정확하고 신속하게 처리한다면 좋겠지만, 인간은 실수를 범할 가능성이 농후하다.

숙련도가 증가한다고해서 실수는 피할 수 없고, 숙련도의 핑계로 작업 단위를 건너뛰는 경우도 발생할 수 있다.

## **컴퓨터는 인간보다 더 날렵하고 묵묵하다.**

인간이 테스트와 같은 작업을 1,000번 10,000번 수행한다고하면 실수를 범하고, 수행하는 시간 또한 천차만별일 것 이다.

하지만 컴퓨터는 주어진 자원에 따라 수행하는 시간과 수행하는 과정 일괄적일 것 이다.

  

이는 장점임과 동시에 단점이다.

  

컴퓨터는 프로그래머가 프로그래밍 한대로 동작하기에 미처 프로그래머가 예상치 못한 시나리오는 테스트할 수 없다.

컴퓨터가 "학습" 을 한다는 전제 조건이면 얘기가 다르겠지만, 현재의 자동화된 테스트 도구들은 하나 같이 바보 같다.

  

하지만 인간이 유추할 수 있는 소프트웨어 결함 테스트만으로도 상당 부분 시간을 절약할 수 있다.

자동화된 시스템을 양질의 프로그램을 생산할 수 있게 도와주며 팀원 전체의 정신건강의 여러모로 도움을 준다.

  

  

![](/assets/images/posts/842/9910D6345A2F5E96181459.GIF)

  

  

구글 캘린더를 예제 삼아서 테스트를 해보자.

"영어 공부 하자" 라는 간단한 일정을 등록한다는 시나리오를 정의 했을 때 이를 프로그래밍하기 앞 서 신경써야되는 부분은 무엇이 존재할까.

  

특정 유저 A의 브라우저 내에 보이는 화면이 내가 보고있는 화면과 같다면 좋겠지만 현재 브라우저 생태계는 매우 다양해서 여러 브라우저와
그리고 브라우저 버전별로 호환성을 테스트해야한다. 또한 카페와 같이 네트워크 속도가 느린 환경에서의 경우도 테스트를 해야한다.  
  
어떤이는 일정을 등록하는 0.1초가 걸리는 반면 다른이는 5초 이상 소요될 수 도 있고,  
스크립트 로드에 부재로 인해 클릭 이벤트를 할 수 없을 수 도 있다.

브라우저에서 지원하지 않는 메소드를 사용하여, 에러가 발생했을 수 도 있다.

  

이 처럼 단순한 시나리오에서도 여러가지의 경우의 수가 존재하기에 우리는 이 것들을 고려하여 프로그래밍해야한다.

본인은 Python 을 통해서 프로그래밍 할 것 이고, 프레임워크로 [Selenium](http://www.seleniumhq.org/)을
사용할 것 이다.

Selenium은 웹 어플리케이션을 위한 테스팅 프레임워크이다.

  

![](/assets/images/posts/842/9962A73D5A30B83B0586E3.PNG)

  

아래는 [Selenium](http://www.seleniumhq.org/) 이 지원하는 브라우저 및 플랫폼이다.

  

  * Google Chrome
  * Internet Explorer 7, 8, 9, 10, and 11 on appropriate combinations of Vista, Windows 7, Windows 8, and Windows 8.1. As of April 15 2014, IE 6 is no longer supported. The driver supports running 32-bit and 64-bit versions of the browser where applicable
  * Firefox: latest ESR, previous ESR, current release, one previous release
  * Safari
  * Opera
  * HtmlUnit
  * phantomjs
  * Android (with Selendroid or appium)
  * iOS (with ios-driver or appium)

  

테스트 코드는 [Github](https://github.com/webhacking/AutomationQA) 에 공유했다.

아래는 base.py 모듈의 코드이다.

  

예제 코드이므로, 크롬 브라우저만을 이용하여 테스트 코드를 작성했다.

Python unittest flow 에 맞춰 동작하며, 기본적인 내용은 아래 코드를 보고 이해하길 바란다.

  

더 많은 Selenium WebDriver API 를 알고 싶다면 이 [링크](http://selenium-
python.readthedocs.io/api.html)를 통해서 확인하길바란다.

    import unittestfrom time import sleepfrom selenium import webdriverfrom selenium.webdriver.support.select import Selectfrom selenium.webdriver.common.keys import Keysfrom selenium.webdriver.chrome.options import Optionsclass Base(unittest.TestCase):    calendar_domain = 'https://calendar.google.com/'    def setUp(self):        options = webdriver.ChromeOptions()        options.add_argument("--start-maximized")        self.driver = webdriver.Chrome(chrome_options=options)        self.driver.start_client()        self.driver.implicitly_wait(3)        self.login()    def tearDown(self):        self.driver.close()    def login(self):        self.driver.get(self.calendar_domain)        account = {            'email' : '본인 이메일',            'password' : '본인 패스워드'        }        for key, value in account.items():            current_ele = self.driver.find_element_by_css_selector(f'input[type="{key}"][jsname="YPqjbf"]')            current_ele.send_keys(value)            next_button = self.driver.find_element_by_css_selector('content.CwaK9')            next_button.click()            sleep(1)        try_count = 0        while try_count < 10:            try_count += 10 if self.driver.find_element_by_css_selector('body[jscontroller="phtQPb"]') else 1            sleep(1)

  

아래는 manage 패키지 내 Add 모듈이다.

페이지내 일정 등록 버튼을 클릭 후, 일정 내용을 입력하고 그 후 등록하는 과정을 맡고있다.

  

    import unittestfrom base import Basefrom time import sleepclass Add(Base):    def event(self, title):        self.driver.get(self.calendar_domain)        add_button = self.driver.find_element_by_css_selector('content > i.Gw6Zhc')        add_button.click()        sleep(1)        title_field = self.driver.find_element_by_id('xTiIn')        title_field.send_keys(title)        apply_button = self.driver.find_element_by_id('xSaveBu')        apply_button.click()    def test_all(self):        self.event(            title='영어 공부 시작'        )unittest.main()

  

아래는 실제 서비스에 적용한 모습이고, 배포 전 QA TEST 코드가 동작하는 모습이다.

자동화를 통해서 상당 부분 시간을 절약할 수 있어 좋았지만, 프로그램 내 변경사항이 잦거나 메이저 업데이트가 있을 경우

다시 시나리오 코드를 작성해야하는 번거로움이 존재한다.

  

그래도 다행히 코드를 작성하는 시간이 매우 짧고, selenium 에서 강력한 API 들을 지원해서 상당히 쉽게 만들 수 있다.

  

  

![](/assets/images/posts/842/99FA80505A30FEBB18D8DA.PNG)