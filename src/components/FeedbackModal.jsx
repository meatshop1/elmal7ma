import { useTranslation } from "react-i18next";
import { Check, X } from "lucide-react";
import { useStore } from "../store";

const FeedbackModal = ({ type, logo }) => {
  const { t } = useTranslation();
  const { lng } = useStore();

  return (
    <div className="md:border-none md:shadow-none md:h-[90%] bg-white rounded-lg flex flex-col items-center justify-center p-5 shadow-lg border w-full z-50">
      <div>{type === "success" ? <Check size={200} className="md:size-96" color="lightgreen" /> : <X size={200} color="red"/>}</div>
      <div className="flex justify-between items-center">
        <h1
          className={`text-4xl md:text-8xl font-semibold mb-3 text-custom ${
            lng === "en" ? "font-poppins" : "font-kufam"
          }`}
        >
          {type === "success"
            ? t("SuccessFeedback.title")
            : t("FailureFeedback.title")}
        </h1>
      </div>
      <p
        className={`text-lg text-center md:text-4xl text-black ${
          lng === "en" ? "font-poppins" : "font-kufam"
        }`}
      >
        {type === "success"
          ? t("SuccessFeedback.content")
          : t("FailureFeedback.content")}
      </p>
    </div>
  );
};

export default FeedbackModal;
