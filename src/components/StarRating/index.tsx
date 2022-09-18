import Image from "next/image";
import { useEffect, useState } from "react";

interface StarRatingProps {
  rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
  const [integer, decimal] = rating
    .toString()
    .split(".")
    .map((i) => parseInt(i));
  const [stars, setStars] = useState<string[]>([]);

  function calculateStars() {
    const newStars = [];

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
    );

    setStars([...newStars, ...emptyStars]);
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
          src={`/star_${star}.svg`}
          alt={`${star} star`}
        />
      ))}
    </div>
  );
}
