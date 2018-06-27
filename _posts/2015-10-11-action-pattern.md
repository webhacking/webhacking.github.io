---
layout: post
title: "디자인 패턴 중, 행위 패턴"
description: ""
categories : development
sub_categories : ""
date: 2015-10-11
tags: []
comments: true
share: true
---

행위패턴 : Template Method 패턴

  

메소드에서 알고리즘의 뼈대를 정의하는 패턴. C++의 Template 하고는 상관 없음.

코드에서의 중복을 피하기 위함 공통적인 작업흐름은 추상클래스쪽에 한번 정의하고, 나머지 다양한 구현들을 각각의 서브 클래스들에게 담당

  

  

  

![](/assets/images/posts/236/231F753656192E980BA728.PNG)

  

  

  

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

25

26

27

28

29

30

31

32

33

34

35

36

37

38

39

40

41

42

43

44

45

46

47

48

49

50

51

52

53

54

55

56

57

58

59

60

61

62

63

64

65

66

67

68

69

70

71

72

73

74

75

76

77

<source lang=Java>

/**

* An abstract class that is common to several games in

* which players play against the others, but only one is

* playing at a given time.

*/

abstract class Game {

/* Hook methods. Concrete implementation may differ in each subclass*/

protected int playersCount;

abstract void initializeGame();

abstract void makePlay(int player);

abstract boolean endOfGame();

abstract void printWinner();

/* A template method : */

public final void playOneGame(int playersCount) {

this.playersCount = playersCount;

initializeGame();

int j = 0;

while (!endOfGame()) {

makePlay(j);

j = (j + 1) % playersCount;

}

printWinner();

}

}

//Now we can extend this class in order

//to implement actual games:

class Monopoly extends Game {

/* Implementation of necessary concrete methods */

void initializeGame() {

// Initialize players

// Initialize money

}

void makePlay(int player) {

// Process one turn of player

}

boolean endOfGame() {

// Return true if game is over

// according to Monopoly rules

}

void printWinner() {

// Display who won

}

/* Specific declarations for the Monopoly game. */

// ...

}

class Chess extends Game {

/* Implementation of necessary concrete methods */

void initializeGame() {

// Initialize players

// Put the pieces on the board

}

void makePlay(int player) {

// Process a turn for the player

}

boolean endOfGame() {

// Return true if in Checkmate or

// Stalemate has been reached

}

void printWinner() {

// Display the winning player

}

/* Specific declarations for the chess game. */

// ...

}

</source>

[Colored by Color Scripter](http://colorscripter.com/info#e)

[cs](http://colorscripter.com/info#e)

  

