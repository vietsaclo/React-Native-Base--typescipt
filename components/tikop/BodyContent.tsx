import { ScrollView, StyleSheet, View } from "react-native"
import StylesCommon from "../../common/StylesCommon";
import CheckItem from "./CheckItem";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
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
  const [dataSourceCords, setDataSourceCords] = useState<number[]>([]);

  const tikopReducer: I_tikopState = useSelector((state: any) => state.tikop);
  const globalAppReducer: I_globalAppState = useSelector((state: any) => state.globalApp);
  const dispatch = useDispatch();

  const handleSetWithdraw = (index: number, dateFull: string) => {
    console.log({
      index,
      indexTimoed: tikopReducer.currentIndexTimoed,
    });
    if (index <= tikopReducer.currentIndexWithdraw && index <= tikopReducer.currentIndexTimoed) return;
    
    if (!TikopAction.canWithdraw(dateFull)) {
      // Alert.alert('Thông Báo', 'Hôm nay bạn đã rút rồi! Đợi qua ngày mai :))');
      toast.show('Hôm nay bạn đã rút rồi! Đợi qua ngày mai :))', {
        type: 'normal',
        duration: 1000,
      });
      return;
    }

    // Case: set checked
    if (index > tikopReducer.currentIndexWithdraw) {
      setActiveIndexWithdraw(index, dateFull);
      return;
    }

    // case: set timoed
    setActiveIndexTimoed(index);
  }

  const setActiveIndexWithdraw = async (index: number, dateFull: string) => {
    const payload: I_tikopState = {
      ...tikopReducer,
      currentIndexWithdraw: index,
      currentDateWithdraw: dateFull,
    };
    dispatch({
      type: ActionTypes.TIKOP.UPDATE,
      payload,
    });

    await Pubs.saveTikopStorageWithKey(LOCAL_STORAGE_KEYS.TIKOP.CURRENT_INDEX_WITHDRAW, index.toString());
    await Pubs.saveTikopStorageWithKey(LOCAL_STORAGE_KEYS.TIKOP.CURRENT_DATE_WITHDRAW, dateFull);
  }

  const setActiveIndexTimoed = async (index: number) => {
    const payload: I_tikopState = {
      ...tikopReducer,
      currentIndexTimoed: index,
    };
    dispatch({
      type: ActionTypes.TIKOP.UPDATE,
      payload,
    });

    await Pubs.saveTikopStorageWithKey(LOCAL_STORAGE_KEYS.TIKOP.CURRENT_INDEX_TIMOED, index.toString());
  }

  // useEffect(() => {
  //   handleSetWithdraw(1, Pubs.toDateFormat(Pubs.getCurrentDate(), true));
  // }, [globalAppReducer.withdrawIndexCount]);

  useEffect(() => {
    const index = tikopReducer.currentIndexWithdraw - 1;
    scrollRef.current.scrollTo({
      x: 0,
      y: dataSourceCords[index < 0 ? 0 : index],
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
        <View
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            dataSourceCords[i] = layout.y;
            setDataSourceCords(dataSourceCords);
          }}
          key={i}>
          <CheckItem
            onPress={() => handleSetWithdraw(i + 1, fullDate)}
            isChecked={i < tikopReducer.currentIndexWithdraw}
            textDisplay={Pubs.toDateFormat(currentDate)}
            isTimoed={i < tikopReducer.currentIndexTimoed}
          />
        </View>
      );
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
