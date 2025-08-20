import { useSelector } from "react-redux";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function ViewPaste() {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id == id)[0];
  return (
    <div className="w-full sm:w-[80%] max-w-[800px]">
      <div className="flex flex-row gap-12">
        <input
          className="bg-[var(--primary-color)] flex-1 rounded-xl mt-5 text-black p-2 focus:outline-none"
          type="search"
          disabled
          placeholder="search here"
          value={paste.title}
        />
      </div>

      <div className="mt-4 w-full">
        <div className="h-9 w-full bg-[#0e0e0e] rounded-t-2xl flex items-center justify-between p-4">
          <div className="flex gap-2">
            <div className="bg-red-700 h-3 w-3 rounded-full"></div>
            <div className="bg-green-700 h-3 w-3 rounded-full"></div>
            <div className="bg-yellow-700 h-3 w-3 rounded-full"></div>
          </div>
          <button
            className=""
            onClick={() => {
              navigator.clipboard.writeText(paste.content);
              toast.success("Copied to Clipboard", {
                position: "top-right",
              });
            }}
          >
            <Copy className="group-hover:text-sucess-500" size={20} />
          </button>
        </div>
        <textarea
          className=" bg-[var(--primary-color)] focus:outline-none focus:border-none w-full rounded-b-2xl p-4 text-black text-[15px] resize-none scrollbar-hidden"
          value={paste.content}
          placeholder="Enter Content"
          rows={20}
        />
      </div>
    </div>
  );
}

export default ViewPaste;
