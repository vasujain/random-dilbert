var cheerio = require('cheerio');
var request = require('request');

var firstDilbert = new Date(1989, 03, 17)

// Gets a random date between two given dates
function randomDate(start, end) {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function yyyymmdd(date) {
	return {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate()
	}
}

// dilbert urls are formatted as strip/year-month-day (values less that 10 can either have padded zeroes or no)
function formatDate(date) {
	return date.year + '-' + date.month + '-' + date.day;
}

function getDilbert(callback) {
	var yesterday = new Date()
	yesterday.setDate(yesterday.getDate() - 1)
	var date = yyyymmdd(randomDate(firstDilbert, yesterday))
	var formatted = formatDate(date)
	// Get Dilbert page
	request('http://www.dilbert.com/strip/'+formatted, function(err, response, body) {
		if (err) return callback(err);
		// Use cheerio to access the html of the returned page
		var results;
		try {
			$ = cheerio.load(body);
			var $imglink = $('.img-comic-link')
			var dateReg = new RegExp(date.year + '-0?' + date.month + '-0?' + date.day)
			if (dateReg.test($imglink.attr('href'))) {
				// we got the right date
				results = {
					date: formatted,
					url: $imglink.find('.img-comic').attr('src')
				}
			} else if (getDilbert.failOnInvalidDate) {
				return callback(new Error('The date for Dilbert didn\'t work: ' + formatted))
			} else {
				results = { // true randomness
			    url: 'http://assets.amuniversal.com/321a39e06d6401301d80001dd8b71c47',
			    date: '2001-10-25'
			  }
			}
		} catch (err) {
			return callback(err) // hehe
		}
		return callback(null, results);
	});
}

getDilbert.failOnInvalidDate = false

module.exports = getDilbert







/*

NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmmmdmdmmddmmdmmddmdmmmddmdmdddmmdmmddmdmmdddmdmmddmmdmmddmdmmdmmmdmmdmmddmmddmdmmdddmdmmdddmmmddmmdmmdmmmmmmddmmmmdmdmmdmmNN-
Nh.`````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````.mN-
Nh`         `......  `:/-   ``    ` `:::`          .//.   .....       `-      `::`   `-:-    .//`   `    ` `-    `` `......`.....``-`   .`    ..`           .dN:
Nh`        `+ssmyso`:do:ss` oo   `d`/h:+h`       `oy::y+`.dy//+`      +do`   +h::s- :d/:++ `sy:/y-  d.   y..mo`  +o +ssdyss-:/do/` dy.  y/  -y++s`          `hN+
Nh`            d:  .m:   so oo   `m`/y`.h.       :h`  `h:`yo--.      .d-sy. :h.    .d`   ` /y`  -h. d-   y..d+y:`/y    o/`    h:   doy/ yo `h.`--.           yN+
Nh`            d+  .m.  `yo :y` `-d`/d//ys.      /y`  .d: sm:-.     `hs/+od/-h-  `.`h-   .`+s`  :h. y/  .d..m-`/shy    oo     yo   d/`/sdo `d-`:+d`          yN+
Nh`            y/   -oosy/` `/ysys: .s` `:s-     `/sssy:` /y        .h`   -d.-osoy+`.ososs``/osso-  .osys:``s-  `/o    +/   .oyy+. o:  `o+  -oooo-           yN+
Nh`            `      ```     ```    `    `        ````    `         `     `   ```    ````   ```      ```         `    `     ````        `    ```            yN+
Nh.`````````````````````````````....................................................................................................................-:--....-hNo
NNmmmddddddddddddddhhddhdhddhddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddhdddddddddddddddddddddddddddddddddddddddddddddmNh
Nd--.````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````/Nh
Nh`                                                                                                                                                          /Nh
Nh`                                                                                                                                                          /Nh
Nh`                                                                                                                                                          /Nh
Nh`                                                                                                                                                          /Nh
Nh`                                                                                                                                                          /Ny
Nh`                                             `::`   .       ````  .::-`             .   ````  .::-`    ````                                               /Nh
Nh`                                           `+o//++``h:  `y--y---` oy//y-       :o   s: /s--- `hs/+s`  +s---                                               /Nh
Nh`                                           /h`  `s+ :h-`hs`:d/:`  oy:/h-       /d///ho /d/:`  yo:/h`  +h/:`                                               /Nh
Nh`                                           /y. `-h/  :ysy` .d-.`  /d-/sy/      /y.../h -d-.`  ss-/yo. :d-.                                                /Nh
Nh`                                            -//++-    :+`  `o///- .+   .+.     -/   `+ `s///- ::  `-/`.o///.                                              /Nh
Nh`                                                                                                                                                          /Nh
Nh`                                                                     `    `                          .-.           ````                                   /Nh
Nh`                                          -o       o/s/--.      :o  `h-  :hs`  -y.  `o:/s---       -s/:/o` /+    s`:h:/s.                                 /Nh
Nh`                                          :y   .   s+yo:-       /h--/m+ `y:/y. `oy  /h`/h::`       y/   os oo    y`:h.-h.                                 /Nh
Nh`                                          :h` -d.  s+oy--       sy:::yy /h//sh- `s/:h- :d:-`      `y-  `os :s`  .y`-N/+h+.                                :Nh
Nh`                                          `+++o:o++o`:s///`     +:   .s s-`  :s` `os-  `s///-      -+/++/.  /o++o- `y  `:+`                               -mh
Nh`                                             `   ``                     `     `           `           `       ``                                          .mh
Nh`                                                                              ``                                                ``                        .mh
Nh`                                           -h++o.   `os`   /s-  .o `so++o:  .o++o/  .y/` -s`      `s/`  +: .+    +.`oo. .o:   oo/:s- .s///. -h/+o`        .md
Nh`                                           .d-`y/   /s/s`  :hh+`.d``d.  .h/`d:  `s- -dohoyss       hyy: o+ -h`   s-`moysyom-  s+`+d/ -h..`  -d``y-        .md
Nd`                                           .dsod/` `mo/hh. :s`/s+d` h.   os-d`   o+ -h ./.`h/      h:.sooo .h.   y-`m-`/- +h` /h.-:s+.d+:.  -Nood/`       .mm
Nh`                                           `y- ./o:+s.../y--s  `+y` so+++o. /+//oo` .s     -h.     s:  -ss  /o++o+``y-     s/ -d//+o-`y+//:``d` ./s.      -NN
Nh`                                            ``   ````    `` `    `  `````    `..`    `      .      `     `   `..`   `      ``  ....`  `....  .    `       :NN
Nh`                                                                                                                                                          :NN
Nh`                                            `://:  ++++.  o:`  /: .o++/. -y+++`   `+o`  `/++s++- .++++. `so+o:                                            /NN
Nh`            .` `-`  `-`                    .s-`..``h/-.   dys- +/ :h--`  :d.`y-   oy+y.  ``:m.``.d:``-h.`h:`/h`                                           /NN
Nh`         `+ s-.oo/-/oh-`` `.`              :s  os+ sho+`  d::y/++ -Nso:  -dood-  .m/-oy`   -N-  /y    y/`hyohy`                                           /NN
Nh`     .:+-:y/o-/:+/:-+///s/+y:              `o+:/o+ os--.  h/ `/ys `m:--. .d-.:oo.os---+h.  -N-  .s/::+s. so`-+o+   :-                                     /Nm
Nh`       -+y/:--------------o+o:               .--.  `---.  .`   `.  -----  -`   .`-`    :.  `:`    -::-   ..   `-   .`                                     /Nd
Nh`         s/---------------h``                                                                                                                             /Nh
Nh`        `y:--------+o+++--d                                                                                                                               /Nh
Nh`        .hs+-----:+y//os--h                                                                                                                               /Nh
Nh`        ss+s----/yoooos+--h`                                                                                                                              /Nh
Nh`       /s/+s----:++/--:---y:                                                     `:                                                                       /Ny
Nh`      `y++oo--------------o+                                                      y.                                                                      /N+
Nh`       -ys:-----------:+/+so:-                                                    s+                                                                      /N+
Nh`      `+o++o//::::////y.`-h``s/                                                   o+                                                               ``.....+N+
Nh`      s/y+:///:::/+++os` -h/oyy:`                                                 s+                                                         ``-:/oyyyyysydN+
Nh`     `h:y/------------+++o:-so/+s-                                                h.                                                      `-+syhysyyyyyyyyhM+
Nh`      -oyso/----------------/y/+oo                                               :+                                                     `+oo++++++++++++++yN+
Nh`       -h:-----:------------:/+oy`                                              `y`                                                    .so++++++++++++++++dN+
Nh`       /o----:soo/-------/++so/:`                      .`        -o-           .o-                                                    :y+++os+++++++++sssodN+
Nh`       +o---soo/os----------/y                        :oy. `````-y-y-         :o.                                                    /s+++oys++++++++++oo+dN+
Nh`      //++/:ooo+s/-----------h:                      .y-:ysyyhyhhhyh+.        .`                                                    +y++++os++++++++++++osmN+
Nh`      :/.`.-:/+so/::-------::ys.          ```   .`   +hoohysssssssssyys:                                                           /y++++oy++++++++++++++omN+
Nh`      .o:--:--....-:::-..-smmmo// `:/::/+/+///./::  oddssssssssssssssssd`                                                       `-/s+++++s++++++++++++++++dN/
Nh`      +.    `.-//:--.``` ommNMNyy/s/...ssyo+:/s-`  /myssssyyhhhhhhdhddhd-                                                     `:ss++++++++++++++++++++++++dN-
Nh`      y.          `.--::/hhhdNN+ho-....-+ysss:/s` `hhyssssssssysoossssssy+`                                                 `/so++++++++++++++++++++++++++mN-
Nh`     `s       `-:..``    `-NNMNs-/+:-....-shooy+  .mhsssssssssssssysssssssy-                                        `-/++/++ss+++++++++++++ssoo++++++++++oNN-
Nh`     .s      -soooooso/.`  +ddd-s+:+s:.....:-.o.  :dysssssssssssssssssssssy/                                       :sssso++ys++++++++++++++ossyys+++++++++NN:
Nh`     .s      s+/oo++/. .so-.-ymo:--/hd-.......o`  +dyssssssssydmhdNNNNNshy.      /+- .:-                          +yyyo+++yy+++++++++++++++++oss+++++++++oNN-
Nh`     .s      .:-:      `s///++:--:smhy/......-s   yhsssssssssmNNNNNNNNm///-.`   `syysyhs`                .:o++o+:sdys++++yy++++++++++++++++++++ss++++++++oNN-
Nh`     .+                oo-------/hy+-+/....../o  .mhysssssssssyyyyhhyyyssssyh/+osyssosyyo`             :ososoo+++osyyo++sh++++++++++++++++++++++s++++++++sNN-
Nh`     .o .++o.:-`      -y+/+++++ss---/y-......s-  +mhsssssssssssssssssssssssssmyssssssshs-            -ssosso+++o+o++oyyyho++++++oo++++++++++++++os+++++++sNm.
Nh`     .s/s///s`.-:/-.`.s`       +o+//y/......-y` .dhysssssssssssssssssssssssssshhyo:::/s/           :sssyhy++ooo++++++oys+++++++os++++++++++++++++s+++++++sNm`
Nh`     `hs///y:     `:/o`        /. `s/.......-h  ydysssossohssssssssssssssssssssh:                -+s++++++++oo++++++yy++++++++sso+++++++ss++++++++s++++++sNm`
Nh`     /y////y:                  :/ ++.....--/o/ /dyssssshNsydossssssssssssossssssh-            -+oo+++o+++++++++++++oh++++++++oss++++++++ss++++++++os+++++sNm`
Nh`     :y/////y.                 `s`++++/+o::.  `mhhssssohMyshysssosssssossssssssssy          .ss++++++o++++++++++++oh++++o++++++++++++++++oo++++++++++++++sNm`
Nh`      +o++ooy`                  :/     `y`    +dysssssssmdssdyyyssssssssssossssssy:        .yo+o+++os++++++++++++oh+++os++++++++++++++++++o++++++++++++++sNd`
Nh`       s...`                     -`     +:   `hysssssssssNysyyddssssssssssssssssosy       .h++so+++oo++++++++++++h+++ss++++++++++++++++++++o+++++++++++++sNm`
Nh`      .y                          .+    /+   /mhsssssssshmdyhydyossssssssssssssssoh`     `oo+syo++os++++++++++++ho++oss++++++++++++++++++++++++++++++++++sNm`
Nh.```````y.``````````````````````````/```.y:``.hhysssssssssshdhhhsssssssssssssssssssm:`````+s+oys++++++++++++++++yy+oysso++++++++++++++++++++++++++++++++++hNm`
NNNNNNNNmNNNmNmNmNNNNmNNNNmNNNNNmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNm`



/NmdmddmdmddddmdddddddmddddddddmdddddddddmddmddmdmddddmdddddddmddddddddmdddddddddmddmddmdmddddmdddddddmddddddddmdddddddddmddmddmdmddddmdddddddmddddddddmddmddmNs
/N+`   `      `            `             `            `            `             `            `            `             `            `            `        `+Ns
/N+                                                                                                                                                          +Ns
sN+                                                                                                                                                          +Ns
oN+                                                                                                                                                          +Ns
sNy                                                                                                                                                          +Ns
sNy                                                                                                                                                          +Ns
oNy                                                                                                                                                          +Ns
+Ny                                                                                                                                                          +Ns
/Ny                                                     +/`  `+. /+oo/ `o-   .: .+///`      -o`  `+` -+oo+` +/   `+ `////.                                   +Ns
/Ny                                                     +my. `h- `.d/`  yds. -h -h.``       :mh- `h-  `s+`  +ds. `d..h.``                                    +Ns
/Ny                                                     /y.+s:y-   y:   y+-oo:y .mo:.       :d.+s:h-   /s   ++-os:d- ho:.                                    +Ns
/Ny                                                     /y  .om/ `-hs-  y+  -sh  d/..`      -m` .om:  -oh-` +s  .oN- s+...                                   +Ns
:Ny                                                     `.    .` `:::-  .`   `.  -:::-       .    .`  -::-` `.    .` .:::-                                   +Ns
-Nh`                                                                                                                                                         +No
.Nh                                                     ::    /` :+//: `/.   `- `:///`      .:   `/  ./+//` :.   `/  :///.                                   +Ns
.md`                                                    +mo. `h- `-m/`  ydo` -y -d-..       :mh. `h. `.y+`  omo` `d`.h:..`                                   +Ns
.md`                                                    /y:o+.y-   h:   yo/s/-h .d+/-       :h:oo.h-   +o   +++o+.d.`ho/:                                    +Ny
.mm.                                                    /y `:sd/  `yo`  y+ `/yh  d:``       :m``:sm-  `/y`` +s `/sm- y+```                                   +Ny
.mh`                                                    .:   `:. `/++/  --   `/  ////-      `:`  `:.  :/+/. .-   `/` :///:`                                  +Ns
.Nh                                                                                                                                                          +Ns
.Ny                                                     -`    .` -----  -`   `.  ....       .-    .  .----` -`    .  `...`                                   +Ns
.Nh                                                     +d+` `h- -/do- `yy:` -s -h:::`      :mo` `y. .:ys:` od:  `h``y/::`                                   +Ns
.mh`                                                    /y:s+`y-   h:   yo/y/-h .mo+-       :d-s+.h-   +o   +o/s/`d.`hs+:                                    +Ns
.md`                                                    /y `+sd:   y+   y/ .oyh `d/``       :m``/sm-   /y`  +s .+ym- y+``                                    +Ns
.Nh`                                                    -+   .+- `+ss/  /:   -+  o+//:      .o`  .+.  /oy+. -/   .o. /o//:`                                  +Ns
.Nh                                                                                `                   ``                                                    +Ns
.Nh                                                                                                                                                          +Ns
.md`                                                                                                                                                         +N+
.md`                                                                                     ``                                                                  +No
`my                                                                                      -+                                                                  +No
.mh                                                                                      :o                                                                  +Ns
`dd`                                                                                     -o                                                                  +Ns
.md.                                                                                      y`                                                                 +Ns
.md`                                                                                      s`                                                                 +No
.md`                                                                                      /:                                                                 +N+
.mh`                                                                                      `y`                                                                +N/
.mm.                                                                                       +/                                                                +N/
.mm.                                                                                       `o-                                                               +N+
.mm.                                                                                        .o.                                                              +N/
.md.                                                                                         .s`                                                             +N/
.md.        `  `.                                                                             ..                                                             +N/
.mm. ``/o-.`s/ +y.`:+                                                                                                                                        +Ns
.mm-./ssh+//y/osos+s+                                                                               `/:                                                      +No
.mNys++o+/--:-+::s//`                                                                               +o++`    `````                                           +N/
`dm:-------------y-                                                                                 ++:+y/osyyyhsyyo+.`  `:+/                                +N/
 dm:-------:+o+:-++                                                                             `-/oyhyhyhhhyyhyhhhhhhs++/:oo                                +N/
 dm:-------oo+oy-:y`                                                                          -osyyyyyyyysyyyyyyyyyyyyyho:oo`                                +N/
 dm:-----:+s+/os--+o                                                                         /dyyyyyyyyyyyyyyyyyyyyyyyyyydm+                                 sN/
 dm:----sso++++y:--h.                                                                        +hyyyyyyyyyyyyyyyyyyyyyyyyyyhhm/                                yN+
 dm:----:///://:---+o.`                                                                      .hdhyyyyyyyyyyyyyyyyyyyyyyyyyddd`                               yN/
 dm:-----------:+/+h:-+:                                                                    `shyd/::shdddhyyyyyyyyyyyyyyyyhhm+                               yN/
 dm:-----------y- `+/.-y/-`                                                                `ohsyyysoyhydyo.-:hhhhhhsyyyyyyhhdh`                              yN/
 dN+:://++oo+//s:``:y+hs++o/                  `                                           -yyyyyyysyhyhyyhysyhyyyyyyyyyyyyyhhm.`                             yN/
 dNoo+/:::------+++/--:osoys      +/.  ``````/o`                                         `dyyyyyyyyyhydyyyyyyyyyyyyyyyyyyyyhhmysssso+++++/:.`                yN/
 dN+--------------------:/s/      o++sssyyyysdyo`                                         shyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyhhdmydddddhdhhhyyyo+-``           yN+
 dN+-++///----------:++s/:-      /hysysssssssysyo+.                                    ./ooydmysmmmmmmdhyhyyhhyhhyyyyyyyyyyyhhNhyyyyhhhdhdhddhhhys+`         sNo
 dN++y///h:----------:-s/       /NNNyssssssssssssyd.                                  -hyysyyyyyhddmmmmd-y+omNhNNNNyyyyyyyyyhdNmysssssssyyyydddddyys`        +Ns
 dNsh///+h-------------:y      +mNNMNhshhhhyyyhhdhd.                                 `yhsyyyyyyyyyyyysyd-:y-smddddhyyyyyyyyhhhmNhssssssssssssssydysh/        +No
 dN+soo++h--------------o+`  `ydhhhdmmmsssssyssyssss`          ````                `:hhyyyyyyyyyyyyyyyyd/:::yyyyyyyyyyyyyyyhhhdNdyssssssyysssssymhsys        +N+
 dN/---///-------------::h//``hmdhhhhdhosssssssysssh-  ```-/+oooooo+o+++/-.```  `:oyhmyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyhhhdNNyssssshhhysssssmhyys        +No
 dNo:---------::://++sdNNd--s :NNNNNmmsshhhhhdddddmy+o+ssoo+++++++++++++ossssssshyyymyyyyyyyyyyyyyyyyyyyyyyyyyyhdhyyyyyyyyyydhdNNysssssshdyyssssdhsys        +Ns
 dN+:-:::::-::::-..`/dmNNNm+++/mmdhyyyssyyysssoooss+++++++++++++++++++++ydhhyhyyyyhyhyhhyyyyyyyyyyyyyyyyyyyyyhhyyyhdhyyyyyyyyddNmhsssssssyydhsssyssy+        +Ny
 dmo:-.``````.----::shhdmNMdsso++++++++++osssyyssssoyysss++++++++++++++++ydhyyyyyyho++++oosssyhhhhhyyyyyyyhdhysyhdhyyyyyyysyddhNNdsssssssssyyhssdssd/      .:/Nh
 dm.-::://:::://:::---+ddhs+++++++++++++++++++++++++o+++ss+ossss+++++++++hhhydydyhhd+++++++++++++yyhyyhdddhyyyhdhyyyyyyyyyyydddNNhsssssssssssssshssd: `./osdm+Nd
 dm.      .o+++ooooooo++sssossoooo+++++++++++++++++++++++++++++++++++++++++++sso+++++++++++++++++hdhyyyyyyyhhsssssyhhhyyyyyhhdmMNysssssssssssssssyymssyyyyydo-Nd
 dm.   `:oys+++++++++++o+ssoosssysyyso+o+++++++++++++++++++++++++++++++++++++++++++++++++++++++++oydhhyyyyyds++++++++oosyyhhhmhNNsssssssssyyyhhhhhyyyyyyhym+ -Nm
 dm.   sh++++ssooosoosssssssssoo+++oo+ooo++++++++++++++++++++++++++++++++++++++++++++++++++++++++oyysodhhosyo+++++++++++++++++oshhhhdhhhhhhyyyyyyyyyyyyddh/  -Nd
 dm. `os+++ossssso+++++++++++oossooooss++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++o+++++++++++++++++++++++++++osssyhhyyyyyyyyyyhhmy/`   -Nd
 dm.`yo+++oyssso++++++++++++++++++++++++++yyysyssssyso+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++osyhhhhhdhddh-      -Nm
`mm-ho++++yys++++++++++++++++++++++++++oyso++++++++++osyyyo++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++oosyyysoo/-`  -NN`
.mmho+++++o+++++++++oss++++++++++++++++ohhs++++++++++++++ossoooossssoo++++++osooyyyyysooo+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++oss++sNN.
.mNs++++oso++++++++ssoo++++++++++++++++sys+++++++++++++++++++++++++oosyyyyo++++++++sysssyysoso+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++sNN.
.mNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN.



-NNmmdddddddmddddddddmdddddddddmddmddmdmddddmdddddddmddddddddmdddddddddmddmddmdmddddmdddddddmddddddddmdddddddddmddmddmdmddddmdddddddmddddddddmdddddddddmddmddmNN
-Nd``            `             `            `            `             `            `            `             `            `            `             `    `-mN
:Nd`                                                                                                                                                         .mN
+Nd`                                                                                                                                                         .mN
+Nh`                                                                                                                                                         .mN
+Nh`        :/    /ooo:   .///:                                                                                                                              .mN
+Ny        -hy+   y+`:h.  os...                                                                                                                              .mN
+Ns       `h+-ys` yy+yh`  :do+`                                                                                                                              .mN
+Ny       +h///oy.oy`.+s/ -h-..`                                                     `/+++++/`:   :.  `o-   -++++++-`.`://:       -+++++/-:   :- `/:::`      .mN
+Nh`      :.    :.`.   `- `----`                                                      ``.h:``.m   o/  osh/  ```so```//++...       ```s+``-h   +s -h..`       .mN
+Ns                                                                                     `h-  .Nsssh/ -h::m/    sy     -sssys`        s+  -mssshh -myo-       .mN
+Ns       ..    -. `/+/.   `    `                                                       `h/  .m```-s`ho::/y+   sy     `o:-/h:        ss  -d```.h``d/-.`      .mN
:Ns       .so. /o`-y/--s: .s   .h.                                                       -.  `:    -`/`   `:`  .-      .///-         --  `:    :` :///:      .mN
-Ns         -sho` s/   .d`.y   .h.                                                                                                                           .mN
-Ns          `d.  +s.`.oy `s/`.+s`                                                    -+++/` :///.    `/++.   .++++/` .`    `:---`  -.   .                   .mN
-Ns           /`   -/++-`  `/++:`                                                     +y.`sy`so.:y   .y/..s+  .d-`:d. o:    :h...` `hyo-+y/                  .mN
-Ny                                                                                   :msoy: sy/os   o/   .h. `d-/syh:o+    .moo-  `h-:ho-d.                 .mN
-Nh         ```           ...`    ````                                                .m+`   +h:/oo. /s.``+y.  h+``.yo:s``` `m-``  `h- `  oy                 .mN
-Nh`      -o+++  `s    s`/d++y.  .d+++-                                               `o:    ./   -/  :+oo/`   /o+++/`.o+++. ++///  :`    `o`                .mN
`md`      /s/++: .y    y`.d:-h:  `m+/-                                                                                                                       .mN
`md`      `/-..h+`y-  .y``d//ss: `hy..                                               `        ` ....` `...... `   ``      `-:-`     `.    .`    `            .mN
`md`       /o+oo. .+ooo- `o`  -+- +s///`                                             o+       o::+m+.`://d+/: y`  -o      -d:/y-    oh/   +d+. `y.           .mN
`mm.         `      ``                                                               o:   -   s+ .d.     m.   d+//+h`     .d::h:   /y.yo` +y+y/`y:  ..-.`    .mN
`mm.                                                                                 +o  /m:  y: `d-     m-  .m-...d`     .d:-oy+`.do//yy`+d `/ym:  ----`    .mN
`mm.      :ssyyss-+-  .+   oy.  .osshsso`/.+o+o.                                     `oooo-o++o .+hs:    s-  `s`   o`     `o.  ./::o`  `o:-o   .+-           .mN
`mm-       ``/o`` y+--:h  :s/y:  ```d-``./:h//+-`                                      ``   ``   ```                                                         .mN
`mm-         /y   y+:::h`.do/oh/    d-    `/:--+h.                                    ````      ..`             `     `                                      .mN
 hm-         :s   o.   s-+y`  .y:   y:     +o/+ss`                                    ssooo/` .oooo/  -y/``:o`  s+.  -s `yo++. -++++` -+++-                  .mN
 ym-          `   `    ` ``    ``   `       `..`                                      h: ``so`h:  `y- od/yyosy` hss+`.d``d+:-  os://- +o:/:`   `-            .mN
 yN:         `                      ``       ```              ```                     h:  `oy`d.  `y: +h `- `so`h/ :ood` yo-.  `/:--s+`+:-/h.  `-            .mN
 yN:      `ysos.    /s.   -o.  `o` :yss+.  `/sss/`  o/` `:.  -oos-                    sysoys. -sosy+  -s     .y`o/  `:h` +s::- `osssy-`yssys`   `            .mN
 yN:      `d/`+s   .hoy-  .dy/``h- +s..-y: os``.+o `dss:syy` `.-+s                    `...`    `..`    `      `       `  `...`   ...`  `...                  .mN
 yN/       ys/yy. `hs/oh: .y./o/h: :s   +y.h.   .d `h-.+-`ss  -s-`                              ``                    `                                      .mN
 yN/       so `+s/:d...:h-`y. `/h- .y//+y- /o::/s+ `y.    .h. -:                     .+-`  -o``+ooo-  :-   --      .+o++.  :s.    s/`  -/                    .mN
 oN/       ``   `.`.    .. `    ``  ....`   `--.`   `      .` ``                      .+s:/s.`y+``.y. oo   /+      y/` `` .y/h-   hyy: :y                    .mN
 +N/                                                                                    `/d. `d`  `y: +o   ++      h.    `yy+sho` h/.+ooy                    .mN
 +N/                                                                                      h`  /s++oo` `oo+os.      :ooooo/h.``.ss s+  .os                    .mN
 +N/                                                                                      .    `--.     .-.          .-.`..    `. ``    `                    .mN
 +N/                    `.                                                                                                                                   .mN
 +N/                    o:                                                            -/.   :` .:::. `-    -``/:::` .+//:         -o++o: `::::.              .mN
 +N/                   `y.                                                            :my/` s: os:-. `h+  :h.-h:--` :d--h-        -h.-sy`.d/:-`              .mN
 +No                    y.                  `:+-  `.` `.-` ``                         :d-/s/o/ /h/:   -h:`h: `m/:.  -do+d:`       `d-::+y-do/:               .mN
 +Ny                    :o           --` /o`+//+-+/so//+d+oho-:`                      -d- `/h/ -h-..   .yy/   h-... .d-`:os.       h+--+h.y+...              .mN
 +Ny                     y:         `os++s++/-:o/--+/--//:/oso+.                      `-`   `` `::::    `:    -:---  -`   -`       -:::-` .::--`             .mN
 +Ny                     .//.         -++------------------y:`                                                                                               .mN
 +Ny                       -//-        :+------------------h                          `.--.  ``    ``:/::`   `....                                           .mN
 +Nh                         ``        :+-------:+ooo------h                         .y/:::  /s   .: ss-/y`  /y:--                                           .mN
 +Nd                                  `oyo:----+h+//so-----h`                        `o+++++`/y   -/ sy+sh`  -d+/`                                          .:mN
 +Nd                                  :y/y+---+yo++++y-----s:                         //..:d:.y:.-o: +s`-os- `d.```   -`                                `-/oydNN
 +Nd                                  /s/h:---soo+///:-----o/                         ./++o:  .+++:  ./   -:  ++++/   :.                              `/sssyydNN
 +Nd                                  +yso--------------:::oy-                                                                                       .so+++++oNN
 +Nd                                   o+-------------:s//oy.:+`                                                                                    `so++++++oNN
 +Nd                                 ./so++///////////h-  -y--s/`                                                                                  `so+++++++oNN
 +Nd                                :s/s+:+///////////s+..+s//++/+:                                                     .-                        `so+++syss+oNN
 +Nd                                s/os---------------/++/-------y.                                                    `s`                       os++++oossooNN
 /Nd                                /o:s/:+----------------------:y.                                     -:              +-                      -y+++++++sssoNN
 /Nd                                 -:y++/--:+/+---------:++++///.                       -.     ``.--..++y:             s-                     .y+++++++++sssNN
 :Nd`                                 `h----+s+/oo---------:::y`              `           d++.`-+yhddhdddos+`           .s`                    .h+++yso+++++osNN
 -Nd`                                 `h---/y////os-----------y-           `:sds          s:-/ymddyyyyyyyyyys+-        `y.               `..``-yo++oo+++++++osNN
 -Nm.                                 `h--:yo+ooos:-----------/s        `:syhhhd/         `s+shyyyyyyyyyyyyyyyh+       .`             `:oyyssys+++syso+++++++oNN
 -Nd`                                 +s+++++/:-:-------------:d/:`     :NNmhhhhd:        `dmhsyyyyyyyyyyyyyhhdo`             .:+o+oo+ys+ssyy+++oso++++++++++oNN
 -Nd                                  o/````-:////+/+++++/++odmNy-o.    -NNNNNmhds        oddysyyyhhhdmhhhhhdyyho.           +yooo+++osyyoyy+++oo++++++++++++oNN
 -Nd`                                 -s---:::-.````.````  `hmNNNhs+    .mNNNNNm:        `mdhyyyyyyyyyyyyhyyyyyyyyo`       `/s+syo+++++++yh+++ooo++++++so++++oNN
 -Nm.                                 :+      `..-:-:-::::/+hhdmMN/s:   +ddmMNd-         +mhyyyyyyyyyyyyyyyyyyyyysh+     `/so+oo++++++++oy++++++++++++ooo++++oNN
 -mN-                                 +:                     -hNMMNhh++smhhhdm/         `ddhyyyyyyyyyyyyyyhhhhhhhhs.   `/so++yso++oss+++ho+++o+++++++sso+++++omN
 -NN-                                 o.  `/      :/+++.      `/hdhhhmMNMNhh+.          +ddysyyyyyydNNNNhNNNNNs:oo`   `so++s+++++oyo+++ys++++++++++oso+++++++oNN
 -mN-                                `s   :+     +s////s+        .+syNNNmhs+-`         .dhhyyyyyyyyNNNNNNNNNNNdossyy/`so++oo+++++os+++oh++++++++++oo+++++++++oNN
 -mN-                                `s   +/     `s+///+d.        `+o/::+h+o/+o:`      /mdhyyyyyyyyyyyyhyyyyyyyyyyyyhdy+++++++++++++++ho+++++++++++++++++++++oNN
.-NN/                                 s.  s-      -s++soo+     `+/++/+o-yodos//+y`    `ddhyyyyyyyyyyyyyyyyyyyyyyyyyyshh++++++++++++++od+++ssso+++++++++++++++oNN
 -mN/                                 /+` s-       `..` `s``.:/s/---+yos-:shoyo/m.    :mdhsyyyyyyyyyyyyyyyyyyyyyyyyyyyhh++++++++++++odo++oys+++++++++++++++++oNN
 -NN/                                -yooo+o`        `.:+so+//:---:ssyd+:-h/+hss++    sdhyyyhhsdysyyyyyyyyyyyyyyyyyyyyyhy+++++++++oyyh++osso+++++++++++++++++oNN
 -mN/                                y+//h-::-...s-:/++/:----/+oo/osho+:++//./s--y.  `dhyyysmdshdyyyyyyyyyyyyyyyyyyyyyyydy++++++++yyho++so+++++++++++++++++++oNN
 -NN+````````````````````````````````yo//os-````.y/:::/+oooo+/-oo-:/s/:o-/s+--+s:+s``/mhhyyyhNyymhyyyyyyyyyyyyyyyyyyyyyyyds++++++ossdo+oso+++++++++++++++++++oNN
 -NNNNNNmNNNNNNNNNNNNNNNNNNNNmNmNNNNNNNNNNNNmNNNNNNNNNNNNNmmNNNNNNNNNNNNNNNNNNNNNNNmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN

*/
