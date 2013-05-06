---
layout: post
category: society
tags: [automation]
title: What information can we trust?
---

What do we rely on when we doing research? Which media can we trust? Can we automate part of the endless search of authoritative answers? How do we find good references?

Triggered by the ideas in [The information diet](http://www.youtube.com/watch?v=lNFNOSzik14) and natural language processors like [TextRazor](http://www.textrazor.com/).

## A few basis
 * We are aware there's too much information easily available online and in libraries. 
 * Journalism can be corrupted. How do we find honest journalism?
 * Politics are important. People don't trust politics. If good politicians appear how do they prove themselves?
 * Student education has been derived to consuming massive piles of books and articles and then outputting names with associated theories. So education's main goal is to teach people how to filter out information.

## Couldn't the internet help?
Our favourite superhero *the internet*. We had web search for a while now and it'd become without doubt a vital part of human life. Maps, debates, research, pretty pictures, books, gifts...

A very ugly part of web search is advertising and generally the incentive for market-izing everything. But we can use it for something good. We can change it so that it filters out information for us.

### Classifying information
TextRazor](http://www.textrazor.com/) is a tool that can read an article and it will its best to tell classify it and extract mentioned names and organisations.

That is in if you pass the text of my [previous article]({% post_url 2013-05-05-plugin-pattern-autoloading %}) in [TexTrazor's demo](http://www.textrazor.com/demo) you'll be told that the main topic is *Technology* with a genre of *Web Application* and also the name *Addy Osmani* was mentioned. 

Isn't this kind of a clue that this Addy Osmani guy is worth checking out if we are into web applications?

### Weighted information
Of course, if the same method was used on some fake, tabloid article will get a different and possibly dangerously wrong ideas. 

However some of the information online is weighted. Things like [StackExchange network](http://stackexchange.com/sites) (which is largely software related) offers a forum with voted answers and the concept of reputation.

There's also already an algorithm in place for web search to grade domains and give them a ***Authority*** score

### Weighting the medias
The main source of *What's going on* are the magazines, newspapers and TV. These, well these are not easily weighted. Do I trust CNN, BBC or Al Jazeera? Should we even mention country-specific newspapers.

What is the usual solution when something needs to be evaluated? - **Consultants**. But we are talking carefully researching which consultants to choose. Checking their talks, lectures and their behaviour, avoiding the special case of *ultra-clever* fanatical thinkers. And this careful research needs to be repeated every so often to bring our choice of consultants up-to-date.

## Let's make a tool 
Instead of spending enormous amount of hours researching topics every time we need the right answer let's spend the same amount of time once each period of time and carry out the careful research described above to find **our authorities**.

These authorities will weight the medias and other sources of information for us. If we then combine this data with the results of smth. like TextRazor and the use of [**correlation**](http://en.wikipedia.org/wiki/Correlation_and_dependence) we can actually have a tool which we can ask uncertain questions:

 - Was the moonlanding a hoax?
 - Is cheese good for you?
 - What is it like in North Korea?
 - etc... military stuff, political judgments, lifestyle choices...

The answers then will be showed in order of specificity to our question and the authority they show on this topic with some sort of confidence, grading. This will be accompanied with the names of people this answer is supported or opposed.

If you want an opinion on the Boston's Bombing you'll be shown answers from medias/journalists that usually handle such attacks with honesty and minimum faff; anwsers that are backed by authoritative references.

### Another more possible application
The described above is currently somehow brittle idea that can hit few show-stoppers. Things like:

 - Who will pick these **consulting authorities**?
 - How much can we trust *them*?
 - Is the software clever enough to extract not only topic but author's position on the topic?

Another use-case is to use the same sort of idea of natural language processing and correlation but apply it to search topics that surround a certain person.

So that if you search for David Cameron you might get "politic", "minister", "scandal", "right wing" etc. And then we'll be able to click through any of the topics and see where they the information originate from and judge for ourselves whether this is reliable. 

This might at least aid research on elections. At least in the many cases where people forget what a politician has done in the past and are only presented with their on-going campaign.

Same goes for companies, countries, anything really. Getting the *tag cloud* that surrounds them. 

### Ah yes another one
Same as the one above but be used for alerts. If a person or country is mentioned in the wrong context then alert them to take action. That prevents last moment realizations of some terrible references somewhere on the web.

## A few final pieces

 * How much undiscovered information value stays hidden in papers and articles of non-common languages that a computer can't process?
 * Can this lead to even more tight and unkind recruiting techniques where applicants are researched online and perhaps rejected due to some software malfunction or in cases like *the one stupid thing I did years ago but now I've learned from it*.
 * Do our decisions really matter that much? [Is it all not 50/50](http://jivot.napopa.com/2013/03/5050/)?