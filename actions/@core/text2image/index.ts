import { ActionTypes } from "../../../common/@core/ActionTypes";
import ApiClient from "../../../common/@core/ApiClient";
import { APIs } from "../../../common/@core/Consts";
import { I_ApiRes, I_DataText2Image } from "../../../common/@core/Interfaces";
import { dispatchOrigin } from "../../../common/@core/Store";

export const getInfo = async (mode: string): Promise<I_ApiRes> => {
  dispatchOrigin({ type: ActionTypes.GLOBLE_APP.SET_LOADING_TRUE });
  const dataRes = await ApiClient.get(APIs.DIFFUZERS.GET_INFO + `/${mode}`).catch((_error) => {
    dispatchOrigin({ type: ActionTypes.GLOBLE_APP.SET_LOADING_FALSE });
    return { success: false };
  });
  dispatchOrigin({ type: ActionTypes.GLOBLE_APP.SET_LOADING_FALSE });

  return dataRes;
};

export const generateText2Image = async (data: I_DataText2Image) => {
  dispatchOrigin({ type: ActionTypes.GLOBLE_APP.SET_LOADING_TRUE });
  const dataRes = await ApiClient.post(APIs.DIFFUZERS.TEXT_2_IMAGE, {
    ...data,
    "image_height": 512,
    "image_width": 512,
    "num_images": 1,
    "guidance_scale": 7,
    "steps": 50,
    "seed": 42
  }).catch((_error) => {
    dispatchOrigin({ type: ActionTypes.GLOBLE_APP.SET_LOADING_FALSE });
    const result: I_ApiRes = {
      success: false,
    }
    return result;
  });

  dispatchOrigin({ type: ActionTypes.GLOBLE_APP.SET_LOADING_FALSE });
  return dataRes;
}

export const getImagePath = (imgObj: any) => {
  return `${imgObj.domain}/files/diffuzers-user-images/${imgObj.userFolder}/${imgObj.folder}/${imgObj.imgName}`;
}

export const getImagesAssets = async () => {
  dispatchOrigin({ type: ActionTypes.GLOBLE_APP.SET_LOADING_TRUE });
  const dataRes = await ApiClient.get(APIs.DIFFUZERS.GET_IMAGE_ASSETS).catch((_error) => {
    dispatchOrigin({ type: ActionTypes.GLOBLE_APP.SET_LOADING_FALSE });
    const result: I_ApiRes = {
      success: false,
    };
    return result;
  });
  dispatchOrigin({ type: ActionTypes.GLOBLE_APP.SET_LOADING_FALSE });

  return dataRes;
};
