---
layout: post
title: "WowHacker Webgemae level6"
description: ""
date: 2015-09-07
tags: []
comments: true
share: true
---

안녕하세요. 와우해커 5번 문제에 이어서 6번 문제 풀이를 하겠습니다.

레벨 10까지있나요? 와우해커문제가 끝나면 올드좀비님의 Webhacking.kr도 연재하려니 예쁘게 봐주세요.

6번 문제에 접근하니 달팽이 한마리와 포인트가 1초에 10단위로 빠르게 증가하고있습니다.

타겟 포인트가 "4294967296" 이네요.

이번 문제는 최대한 간다하게 접근하시다. 4294967296의 값을 1초안에 클리어할수있는 10으로 대입하면됩니다.

일단 먼저 소스를 봅시다.

  

  

![](/assets/images/posts/82/2667993F55ED67D034662D.PNG)

  

  

해석을 포기합니다. 흠, 해시값인가요? unescape 괄호 안에 위치하는 문자열은 escape 함수로 문자열을 어떠한 컴퓨터에서도 읽을 수
있게 인코딩한 값이라고 합니다. 렌더링 과정 생각하니 극혐이네요. 해당 문자를 디코딩 할 수도 있으나 클라이언트에서 해석해서 오기 때문에
클라이언트에서 소스 뜯어보면 됩니다. 저는 크롬 기준으로 설명드릴게요. 우선적으로 "4294967296"로 조건이 걸려있는지 확인하고 조건이
없다면 이벤트를 찾아봅시다. 일단 조건 확인 고고!

  

  

![](/assets/images/posts/82/2659A14655ED64E711CBFD.PNG)

  

  

  

  

조건을 찾았습니다.

  

  

<!-- Begin

var dir = "http://webgame.wowhacker.com/AnTsGam3/";

var images = new Array(

dir+"antdl.gif",

dir+"antdn.gif",

dir+"antdr.gif",

dir+"antlt.gif",

dir+"antrt.gif",

dir+"antul.gif",

dir+"antup.gif",

dir+"antur.gif"

);

  

var isMinNS4 = (document.layers) ? 1 : 0;

var isMinIE4 = (document.all) ? 1 : 0;

  

var _LBimgList;

var _LBimgCount;

var _LBbase = "LBbase";

var _LBlow = "LBlow";

var _LBhigh = "LBhigh";

var _LBwidth;

var _LBheight;

var _LBbaseLayer;

var _LBlowLayer;

var _LBhighLayer;

function createLoadBar(width, height, bdSize, bdColor, bgColor, fgColor,
fontFace, fontSize, text) {

var txtLow, txtHigh, tblStart, tblEnd;

var str;

txtLow = '<font color="' + fgColor + '" face="' + fontFace + '" size=' +
fontSize + '>' + text + '</font>';

txtHigh = '<font color="' + bgColor + '" face="' + fontFace + '" size=' +
fontSize + '>' + text + '</font>';

tblStart = '<table border=0 cellpadding=0 cellspacing=0 height=100%
width=100%><tr valign="center"><td align="center">';

tblEnd = '</td></tr></table>';

if (isMinNS4)

str = '<layer name="' + _LBbase + '" bgcolor="' + bdColor + '" width=' + width
+ ' height=' + height + ' visibility="hide">\n'

\+ ' <layer name="' + _LBlow + '" bgcolor="' + bgColor + '" left=' + bdSize +
' top=' + bdSize + ' width=' + (width - 2 * bdSize) + ' height=' + (height - 2
* bdSize) + '>' + tblStart + txtLow + tblEnd + '</layer>\n'

\+ ' <layer name="' + _LBhigh + '" bgcolor="' + fgColor + '" left=' + bdSize +
' top=' + bdSize + ' width=' + (width - 2 * bdSize) + ' height=' + (height - 2
* bdSize) + '>' + tblStart + txtHigh + tblEnd + '</layer>\n'

\+ '</layer>';

if (isMinIE4)

str = '<div id="' + _LBbase + '" style="position:absolute; background-color:'
+ bdColor + '; width:' + width + 'px; height:' + height + 'px;
visibility:hidden;">\n'

\+ ' <div id="' + _LBlow + '" style="position:absolute; background-color=' +
bgColor + '; left:' + bdSize + 'px; top:' + bdSize + 'px; width:' + (width - 2
* bdSize) + 'px; height:' + (height - 2 * bdSize) + 'px;">' + tblStart +
txtLow + tblEnd + '</div>\n'

\+ ' <div id="' + _LBhigh + '" style="position:absolute; background-color=' +
fgColor + '; left:' + bdSize + 'px; top:' + bdSize + 'px; width:' + (width - 2
* bdSize) + 'px; height:' + (height - 2 * bdSize) + 'px;">' + tblStart +
txtHigh + tblEnd + '</div>\n'

\+ '</div>';

document.writeln(str);

_LBwidth = width - 2 * bdSize;

_LBheight = height - 2 * bdSize;

}

