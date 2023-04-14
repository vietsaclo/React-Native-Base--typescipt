import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ToastProvider } from 'react-native-toast-notifications'
import TikopBlock from "../components/tikop/TikopBlock";
import { Row, Table, TableWrapper } from "react-native-table-component";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Pubs from "../common/@core/Pubs";
import StylesCommon from "../common/@core/StylesCommon";
import { COLORS, LOCAL_STORAGE_KEYS } from "../common/@core/Consts";
import { I_globalAppState } from "../common/@core/Interfaces";
import { ActionTypes } from "../common/@core/ActionTypes";

const Tikop = (): JSX.Element => {
  const [buttonActiveKey, setButtonActiveKey] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    Pubs.getTikopNumberFromStorage().then((value: number) => {
      if (value !== buttonActiveKey) {
        handleChangeTikopNumber(value);
      }
    });
  }, []);

  const buttonActiveStyle = (buttonKey: number, activeKey: number) => {
    return buttonKey === activeKey ? [
      StylesCommon.bgThird,
      StylesCommon.textWhite,
    ] : []
  }

  const handleChangeTikopNumber = async (key: number) => {
    await Pubs.saveStorageWithKey(LOCAL_STORAGE_KEYS.TIKOP.TIKOP_NUMBER, key.toString());
    setButtonActiveKey(key);
    
    const payload: I_globalAppState = {
      tikopNumber: key,
    }
    dispatch({
      type: ActionTypes.GLOBLE_APP.UPDATE,
      payload,
    });
  }

  const buttonSet = (key: number) => {
    return (
      <TouchableOpacity onPress={() => handleChangeTikopNumber(key)}>
        <View>
          <Text style={[
            StylesCommon.textCenter,
            StylesCommon.padding,
            StylesCommon.upper,
            [...buttonActiveStyle(key, buttonActiveKey)]
          ]}>Tikop-{key + 1}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <ToastProvider>
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 2, borderColor: COLORS.text_black }}>
          <TableWrapper>
            <Row data={[buttonSet(0), buttonSet(1), buttonSet(2), buttonSet(3), buttonSet(4),]} />
          </TableWrapper>
        </Table>
        <TikopBlock tikopNumber={buttonActiveKey} />
      </View>
    </ToastProvider>
  )
}

export default Tikop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 7,
  }
});
