# 新时代CSS布局

*在中国第五届CSS大会的演讲抄本.*

大家好。很开心可以来到这里跟大家分享关于CSS布局的一些新进展。能够与那么多出色的CSS专家同台是我的荣幸。这是我第一次在中国演讲，也是第一次用中文演讲，所以如果有哪儿些用词不当的地方或者是一些词汇翻译的很古怪，要事先请大家多多包涵。

首先，让我来做个自我介绍。我姓陈，名叫慧晶，来自马来西亚。我曾经当过全职篮球选手，也因此无意间走上网络开发这条路。若你觉得很好奇，篮球怎么会跟网络开发扯上关系，那待会儿可以找我聊聊。

从入行到现在，我一直都觉得CSS是一样相当有趣的东西，所以会经常探索新属性或更深入了解现有的属性，并且把学习经验写在博客上。去年也加入了谋智（Mozilla）技术讲师组，这项倡议主要是要协助技术布道和指导师在世界各地的技术会议推广开源网络科技。谋智会给予组员多方面的支持，如演讲培训、技术训练、资金等。

现在我在Nexmo担任开发大使，是开发者关系团队的成员。Nexmo是个通讯API平台，提供信息，语音，认证，音视频等API，好让开发者轻松把通信功能添加入自己的APP内。

那让我们进入正题吧，也就是新时代CSS布局。想请问在座的朋友们有几位参加过2016年的CSS大会？想请问在座的朋友们有几位参加过2016年的CSS大会？我当时…在家里，没来。但是还好有视频，让我有机会在线观赏大漠老师谈CSS Grid Layout的演讲。也很高兴待会儿有机会在现场聆听他的演讲。

他介绍了与Grid相关的各种新属性及它们的应用方法。Grid在那时候都还没正式发布呢。Grid可以算是新时代CSS布局的成员之一吧。不知道观众朋友们是否同意，但是我认为网络开发其中令人头痛的一点就是纵向的布局。经过一番研究，我才发现到原因是网络原本是个以文字为主的媒介。

当年，蒂姆·伯纳斯-李爵士（Sir Tim Berners-Lee）创建万维网，主要是为了解决CERN面临的资讯管理问题。他提交了名为「信息管理：提案」这份文件，希望可以更轻易的管理和监控实验室研究流程。实验室文件不是用英文就是用法文写的。我也想顺便一提，为了纪念万维网诞生的30周年纪念，CERN召集了一群知名开发者，重建最原始的浏览器。有兴趣的朋友们可以到这个链接在线访问。

早期的浏览器都注重西文文字的排版，重视的是从左到右的水平方向。初期的元素包括h1-6的标题元素，p元素，各式的列表元素。CSS在1996年发布时，多数的属性也是为了调整文字的布局而设。但是，CSS也介绍了以盒模型为主的布局方式。其实想一想，网络的所有内容，不都只是各式各类的盒子吗？虽然初期的属性有限，但是网络开发者非常有创意，利用浮动、负margin、各式的定位等技巧，来达成心仪的设计。

直到Flexbox的诞生。Flexbox可以算是有史以来第一个以网络本质为主而编写的CSS规范。连同Box Alignment跟CSS Grid，这三个项目可以称为CSS新时代布局的三大栋梁。当然，我们不能忘记CSS里头的其它553个属性。因为CSS是个团队项目。只有各属性相互协调配合，才能把CSS的威力完全发挥出来。

如果要揭开CSS布局的神秘面纱，那就必须先熟悉浏览器的渲染过程。渲染引擎会把服务器发送过来的Source文档解析成浏览器能够明白的对象。而在渲染网页之前，浏览器会生成一个渲染树。这个渲染树是个中介性的结构（intermediary structure），是文档格式结构（formatting structure）的表示法。CSS在解析的过程，会计算出每个元素和文本节点的每个CSS属性值。浏览器就会靠其中的`display`取值来判断要生成哪一类的盒子。

CSS显示模块在这二十多年来，经过不少演变。从一开始的基本`block`、`inline`和`list-item`到现在最新规范中一共有十七种属性值。可见，CSS是个不断在进展的技术，编辑组（CSS Working Group）也会聆听多方面的反馈来更新规范。Level 3的显示模块主要是为了更换及扩展在CSS2里display取值的定义。我在此描述的东西，很有可能还未在浏览器实现，但是我们可以从中事先理解未来CSS的行为。规范提出了两种显示类型，内部及外部。内部显示类型定义了元素内子元素的布局方式，外部显示类型则定义了元素怎样参与流式布局的处理。