function startLoadBar(srcList, x, y) {

var i, w, h;

if (isMinNS4) {

_LBbaseLayer = document.layers[_LBbase];

_LBlowLayer = _LBbaseLayer.document.layers[_LBlow];

_LBhighLayer = _LBbaseLayer.document.layers[_LBhigh];

}

if (isMinIE4) {

_LBbaseLayer = eval('document.all.' + _LBbase);

_LBlowLayer = eval('document.all.' + _LBlow);

_LBhighLayer = eval('document.all.' + _LBhigh);

}

if (isMinNS4) {

w = window.innerWidth;

h = window.innerHeight;

}

if (isMinIE4) {

w = document.body.clientWidth;

h = document.body.clientHeight;

}

if (x == null)

x = Math.round((w - _LBwidth) / 2);

if (y == null)

y = Math.round((h - _LBheight) / 2);

moveLayerTo(_LBbaseLayer, x, y);

clipLayer(_LBhighLayer, 0, 0, 0, _LBheight);

showLayer(_LBbaseLayer);

_LBimgCount = 0;

_LBimgList = new Array();

for (i = 0; i < srcList.length; i++) {

_LBimgList[i] = new Image();

_LBimgList[i].onabort = _LBupdate;

_LBimgList[i].onerror = _LBupdate;

_LBimgList[i].onload = _LBupdate;

}

for (i = 0; i < srcList.length; i++)

_LBimgList[i].src = srcList[i];

}

  

function endLoadBar() {

}

  

function _LBupdate() {

var pct;

_LBimgCount++;

pct = _LBimgCount / _LBimgList.length;

clipLayer(_LBhighLayer, 0, 0, Math.round(pct * _LBwidth), _LBheight);

if (_LBimgCount == _LBimgList.length) {

setTimeout('hideLayer(_LBbaseLayer)', 500);

endLoadBar();

}

}

  

function moveLayerTo(layer, x, y) {

if (isMinNS4)

layer.moveTo(x, y);

if (isMinIE4) {

layer.style.left = x;

layer.style.top = y;

}

}

function hideLayer(layer) {

if (isMinNS4)

layer.visibility = "hide";

if (isMinIE4)

layer.style.visibility = "hidden";

}

function getWindowWidth() {

if (isMinNS4)

return(window.innerWidth);

if (isMinIE4)

return(document.body.offsetWidth);

return(-1);

}

function getWindowHeight() {

if (isMinNS4)

return(window.innerHeight);

if (isMinIE4)

return(document.body.offsetHeight);

return(-1);

}

function getPageScrollX() {

if (isMinNS4)

return(window.pageXOffset);

if (isMinIE4)

return(document.body.scrollLeft);

return(-1);

}

function getPageScrollY() {

if (isMinNS4)

return(window.pageYOffset);

if (isMinIE4)

return(document.body.scrollTop);

return(-1);

}

function getHeight(layer) {

if (isMinNS4) {

if (layer.document.height)

return(layer.document.height);

else

return(layer.clip.bottom - layer.clip.top);

}

if (isMinIE4) {

if (false && layer.style.pixelHeight)

return(layer.style.pixelHeight);

else

return(layer.clientHeight);

}

return(-1);

}

function getWidth(layer) {

if (isMinNS4) {

if (layer.document.width)

return(layer.document.width);

else

return(layer.clip.right - layer.clip.left);

}

if (isMinIE4) {

if (layer.style.pixelWidth)

return(layer.style.pixelWidth);

else

return(layer.clientWidth);

}

return(-1);

}

function getLeft(layer) {

if (isMinNS4)

return(layer.left);

if (isMinIE4)

return(layer.style.pixelLeft);

return(-1);

}

function getTop(layer) {

if (isMinNS4)

return(layer.top);

if (isMinIE4)

return(layer.style.pixelTop);

return(-1);

}

function getRight(layer) {

if (isMinNS4)

return(layer.left + getWidth(layer));

if (isMinIE4)

return(layer.style.pixelLeft + getWidth(layer));

return(-1);

}

function getBottom(layer) {

if (isMinNS4)

return(layer.top + getHeight(layer));

else if (isMinIE4)

return(layer.style.pixelTop + getHeight(layer));

return(-1);

}

function moveLayerBy(layer, dx, dy) {

if (isMinNS4)

layer.moveBy(dx, dy);

if (isMinIE4) {

layer.style.pixelLeft += dx;

layer.style.pixelTop+= dy;

}

}

function showLayer(layer) {

if (isMinNS4)

layer.visibility = "show";

if (isMinIE4)

layer.style.visibility = "visible";

}

function clipLayer(layer, clipleft, cliptop, clipright, clipbottom) {

if (isMinNS4) {

layer.clip.left = clipleft;

layer.clip.top= cliptop;

layer.clip.right= clipright;

layer.clip.bottom = clipbottom;

}

if (isMinIE4)

layer.style.clip = 'rect(' + cliptop + ' ' +clipright + ' ' + clipbottom + ' '
+ clipleft +')';

}

