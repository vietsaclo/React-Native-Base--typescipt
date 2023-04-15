import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import AntdIcon from 'react-native-vector-icons/AntDesign';
import { I_tikopState } from "../../common/@core/Interfaces";
import Pubs from "../../common/@core/Pubs";
import TikopAction from "../../actions/@core/tikop/TikopAction";
import StylesCommon from "../../common/@core/StylesCommon";
import { COLORS } from "../../common/@core/Consts";

type headerPrpos = PropsWithChildren<{
  onReset: Function,
  onViewCurrent: Function,
}>

const tableHeader = ['Hôm Nay', 'Trạng Thái', 'Khả Lợi', 'Tiền Còn Lại'];

const Header = (props: headerPrpos): JSX.Element => {
  const tikopReducer: I_tikopState = useSelector((state: any) => state.tikop);

  const tableData = [
    [
      Pubs.toDateFormat(Pubs.getCurrentDate(), false),
      TikopAction.canWithdraw(tikopReducer.currentDateWithdraw, true) ? 'Được Rút' : <AntdIcon style={StylesCommon.textCenter} size={17} name="minuscircleo" />, 
      TikopAction.getCashEarn(tikopReducer),
      TikopAction. getCashRemaining(tikopReducer),
    ],
  ];

  const buttonViewCurrent = () => (
    <TouchableOpacity style={[
      // StylesCommon.border,
      // StylesCommon.bderRadius,
      // StylesCommon.margin,
    ]} onPress={() => props.onViewCurrent()}>
      <View>
        <Text style={[
          StylesCommon.textCenter,
          StylesCommon.padding,
          StylesCommon.fwBold,
          StylesCommon.textPrimary,
          StylesCommon.upper,
        ]}>Đến hiện tại</Text>
      </View>
    </TouchableOpacity>
  );

  const buttonReset = () => (
    <TouchableOpacity style={[
      // StylesCommon.border,
      // StylesCommon.bderRadius,
      // StylesCommon.margin,
    ]} onPress={() => props.onReset()}>
      <View>
        <Text style={[
          StylesCommon.textCenter,
          StylesCommon.padding,
          StylesCommon.fwBold,
          StylesCommon.textPrimary,
          StylesCommon.upper,
        ]}>Cài đặt lại</Text>
      </View>
    </TouchableOpacity>
  );

  const getDateRemaining = () => {
    const result = tikopReducer.totalDate - tikopReducer.currentIndexWithdraw;
    return result > 0 ? result : 0;
  }

  const headerText = () => {
    const stopDate = new Date(tikopReducer.startDate);
    stopDate.setDate(stopDate.getDate() + tikopReducer.totalDate - 1);
    return (
      <Text style={[StylesCommon.padding, StylesCommon.textCenter, StylesCommon.fwBold]}>
        Start: {Pubs.toShortDate(tikopReducer.startDate)} | Stop: {Pubs.toDateFormat(stopDate, false)} |
        <Text> Còn {getDateRemaining()} Ngày</Text>
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <Table borderStyle={StylesCommon.tableStyle}>
        <TableWrapper>
          <Row data={[headerText()]} style={styles.head} textStyle={styles.text} />
          <Row data={tableHeader} style={styles.head} textStyle={styles.textHeader} />
          <Rows data={tableData} textStyle={styles.text} />
          <Rows data={[
            [buttonViewCurrent(), buttonReset()],
          ]} textStyle={styles.text} />
        </TableWrapper>
      </Table>
    </View>
  )
}

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10
  },
  head: {
    height: 40,
    backgroundColor: COLORS.background_secondary,
  },
  text: {
    margin: 6,
    color: COLORS.text_primary,
    textAlign: 'center',
  },
  textHeader: {
    fontWeight: 'bold',
    margin: 6,
    color: COLORS.text_primary,
    textAlign: 'center',
  },
});