这个表是从规范直接引用的。它列出之前提到的十七个属性值，也描述这些取值会让浏览器生成什么样的盒子。Level 3规范详细说明了`display`属性的两类取值，可是到现在依然还没被浏览器广泛支持。即使被广泛支持后，单关键字还是可以继续用。各种属性值生成的盒子会创建不同的格式化上下文（formatting context）。打个比方，这个幻灯片上的词句翻译是用ruby标签来实现的。`display:ruby`会生成ruby容器盒子，而这种盒子建立的是ruby formatting context。

相信大多数的人都有尝试过用Flexbox来布局。可能因为Flexbox的开发过程相当凌乱不堪，属性一而再再而三的修改，网络上Flexbox的教程有时会产生一些误解。最可靠的答案就藏在规范里头。规范编辑强调利用简写的flex属性，因为它会正确的重置相关的属性值。而flex简写有几个关键字，是为了应付最常见的用例而设的。

当你把display:flex设在一个元素上时，即使你不在子元素设定任何flex值，浏览器自己会套上flex:initial这个默认值，计算出来变成0 1 auto。如果你想要子元素伸缩自如，那可以设一个flex:auto的取值，让子元素随着容器的空间同一频率伸缩。若你的理想设计内有几个flex项目是必须有固定的尺寸，可以用flex:none让它失去弹性功能，永远都保持自己的尺寸。最后，如果你用单单一个正整数为取值，浏览器就会把这个整数设为flex-grow的取值，而与其的两个取值会重置为1和0。

话也讲多了，大家应该也闷了。来些show me the code，会有趣一点吧。首先，来个小基本：自动margin。Flex容器内的子元素被浏览器视为flex项目，CSS布局最关键的转折点就在于这个父子关系。在这个简单的例子，容器内只有一个子元素。我们可以运用margin来操纵它。如果不设定任何方向，盒子就会在容器的正中间。一行搞定水平垂直居中的问题。

一个比较实际的用例则是网页的页眉。页眉经常会有类似这种设计模式。导航栏的几个链接都偏向左边，然后登录注册的链接独自在右边。我们只需要在页眉设一个`display:flex`，再用自动margin把最后一个列表项推到右边尾端去就好了。比之前的实现方法方便多了。

在学习CSS布局时，这个问题我想了很久。最后仔细翻阅规范后才明白，如果元素的高度设为`auto`，那浏览器在计算它的高度时，只会考虑元素内容及子元素，纵向没有已确定的空间来调整位置。即使元素设了固定的高度，别忘记它跟子元素是互不相关的。这很有可能是浏览器最初执行的抉择遗留下来的行为。浏览器没办法计算上下方的`margin`取值，所以就把`auto`取值解析成`0`。

我之前提到的转折点就在这儿。因为flex或grid容器跟子元素的关系，在布局时是被浏览器承认的。因此，浏览器才有办法计算出四面的自动margin取值。当然，光靠自动margin是不够的。要更精确的调整子元素的位置，我们可以运用盒式对齐模块（box alignment）提供的属性值。Flexbox的首个公开工作草案是在2009发布的，而Grid的则是2011发布。当时两个规范设定了两组不同的对齐属性，经过讨论，工作组决定把盒子对齐写成独立的规范，让过去、现在和未来的formatting contexts都统一使用相同的属性。Box alignment的属性一共有六个。在使用flex时，用得上其中四个，使用grid的话，六个属性全部都能用。

`justify-content`及`align-content`属性被视为内容分配属性（content-distribution properties），当容器内有多余的空间时才会生效。在这个grid的例子，你们可以看到grid项目的右边和下面都有些多余的空间。因此我们可以运用`justify-content`及`align-content`来对齐这些子元素。调整整个网格的行列可以用`start`、`center`和`end`这三个取值。调整行列之间的空间则可以使用`space-around`、`space-between`和`space-evenly`。

用在flexbox时，`justify-content`定义了项目在主轴（main axis）上的对齐方式。项目的尺寸及自动margin调配好之后，剩下来的空间可以用`justify-content`来分配。如果注意看这个例子，你会注意到右边有些剩余的空间。默认值是`flex-start`。我们可以用`flex-end`或`center`移动整组flex项目。而flex项目之间的空间则可以用`space-around`, `space-between`和`space-evenly`来调整。

