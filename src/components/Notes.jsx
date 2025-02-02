import { useRef, useState, useEffect } from "react";
import { Plus, Pencil, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useStore } from "../store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNoteOnCartItem } from "../api/cart/addNoteOnCartItem";

const Notes = ({ quantity , initialValue, animal, item_id }) => {
  const [isSaved, setIsSaved] = useState(initialValue ? true : false);
  const { t } = useTranslation();
  const { lng } = useStore();
  const [success, setSuccess] = useState(false);
  const textAreaRef = useRef();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addNoteOnCartItem,
    onSuccess: (data) => {
      console.log("Added Note to Cart Item", data);
      queryClient.invalidateQueries("cart");
    },
  });

  const handleClick = () => {
    mutation.mutate({
      item_id,
      obj: {
        notes: textAreaRef.current.value,
        quantity: quantity,
        animal: animal,
      },
    });
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
        className={`w-[92%] h-full p-1 bg-custom-light text-accent text-xs rounded-lg focus:outline-none focus:border-accent border-2 border-transparent scrollbar-hide resize-none ${lng === "en" ? "font-poppins" : "font-kufam"}`}
        placeholder={initialValue ? initialValue : t("EmptyNotesPlaceholder")}
        onFocus={() => {
          textAreaRef.current.value = initialValue
          setIsSaved(false)}}
        
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
