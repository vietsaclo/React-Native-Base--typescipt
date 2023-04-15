import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import StylesCommon from "../../common/@core/StylesCommon";

type hrProps = PropsWithChildren<{
  text: string,
  width?: number,
}>

export const MyHr = (props: hrProps) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
      <View>
        <Text style={[
          StylesCommon.fzMiddle,
          // StylesCommon.fwBold,
          StylesCommon.textPrimary,
          StylesCommon.margin,
        ]}>
          {props.text}
        </Text>
      </View>
      <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
    </View>
  );
}
