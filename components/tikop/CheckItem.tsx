import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import StylesCommon from "../../common/StylesCommon";
import AntdIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { PropsWithChildren } from "react";
import Pubs from "../../common/Pubs";
import { useSelector } from "react-redux";
import { I_tikopState } from "../../common/Interfaces";
import { COLORS } from "../../common/Consts";

type checkProps = PropsWithChildren<{
  isChecked: boolean,
  isTimoed: boolean,
  textDisplay: string,
  onPress: Function,
}>

const CheckItem = (props: checkProps): JSX.Element => {
  const tikopReducer: I_tikopState = useSelector((state: any) => state.tikop);

  const lineThrough = () => {
    return props.isChecked ? [
      StylesCommon.textLineThrough,
      StylesCommon.fwBold,
    ] : [];
  }

  const renderTimoed = () => {
    const result = [];
    result.push(<AntdIcon key={0} size={17} name="wallet" />);
    result.push('  ');
    result.push(<AntdIcon key={1} size={17} name="doubleleft" />)

    return result;
  }

  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
      style={[
        StylesCommon.padding,
        StylesCommon.border,
        StylesCommon.marginVc,
        styles.container,
        !props.isChecked ? StylesCommon.borderDot : {},
      ]}>
      <View>
        <Text style={[...lineThrough()]}>{props.textDisplay}</Text>
      </View>

      <View style={styles.rightIcon}>
        <Text style={[StylesCommon.textRight]}>
          {props.isTimoed ? renderTimoed() : ''}&nbsp;&nbsp;
          {props.isChecked ? Pubs.VND.format(tikopReducer.cashWithdraw) : ''}&nbsp;
          {props.isChecked ? <AntdIcon size={17} name="checkcircleo" /> : ''}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default CheckItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  rightIcon: {
    width: '65%',
  },
});
