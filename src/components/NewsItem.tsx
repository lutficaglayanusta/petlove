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
          <img src={item.imgUrl} alt={item.title} className="w-[361px] h-[226px]" />
      <h2>{item.title}</h2>
          <p className="w-[90%]">{item.text}</p>
          <div>
              <p>
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
              </p>
                <a href={item.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
    </div>
  );
};

export default NewsItem;
