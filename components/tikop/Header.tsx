import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import { COLORS } from "../../common/Consts";
import StylesCommon from "../../common/StylesCommon";
import { PropsWithChildren } from "react";
import Pubs from "../../common/Pubs";
import { useSelector } from "react-redux";
import { I_tikopState } from "../../common/Interfaces";
import TikopAction from "../../actions/TikopAction";
import AntdIcon from 'react-native-vector-icons/AntDesign';

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
    <TouchableOpacity onPress={() => props.onViewCurrent()}>
      <View>
        <Text style={[
          StylesCommon.textCenter,
          StylesCommon.padding,
          StylesCommon.bgThird,
          StylesCommon.textWhite,
          StylesCommon.upper,
        ]}>Đến hiện tại</Text>
      </View>
    </TouchableOpacity>
  );

  const buttonReset = () => (
    <TouchableOpacity onPress={() => props.onReset()}>
      <View>
        <Text style={[
          StylesCommon.textCenter,
          StylesCommon.padding,
          StylesCommon.bgThird,
          StylesCommon.textWhite,
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
      <Table borderStyle={{ borderWidth: 2, borderColor: COLORS.text_black }}>
        <TableWrapper>
          <Row data={[headerText()]} style={styles.head} textStyle={styles.text} />
          <Row data={tableHeader} style={styles.head} textStyle={styles.text} />
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
    color: COLORS.text_black,
    textAlign: 'center',
  },
});
