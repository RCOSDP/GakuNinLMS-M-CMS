# GakuNinLMS-M-CMS

## 何をするシステムか

全体としては、マイクロソフト社のパワーポイントの内容から、Note部分の読み上げをスピーチシンセサイザーに読み上げさせ、動画を作成します。その動画を、作成者が付与した著者、利用ライセンスなどのメタデータを付与して、マイクロコンテンツに自動的に登録する、一連の作業を自動化します。

# システムの全体像

下記の2つのリポジトリです。

- [RCOSDP/GakuNinLMS-LTI-MC](https://github.com/RCOSDP/GakuNinLMS-LTI-MC)
- [RCOSDP/GakuNinLMS-M-CMS](https://github.com/RCOSDP/GakuNinLMS-M-CMS)

## システムのコンポーネント

PowerPoint の中に、WebPageを表示させて、自分のコンピュータまたは、Amazon Polly などのサービスと連携させるために、下記の
コンポーネントに分かれている。

- uplaoder(仮称) この機能は、 [RCOSDP/GakuNinLMS-LTI-MC: LTI for Micro contents](https://github.com/RCOSDP/GakuNinLMS-LTI-MC)  の中で、実装される。

上記以外の下記は、本リポジトリで機能を提供する。

- ppt-addin-vue
- server


# 本リポジトリの構成


```
/
+ README.md このファイル
+ docs/spec/ 仕様書置き場
  + access.md アクセス制限機能について
  + import.md pptとマイクロコンテンツ のデータ項目のすり合わせなど。
+ ppt-addin-vue/ アドイン本体
+ server/ アドインを配布するサーバ兼 aws polly proxy
+ ppt2video/ パワーポイントを動画に変換するnode.jsプログラム
+ wasm-app/ WASM版Webアプリ
+ test/ テスト用パワーポイントファイル
+ misc/ サンプルスクリプト、ファイルなど
+ .github/workflows ワークフローファイル
```

## ワークフロー

レポジトリには、次の GitHub Actions ワークフローが定義されています。

|名称|ファイル名|内容|
|---|---|---|
|PPT2VIDEO|ppt2video.yml|test/vuca.pptxファイルを動画に変換する|
|ONPUSH|onpush.yml|mainブランチへのgit pushで動作し、変更されたパワーポイントファイルを動画に変換する|

PPT2VIDEOワークフローは、Actionsページの Run workflow ボタンから起動します。

## License
This project is released under the MIT License. The full text can be found in the [LICENSE file](LICENSE).

## Contributors
We appreciate contributions to this project. A list of all contributors can be found in the [CONTRIBUTORS file](CONTRIBUTORS.md).

These documents serve to ensure transparency and equality among all participants in the project, accurately reflecting each member's involvement and the collective nature of the project.