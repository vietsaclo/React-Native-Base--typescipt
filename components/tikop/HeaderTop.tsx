import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StylesCommon from "../../common/@core/StylesCommon";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from "../../common/@core/Consts";

const HeaderTop = (): JSX.Element => {
  return (
    <View style={[
      styles.container,
    ]}>
      <TouchableOpacity onPress={() => Alert.alert('ok')}>
        <MaterialIcon color={COLORS.text_primary} size={27} name="menu" />
      </TouchableOpacity>

      <Text style={[
        StylesCommon.fwBold,
        StylesCommon.textPrimary,
        styles.headerText,
      ]}>

        Tikop Remaining</Text>
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
