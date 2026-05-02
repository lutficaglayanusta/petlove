import type { JSX } from "react";

type NewsItemProps = {
  item: {
    id: string;
    date: string;
    imgUrl: string;
    text: string;
    title: string;
    url: string;
    _id: string;
  };
};

const NewsItem = ({ item }: NewsItemProps): JSX.Element => {
  return (
    <div className="w-[30%]">
      <img src={item.imgUrl} alt={item.title} className="w-[361px]" />
      <h2 className="mb-[14px] mt-[28px] font-bold">{item.title}</h2>
      <p className="">
        {item.text.length > 100
          ? item.text.substring(0, 100) + "..."
          : item.text}
      </p>
      <div className="flex justify-between items-center mt-[28px]">
        <p>
          {new Date(item.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </p>
        <a href={item.url} target="_blank" className="text-[#F6B83D]">
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
