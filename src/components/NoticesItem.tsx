import type { JSX } from "react";

type NoticesItemProps = {
  item: {
    _id: string;
    title: string;
    name: string;
    species: string;
    category: string;
    birthday: string;
    sex: string;
    location: string;
    imgURL: string;
    price?: string;
    popularity?: number;
    comment?: string;
  };
};

const NoticesItem = ({ item }: NoticesItemProps): JSX.Element => {
  const birthDate = new Date(item.birthday).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-lg p-5 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      
        <img
          src={item.imgURL}
          alt={item.name}
          className="rounded-xl"
        />
      

          <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold mb-2 truncate">{item.title}</h3>
                  <div className="flex items-center gap-2">
                      <img src="../../star.svg" alt="star" />
                      {item.popularity}
                  </div>
              </div>
        

        <div className="flex items-center gap-3 text-sm mb-3">
          <div>
            <p className="text-gray-600 text-xs">Name</p>
            <p className="font-semibold truncate">{item.name}</p>
          </div>
          <div>
            <p className="text-gray-600 text-xs">Birthday</p>
            <p className="font-semibold">{birthDate}</p>
          </div>
          <div>
            <p className="text-gray-600 text-xs">Species</p>
            <p className="font-semibold truncate">{item.species}</p>
          </div>
          <div>
            <p className="text-gray-600 text-xs">Sex</p>
            <p className="font-semibold">{item.sex}</p>
          </div>
          <div>
            <p className="text-gray-600 text-xs">Category</p>
            <p className="font-semibold">{item.category}</p>
          </div>
        </div>

        {item.comment && (
          <p className="text-sm text-gray-700 mb-3 line-clamp-2">
            {item.comment}
          </p>
        )}
        {item.price && (
            <span className="text-lg font-bold">
              ${item.price}
            </span>
          )}
        <div className="flex justify-between items-center gap-3">
          
          <button className="bg-amber-400 hover:bg-amber-500 text-white px-6 py-2 rounded-full font-semibold transition-colors w-[95%]">
            Learn more
          </button>
          <button className=" bg-[#FFF4DF] rounded-full p-2 hover:bg-gray-100">
            <span className="text-2xl">❤️</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticesItem;
