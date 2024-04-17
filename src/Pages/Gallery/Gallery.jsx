import Title from "../../Components/Title";
import LightGallery from "lightgallery/react";
import { motion, useInView } from "framer-motion";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useRef, useState } from "react";

const Gallery = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["galleryContents"],
    queryFn: async () => {
      const result = await axiosSecure.get("/gallery");
      return result.data;
    },
  });
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  return (
    <div className=" flex flex-col items-center justify-center space-y-5 lg:space-y-10 py-7 lg:py-10 px-3">
      <Title>Photo Gallery</Title>
      <div className="App" id="animated-thumbnails">
        <LightGallery
          onInit={onInit}
          speed={500}
          elementClassNames="grid grid-cols-2 md:grid-cols-3 items-center justify-center gap-4 md:gap-10"
          plugins={[lgThumbnail, lgZoom]}>
          {isLoading
            ? "loading"
            : data.map((content) => (
                <a key={content._id} href={content.photoURL} data-aos="fade-up">
                  <img
                    alt={
                      `${content.title} ` +
                      (content.author != "unknown"
                        ? `- by ${content.author}`
                        : "")
                    }
                    className="w-36 md:w-56 lg:w-72 h-24 md:h-40 lg:h-56 object-cover rounded-md shadow-md hover:shadow-lg transition duration-200 "
                    src={content.photoURL}
                  />
                </a>
              ))}
        </LightGallery>
      </div>
    </div>
  );
};

export default Gallery;
