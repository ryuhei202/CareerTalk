import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Briefcase, User } from "lucide-react";
import { StartFreeButton } from "../_components/parts/Button/StartFreeButton";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <main className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            キャリアの未来を、
            <br />
            チャットで切り開く
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            CareerTalkは、転職希望者と現場社員をつなぐ革新的なマッチングサービス。
            リアルな会話から、あなたの理想の職場を見つけましょう。
          </p>
          <div className="flex space-x-4">
            <StartFreeButton />
            <Button
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              詳細を見る
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2 mt-12 lg:mt-0">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">IT企業 A社</h3>
                <p className="text-sm text-gray-500">ソフトウェアエンジニア</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 flex-row-reverse">
                <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="bg-purple-100 rounded-lg p-4 text-sm text-purple-700">
                    <p>
                      こんにちは！当社の開発環境や社内の雰囲気について、何か質問はありますか？
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700">
                    <p>
                      はい、御社での新しい技術の導入プロセスについて教えていただけますか？
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-4 flex-row-reverse">
                <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="bg-purple-100 rounded-lg p-4 text-sm text-purple-700">
                    <p>
                      もちろんです。当社では定期的に新技術の評価を行い、有望なものはプロトタイプ開発を通じて段階的に導入しています。社員の意見も積極的に取り入れ、イノベーションを推進しています。
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center space-x-4">
              <Input className="flex-1" placeholder="メッセージを入力..." />
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                送信
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                CareerTalk
              </h2>
              <p className="text-gray-600">
                キャリアの可能性を広げる、新しいコミュニケーションの形。
              </p>
            </div>
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                リンク
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600">
                    ホーム
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600">
                    サービス
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600">
                    料金
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600">
                    お問い合わせ
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                お問い合わせ
              </h3>
              <p className="text-gray-600 mb-2">info@careertalk.jp</p>
              <p className="text-gray-600">03-1234-5678</p>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-600">
              &copy; 2024 CareerTalk. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
