import { getPhotos } from "@/lib/api";
import PhotoItem from "./PhotoItem";

const PhotosList = async () => {
  const photos = await getPhotos();

  return (
    <ul className="flex flex-col gap-3 w-full">
      {photos.photos.map((photo) => (
        <li key={photo.id}>
          <PhotoItem photo={photo} />
        </li>
      ))}
    </ul>
  );
};

export default PhotosList;
