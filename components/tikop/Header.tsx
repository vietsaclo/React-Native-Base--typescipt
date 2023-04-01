import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import { COLORS } from "../../common/Consts";
import StylesCommon from "../../common/StylesCommon";
import { PropsWithChildren } from "react";
import Pubs from "../../common/Pubs";
import { useSelector } from "react-redux";
import { I_tikopState } from "../../common/Interfaces";

type headerPrpos = PropsWithChildren<{
  onReset: Function,
}>

const tableHeader = ['Hôm Nay', 'Trạng Thái', 'Khả Lợi', 'Tiền Còn Lại'];

const Header = (props: headerPrpos): JSX.Element => {
  const tikopReducer: I_tikopState = useSelector((state: any) => state.tikop);

  const getCashEarn = (): string => {
    const spanNumber = Pubs.getDateSpan(tikopReducer.currentDateWithdraw, Pubs.toDateFormat(new Date()));
    console.log({spanNumber, index: tikopReducer.currentDateWithdraw});

    return Pubs.VND.format(spanNumber * tikopReducer.cashWithdraw);
  }

  const getCashRemaining = (): string => {
    return Pubs.VND.format((tikopReducer.totalDate - tikopReducer.currentIndexWithdraw) * tikopReducer.cashWithdraw);
  }

  const tableData = [
    [Pubs.toDateFormat(new Date()), 'Được Rút', getCashEarn(), getCashRemaining()],
  ];

  const buttonViewCurrent = () => (
    <TouchableOpacity>
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

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 2, borderColor: COLORS.text_black }}>
        <TableWrapper>
          <Row data={['Start: 10-10-2023 | Stop: 10-03-2024 | Còn 365 Ngày']} style={styles.head} textStyle={styles.text} />
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
