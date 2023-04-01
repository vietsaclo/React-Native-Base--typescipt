import { View, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { Table, TableWrapper, Row, Rows, Text } from 'react-native-table-component';
import { COLORS } from "../../common/Consts";

const tableHeader = ['Hôm Nay', 'Trạng Thái', 'Khả Lợi', 'Tiền Còn Lại'];

const Header = (): JSX.Element => {
  const tableData = [
    ['20-10-2023', 'Được Rút', '100.000đ', '650.000đ'],
  ];

  const elementButton = (value: any) => (
    <TouchableOpacity onPress={() => Alert.alert(value)}>
      <View>
        <Text>button</Text>
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
            // [elementButton('1'), elementButton('2')],
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
  }
});
