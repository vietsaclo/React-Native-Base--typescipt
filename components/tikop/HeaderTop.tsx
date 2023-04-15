import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StylesCommon from "../../common/@core/StylesCommon";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from "../../common/@core/Consts";
import { PropsWithChildren, useState } from "react";
import AboutPopup from './AboutPopup';

type headerProps = PropsWithChildren<{
  headerText: string,
}>

const HeaderTop = (props: headerProps): JSX.Element => {
  const [isShowAbout, setIsShowAbout] = useState<boolean>(false);

  return (
    <View style={[
      styles.container,
    ]}>
      <TouchableOpacity onPress={() => setIsShowAbout(true)}>
        <MaterialIcon color={COLORS.text_primary} size={27} name="menu" />
      </TouchableOpacity>

      <Text style={[
        StylesCommon.fwBold,
        StylesCommon.textPrimary,
        styles.headerText,
      ]}>
        {props.headerText}
      </Text>

      <AboutPopup visible={isShowAbout} updateVisible={setIsShowAbout} />
    </View>
  );
}

export default HeaderTop;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
  },

  headerText: {
    fontSize: 20,
    marginLeft: 20,
  },
});
