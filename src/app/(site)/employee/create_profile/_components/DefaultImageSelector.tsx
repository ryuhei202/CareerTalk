import Image from "next/image";

export type ImageOption = {
  id: number;
  src: string;
  alt: string;
};
export default function DefaultImageSelector({
  selectedImageId,
  onSelect,
  imageOptions,
  selectedGender,
}: {
  selectedImageId?: string;
  onSelect: (imageId: string) => void;
  imageOptions: ImageOption[];
  selectedGender: "MALE" | "FEMALE" | undefined;
}) {
  const filteredImages = imageOptions.filter((image) => {
    const gender = image.src.includes("woman") ? "FEMALE" : "MALE";
    return gender === selectedGender;
  });

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {filteredImages.length > 0 ? (
        filteredImages.map((image) => (
          <button
            key={image.id}
            type="button"
            className={`relative aspect-square rounded-full overflow-hidden border-2 transition-all ${
              selectedImageId === image.id.toString()
                ? "border-blue-500 ring-2 ring-blue-300"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => onSelect(image.id.toString())}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover rounded-full"
            />
          </button>
        ))
      ) : (
        <div className="col-span-4 text-center text-gray-500 py-4">
          性別を選択してください。
        </div>
      )}
    </div>
  );
}
