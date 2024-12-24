import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { useLocation } from "react-router-dom";
import LocalStorage from "../utils/storageUtils/LocalStorage";
import { useEffect, useState } from "react";

const profile = {
  name: "Ricardo Cooper",
  email: "ricardo.cooper@example.com",
  avatar:
    "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  backgroundImage:
    "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  fields: [
    ["Phone", "(555) 123-4567"],
    ["Email", "ricardocooper@example.com"],
    ["Title", "Senior Front-End Developer"],
    ["Team", "Product Development"],
    ["Location", "San Francisco"],
    ["Sits", "Oasis, 4th floor"],
    ["Salary", "$145,000"],
    ["Birthday", "June 8, 1990"],
  ],
};
const userData = JSON.parse(LocalStorage.getUserData());

export default function Profile() {
  const location = useLocation();
  const [photos, setPhotos] = useState([]);
  console.log(location?.state?.allData);

  useEffect(() => {
    const data = location?.state?.allData
      ?.filter((user) => {
        return user.email === userData.email;
      })
      ?.map((photo) => {
        return photo?.imageUrl;
      });
    setPhotos(data);
  }, [location?.state?.allData]);

  return (
    <div>
      <div>
        <img alt="" src={profile.backgroundImage} className="h-32 w-full object-cover lg:h-48" />
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <img alt="" src={userData?.photoURL} className="size-24 rounded-full ring-4 ring-white sm:size-32" />
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
              <h1 className="truncate text-2xl font-bold text-gray-900">{userData?.displayName}</h1>
            </div>
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          <h1 className="truncate text-2xl font-bold text-gray-900">{profile.name}</h1>
        </div>
        <div>
          <div>My post</div>
          {photos?.[1].map((photo) => (
            <img src={photo} className="object-cover   bg-gray-300 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
