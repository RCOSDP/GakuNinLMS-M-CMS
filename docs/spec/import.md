# インポートに関する仕様

### インポートjsonとインポート元データとの対応
book.json
|json|型|required|default|Book シート|B 列|PPT プロパティ|備考|
|-|-|-|-|-|-|-|-|
|name|String|true||book-list|book-title|dc:title|dcterms:titleはpptにはない|
|description|String|||book-list|book-summary|dc:description|テキストのみ許容する。改行は\nとする。html/xmlの要素定義が入ってしまってもhtml/xmlとは解釈しない|
|language|String||ja|series-information|language|トピックを参照|ISO 639-2のような3文字の言語コードは推奨しない|
|shared|Boolean||true||||xlsxには該当する項目がないため、任意の値を設定|
|publishedAt|DateTime||現時刻|series-information|published|dcterms:created|dcterms:issuedはpptにはないため、dcterms:createdを利用|
|createdAt|DateTime||現時刻|series-information|published|dcterms:created|xlsxには該当する項目がないため、publishedを利用|
|updatedAt|DateTime||現時刻|series-information|revised|dcterms:modified|この値は無視され、現時刻が設定される|
|details.series.*||||series-information|その他|||
|details.book.*||||book-list|その他|||
|keywords[]|String[]|||||dc:subject<br>cp:keywords|xlsxには該当する項目がないため、任意の値を設定<br>pptでは複数のキーワードの区切りが未定義？|
|sections[]||true|||||1個以上のセクションが必要|
|sections[].name|String|||vol-n|section|セクション区切りページのタイトル部分|pptではtikaで得られたリストが1行のみのスライドをセクション区切りとする|
|sections[].topics[]||true|||||1個以上のトピックが必要|
|sections[].topics[].name|String|true||vol-n|topic|スライドのタイトル部分|pptではtikaが抽出した1行目|
|sections[].topics[].description|String|||vol-n|text|スライド本文|ファイルの内容を展開する。改行は\nとする<br>pptではtikaが抽出した2行目以降|
|sections[].topics[].language|String||ja|book-list|language|ノート.language|空白の場合は、series-informationのものを設定すること<br>pptでは最初に検知したlanguageをブックと全トピックに適用する|
|sections[].topics[].timeRequired|Int||0||||xlsxには該当する項目がないため、任意の値を設定|
|sections[].topics[].shared|Boolean||true||||xlsxには該当する項目がないため、任意の値を設定|
|sections[].topics[].createdAt|DateTime||現時刻|book-list|published|dcterms:created<br>ノート.createdAt|空白の場合は、series-informationのものを設定すること|
|sections[].topics[].updatedAt|DateTime||現時刻|book-list|revised|dcterms:modified<br>ノート.updatedAt|この値は無視され、現時刻が設定される|
|sections[].topics[].license|String|||vol-n|CC|ノート.license|https://spdx.org/licenses/ のIdentifierと許容される括弧と演算子で構成され、spdxのチェックが通るもの<br>例:`CC-BY-4.0`<br>pptでは最初に検知したlicenseを全トピックに適用する|
|sections[].topics[].keywords[]|String[]|||||ノート.keywords|xlsxには該当する項目がないため、任意の値を設定|
|sections[].topics[].resource.file|String|true||vol-n|main|生成動画ファイル名||
|sections[].topics[].resource.url|String|true||vol-n|main|登録済み動画のurl|生成動画ファイルの指定がないときは必須|
|sections[].topics[].details.*||||vol-n|その他|||

時刻はISO-8601形式とし、末尾Zや+nnnnによるタイムゾーンの指定も可能とする。

pptプロパティ参考:
- https://ja.wikipedia.org/wiki/Office_Open_XML_ファイルフォーマット
- https://ja.wikipedia.org/wiki/Dublin_Core
- https://kanzaki.com/docs/sw/dublin-core.html
- https://kanzaki.com/docs/sw/dc-domain-range.html
- https://www.ndl.go.jp/jp/dlib/standards/meta/dcndl_examples.html

