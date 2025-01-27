import { Clock, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useStore } from "../store";


const LocationCard = ({locationSrc, address, id}) => {
  const { t } = useTranslation();
  const lng = useStore(state => state.lng);
  const  p_class = `${lng === "en" ? "font-poppins border-r pr-2" : "font-kufam border-l pl-2"} mx-2`;
  return (
    <div className={`w-[95vw] xl:w-fit bg-custom xl:m-2 mx-auto xl:col-span-1 xl:row-span-1 p-2 rounded-lg xl:place-self-center flex items-center xl:block`}>
      {locationSrc}
      <div className="md:mt-3">
        <div className="text-2xl w-full m-2 mx-auto hidden bg-red xl:flex">
          <span className={`mx-2 ${lng === "en" ? "border-r pr-2" : "border-l pl-2"} h-[5rem] flex items-center justify-center `}>
            <MapPin />
          </span>
          <div className="text-xl max-w-[17rem] flex xl:block">
            <p className="text-sm md:text-lg font-kufam">{address.nearTo}</p>
            <p className="text-sm md:text-lg font-kufam">{address.street}</p>
            <p className="text-sm md:text-lg font-kufam">{address.neighborhood}</p>
          </div>
        </div>
        <div className="text-2xl w-full m-2 mx-auto flex items-center">
          <span className={p_class}>
            <Clock />
          </span>
          <span className={`text-sm md:text-xl max-w-[17rem] ${lng === "en" ? "" :" font-kufam"}`}>{t(`Locations.${id}.hours`)}</span>
        </div>
        <div className="text-2xl w-full m-2 mx-auto flex items-center">
          <span className={p_class}>
            <Phone />
          </span>
          <span className={`text-sm md:text-xl ${lng === "en" ? "" :" font-kufam"}`}>{t(`Locations.${id}.phone`)}</span>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
