import type { JSX } from "react";
import { useSelector } from "react-redux";
import { selectNotices } from "../redux/notices/selector";
import NoticesItem from "./NoticesItem";


const NoticesList = (): JSX.Element => {
  const notices = useSelector(selectNotices);
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {notices && notices.length > 0 ? (
        notices.map((notice) => (
          <NoticesItem key={notice._id} item={notice} />
        ))
      ) : (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500 text-lg">No notices found</p>
        </div>
      )}
      
    </div>
  );
};

export default NoticesList;
