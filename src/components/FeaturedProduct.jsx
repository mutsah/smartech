import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FeaturedProduct = (props) => {
  const { id, title, image } = props.data;
  const navigate = useNavigate();
  return (
    <div className="relative ">
      <div className="h-96 ">
        <img src={image} alt={title} className="h-96 rounded-lg" />
      </div>
      <div className="absolute bottom-2 px-5 py-4">
        <h3 className="text-white font-semibold">{title}</h3>
        <button
          onClick={() => navigate('/shop')}
          className="bg-primary text-white mt-2 py-2 px-5 flex items-center gap-2 rounded-sm"
        >
          Open Shop <ExternalLink size={14}></ExternalLink>
        </button>
      </div>
    </div>
  );
};
