import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

export default function DMResultCard({
  imageSrc,
  title,
  onClickBack,
  children,
}: {
  imageSrc: string;
  title: string;
  onClickBack: () => void;
  children?: React.ReactNode;
}) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-0">
        <Button
          variant="ghost"
          className="flex items-center text-muted-foreground w-fit -ml-4"
          onClick={onClickBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          検索画面へ戻る
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pt-12 pb-16">
        <h2 className="text-xl text-primary mb-12">{title}</h2>
        <div className="relative">
          <Image src={imageSrc} alt={title} width={120} height={120} />
        </div>
      </CardContent>
      {children && (
        <CardFooter className="flex justify-center">{children}</CardFooter>
      )}
    </Card>
  );
}
