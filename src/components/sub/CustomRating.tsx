import { Rating } from '@mantine/core';
import { IconStarFilled } from '@tabler/icons-react';

interface CustomRatingProps {
  average?: {
    value?: number;
    color?: string;
    review_count?: number;
  };
  total_enrollment?: number;
  rating?: number;
}

const CustomRating = ({ average, rating, total_enrollment }: CustomRatingProps) => {
  return (
    <div className="flex items-center gap-4">
      <Rating
        value={rating || 0}
        emptySymbol={<IconStarFilled size="25px" className="text-[#4C4E6473] opacity-[45%]" />}
        color="#FDB528"
        size="25px"
        readOnly={true}
      />
      <span className={`text-lg leading-5 ${average?.color || 'text-white'} opacity-70`}>
        {rating || 0}
      </span>
      <span className="text-lg font-normal leading-5 text-[#838383] opacity-70">
        (<span>{average?.review_count || 0}</span>)
      </span>
    </div>
  );
};

export default CustomRating;