由于项目很多，这个容器出现了多根轴线（multiple flex lines）的现象。在这种状况下，`align-content`就可以派上用场。因为它是多根轴线的对齐方式。如果轴线只有一条，这个属性是没有效果的。`align-content`的默认值是`stretch`，所以当轴线只有一条时，这个单轴线就会伸长，占满整个flex line的空间。我们可以用之前提到的六个取值来对齐轴线，或则分配轴线之间的空间。

之前在画插图时，有点走火入魔的现象，越画越过瘾。当会儿你们还会看到很多盒子的插图。这个是用来表示`justify-content`及`align-content`各个属性值的效果。Grid项目可以用`justify-self`和`align-self`来对齐自己。它们则被归类成自我对齐属性（self-alignment properties），允许我们操控项目在网格区域的位置。两轴的默认值都是`stretch`。表示项目在默认情况下，都会占据网格区域的整个空间。

调整位置时可以用`start`、`center`、`end`或者`baseline`，这几个取值。要注意的一点是当我们用上`stretch`以外的取值后，项目就会缩到内容的尺寸。`align-items`和`justify-items`这两个属性可以用来设定容器内所有项目的默认`align-self`和`justify-self`的行为。

用在flexbox时，`align-items`和`align-self`指定了项目在交叉轴（cross-axis）上如何对齐。它们的默认值与grid相同，也是`stretch`。我们可以用`start`、`center`和`end`来调整所有项目在交叉轴上的位置。`baseline`这个取值可能比较少见，但是如果你的项目尺寸不一致，导致文本上下不齐，那么就可以利用`baseline`把文本对齐。如果只是想调整其中几个项目的位置，那就用`align-self`，可以让个别项目有自己的位置。

又来一些盒子插图，最后这个baseline取值比较难用插图来呈现，只好这样子啦。没办法，我的创意有限。

有些人会问我，Flexbox和Grid要选谁比较好？我都会回答说，你这问题问错了。因为这不是个二选一的状况，应该是二合一才对。Flexbox比较适合单维方向的布局。因为运用Flexbox来实现的行列，即使对齐了，也只是个假象。Flexbox的行跟列是互不相关的。但是在单维布局，它拥有最强的弹性功能。Grid则适合做二维网格布局，因为Grid中的行列才是真实的，是有关系的。你可以像在棋盘上排棋子似的，把Grid项目排成理想的布局。

要实现类似这样的设计，用新时代布局方式是做得到的。要如何实现这种内容不对齐，环绕每个Grid单元厚厚的border？如果单靠Grid，用Box alignment属性，可以吗？很可惜，做不到。之前有提过，Grid项目对齐的默认值是`stretch`。一旦用上任何`stretch`以外的取值时，项目就会马上缩到内容的尺寸。可是如果我们在Grid项目上设一个`display:flex`，把它变成Flex容器。那表示Grid项目里面的内容，成为了Flex项目。现在利用Box alignment的各属性调整内容的位置就不会影响到Grid项目的尺寸，border也可以保持在Grid线上了。

现在已经相当普遍的响应式网页设计，主要是依靠百分比来设定元素的尺寸。运用百分比的局限就是每个元素伸缩率是一致的。有时，这会导致开发者为了应付各种viewport尺寸范围，被逼要写数不清的media query。就拿这只小猫当例子，当viewport偏大时，图案就太大，当视屏偏小时，图案又太小。因为图案拥有屏 幕比例（aspect ratio）的元素，跟文本的行级流式显然不同。但是没办法，因为百分比始终是依赖容器尺寸来计算的。

我们最常见的做法就是设定元素的宽度或高度，通常只设其中一个属性的取值，让浏览器自动调整另一个取值。而当我们固定两个范围的取值时，内容有可能会溢流到容器之外。其实内部尺寸不算新奇，只是我们通常不会去注意自己在用它。CSS其中以个较新的规范，CSS Intrinsic & Extrinsic Sizing Module Level 3，介绍了以内容为主的尺寸属性值，`min-content`和`max-content`。两年前参与了中文布局任务团之后才发现数字化排版的种种挑战。中文和西文的处理方式迥然不同。例如纵横对齐、比例字体、标点符号的挤压等等，在西文是不存在的。当然西文也有自己需要应付的问题。西文单词基本上是不分隔为两行的。

