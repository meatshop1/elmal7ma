import { useRef, useState, useEffect } from "react";
import { Plus, Pencil, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Notes = ({ initialValue }) => {
  const [isSaved, setIsSaved] = useState(initialValue ? true : false);
  const [success, setSuccess] = useState(false);
  const textAreaRef = useRef();
  const handleClick = () => {
    console.log(textAreaRef.current.value);
    setIsSaved(true);
  };
  useEffect(() => {
    let timer;
    if (isSaved) {
      timer = setTimeout(() => {
        setSuccess(true);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
      setSuccess(false);
    };
  }, [isSaved]);

  const handleEdit = () => {
    textAreaRef.current.value = initialValue;
    textAreaRef.current.focus();
    setIsSaved(false);
  };
  return (
    <div className="w-full h-full flex gap-1 my-2">
      <textarea
        className="w-[92%] h-full p-1 bg-custom-light text-accent text-xs rounded-lg focus:outline-none focus:border-accent border-2 border-transparent scrollbar-hide resize-none"
        placeholder={initialValue}
        ref={textAreaRef}
      />
      {!isSaved ? (
        <motion.button
          className="bg-custom border-[1px] border-accent text-accent px-4 py-2 rounded-lg  transition-all text-sm w-[8%] grid place-content-center"
          onClick={handleClick}
        >
          <Plus size={20} />
        </motion.button>
      ) : (
        <motion.button
          className="bg-custom border-[1px] border-accent text-accent px-4 py-2 rounded-lg  transition-all text-sm w-[8%] grid place-content-center"
          onClick={handleEdit}
        >
          {!success ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              exit={{ opacity: 0 }}
            >
              <Check />
            </motion.span>
          ) : (
            <Pencil size={20} />
          )}
        </motion.button>
      )}
    </div>
  );
};

export default Notes;
