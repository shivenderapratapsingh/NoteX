import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);
  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);
  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      //update
      dispatch(updateToPastes(paste));
    } else {
      //current
      if (paste.title.trim() == "" || paste.content.trim() == "") {
        toast("Enter Value First");
      } else {
        dispatch(addToPastes(paste));
      }
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }
  return (
    <div className="w-full sm:w-[80%] max-w-[800px]">
      <div className="flex mb-2 gap-2">
        <input
          className="flex-1 h-[40px] text-sm text-black rounded-xl mt-2 bg-[var(--primary-color)] px-3 focus:outline-none "
          type="text"
          placeholder="Enter title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createPaste}
          className="p-2 text-sm rounded-xl mt-2 bg-[#0e0e0e]"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <div className="m t-4 w-full">
        <div className="h-9 bg-[#0e0e0e] rounded-t-2xl flex items-center justify-between p-4">
          <div className="flex gap-2">
            <div className="bg-red-700 h-3 w-3 rounded-full"></div>
            <div className="bg-green-700 h-3 w-3 rounded-full"></div>
            <div className="bg-yellow-700 h-3 w-3 rounded-full"></div>
          </div>
          <button
            className=""
            onClick={() => {
              navigator.clipboard.writeText(value);
              toast.success("Copied to Clipboard", {
                position: "top-right",
              });
            }}
          >
            <Copy className="group-hover:text-sucess-500" size={20} />
          </button>
        </div>
        <textarea
          className="bg-[var(--primary-color)] w-full focus:outline-none focus:border-none rounded-b-2xl p-4 text-black text-[15px] resize-none scrollbar-hidden"
          value={value}
        
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your paste..."
          rows={20}
        />
      </div>
    </div>
  );
}

export default Home;
