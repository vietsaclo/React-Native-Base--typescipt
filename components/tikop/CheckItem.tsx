import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import AntdIcon from 'react-native-vector-icons/AntDesign';
import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { I_tikopState } from "../../common/@core/Interfaces";
import StylesCommon from "../../common/@core/StylesCommon";
import Pubs from "../../common/@core/Pubs";

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
        // StylesCommon.bderRadius,
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
