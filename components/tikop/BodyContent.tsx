import { ScrollView, StyleSheet } from "react-native"
import StylesCommon from "../../common/StylesCommon";
import CheckItem from "./CheckItem";
import { PropsWithChildren, useEffect, useRef } from "react";
import Pubs from "../../common/Pubs";
import { useDispatch, useSelector } from "react-redux";
import { I_globalAppState, I_tikopState } from "../../common/Interfaces";
import TikopAction from "../../actions/TikopAction";
import { ActionTypes } from "../../common/ActionTypes";
import { LOCAL_STORAGE_KEYS } from "../../common/Consts";
import { useToast } from "react-native-toast-notifications";

type bodyProps = PropsWithChildren<{
  totalDate: number;
}>

const BodyContent = (props: bodyProps): JSX.Element => {
  const toast = useToast();
  const scrollRef: any = useRef();

  const tikopReducer: I_tikopState = useSelector((state: any) => state.tikop);
  const globalAppReducer: I_globalAppState = useSelector((state: any) => state.globalApp);
  const dispatch = useDispatch();

  const handleSetWithdraw = async (index: number, dateFull: string) => {    
    if (!TikopAction.canWithdraw(dateFull)) {
      // Alert.alert('Thông Báo', 'Hôm nay bạn đã rút rồi! Đợi qua ngày mai :))');
      toast.show('Hôm nay bạn đã rút rồi! Đợi qua ngày mai :))', {
        type: 'normal',
        duration: 1000,
      });
      return;
    }

    const payload: I_tikopState = {
      ...tikopReducer,
      currentIndexWithdraw: index,
      currentDateWithdraw: dateFull,
    };
    dispatch({
      type: ActionTypes.TIKOP.UPDATE,
      payload,
    });

    await Pubs.saveStorageWithKey(LOCAL_STORAGE_KEYS.CURRENT_INDEX_WITHDRAW, index.toString());
    await Pubs.saveStorageWithKey(LOCAL_STORAGE_KEYS.CURRENT_DATE_WITHDRAW, dateFull);
  }

  // useEffect(() => {
  //   handleSetWithdraw(1, Pubs.toDateFormat(Pubs.getCurrentDate(), true));
  // }, [globalAppReducer.withdrawIndexCount]);

  useEffect(() => {
    const index = tikopReducer.currentIndexWithdraw - 1;
    scrollRef.current.scrollTo({
      x: 0,
      y: index * 50 + index * 7.5,
      animated: true,
    });
  }, [globalAppReducer.viewCurrentCount]);

  const renderCheckItems = () => {
    const result = [];
    if (!tikopReducer.startDate) return [];
    const currentDate = new Date(tikopReducer.startDate);
    for (let i = 0; i < props.totalDate; i++) {
      const fullDate = currentDate.toISOString();
      result.push(
        <CheckItem
          onPress={() => handleSetWithdraw(i + 1, fullDate)}
          key={i}
          isChecked={i < tikopReducer.currentIndexWithdraw}
          textDisplay={Pubs.toDateFormat(currentDate)}
        />);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
  }

  return (
    <ScrollView
      style={[
        StylesCommon.flex1,
        StylesCommon.w100,
        StylesCommon.h100,
        styles.container,
      ]}
      ref={scrollRef}
    >
      {renderCheckItems()}
    </ScrollView>
  )
}

export default BodyContent;

const styles = StyleSheet.create({
  container: {
    marginTop: 7,
  },
});
