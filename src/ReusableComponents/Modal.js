"use client";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IMAGES } from "../asset/images/images";




export default function Modal({ open, setOpen }) {
  const path = window.location.href;
  const socailNetworks = [
    {
      name: "Twitter",
      img: IMAGES.TWITTER,shareUrls:`https://twitter.com/intent/tweet?url=${encodeURIComponent(path)}`
    },
    { name: "Facebook", img: IMAGES.FACEBOOK,shareUrls:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(path)}`},
    { name: "Reddit", img: IMAGES.REDDIT,shareUrls:`https://www.reddit.com/submit?url=${encodeURIComponent(path)}` },
    { name: "Discord", img: IMAGES.DISCORD,shareUrls:`https://discord.com/channels/@me?text=${encodeURIComponent(path)}` },
    { name: "Whatsapp", img: IMAGES.WHATSAPP,shareUrls: `https://wa.me/?text=${encodeURIComponent(path)}`},
    { name: "Messenger", img: IMAGES.MESSENGER,shareUrls:`https://www.messenger.com/t/?link=${encodeURIComponent(path)}` },
    { name: "Telegram", img: IMAGES.TELEGRAM,shareUrls: `https://t.me/share/url?url=${encodeURIComponent(path)}`},
    { name: "Instagram", img: IMAGES.INSTAGRAM,shareUrls:`https://www.instagram.com/?url=${encodeURIComponent(path)}` },
  ];
  const handleCopy = () => {
    navigator.clipboard
      .writeText(path)
      .then(() => {
        alert("Link copied");
      })
      .catch((err) => {
        console.log("failed to copy: ", err);
      });
  };
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="flex justify-between">
                <DialogTitle as="h3" className="text-xl font-extrabold text-gray-900">
                  Share Post
                </DialogTitle>
                <div
                  onClick={() => setOpen(false)}
                  className="cursor-pointer size-8 bg-[#F5F5F5] flex justify-center items-center rounded-full"
                >
                  <XMarkIcon className="text-black  size-5" />
                </div>
              </div>
              <div className="mt-2 grid grid-cols-4 gap-x-5 gap-y-7">
                {socailNetworks.map((network) => (
                  <div key={network.name} className="flex-col justify-self-center items-center cursor-pointer" onClick={()=>window.open(network.shareUrls,'_blank')}>
                    <div className="bg-[#E9F6FB] rounded-full size-14 flex justify-center items-center">
                      <img src={network.img} className="size-6" />
                    </div>
                    <div className="text-xs font-normal text-center mt-2">{network.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <div>
                <div className="text-base font-semibold">Page Link</div>
                <div className="bg-[#F4F4F4] py-4 px-3 rounded-xl flex justify-between items-center mt-2">
                  <span className="text-xs font-normal">{path}</span>
                  <img src={IMAGES.COPY} className="size-5 cursor-pointer" onClick={handleCopy} />
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