这例子的八个字的宽度都被设为`min-content`。在西文用`min-content`时，只要没有空格、短横线、或特别的设置，最小宽度一般会依照连续的英文字符单元来决定。汉字的最小宽度则是一个汉字的宽度，通常就是`1em`。在深入研究这些新的布局模式时，我发现到最有趣的东西是灵活性尺寸。根据所设定的属性值，元素伸缩的变化率是有差别的。有些属性值会「坚持自己的立场」，在viewport变化的状况下，尽量保持范围内的宽度。这样讲有点难了解，还是看看一些用例吧。

接下来的这些例子都会用grid来实现。所以这些有灵活性的属性值都设在grid-template-columns上。我们先来对比`fr`跟`auto`用在一起时会有什么效果。绿色是`fr`，蓝色是`auto`。`fr`是多余空间（free space）的数量单位。所以有多余的空间时，浏览器会把空间都分配给`fr`值的那一栏。fr也可以用来规定多余空间分配的比例。

第一行的分配比例是1对2对1。因为每个栏都用`fr`，无论viewport怎么变，只要有多余空间，中间栏的宽度永远都是旁边两个的一倍。当然，空间不足时，浏览器也会第一时间把空间取回。viewport变小时，绿色栏的内容最先分隔，缩到`min-content`值后，蓝色auto栏里的内容才开始分隔。其实这个例子没什么特别的，因为`max-content`本身就是个固定取值。有固定取值的存在时，有灵活性的栏就会承担空间调整的责任。

这个例子就有趣多了。橙色是`fit-content(200px)`，黄色是`minmax(200px, 400px)`。这两个取值的行为是类似的。被传入`minmax()`函数的第一个参数是尺寸下限，而第二个参数是尺寸上限。`fitcontent()`函数也可以当`minmax()`函数来看待，只是它的尺寸下限是`min-content`，而尺寸上限是`max-content`和参数值当中较小的取值。因此，viewport在缩小时，`auto`和`fitcontent()`的行为和量变率是相同的。viewport变大时，`fitcontent()`被引数值约束了，长到`200px`就不能再长了。`auto`和`minmax()`会继续伸长，可是`auto`到了`max-content`的宽度时，会停下来，让`minmax()`长到尺寸上限后，才继续伸长下去。

这两个网页有些微妙的偏差，在viewport偏大及偏小的状况下才会明显。重点是，有了这些新属性值，网络上的编辑设计可以更有艺术指导。Grid的网路线定位允许开发者轻松的实现重叠式的设计。再加上grid轨道灵活的伸缩功能，让我们在实现响应性设计时，有更多富有创意的选择。

Grid正式发布到现在，已经有大概两年的时间，浏览器的支持程度如今也高达88%，可以算是被广泛支持了。但是其它12%的用户该怎么办呢？其实CSS可以通过feature query做功能检测。它的语法类似media query，只是用的关键字是`@supports`。我虽然提到grid当例子，但是feature queries可以用在任何一个CSS属性。`@supports`的支持率高达94%。浏览器不支持它也没关系，因为不认得`@supports`的浏览器就会忽视整个声明块内的CSS声明。

建议把回退样式写在前头，接下来的新属性包含在`@supports`规则内。运用这种渐进增强的实现方法好处就在于连运用旧款浏览器的用户，都可以顺利的浏览你的网页。在这里可以看到用feature queries实现的布局。左上角的浏览器是IE11。由于它不支持`@supports`，grid布局的声明块完全不影响它。IE11的用户依然可以浏览网页的内容，从中受益。用较新款浏览器的用户则可以享受被提升的布局和功能。

时间也差不多了。在结束之前我只想说，即使我刚才所说的一切你都不记得，我要求你们牢牢记住这个问题的答案。

网站需要在每个浏览器都长得一摸一样吗？

No.

最后，我也要感谢一位跟我一样热爱CSS的好友，皋玮，帮我修正错字连篇的演讲稿。这里有些参考链接，过后会跟大家分享。希望通过这个演讲可以让在座的朋友们有所启发。运用这些新属性去尝试实现通用型的网络设计，创造更符合浏览器本质的网页。谢谢大家。
