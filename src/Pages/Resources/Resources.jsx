import React from "react";
import { FcClock, FcOpenedFolder } from "react-icons/fc";
import { FaTelegram } from "react-icons/fa";

import { MdMenuBook } from "react-icons/md";
import { SiBookstack, SiFacebook } from "react-icons/si";

const Resources = () => {
  const resourceData = [
    {
      id: 2,
      title: "Class Routine",
      link: "https://i.ibb.co/0jxFMcZ/Ramadan-Class-Routine-14-march-2024.png",
      icon: <FcClock></FcClock>,
    },
    {
      id: 3,
      title: "Syllabus",
      link: "https://drive.google.com/file/d/1MGITe-umZOlwb6a5uic9kkSxHlO9Vg9M/view?usp=sharing",
      icon: <MdMenuBook className=" text-rose-500"></MdMenuBook>,
    },
    {
      id: 4,
      title: "Previous Year Questions",
      link: "https://drive.google.com/drive/folders/1wwm1CUun1s09Xkv_i93oy2-EGzQVE07i?fbclid=IwAR2Zpz7sx0DN2n6we7SZsJ0biE6PbMg7FG2uXo6nY6stDOorpGw98mufByE",
      icon: <SiBookstack className="text-sky-500"></SiBookstack>,
    },
    {
      id: 5,
      title: "Study materials(17th Batch)",
      link: "https://drive.google.com/drive/folders/1ZGH69x7B1xgejOKahpiE7uU-yFTpHfeg?fbclid=IwAR2Zpz7sx0DN2n6we7SZsJ0biE6PbMg7FG2uXo6nY6stDOorpGw98mufByE",
      icon: <FcOpenedFolder></FcOpenedFolder>,
    },
    {
      id: 6,
      title: "Official Facebook Group(Private)",
      link: "https://www.facebook.com/groups/1102707080865867",
      icon: <SiFacebook className="text-blue-600"></SiFacebook>,
    },
    {
      id: 7,
      title: "Official Facebook Page (Public)",
      link: "https://www.facebook.com/profile.php?id=61556073064932",
      icon: <SiFacebook className="text-blue-600"></SiFacebook>,
    },
    {
      id: 8,
      title: "Telegram Classnotes Channel",
      link: "https://t.me/+hjGyqpMTbNdiYTA1",
      icon: <FaTelegram className="text-sky-500"></FaTelegram>,
    },
    {
      id: 9,
      title: "Telegram Notice Channel",
      link: "https://t.me/+-EA6IHQxf5VhZTE1",
      icon: <FaTelegram className="text-sky-500"></FaTelegram>,
    },
  ];
  return (
    <div className="max-w-6xl mx-auto mt-10 px-3">
      <h1 className=" font-bold text-2xl md:text-3xl text-center animate-bounce text-sky-500">
        All Resources in One Place
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-between gap-6 mt-10">
        {resourceData.map((resource) => (
          <a
            key={resource.id}
            href={resource.link}
            className="flex items-center justify-start space-x-2 text-lg font-medium bg-slate-300 dark:bg-black/30 rounded-lg p-3 shadow-lg hover:shadow-sky-500/30 transition-all duration-300">
            <span className="text-3xl">{resource.icon}</span>
            <h1>{resource.title}</h1>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Resources;
