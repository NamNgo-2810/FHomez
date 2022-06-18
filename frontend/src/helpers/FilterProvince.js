import { useCallback } from "react";
import { provinceData } from "../components/UploadForm/Province";

export default function useFilterProvince() {
  const getDistrict = useCallback(() => {
    return provinceData.district.map((e) => ({
      value: e.name,
      label: e.pre + " " + e.name,
    }));
  }, []);

  const getSubDistrict = useCallback(() => {
    let result = [];

    provinceData.district.forEach((e) => {
      e.ward.forEach((ward) => {
        result.push({
          value: ward.name,
          label: ward.pre + " " + ward.name,
        });
      }); 
    });

    return result;
  }, []);

  const getStreet = useCallback(() => {
    let result = [];

    provinceData.district.forEach((e) => {
      e.street.forEach((street) => {
        result.push({
          value: street.name,
          label: street.pre + " " + street.name,
        });
      });
    });


    return result;
  }, []);

  return {
    getDistrict,
    getSubDistrict,
    getStreet,
  };
}
