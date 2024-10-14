// import { getServerSession } from "@/lib/auth";
// import { prisma } from "@/lib/prisma";

// export default async function CreateProfile() {
//   const session = await getServerSession();
//   const userId = session?.user.id;

//   let message = "";
//   if (userId) {
//     // userに紐づくJobSeekerレコードを取得
//     const jobSeeker = await prisma.jobSeeker.findUnique({
//       where: { userId: userId },
//     });

//     if (!jobSeeker) {
//       await prisma.jobSeeker.create({
//         data: { userId: userId },
//       });
//       message = "JobSeekerレコードを作成しました";
//       console.log("jobSeeker", jobSeeker);
//     } else {
//       message = "JobSeekerレコードがすでに存在します";
//     }
//   }

//   return (
//     <div>
//       job-seeker create_profile
//       <p>{message}</p>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProfileSetup() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      {showWelcome ? (
        <div className="text-4xl font-bold text-purple-400 animate-fade-in-up">
          キャリトークへようこそ
        </div>
      ) : (
        <Card className="w-full max-w-2xl animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              プロフィール設定
            </CardTitle>
            <CardDescription className="text-center">
              あなたのキャリアについて教えてください
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">名前</Label>
                <Input id="firstName" placeholder="例：太郎" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">姓</Label>
                <Input id="lastName" placeholder="例：山田" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input id="email" type="email" placeholder="example@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle">現在の職種</Label>
              <Input id="jobTitle" placeholder="例：ソフトウェアエンジニア" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">経験年数</Label>
              <Select>
                <SelectTrigger id="experience">
                  <SelectValue placeholder="経験年数を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2">0-2年</SelectItem>
                  <SelectItem value="3-5">3-5年</SelectItem>
                  <SelectItem value="6-10">6-10年</SelectItem>
                  <SelectItem value="10+">10年以上</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">スキル</Label>
              <Input id="skills" placeholder="例：JavaScript, React, Node.js" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">自己紹介</Label>
              <Textarea
                id="bio"
                placeholder="あなたのキャリアや目標について簡単に教えてください"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">プロフィールを保存</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