### インポートjsonの例:
chilo001_vol-1.json
```
{
    "name": "インターネットの歴史とビットの復習",
    "description": "",
    "language": "ja",
    "shared": true,
    "publishedAt": "2013-09-13T00:00:00",
    "createdAt": "2013-09-13T00:00:00",
    "updatedAt": "2018-07-10T00:00:00",
    "details": {
        "series": {
            "version": "2.4",
            "author": "日置慎治",
            "publisher": "NPO CCC-TIES",
            "editor": "NPO CCC-TIES",
            "rights": "2013 NPO CCC-TIES",
            "series-name": "はじめての情報ネットワークⅠ",
            "series-introduction": "本書の主題と目標は、インターネットを主体としたネットワークについて深く理解をすることです。\n今やインターネットは地球規模のネットワークに成長しています。例えば、パソコンなど小さなコンピュータから、サーバと言われる大規模で強力なコンピュータまでネットワークにつながっています。また最近では、携帯電話や一般の電話もネットワークにつながっている時代です。さらに最近では、家電製品までもがインターネットにつながるようになりつつあります。\nまずは、ネットワークを理解して、セキュリティについても学習しましょう。",
            "series-url": "http://proxy.chilos.jp/p001",
            "cover": "001_inside_cover.png"
        },
        "book": {
            "vol": "vol-1",
            "book-cover": "001_cover_image_1.png",
            "identifier": "41fe5bb9-686f-47dd-8197-61fc9f817bcd",
            "community-url": "http://chilos.jp/en/c/?c=1",
            "version": "",
            "language": "",
            "author": "",
            "publisher": "",
            "editor": "",
            "published": "",
            "revised": "",
            "rights": ""
        }
    },
    "keywords": [],
    "sections": [
        {
            "name": "インターネットの歴史",
            "topics": [
                {
                    "name": "戦争が作ったインターネット",
                    "description": "はじめにインターネットの歴史を紹介します。\nインターネットは戦争がきっかけで作られたことを知っていますか。\nかつてアメリカとソ連という2つの大国が、一触即発の状態で対峙していた時代がありました。実際に戦争に発展することはありませんでしたが、いつ戦争が勃発してもおかしくないような均衡状態を保っていたことから冷たい戦争、冷戦時代とよばれています。",
                    "language": "ja",
                    "timeRequired": 1,
                    "shared": true,
                    "createdAt": "2013-09-13T00:00:00",
                    "updatedAt": "2018-07-10T00:00:00",
                    "license": "CC-BY-4.0",
                    "keywords": [],
                    "resource": {
                        "file": "./001m_0101.mp4",
                        "tracks": [],
                        "details": {}
                    },
                    "details": {
                        "page-type": "document",
                        "community": true,
                        "video-image": "001m_0101.png",
                        "javascript-file": "",
                        "video-id": ""
                    }
                },
                {
                    "name": "スプートニックショック",
                    "description": "冷戦時代は互いに相手の国力を把握できない状況下で対峙していました。そのような中、1957年にソ連が世界初の人工衛星「スプートニック」の打ち上げに成功しました。\n当時、アメリカはまだ人工衛星打ち上げの技術がなく、世界一の技術を自負していたアメリカはこの事実に衝撃を受けたそうです。これを衛星の名前を取ってスプートニックショックとよびます。\nソ連の衛星打ち上げ成功は、地球の外からアメリカを攻撃する技術を持っていることを意味しています。冷戦という均衡状態の下、いつ先制攻撃を仕掛けられるかわからないためアメリカでは大変な危機感が募りました。",
                    "language": "ja",
                    "timeRequired": 1,
                    "shared": true,
                    "createdAt": "2013-09-13T00:00:00",
                    "updatedAt": "2018-07-10T00:00:00",
                    "license": "CC-BY-4.0",
                    "keywords": [],
                    "resource": {
                        "file": "./001m_0102.mp4",
                        "tracks": [],
                        "details": {}
                    },
                    "details": {
                        "page-type": "document",
                        "community": true,
                        "video-image": "001m_0102.png",
                        "javascript-file": "",
                        "video-id": ""
                    }
                }
            ]
        },
        {
            "name": "ビットの復習",
            "topics": [
                {
                    "name": "ビット",
                    "description": "これまでインターネットとコンピュータの歴史について簡単に説明しました。次に今後この本著を進めるに当たり、必要なビットの計算について説明します。\n3本の指を使って数を数えてくださいと言うと、普通は1、2、3と三種類の本数を数えます。しかしある人は、8種類の数、例えば1から8までを数えることができます。その理由を考えてみてください。その理由がわかれば、あなたはビットについてわかっているということになります。それを今から見ていくことにしましょう。",
                    "language": "ja",
                    "timeRequired": 1,
                    "shared": true,
                    "createdAt": "2013-09-13T00:00:00",
                    "updatedAt": "2018-07-10T00:00:00",
                    "license": "CC-BY-4.0",
                    "keywords": [],
                    "resource": {
                        "file": "./001m_0109.mp4",
                        "tracks": [],
                        "details": {}
                    },
                    "details": {
                        "page-type": "document",
                        "community": true,
                        "video-image": "001m_0109.png",
                        "javascript-file": "",
                        "video-id": ""
                    }
                },
                {
                    "name": "3桁2進数",
                    "description": "3本の指で数えることのできる数は8種類です。1から8まで、0から7まではどちらも8種類のため、ここでは0から7までを例に説明します。\n3本の指の状態を上向き矢印と下向き矢印で表します。上向きは指が立っている状態、下向きは閉じた状態とします。3本の指は画像のように8通りの状態を考えることができます。下向き矢印を0、上向き矢印を1とすることにより、0と1で以下のように表現することができます。",
                    "language": "ja",
                    "timeRequired": 1,
                    "shared": true,
                    "createdAt": "2013-09-13T00:00:00",
                    "updatedAt": "2018-07-10T00:00:00",
                    "license": "CC-BY-4.0",
                    "keywords": [],
                    "resource": {
                        "file": "./001m_0110.mp4",
                        "tracks": [],
                        "details": {}
                    },
                    "details": {
                        "page-type": "document",
                        "community": true,
                        "video-image": "001m_0110.png",
                        "javascript-file": "",
                        "video-id": ""
                    }
                }
            ]
        }
    ]
}
```

### 複数のブックをインポートするjsonの例:
chilo001.json
```
[
    {
        "name": "インターネットの歴史とビットの復習",
        ...
    },
    {
        "name": "IPアドレスとネットワークアドレス",
        ...
    }
]
```
最上位を配列とし、ブックの定義をそのまま複数入れていく。
