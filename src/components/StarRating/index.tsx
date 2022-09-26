import Image from "next/image";
import { useEffect, useState } from "react";
import starFull from "../../../public/star_full.svg";
import starHalf from "../../../public/star_half.svg";
import starEmpty from "../../../public/star_empty.svg";
interface StarRatingProps {
  rating: number;
}

type Star = "full" | "half" | "empty";

export function StarRating({ rating }: StarRatingProps) {
  const [integer, decimal] = rating
    .toString()
    .split(".")
    .map((i) => parseInt(i));
  const [stars, setStars] = useState<Star[]>([]);

  function calculateStars() {
    const newStars: Star[] = [];

    for (let i = 0; i < integer; i++) {
      newStars.push("full");
    }

    if (decimal >= 5) {
      newStars.push("half");
    } else {
      newStars.push("empty");
    }

    const emptyStars = Array.from(
      { length: 5 - newStars.length },
      () => "empty"
    ) as Star[];

    setStars([...newStars, ...emptyStars]);
  }

  function selectImage(star: Star) {
    switch (star) {
      case "full":
        return starFull;
      case "empty":
        return starEmpty;
      case "half":
        return starHalf;
    }
  }

  useEffect(() => {
    calculateStars();
  }, [integer, decimal]);

  return (
    <div className="flex gap-1">
      {stars.map((star, index) => (
        <Image
          width={24}
          height={24}
          key={index}
          src={selectImage(star)}
          alt={`${star} star`}
        />
      ))}
    </div>
  );
}
