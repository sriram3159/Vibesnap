import { ArrowLeftIcon, PhotoIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../utils/uploadImage";
import { savePost } from "../utils/savePost";
import {ROUTES} from "../constants/routes"
const CreatePost = () => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [imageUrl,setImageUrl] =useState([])
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    const uploadFiles = async () => {
      if (files.length > 0) {
        const result = await Promise.all(files.map((file) => uploadImage(file)));
        setImageUrl(result); // Update state with resolved URLs
      }
    };
    uploadFiles();
  }, [files]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files) {
      
      await savePost(text, imageUrl);
      alert("Post saved successfully!");
      navigate(ROUTES.FEED)
    } else {
      console.log(text, files);

      alert("Please select an image");
    }
  }
  const handleFileChange = (e) => {
    console.log(Array.from(e.target.files));
    
    setFiles(Array.from(e.target.files)); 
  };
  return (
    <div className="relative h-screen">
      <div className="flex flex-row  items-center gap-x-3.5 font-extrabold">
        <ArrowLeftIcon className="size-6 text-black cursor-pointer" onClick={handleBack} />
        <span className="font-extrabold">New Post</span>
      </div>
      <div className="flex-col space-y-12 mt-12">
        <div className="col-span-full">
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            {imageUrl.length>0 && imageUrl?.map((image) => (
                <img src={image} className="object-cover h-44   bg-gray-300 rounded-xl"  />
              )) || <div className="text-center">
              <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
              <div className="mt-4 flex text-sm/6 text-gray-600">
                <label
                  htmlFor="files-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a files</span>
                  <input
                    id="files-upload"
                    accept="image/*"
                    name="files-upload"
                    type="file"
                    className="sr-only"
                    multiple={true}
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>}
          </div>
        </div>
        <div>
          <textarea
            placeholder="write something"
            className="w-full border rounded p-4"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
      <button
        className="w-full bg-black text-white rounded-full font-bold text-sm py-4 absolute bottom-10"
        onClick={handleSubmit}
      >
        CREATE
      </button>
    </div>
  );
};

export default CreatePost;
