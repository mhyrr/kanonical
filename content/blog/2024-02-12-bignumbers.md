---
title: Big Numbers and Natural Theology
date: 2024-02-12T18:49:00.000Z
url: /big-numbers-theology/
---

I want to talk about two really big numbers. I know, math. Bear with me though because these two numbers are pretty wild. And they give us a good lesson about reality and the revealed nature of God.

### Power Towers and Knuth

My first number is called `Super K`, and it is described by the inestimable Donald Knuth in his book [_Things a Computer Scientist Rarely Talks About_](https://www.amazon.com/Things-Computer-Scientist-Rarely-Lecture/dp/157586326X). The book is compiled from a series of lectures he gave and someone finally YouTube'd them. So if you'd like the [better, original version from Donald Knuth himself](https://www.youtube.com/watch?v=VoKye2hFcb0), I highly encourage a listen.  I've also [talked about this number](/tuesday-at-4/) pretty recently, because I love what it tells us about what I call 'adverb infinitudes'.  Anyway..

Knuth invented the up-arrow notation in the 1970s as a shorthand way to express something fancy called [hyperoperators](https://en.wikipedia.org/wiki/Hyperoperation). Don't be worried about the fancy words! It's quite simple, so let's start with addition.

`3 + 3 = 6`

See? Easy. What's the next thing we can do.. well that's easy, it's

`3 x 3 = 3 + 3 + 3 = 9`

We're good so far. Multiplication is just a shorthand way of expressing repeated addition. Now, can we repeat multiplication? Yes we can!

`3 ^ 3 = 3 x 3 x 3 = 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 = 27`

Exponentiation is just repeated multiplication, which itself is just repeated addition. This is where we usually stop in school. But there's no reason we have to, and that's where hyperoperators come in: as a way to continue moving up this path from something simple like addition to more efficient versions. There wasn't a good notation for this until Knuth went around and suggested the [up-arrow](https://en.wikipedia.org/wiki/Knuth%27s_up-arrow_notation). So instead of

`3 ^ 3` or 3<sup>3</sup> for exponents, we can rewrite this as `3 ↑ 3`. Where the `↑` is the operator.

Fine! If one arrow is good then more is better. Adding an arrow is the same as repeating ↑ that many times.

`3 ↑↑ 3 = 3 ↑ (3 ↑ 3) = 3 ^ 3 ^ 3 = 3 ^ 27 = 7,625,597,484,987`

Holy crap that escalated quickly! Repeating exponents like this - 3<sup>3<sup>3</sup></sup> is called a power tower. But wait, there's more.. let's do 3 arrows instead of 2..

`3 ↑↑↑ 3 = 3 ↑↑ (3 ↑↑ 3)) = 3 ^ 3 ^ 3 ^ 3 .... repeat 7,625,597,484,984 more times = uhh this is a big number`

Wikipedia does a really good job of decomposing this example too, using LaTeX and making it much prettier!

![Power towerzzz](https://firebasestorage.googleapis.com/v0/b/reflect-prod.appspot.com/o/users%2FUMeQXzjdEGb0IkzTsvBmBethrEi1%2F0fc744b35fe4475c999813591463b929?alt=media&token=7e68f477-6740-466b-a32b-3f6738a3a96a)

The point is: Up Arrow notation is powerful. I have _no idea_ what that number is. For perspective here, the known universe is estimated to have somewhere around 10<sup>80</sup> atoms or so - that's 10 followed by 80 zeroes. But _this_ number builds a power tower that looks like 3<sup>3<sup>3<sup>3<sup>3</sup></sup></sup></sup> except that it's 7,625,597,484,987 levels tall!  I can't write this number out, because it has more digits than there are atoms in the universe.  Needless to say it is enormous. Bigger than we can comprehend and bigger than we would ever need in any normal day-to-day operation. Even in the computer world where we regularly deal with lots of data and fairly big numbers, we just have no use for this crazy thing.

### Super K

Ok, now the stage is set for `Super K`. Here it is, let's start with the underwhelming version before we break it down.

`10 ↑↑↑↑ 3`

That's it!  Now let's start to break this down. We know we need to break each up-arrow into its parts, so this becomes

`10 ↑↑↑↑ 3 = 10 ↑↑↑ (10 ↑↑↑ 10)`

Easy enough. Let's break down `(10 ↑↑↑ 10)` one more arrow and we get

`(10 ↑↑↑ 10) = 10 ↑↑ (10 ↑↑ (10 ↑↑ ( 10 ↑↑ (10 ↑↑ (10 ↑↑ (10 ↑↑ (10 ↑↑ (10 ↑↑ 10))))))))`

Ok! We know that just a couple of double arrows can be huge.. and here there are ten of them! This is going to become a power tower of gigantic proportion. We can at least show the start of breaking it down. Let's do the inner double arrow first.

`(10 ↑↑ 10) = 10 ^ 10 ^ 10 ^ 10 ^ 10 ^ 10 ^ 10 ^ 10 ^ 10 ^ 10`

Haha that's 10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10</sup></sup></sup></sup></sup></sup></sup></sup></sup>.  Pretty good HTML!

For perspective here, just 10<sup>10</sup> is 10,000,000,000. 

So 10<sup>10<sup>10</sup></sup> is 10<sup>10000000000</sup>. 

And we've got to do this 10 freaking times. We can reasonably conclude that `10 ↑↑ 10` is a gigantic number. We're way, way, way beyond the size of our universe again. Heck, if we had a complete universe for every atom in our universe, we wouldn't even come close to having enough room to write down all the digits of this number. And we're just getting started, because that was only one double arrow operation. To get ahead of Knuth for a second (he doesn't do this), let's call this crazy big number **J**.

`(10 ↑↑↑ 10) = 10 ↑↑ (10 ↑↑ (10 ↑↑ ( 10 ↑↑ (10 ↑↑ (10 ↑↑ (10 ↑↑ (10 ↑↑ J)))))))`

We've shrunk our expression not very much. Now for the very inner parenthesis, all you have to do is imagine a power tower of 10s **J** levels tall!  Dear God. Let's see what Knuth says at this point:

> I can't even tell you how big that stack of tens is without using double-arrow notation. It's such a huge number, I can't even write it down, but then we repeat the double-arrow operation again, getting an even huger number; and so on, until finally we get this thing evaluated. We can save space by calling the final result 'Fancy K'.

Knuth says that this number is so mind-blowingly large that it deserves a special notation, and thus is born Fancy K: ![](https://firebasestorage.googleapis.com/v0/b/reflect-prod.appspot.com/o/users%2FUMeQXzjdEGb0IkzTsvBmBethrEi1%2F86b3e97888044a54af1e450cafa70a11?alt=media&token=eae2b1d9-1634-4aaf-8d52-68aec696549d)

We started with this

`10 ↑↑↑↑ 3 = 10 ↑↑↑ (10 ↑↑↑ 10)`

and now we have successfully evaluated the parentheses and called it ![](https://firebasestorage.googleapis.com/v0/b/reflect-prod.appspot.com/o/users%2FUMeQXzjdEGb0IkzTsvBmBethrEi1%2F86b3e97888044a54af1e450cafa70a11?alt=media&token=eae2b1d9-1634-4aaf-8d52-68aec696549d).  So now we can say

`10 ↑↑↑↑ 3 = 10 ↑↑↑ `![](https://firebasestorage.googleapis.com/v0/b/reflect-prod.appspot.com/o/users%2FUMeQXzjdEGb0IkzTsvBmBethrEi1%2F86b3e97888044a54af1e450cafa70a11?alt=media&token=eae2b1d9-1634-4aaf-8d52-68aec696549d)

If you were to explode _this_ expression using double arrows you would get

`10 ↑↑ (10 ↑↑ (10 ↑↑ (10 ↑↑ ... ↑↑ (10 ↑↑ (10 ↑↑ 10)) ... )` and this thing extends out ![](https://firebasestorage.googleapis.com/v0/b/reflect-prod.appspot.com/o/users%2FUMeQXzjdEGb0IkzTsvBmBethrEi1%2F86b3e97888044a54af1e450cafa70a11?alt=media&token=eae2b1d9-1634-4aaf-8d52-68aec696549d) times!!! Here's Knuth again:

> If you stop to think about this, you'll have to admit that, if anything is mind boggling, this is; it's _incredibly_ huge. In my paper I noted that the three dots '...' in this formula suppress a lot of detail— so much that I should probably have used four dots. [_ed_: har, math humor]
>   
> If you don't agree that Super K is so large as to be beyond human comprehension, I can at least prove conclusively that if you consider all the numbers less than or equal to Super K, almost all of them are impossible to describe in any way in the universe, because of a theorem by which computer scientists know that most number descriptions are incompressible. On the other hand, Super K is very small as finite numbers go; almost all finite numbers are a lot bigger than this. I don't care. Super K is big enough for me.

Knuth points out two fascinating attributes of Super K. The first is that it's pretty special as far as big numbers go because there's a reasonable way to describe it. Think about it this way: if I wanted to tell you about the number 10,000,000,000 I don't have to write out every single digit; I can simply say 10<sup>10</sup> and it conveys the exact same number. But if I want to tell you about 9,764,561,885 there's (probably) no good way for me to do it except for write out 9,764,561,885. This is called [incompressibility](https://en.wikipedia.org/wiki/Incompressible_string). In fact, any numbers bigger than the number of atoms in the universe - about 10<sup>80</sup>, vastly smaller than Super K - nearly all of them are completely indescribable.

And then on top of all of the buildup to demonstrate just how unfathomably big Super K actually is, Knuth throws out the tiny detail that it's actually pretty small! Because the natural numbers keep going forever and ever. Towards infinity.

Note: [Tim Urban over at WaitButWhy does an even better deep dive](https://waitbutwhy.com/2014/11/1000000-grahams-number.html) into really big numbers and ends up at a number called Graham's Number which, believe it or not, puts Super K to shame!  Tim is a super fun writer and you should go check it out.

### Cantor's Infinity

Let's talk about infinity now, since that's our second number. Sort of. Infinity is kind of it's own thing and people can get mad if you call it a number.  What can I say?  People have fought wars over less.

Back in the 1870s a young German guy named Georg Cantor was thinking a lot about what it meant to count things. In 1874, Cantor published a paper that set the stage for something we consider obvious now: [1-to-1 correspondence](https://en.wikipedia.org/wiki/Bijection).

Let's say you had a pile of paper clips on the table in front of you next to a stack of paper. How could you tell that you had the same number of each? Is there a way to do this without just counting them both up? Yes, the neatly physical way would simply be to take each paper clip and put it on one piece of paper. If you didn't have any leftover paper clips or leftover paper you knew you had the same amount of each, regardless of how many there are.

What we just described came to be known as '[cardinality](https://en.wikipedia.org/wiki/Cardinality)'. If you take two sets of things, the cardinality of the two sets is the same if the number of elements in each set is the same.  And you can measure it using 1-to-1 correspondence.

`{1,2,3}` is a set of 3 numbers, so it's cardinality is 3. And the sets `{2,4,6}` and `{A,B,C}` and `{100,200,300}` all have the same cardinality. It doesn't matter what the stuff inside is, just that the number of things is the same. This might seem obvious but it leads to some interesting properties, and back in the good 'ole rock 'n roll days of the 1870s this was all still brand new.

Now what Cantor did next is genius.

Let's take the [natural numbers](https://en.wikipedia.org/wiki/Natural_number) - those are just the positive integers; 1, 2, 3, 4, 5, and so on. We could keep counting on up for a long time. One of the first videos that went viral for MrBeast was just [him counting all the way to 100,000](https://www.youtube.com/watch?v=xWcldHxHFpo) over 40 hours or so. Counting is still revolutionary! Anyway, Cantor started asking some odd questions using his idea of 1-to-1 correspondence. He tried to map different sets of numbers on to the natural numbers; like even numbers. That looks like this:

`(1,2), (2,4), (3,6), (4,8), ....`

We can keep going forever and each even number has it's own corresponding natural number. That means that the natural numbers and the even numbers have the same _cardinality_. Even though they are both infinite and the natural numbers contain all of the even numbers, they're still the same size.

So that's weird.

But then Cantor did the same thing for rational numbers, which includes every fraction you can think of, using something utterly brilliant called the diagonal argument. You can line up fractions in a matrix and demonstrate a 1-to-1 correspondence too. That matrix looks something like this:

`1/1 1/2 1/3 1/4 ...`

`2/1 2/2 2/3 2/4 ...`

`3/1 3/2 3/3 3/4 ...`

`4/1 4/2 4/3/ 4/4 ...`

`....`

If you extend this out forever, you'll cover every possible fraction. Then you can draw a line diagonally back and forth starting from 1/1 and cover every number and map each one on to the natural numbers. So the set of rational numbers also has the same cardinality as the natural numbers!

This is super weird and unintuitive. That's infinity for you. There's plenty of definitions for infinity, but the best way to think of infinity is as something you can count forever. No matter how big the number, you can always add one more and get the next number. Mathematicians say something is infinite if there is a 1-to-1 correspondence to the natural numbers.

Ok, before we move on let's consider a more physical metaphor to make sure we get it. We're headed to Germany again and we're staying at a rather special spot called [Hilbert's Grand Hotel](https://en.wikipedia.org/wiki/Hilbert%27s_paradox_of_the_Grand_Hotel). This hotel has beautifully appointed rooms and a lovely Victorian lobby with purple velvet wallpaper and oriental carpets. But that's not what makes it Grand. What makes it Grand is the fact that it has infinitely many rooms. Just off the lobby is a long hallway that starts with Room 1 and just keeps on going. I once went for a run down this hallway and had to turn around at Room 8,576. But even there they were still going and you could tell it's a long hallway.

On the day we visit, the hotel is full. No empty rooms. Can you believe that?  But when we steup up to the main desk, the concierge is very happy to offer us a room. Room 1, in fact. Even though all the rooms are full, he simply asks each guest to slide down to the next room (which they do at exactly the same time) and _poof!_ our room is ready. The next day a circus checks in and needs 100 new rooms! At a normal hotel this would be chaos, but at Hilbert's Grand it's a simple operation - each guest just heads to a new room 100 above their current room number and the circus is all set. Now we're in Room 101.

It's the weekend now and there's been a bad storm. The Frege Grand Hotel on the other side of the square is flooded and all of their guests are moving inx  to Hilbert's. They had just as many rooms as the Hilbert, but the concierge is not phased even though there are still no empty rooms. He simply asks each guest to move to the room that is double their current room number. Voila! - all the odd numbered rooms are now free. The Frege guests are relieved and we are now in Room 202 with a nice view of the plaza.

Weird, right? Let's get to the really weird part now.

Cantor tackled the rationals easily with his diagonal argument. So he tried to do the same thing with the real numbers. If you'll recall, the real numbers include all the natural numbers and the rationals and all the weird irrational numbers like π and _e_ and everything that can't be represented as a fraction. He tried to list out the real numbers in a matrix just like he did fractions. But he couldn't, so he turned the argument around.  Here's the Base2 version:

![](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Diagonal_argument_01_svg.svg/500px-Diagonal_argument_01_svg.svg.png)

Numberphile has a great dive into the diagonal argument:

<iframe width="560" height="315" src="https://www.youtube.com/embed/elvOZm0d4H0?si=uNprZcvRWM0E3Q6k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

From a math perspective, Cantor performed a proof-by-contradiction. First, he assumed that the real numbers were countable - e.g. you could map them onto the natural numbers. Then he used the diagonal method to construct a real number that, no matter how you order or count the rest of the numbers, won't be in the set!

So what does this mean? It means the real numbers are uncountable. There are more numbers in the set of real numbers than there are in the natural numbers, which we call infinity. Which means this set is _bigger_ than infinity. Mathematicians call them _uncountably infinite._

Let's stop here for a minute to consider how ridiculously weird this is. We throw the idea of infinity around as something that you can count but that goes on forever. It's worth noting that across other disciplines in math there are more definitions than that, but this is what most people think about. And it's incomplete, because countably infinite is only part of the story. There's an infinity bigger than infinity! And we _could_ keep going. Cantor formalized all this to describe a set of [transfinite numbers](https://en.wikipedia.org/wiki/Transfinite_number).  But like Knuth and Super K, two infinities is good enough for me.

If this is breaking your brain a little, you're not alone. A bunch of other German dudes around Cantor didn't like it much either. A prestigious mathematician named [Kronecker](https://en.wikipedia.org/wiki/Leopold_Kronecker) called Cantor a charlatan and a "corrupter of youth". He was one of Cantor's former teachers and this affected Cantor deeply. Meanwhile philosophers and theologians rejected the argument as an [assault on the nature of God](https://en.wikipedia.org/wiki/Georg_Cantor#:~:text=Some%20Christian%20theologians%20saw%20Cantor's,exclusive%20claim%20to%20supreme%20infinity%22.). As a devout Lutheran this was yet another blow for Cantor. He was so upset that he spent several stints in a sanatorium fighting depression and mental health, eventually dying there despite his work largely gaining acceptance. Along with some other incredible German mathematicians like [Zermelo](https://en.wikipedia.org/wiki/Ernst_Zermelo) and [Frege](https://en.wikipedia.org/wiki/Gottlob_Frege) and [Hilbert](https://en.wikipedia.org/wiki/David_Hilbert) and others, Cantor invented set theory. This became a fundamental part of mathematics and the underpinnings of the work in the 20th century on logic and computability that led to the field of computer science.

### Big Numbers Speak

Cantor's ideas of cardinality and 1-to-1 correspondence have filtered down from the 1870s to populate both formal mathematics and how all schoolchildren learn about counting and infinity. It was not obvious these ideas would win. Kronecker was a member of the [constructivists](https://en.wikipedia.org/wiki/Constructivism_(philosophy_of_mathematics)) - a school of mathematical thought that believed that there are no "non-experienced" mathematical truths; the [Platonic ideals](https://en.wikipedia.org/wiki/Theory_of_forms) do not exist outside of our thinking or intuition. 

I've never liked the idea of relying too much on our experience.  It's too close to trusting our consistently untrustworthy and limited senses.  Certainly there are physical objects that are well beyond our experience: black holes and gas giants and even the inner molten core of the Earth.  It's certainly reasonable that mathematical objects exist well beyond our minds too.  And fortunately most of the philosophy of mathematics has moved on to schools of thought that are consistent with Platonism. 

But what about the mind of God? Our Christian perception of God is as Being outside the created universe - not as a created thing but as the Creator. Looking at reality as a constructivist, even something like Super K is well beyond the scope of the universe. It is so far beyond the kinds of large numbers that make up our universe that we can barely understand the enormity of the gap. Even if you think about theoretical big numbers in our universe - for instance the branching logical possibilities of Chess or Go or the total entropy of the known universe - the numbers are wildly smaller than Super K. From this perspective, it's fair to consider Super K absolutely beyond our universe. Knuth says as much too:

> As soon as you begin to understand the immensity of Super K, you will realie that just being finite isn't much of a limitation, and you will see how pointless are the philosophers' discussions about finite versus infinite. Infinity is a red herring. I would be perfectly happy to give up immortality if I could only live Super K years before dying. In fact, Super K nanoseconds would be enough.

Knuth then ropes in Cantor's theory and brilliantly starts describing what large numbers and infinity have to say to him about the nature of God.

> But now I realize that infinity is not necessartily even one of God's attributes. I'm quite willing to grant that God might indeed be infinite and that God might have the power to examine infinitely many possibilities in an instant. But even the ability to deal with finitely many numbers, on the order of Super K, is much more than enough to inspire awe.
>
> Moreover, I don't think theologians can legitimately disagree with me on this. To say that God's ability are not infinite, but limited by quantities like Super K, is not a realistic limitation at all. Such a limitation cannot contradict the Bible or any other sacred text, because natural language has no words to distinguish meaningfully between such unimaginably large magnitudes.

Knuth then dives into the Bible's use of the word infinite (and the word attributed to God literally translates as "too big to count"). In fact, most of the quantities in the Bible seem trivial compared to Super-K. From Psalm 139:

> How precious to me are your thoughts, God! How vast is the sum of them! Were I to count them, they would outnumber the grains of sand—

Or Luke 12:6-7

> Are not five sparrows sold for two pennies? Yet not one of them is forgotten by God.  Indeed, the very hairs of your head are all numbered. Don’t be afraid; you are worth more than many sparrows.

Now that we know about Super K, the number of hairs on all the mammals in the world or the grains of sand on all the beaches in the world seem quite small.  I find this observation absolutely fascinating.

On the other hand we can, in our human way, reason about Super K. It doesn't exist in our universe in any _real_ way, but it certainly exists in the same way as does a perfect sphere; as an idea. More specifically, as a defined abstraction captured with particular mathematical language.

Much like Plato's theory of forms, this mathematical way of thinking gives us an idea we can grasp and reason about that exists well beyond the real, physical world around us.

### Thomist

This is all making me want to read St. Thomas of Aquinas much more deeply. Aquinas dedicates Question 7 in his _Summa_ to the idea that God is infinite. But for now, I'm much more interested in the idea of Natural Theology.

Aquinas distinguishes between revealed and natural theology. Revealed theology is those truths that exceed our human reason, which are revealed by God, and are taken on faith; natural theology represents truths discoverable by reason and the human intellect. Moreover natural theology suggests that the created world around us and our capacity to understand it offers additional insight.

What our reason tells us is: the world is quite a bit stranger than we realize. Well-meaning Christians, myself among them, seek answers about the mind of God in the created world we see. But too often we limit our understanding to the simple versions of reality we encounter every day. The mind of God has no such limitations, as evidenced by our ability to bend our minds a bit and reason about numbers like Super K or uncountable infinities. They are a gentle reminder that the universe operates way, way outside our normal, everyday ideas.

St. Thomas reminds us that it is an imperative to study both revealed and natural theology. But if we artificially restrict our understanding of the world, it's easy to fall into a reductionist or dogmatist faith that simplifies our created reality and thus the mind of God. Every once in awhile we need to stretch our minds beyond our everyday worlds, not just to be reminded that God exists beyond all human understanding, but also that the capacity for our understanding as His created beings is pretty large too.

> There are more things in Heaven and Earth, Horatio, than are dreamt of in your philosophy. -Hamlet