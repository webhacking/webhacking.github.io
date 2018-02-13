---
layout: post
title: "ECE's Revenge Plaid CTF 2015 Writeup"
description: ""
date: 2015-09-07
tags: []
comments: true
share: true
---

Last weekend was Plaid CTF, the annual capture the flag hosted by CMU’s plaid
parliament of pwning. Here follows my attempt to explain how I solved the
ECE’s Revenge2 challenge. Captf doesn’t seem to have the challenges up yet, so
here’s a link to the challenge if you’d like to try it for yourself.

  

Some people on IRC said that they solved the challenge purely with pencil and
paper. Really, this is a logic problem and requires thinking about your inputs
- the simulator was convienent because it aided in calculating intermediary
values for you, but you don’t need a simulator to solve the challenge. I was
fortunate to have access to proprietary Altera Quartus and ModelSim software
to work with the sv file so I could simulate signals and look at the response
of various signals without having to go through and calculate values manually
with a pen and paper.

  

The first task for me was to get the sv file to compile, which required
splitting the various modules into separate files. The code to manipulate the
clock and inputs to the main module I split into a file called testbench.sv.
Then I moved the top module into its own file which I set as the top level
diagram in Quartus, and each of the part_a-d modules got their own file. I
chose the default processor to simulate in Quartus, and then added the
testbench to run as a testbench under “Assigments”->“Settings”->“EDA Tool
Settings”->“Simulation”->“Compile Test Bench”->“Test Benches”->“New.” Then
part_a wouldn’t compile because Quartus for some reason refuses to compile
bitwise notted signals in always_ff blocks, so I had to edit the source a bit
to get rid of the not. Below is a screenshot of what I ended up with: (gotta
love vim splits)

  

readmore - > http://cyb3r.space/2015/04/20/eces-revenge/

