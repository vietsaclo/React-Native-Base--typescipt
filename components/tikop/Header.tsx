import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import { COLORS } from "../../common/Consts";
import StylesCommon from "../../common/StylesCommon";
import { PropsWithChildren } from "react";

const tableHeader = ['Hôm Nay', 'Trạng Thái', 'Khả Lợi', 'Tiền Còn Lại'];

const Header = (): JSX.Element => {
  const tableData = [
    ['20-10-2023', 'Được Rút', '100.000đ', '650.000đ'],
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
    <TouchableOpacity>
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
