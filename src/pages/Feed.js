import { HeartIcon } from "@heroicons/react/20/solid";
import { BiSolidNavigation } from "react-icons/bi";
import { RiAddCircleFill } from "react-icons/ri";
import LocalStorage from "../utils/storageUtils/LocalStorage";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import Modal from "../ReusableComponents/Modal";
import { useEffect, useState } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const timeConverstion = (seconds, nanoseconds) => {
  // Convert timestamp to milliseconds
  const milliseconds = seconds * 1000 + nanoseconds / 1e6;

  // Get current time in milliseconds
  const now = Date.now();

  // Calculate the time difference
  const difference = now - milliseconds;

  // Define time constants
  const minute = 60 * 1000; // milliseconds in a minute
  const hour = 60 * minute; // milliseconds in an hour
  const day = 24 * hour; // milliseconds in a day

  // Calculate and format the relative time
  if (difference < hour) {
    // Less than an hour ago
    const minutesAgo = Math.floor(difference / minute);
    return `${minutesAgo}m ago`;
  } else if (difference < day) {
    // Less than a day ago
    const hoursAgo = Math.floor(difference / hour);
    return `${hoursAgo}h ago`;
  } else {
    // More than a day ago
    const daysAgo = Math.floor(difference / day);
    return `${daysAgo}d ago`;
  }
};
const userData = JSON.parse(LocalStorage.getUserData());
function Header({navigation,allData}) {

  return (
    <div className="md:flex md:items-center md:justify-between md:space-x-5">
      <div className="flex items-start space-x-5">
        <div className="shrink-0">
          <div className="relative cursor-pointer" onClick={()=>navigation(ROUTES.PROFILE,{state:{allData}})}>
            <img alt="" src={userData?.photoURL} className="size-16 rounded-full" />
            <span aria-hidden="true" className="absolute inset-0 rounded-full shadow-inner" />
          </div>
        </div>
        <div className="pt-1.5">
          <p className="text-sm font-medium text-gray-500">Welcome Back,</p>
          <h1 className="text-2xl font-bold text-gray-900">{userData?.displayName}</h1>
        </div>
      </div>
    </div>
  );
}

const AddFeed = ({ navigation }) => {
  return (
    <RiAddCircleFill
      className="size-12 text-black fixed bottom-10 right-10 "
      onClick={() => navigation(ROUTES.CREATE_POST)}
    />
  );
};

const handleUpdateLikes = async (id, likesData = [], setReload) => {
  const userDoc = doc(db, "users", id);
  let likes = [];
  if (!Array.isArray(likesData)) {
    console.error("likesData is not an array", likesData);
    return;
  }
  if (likesData?.includes(userData?.email)) {
    likes = likesData?.filter((item) => item !== userData?.email);
  } else {
    likes = [...likesData, userData?.email];
  }
  try {
    await updateDoc(userDoc, { likes });
    setReload((prev) => !prev);
  } catch (error) {
    console.log(error);
  }
};

function FeedGrids({ userData, setIsModalOpen, setReload }) {
  return (
    <>
      <div className="mt-8 mb-5 font-extrabold text-2xl">Feeds</div>
      <ul role="list" className="grid grid-cols-1 gap-y-2.5">
        {userData?.map((person) => (
          <li key={person.id} className="col-span-1  rounded-lg bg-[#F7EBFF] shadow px-3">
            <div className="flex w-full items-center justify-between space-x-6 p-3">
              <img alt="" src={person?.userDp} className="size-10 shrink-0 rounded-full bg-gray-300" />
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900">{person?.user}</h3>
                </div>
                <p className="mt-1 truncate text-sm text-gray-500">
                  {timeConverstion(person.createdAt.seconds, person.createdAt.nanoseconds)}
                </p>
              </div>
            </div>
            <div className="pt-1 pb-2.5">{person?.feedMsg}</div>
            <div className=" h-44 flex overflow-x-scroll overflow-y-hidden gap-x-2">
              {person?.imageUrl?.map((image) => (
                <img src={image} className="object-cover   bg-gray-300 rounded-xl" />
              ))}
            </div>
            <div>
              <div className="-mt-px flex justify-between">
                <div className="flex " onClick={() => handleUpdateLikes(person?.id, person?.likes, setReload)}>
                  <span className="relative text-[#D95B7F] -mr-px inline-flex  items-center justify-center gap-x-1 rounded-bl-lg  py-4 text-sm font-semibold cursor-pointer">
                    <HeartIcon aria-hidden="true" className="size-5 " />
                    {person?.likes?.length || 0}
                  </span>
                </div>
                <div className=" flex justify-center items-center  cursor-pointer" onClick={() => setIsModalOpen(true)}>
                  <span className=" bg-[#E6DBED] rounded-full inline-flex  items-center justify-center gap-x-1  py-2 px-4 text-sm font-semibold text-black ">
                    <BiSolidNavigation className="size-5 text-black" />
                    Share
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Feed() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const navigation = useNavigate();
  const userCollectionRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      console.log(data);
      
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [reload]);


  return (
    <>
      <Header allData={users} navigation={navigation}/>
      <FeedGrids userData={users} setIsModalOpen={setIsModalOpen} setReload={setReload} />
      <AddFeed navigation={navigation} />
      <Modal open={isModalOpen} setOpen={setIsModalOpen} />
    </>
  );
}