var mouseX = 0;

var mouseY = 0;

if (isMinNS4)

document.captureEvents(Event.MOUSEMOVE);

document.onmousemove = getMousePosition;

function init() {

startLoadBar(images);

}

function getMousePosition(e) {

if (isMinNS4) {

mouseX = e.pageX;

mouseY = e.pageY;

}

if (isMinIE4) {

mouseX = event.clientX + document.body.scrollLeft;

mouseY = event.clientY + document.body.scrollTop;

}

return true;

}

var ants = new Array(8);

function endLoadBar() {

var i;

for (i = 0; i < ants.length; i++) {

if (isMinNS4) {

ants[i] = document.layers["ant" + (i + 1)];

ants[i].image = ants[i].document.images["antimg" + (i + 1)];

}

if (isMinIE4) {

ants[i] = eval('document.all.ant' + (i + 1));

ants[i].image = document.images["antimg" + (i + 1)];

}

initAnt(i);

showLayer(ants[i]);

}

updateAnts();

}

function initAnt(n) {

var s, x, y;

x = Math.floor(Math.random() * getWindowWidth());

y = Math.floor(Math.random() * getWindowHeight());

s = Math.floor(Math.random() * 4);

if (s == 0)

x = -getWidth(ants[n]);

if (s == 1)

x = getWindowWidth();

if (s == 2)

y = -getHeight(ants[n]);

if (s == 3)

y = getWindowHeight();

x += getPageScrollX();

y += getPageScrollY();

moveLayerTo(ants[n], x, y);

}

function updateAnts() {

  

var i, dx, dy, theta, d;

  

d = 3;

  

for (i = 0; i < ants.length; i++) {

dx = mouseX - getLeft(ants[i]);

dy = mouseY - getTop(ants[i]);

theta = Math.round(Math.atan2(-dy, dx) * 180 / Math.PI);

if (theta < 0)

theta += 360;

  

if (Math.abs(dx) < d && Math.abs(dy) < d) {

initAnt(i);

var point = document.wow.WoWPoInT.value;

point++;

  

if (point > 5)

document.wow.MSG.value = 'T_T~';

  

if (point > 10)

document.wow.MSG.value = 'Oh~ no';

  

if (point > 20)

document.wow.MSG.value = 'No hint!';

  

if (point > 100)

document.wow.MSG.value = 'Oops neodal';

  

if (point > 500)

document.wow.MSG.value = 'ha~~ak ha~~ak';

  

if (point > 1000)

document.wow.MSG.value = 'Fighting~!';

  

if (point > 100000)

document.wow.MSG.value = 'FireFox Good~!';

  

if (point >= 4294967296) {

var o = "";

o += document.b.a.value;

o += document.e.a.value;

o += document.c.a.value;

o += document.a.a.value;

o += document.d.a.value;

document.wow.MSG.value = "Bingo!";

location.href="wOwLevel6.php?msg=" + o + "!";

}

document.wow.WoWPoInT.value = point;

}

else if (theta > 22.5 && theta <= 67.5) {

moveLayerBy(ants[i], d, -d);

ants[i].image.src = dir+"antur.gif";

}

else if (theta > 67.5 && theta <= 112.5) {

moveLayerBy(ants[i], 0, -d);

ants[i].image.src = dir+"antup.gif";

}

else if (theta > 112.5 && theta <= 157.5) {

moveLayerBy(ants[i], -d, -d);

ants[i].image.src = dir+"antul.gif";

}

else if (theta > 157.5 && theta <= 202.5) {

moveLayerBy(ants[i], -d, 0);

ants[i].image.src = dir+"antlt.gif";

}

else if (theta > 202.5 && theta <= 247.5) {

moveLayerBy(ants[i], -d, d);

ants[i].image.src = dir+"antdl.gif";

}

else if (theta > 247.5 && theta <= 292.5) {

moveLayerBy(ants[i], 0, d);

ants[i].image.src = dir+"antdn.gif";

}

else if (theta > 292.5 && theta <= 337.5) {

moveLayerBy(ants[i], d, d);

ants[i].image.src = dir+"antdr.gif";

}

else {

moveLayerBy(ants[i], d, 0);

ants[i].image.src = dir+"antrt.gif";

}

}

  

setTimeout('updateAnts()', 50);

return;

}

// End -->

  

point 변수를 보니 document.wow.WoWPoInT.value 네요.

밸류에10을 대입해줍니다.

![](/assets/images/posts/82/255E633455ED65FB1F4272.PNG)

  

![](/assets/images/posts/82/2264C53855ED6710397813.PNG)

  

키 갑을 얻었어요. next key is IhateCrazyCow.too!

![](/assets/images/posts/82/2628AA3855ED67110520F8.PNG)

  

패스, 다음은 레벨 7입니다. URL만 봤을대는 MYSQL 인증 문제네요.

그럼 다음편에봐요 ㅋㅋ. .

  

![](/assets/images/posts/82/272DFA4455ED676A0D1D49.PNG)

  

  

  

  

  

  

