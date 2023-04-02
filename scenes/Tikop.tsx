import { StyleSheet, Text, View } from "react-native";
import HeaderTikop from '../components/tikop/Header';
import BodyContentTikop from "../components/tikop/BodyContent";
import ConfigPopup from "../components/tikop/ConfigPopup";
import { useEffect, useState } from "react";
import Pubs from "../common/Pubs";
import { LOCAL_STORAGE_KEYS } from "../common/Consts";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../common/ActionTypes";
import { I_tikopState } from "../common/Interfaces";

const Tikop = (): JSX.Element => {
  const [configVisible, setConfigVisible] = useState(false);
  const [totalDate, setTotalDate] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    reloadFromStorage();
  }, []);

  const updateByDispatch = (totalDate: number, cashWithdraw: number, currentIndexWithdraw: number, currentDateWithdraw: string) => {
    if (!currentDateWithdraw) {
      currentDateWithdraw = Pubs.toDateFormat(Pubs.getCurrentDate());
    }
    const payload: I_tikopState = {
      totalDate: totalDate,
      cashWithdraw: cashWithdraw,
      currentIndexWithdraw: currentIndexWithdraw,
      currentDateWithdraw,
    };
    dispatch({
      type: ActionTypes.TIKOP.UPDATE,
      payload,
    })
  }

  const reloadFromStorage = async () =>{
    const totalDate = await Pubs.getStorageWithKey(LOCAL_STORAGE_KEYS.TOTAL_DATE);
    const cashWithdraw = await Pubs.getStorageWithKey(LOCAL_STORAGE_KEYS.CASH_WITHDRAW);
    const currentIndexWithdraw = await Pubs.getStorageWithKey(LOCAL_STORAGE_KEYS.CURRENT_INDEX_WITHDRAW) ?? 0;
    let currentDateWithdraw = await Pubs.getStorageWithKey(LOCAL_STORAGE_KEYS.CURRENT_DATE_WITHDRAW) ?? '';
    // Test
    // currentDateWithdraw = '31-02-2023';
    if (!totalDate || !cashWithdraw) return;
    setTotalDate(Number(totalDate));
    
    updateByDispatch(Number(totalDate), Number(cashWithdraw), Number(currentIndexWithdraw), currentDateWithdraw);
  }

  const handleConfigSubmit = (totalDate: number, cashWithdraw: number) => {
    setConfigVisible(false);
    console.log({
      totalDate,
      cashWithdraw,
    });
    setTotalDate(totalDate);

    // save data to storage
    Pubs.saveStorageWithKey(LOCAL_STORAGE_KEYS.TOTAL_DATE, totalDate.toString());
    Pubs.saveStorageWithKey(LOCAL_STORAGE_KEYS.CASH_WITHDRAW, cashWithdraw.toString());
    Pubs.saveStorageWithKey(LOCAL_STORAGE_KEYS.CURRENT_INDEX_WITHDRAW, '0');

    updateByDispatch(totalDate, cashWithdraw, 0, Pubs.toDateFormat(Pubs.getCurrentDate()));
  }

  return (
    <View style={styles.container}>
      <HeaderTikop onReset={() => setConfigVisible(true)} />
      <BodyContentTikop totalDate={totalDate} />

      <ConfigPopup onSubmit={handleConfigSubmit} visible={configVisible} onVisible={setConfigVisible} />
      <Text>abc</Text>
    </View>
  )
}

export default Tikop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 7,
  }
});
