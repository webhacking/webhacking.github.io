---
layout: post
title: 라라벨에서 Constants 제대로 사용하기
categories : development
sub_categories : ""
---

[Laravel](https://laravel.com/) 에는 별도의 Constants 관련 디렉토리와 명령어가 존재하지 않는다.

그렇다면 `Constants`는 어디에 위치해있는 것이 올바른 것 일까 ?

  
사람들은 어떤 방법으로 이 문제를 해결 했을까 먼저 살펴보았다.

검색 한번으로 많은 사람들이 나와 같은 궁금증을 품고있다는 것을 알았다.

  

*   [How to use my constants in Laravel](https://laravel.io/forum/06-05-2014-how-to-use-my-constants-in-larvel)
*   [How i can define my own constants?](https://laracasts.com/discuss/channels/laravel/l51-how-i-can-define-my-own-constants?page=1)
*   [What is the best practice for adding constants in laravel? (Long List)](https://stackoverflow.com/questions/42155536/what-is-the-best-practice-for-adding-constants-in-laravel-long-list)

  

하지만 답변은 내가 전적으로 동의할 수 없는 내용이었다.

모든 답변들은 config 파일에 constants 관련 파일을 생성하라고하는데, 이는 진짜 constants 가 아니다.

constants의 사전적 의미는 아래와 같다.

  

> 프로그램에서는 실행중에 바뀌지 않는 데이터를 말한다. 기억 장치 내부에 축적되어 있는 불변의 데이터로 보통 프로그램 단계에서 지정된 것이 프로그램을 읽어들일 때 루틴의 일부로서 컴퓨터 기억 장치에 읽어들여진다.


laravel 에서 설정파일 내 값은 아래와 같이 쉽게 변경할 수 있다.


```php
$value = config('app.timezone');
config(['app.timezone' => 'America/Chicago']);
```
  

그러니 위 방법을 채택하여 사용 중이라면, 변경하길 권장한다.

본인이 설정한 방법을 기준으로 서술하겠다.
 
 1. \`app\` 하위 디렉토리로 \`Constants\` 디렉토리를 생성 한다.

- 생성된 디렉토리 정의하고자 하는 내용에 알맞는 파일명을 정의하고 파일 내 상수를 정의한다.

```php
# e.g book.php

define(001, 'hax0r');
```
 
 2. 아래 코드를 \`Bootstrap\` 디렉토리 내 `Loader.php` 파일에 추가한다.

```php
// Loader.php
foreach ( glob(__DIR__."/Dependency/*.php") as $dependency ) {
    require $dependency;
}
```

 3. \`Bootstrap\` 하위 디렉토리로 `Dependency` 디렉토리를 추가한다.
 4. 아래 코드를 \`Dependency\` 디렉토리 내 `Constants.php`에 추가한다.

```php
foreach ( glob(__DIR__."/../../Constants/*.php") as $constantFile ) {
    require $constantFile;
}
```
 5. 아래와 같이 composer.json 을 추가한다.

```json
"autoload": {

    "files": [
      "app/Bootstrap/Loader.php"
    ],
    "classmap": [
        "database/seeds",
        "database/factories",
    ],
    "psr-4": {
        "App\\": "app/"
    }
},
"autoload-dev": {
    "psr-4": {
        "Tests\\": "tests/"
    }
},
```
  

이 문서에서 [Composer Autoloading](https://getcomposer.org/doc/01-basic-usage.md#autoloading) 에 대한 개념까지는 다루지 않겠다.

해당 내용이 궁금하다면 해당 링크를 참고하길 바란다.

좀 더 효율적으로 `Contants` 파일을 생성하고자 한다면, laravel `artisan` 을 활용해보자.

라라벨 [artisan console](https://laravel.com/docs/5.5/artisan) 을 통해서 새로운 명령어를 생성한다.

아래 명령어를 통해서 `MakeConstants` 라는 명령어 파일을 추가한다.

  
```
artisan make:command MakeConstants
```
  

파일은 \`app > commands\` 의 위치해있다.

저는 아래와 같이 위 구조에서 constants 파일을 생성하는 명령어를 추가했다.

코드는 아래와 같다.

  
```php
namespace App\Console\Commands;

use Couchbase\Exception;
use Illuminate\Console\Command;

/**
 * Class MakeConstants
 * @package App\Console\Commands
 */
class MakeConstants extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:constants {fileName}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a constants file';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $fileName = $this->argument('fileName');
        $filePath = 'app/Constants/'.$fileName.'.php';

        try {
            if ( file_exists($filePath) ) {
                throw new  \Exception('Constants file is already exist.');
            }

            $fp = fopen($filePath,'w');
            fwrite($fp, '<?php'.PHP_EOL);
            fclose($fp);
            $this->info('File generated successfully.', PHP_EOL);

        } catch ( \Exception $e ) {
            $this->error($e->getMessage());
        }
    }
}
```
  

앞으로 아래 명령어를 통해 쉽게 constants 파일을 생성할 수 있다.

```
artisan make:constants {파일 명}
File generated successfully.
```  
    
![스크린샷%202018-01-12%20오후%2012.05.24](/assets/images/posts/857/스크린샷%202018-01-12%20오후%2012.05.24.png)
