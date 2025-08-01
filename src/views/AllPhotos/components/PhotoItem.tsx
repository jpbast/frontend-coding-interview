import { PexelsPhoto } from "@/types/api";
import Image from "next/image";
import LinkIcon from "@/assets/links.svg";
import Link from "next/link";
import LikeButton from "@/components/LikeButton";

type PhotoItemProps = {
  photo: PexelsPhoto;
};

const PhotoItem = ({ photo }: PhotoItemProps) => {
  return (
    <div className="flex gap-3 flex-1 w-full items-start">
      <LikeButton initialLiked={photo.liked} />
      <Image
        src={photo.src.medium}
        alt={photo.alt}
        width={75}
        height={75}
        className="rounded-lg object-cover size-[75px] min-w-[75px]"
      />
      <div className="flex flex-col gap-[2px] flex-1">
        <div className="flex items-center gap-1 justify-between flex-wrap">
          <h3 className="text-sm font-bold">{photo.photographer}</h3>
          <Link
            href={photo.photographer_url}
            target="_blank"
            className="flex items-center gap-1 text-text-secondary text-xs"
          >
            <LinkIcon width={12} />
            Portfolio
          </Link>
        </div>
        <p className="text-sm leading-4">{photo.alt}</p>
        <div className="flex items-center gap-2">
          <span className="text-sm relative" style={{ color: photo.avg_color }}>
            {photo.avg_color}
          </span>
          <div
            style={{ backgroundColor: photo.avg_color }}
            className="size-3"
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoItem;
