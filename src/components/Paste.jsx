import React, { useState } from "react";
import { Calendar, Copy, Eye, PencilLine, Trash2, Share } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
function Paste() {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  function handleShare(paste) {
    if (navigator.share) {
      navigator
        .share({
          title: paste.title,
          text: paste.content,
          url: window.location.origin + `/pastes/${paste._id}`,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Sharing failed", error));
    } else {
      // fallback for unsupported browsers
      navigator.clipboard.writeText(
        window.location.origin + `/pastes/${paste._id}`
      );
      toast.success("Link copied to clipboard!");
    }
  }

  return (
    <div className="w-full p-1 sm:w-[80%] max-w-[800px]">
      <div className=" sm:p-4">
        <input
          // className='bg-white p-2 rounded-2xl min-w-[600px] mt-5 text-black'
          className=" rounded-xl mt-5 bg-[var(--primary-color)] px-4 py-2 focus:outline-none text-black w-full"
          type="search"
          placeholder="Search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className=" mt-5">
        <h2 className="sm:px-4 text-4xl font-bold pb-4 pt-3 flex ">All Pastes</h2>
        <div className="flex w-full flex-col gap-2 mt-2 rounded-2xl">
          {filterData.length > 0 &&
            filterData.map((paste) => {
              return (
                <div className="bg-[var(--primary-color)] rounded-2xl text-black">
                  <div className="flex justify-between rounded-2xl p-3">
                    <div className="text-2xl"> {paste.title} </div>
                    <div>
                      <Link
                        to={`/?pasteId=${paste?._id}`}
                        className="no-underline text-inherit"
                      >
                        <button className="rounded p-[2px] ">
                          <PencilLine className="scale-75 " />
                        </button>
                      </Link>
                      <Link
                        to={`/pastes/${paste._id}`}
                        className="no-underline text-inherit"
                      >
                        <button className="p-[2px] rounded">
                          <Eye className="scale-75 " />
                        </button>
                      </Link>
                      <button
                        className="p-[2px]"
                        onClick={() => handleDelete(paste?._id)}
                      >
                        <Trash2 className="scale-75 " />
                      </button>
                      <button
                        className="p-[2px]"
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("copied to clipboard");
                        }}
                      >
                        <Copy className="scale-75 " />
                      </button>
                      <button
                        onClick={() => handleShare(paste)}
                        className="p-[2px]"
                      >
                        <Share className="scale-75" />
                      </button>
                    </div>
                  </div>
                  <div className="flex pl-3 p-3 max-h-[300px] overflow-auto scrollbar-hidden whitespace-pre-wrap">
                    {paste.content}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Paste;
