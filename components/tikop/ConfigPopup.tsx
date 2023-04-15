import { PropsWithChildren, useState } from "react";
import { Button, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Dialog, { DialogContent, SlideAnimation } from 'react-native-popup-dialog';
import { Row, Table, TableWrapper } from "react-native-table-component";
import DatePicker from 'react-native-date-picker'
import StylesCommon from "../../common/@core/StylesCommon";
import { COLORS } from "../../common/@core/Consts";
import Pubs from "../../common/@core/Pubs";

type configProps = PropsWithChildren<{
  visible: boolean,
  onVisible: Function,
  onSubmit: Function,
}>

const listDaoHan = [
  {
    text: '2 Tuần',
    value: 2 * 7,
  },
  {
    text: '1 Tháng',
    value: 1 * 30,
  },
  {
    text: '3 Tháng',
    value: 3 * 30,
  },
  {
    text: '5 Tháng',
    value: 5 * 30,
  },
  
];

const ConfigPopup = (props: configProps): JSX.Element => {
  const [cashWithdraw, setCashWithdraw] = useState('0');
  const [buttonActiveKey, setButtonActiveKey] = useState(0);
  const [startDate, setStartDate] = useState(new Date())

  const onSubmit = () => {
    const cash = Number(cashWithdraw);
    if (cash < 1000) return;

    Keyboard.dismiss();
    props.onSubmit(listDaoHan[buttonActiveKey].value, cash, startDate);
  }

  const inputWithdraw = () => {
    return (
      <TextInput
      style={[StylesCommon.textCenter, StylesCommon.fwBold, styles.textInput]}
      value={cashWithdraw} onChangeText={(text: string) => {
        setCashWithdraw(text.replace(/[^0-9]/g, ''))
      }} />
    );
  }

  const buttonActiveStyle = (buttonKey: number, activeKey: number) => {
    return buttonKey === activeKey ? [
      StylesCommon.bgSecondary,
      StylesCommon.textPrimary,
      StylesCommon.fwBold,
    ] : []
  }

  const buttonSet = (key: number) => {
    return (
      <TouchableOpacity onPress={() => setButtonActiveKey(key)}>
        <View>
          <Text style={[
            StylesCommon.textCenter,
            StylesCommon.padding,
            StylesCommon.upper,
            [...buttonActiveStyle(key, buttonActiveKey)]
          ]}>{listDaoHan[key].text}</Text>
      </View>
      </TouchableOpacity>
    );
  }

  return (
    <Dialog
      visible={props.visible}
      onTouchOutside={() => props.onVisible(!props.visible)}
      dialogAnimation={new SlideAnimation({
        slideFrom: 'bottom',
      })}
      dialogTitle={<Text style={[StylesCommon.padding, StylesCommon.textCenter, styles.title]}>Cài Đặt Đáo Hạn</Text>}
      dialogStyle={[styles.dialog, StylesCommon.bderRadius]}
    >
      <DialogContent style={[StylesCommon.w100]}>
        <Table borderStyle={StylesCommon.tableStyle}>
          <TableWrapper>
            <Row data={[inputWithdraw()]} textStyle={styles.text} />
            <Row data={[buttonSet(0), buttonSet(1)]} textStyle={styles.text}/>
            <Row data={[buttonSet(2), buttonSet(3)]} textStyle={styles.text}/>
            <Row data={[
              <Text style={[StylesCommon.padding, StylesCommon.fwBold, StylesCommon.textCenter]}>
                Tổng kết: {listDaoHan[buttonActiveKey].text} ~ {Pubs.VND.format(Number(cashWithdraw))}/Ngày | Start: {Pubs.toDateFormat(startDate, false)}
              </Text>
            ]} textStyle={styles.text}/>
            <Row data={[
              <DatePicker mode="date" date={startDate} onDateChange={setStartDate} />
            ]} textStyle={styles.text}/>
          </TableWrapper>
        </Table>

        <View style={{marginTop: 10,}}>
          <Button onPress={onSubmit} title="Chấp Nhận Cài đặt này" />
        </View>
      </DialogContent>
    </Dialog>
  )
}

export default ConfigPopup;

const styles = StyleSheet.create({
  dialog: {
    width: '90%',
    borderRadius: 0,
  },
  text: {
    margin: 6,
    color: COLORS.text_black,
    textAlign: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  textInput: {
    fontSize: 20,
    letterSpacing: 3,
  },
});
