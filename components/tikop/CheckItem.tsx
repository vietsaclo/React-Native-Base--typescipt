import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import StylesCommon from "../../common/StylesCommon";
import AntdIcon from 'react-native-vector-icons/AntDesign';
import { PropsWithChildren } from "react";

type checkProps = PropsWithChildren<{
  isChecked: boolean,
  textDisplay: string,
}>

const CheckItem = (props: checkProps): JSX.Element => {
  return (
    <TouchableOpacity style={[
      StylesCommon.padding,
      StylesCommon.border,
      StylesCommon.marginVc,
      styles.container,
    ]}>
      <View>
        <Text>{props.textDisplay}</Text>
      </View>

      <View style={styles.rightIcon}>
        <Text style={[StylesCommon.textRight]}>
          {props.isChecked ? '50.000đ' : 'pending...'}&nbsp;
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
  },
  rightIcon: {
    width: '60%',
  },
});
