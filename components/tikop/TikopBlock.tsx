import { StyleSheet, View } from "react-native";
import HeaderTikop from '../../components/tikop/Header';
import BodyContentTikop from "../../components/tikop/BodyContent";
import ConfigPopup from "../../components/tikop/ConfigPopup";
import { PropsWithChildren, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastProvider } from 'react-native-toast-notifications'
import { I_globalAppState, I_tikopState } from "../../common/@core/Interfaces";
import Pubs from "../../common/@core/Pubs";
import { LOCAL_STORAGE_KEYS } from "../../common/@core/Consts";
import { ActionTypes } from "../../common/@core/ActionTypes";

type tikopBlockProps = PropsWithChildren<{
  tikopNumber: number;
}>

const TikopBlock = (props: tikopBlockProps): JSX.Element => {
  const [configVisible, setConfigVisible] = useState(false);
  const [totalDate, setTotalDate] = useState(0);

  const tikopReducer: I_tikopState = useSelector((state: any) => state.tikop);
  const globalAppReducer: I_globalAppState = useSelector((state: any) => state.globalApp);
  const dispatch = useDispatch();

  useEffect(() => {
    const key = props.tikopNumber;
    Pubs.saveStorageWithKey(LOCAL_STORAGE_KEYS.TIKOP.TIKOP_NUMBER, key.toString())
    .then((_) => {
      const payload: I_globalAppState = {
        tikopNumber: key,
      }
      dispatch({
        type: ActionTypes.GLOBLE_APP.UPDATE,
        payload,
      });
    });
  }, []);

  useEffect(() => {
    reloadFromStorage();
  }, [globalAppReducer.tikopNumber]);

  const updateByDispatch = (totalDate: number, cashWithdraw: number, currentIndexWithdraw: number, currentDateWithdraw: string, startDate: string, currentIndexTimoed: number) => {
    if (!currentDateWithdraw) {
      currentDateWithdraw = Pubs.toDateFormat(Pubs.getCurrentDate());
    }
    const payload: I_tikopState = {
      totalDate: totalDate,
      cashWithdraw: cashWithdraw,
      currentIndexWithdraw: currentIndexWithdraw,
      currentDateWithdraw,
      startDate,
      currentIndexTimoed,
    };
    dispatch({
      type: ActionTypes.TIKOP.UPDATE,
      payload,
    })
  }

  const reloadFromStorage = async () => {
    const totalDate = await Pubs.getTikopStorageWithKey(LOCAL_STORAGE_KEYS.TIKOP.TOTAL_DATE);
    const cashWithdraw = await Pubs.getTikopStorageWithKey(LOCAL_STORAGE_KEYS.TIKOP.CASH_WITHDRAW);
    let currentIndexWithdraw = await Pubs.getTikopStorageWithKey(LOCAL_STORAGE_KEYS.TIKOP.CURRENT_INDEX_WITHDRAW) ?? 0;
    let currentDateWithdraw = await Pubs.getTikopStorageWithKey(LOCAL_STORAGE_KEYS.TIKOP.CURRENT_DATE_WITHDRAW) ?? '';
    let startDate = await Pubs.getTikopStorageWithKey(LOCAL_STORAGE_KEYS.TIKOP.START_DATE_TIKOP) ?? Pubs.toDateFormat(Pubs.getCurrentDate(), true);
    const currentIndexTimoed = await Pubs.getTikopStorageWithKey(LOCAL_STORAGE_KEYS.TIKOP.CURRENT_INDEX_TIMOED) ?? 0;

    setTotalDate(Number(totalDate));

    updateByDispatch(Number(totalDate), Number(cashWithdraw), Number(currentIndexWithdraw), currentDateWithdraw, startDate, Number(currentIndexTimoed));
  }

  const handleConfigSubmit = async (totalDate: number, cashWithdraw: number, startDate: Date) => {
    setConfigVisible(false);
    // console.log({
    //   totalDate,
    //   cashWithdraw,
    // });
    setTotalDate(totalDate);
    let startDateStr = Pubs.toDateFormat(startDate, true);
    // startDateStr = '2023-03-01T03:58:02.250Z';

    // save data to storage
    await Pubs.saveTikopStorageWithKey(LOCAL_STORAGE_KEYS.TIKOP.TOTAL_DATE, totalDate.toString());
    await Pubs.saveTikopStorageWithKey(LOCAL_STORAGE_KEYS.TIKOP.CASH_WITHDRAW, cashWithdraw.toString());
    await Pubs.saveTikopStorageWithKey(LOCAL_STORAGE_KEYS.TIKOP.CURRENT_INDEX_WITHDRAW, '0');
    await Pubs.saveTikopStorageWithKey(LOCAL_STORAGE_KEYS.TIKOP.START_DATE_TIKOP, startDateStr);
    await Pubs.saveTikopStorageWithKey(LOCAL_STORAGE_KEYS.TIKOP.CURRENT_DATE_WITHDRAW, startDateStr);
    await Pubs.saveTikopStorageWithKey(LOCAL_STORAGE_KEYS.TIKOP.CURRENT_INDEX_TIMOED, '0');

    updateByDispatch(totalDate, cashWithdraw, 0, startDateStr, startDateStr, 0);

    // handleSetWithdraw(tikopReducer);
  }

  const handleSetWithdraw = async (tikopReducer: I_tikopState) => {
    setTimeout(async () => {
      const index = 1;
      const dateFull = Pubs.toDateFormat(Pubs.getCurrentDate(), true);
      const payload: I_tikopState = {
        ...tikopReducer,
        currentIndexWithdraw: index,
        currentDateWithdraw: dateFull,
      };
      await Pubs.saveTikopStorageWithKey(LOCAL_STORAGE_KEYS.TIKOP.CURRENT_INDEX_WITHDRAW, index.toString());
      await Pubs.saveTikopStorageWithKey(LOCAL_STORAGE_KEYS.TIKOP.CURRENT_DATE_WITHDRAW, dateFull);

      dispatch({
        type: ActionTypes.TIKOP.UPDATE,
        payload,
      });
      reloadFromStorage();
    }, 2000);
  }

  const onGoToCurrentView = () => {
    const payload: I_globalAppState = {
      viewCurrentCount: (globalAppReducer.viewCurrentCount ?? 0) + 1,
    }
    dispatch({
      type: ActionTypes.GLOBLE_APP.UPDATE,
      payload,
    })
  }

  return (
    <ToastProvider>
      <View style={styles.container}>
        <HeaderTikop onViewCurrent={onGoToCurrentView} onReset={() => setConfigVisible(true)} />
        <BodyContentTikop totalDate={totalDate} />

        <ConfigPopup onSubmit={handleConfigSubmit} visible={configVisible} onVisible={setConfigVisible} />
      </View>
    </ToastProvider>
  )
}

export default TikopBlock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
