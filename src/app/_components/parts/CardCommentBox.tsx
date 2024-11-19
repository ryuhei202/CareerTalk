import Image from "next/image";

export default function CardCommentBox({
  title,
  comment,
  imageSrc,
  imageAlt
}: {
  title: string;
  comment: string;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <div className="mt-4 flex gap-4 items-center">
      <div className="flex flex-col flex-shrink-0 w-24 items-center">
        <div className=" rounded-full flex items-center justify-center w-full p-2 pb-0">
          <Image src={imageSrc} alt={imageAlt} />
        </div>
        <div className="text-sm">{title}</div>
      </div>
      <div className="flex-grow border border-primary rounded-lg py-6 px-4 whitespace-pre-wrap">
        <p className="text-foreground text-sm">{comment}</p>
      </div>
    </div >
  );
}
