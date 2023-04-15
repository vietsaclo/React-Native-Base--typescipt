import { PropsWithChildren } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import StylesCommon from "../../common/@core/StylesCommon";
import { COLORS } from "../../common/@core/Consts";
import { MyHr } from "../common/ComponentsCommon";
import Octicon from 'react-native-vector-icons/Octicons';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import MatirialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import MatirialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAw5Icon from 'react-native-vector-icons/FontAwesome5';

type AboutPopupProps = PropsWithChildren<{
  visible: boolean,
  updateVisible: Function,
}>

const AboutPopup = (props: AboutPopupProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Dialog
        dialogStyle={[StylesCommon.fullScreen, styles.dialogStyle]}
        visible={props.visible}
        dialogTitle={(
          <View style={styles.dialogStyleHeader}>
            <TouchableOpacity onPress={() => props.updateVisible(false)}>
              <Text style={{ width: '100%', textAlign: 'right', color: COLORS.text_primary }}>
                <AntDesignIcon name="closecircle" size={20} />
              </Text>
            </TouchableOpacity>
          </View>
        )}
        dialogAnimation={new SlideAnimation({
          slideFrom: 'bottom',
        })}
      >
        <DialogContent style={styles.DialogContent}>
          <ScrollView style={{ width: '100%' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={[
                StylesCommon.textLeft,
                StylesCommon.w100,
                // StylesCommon.bgThird,
                StylesCommon.fzLarge,
                StylesCommon.textPrimary,
                StylesCommon.marginBottom,
                StylesCommon.fwBold,
                // StylesCommon.textCenter,
              ]}>Thông tin</Text>

              <MyHr text="Version" />
              <Octicon color={COLORS.text_primary} size={70} name="versions" />
              <Text style={[
                StylesCommon.textPrimary,
              ]}>v1.0</Text>

              <MyHr text="Developer" />
              <AntdIcon color={COLORS.text_primary} size={70} name="customerservice" />
              <Text style={[
                StylesCommon.textPrimary,
              ]}><FontAw5Icon name="copyright"  /> NGUYEN QUOC VIET</Text>
              <Text style={[
                StylesCommon.textPrimary,
              ]}><MatirialCom name="email" /> vietsaclo@gmail.com</Text>

              <MyHr text="License use" />
              <MatirialCom color={COLORS.text_primary} size={70} name="license" />
              <Text style={[
                StylesCommon.textPrimary,
              ]}>FREE</Text>
              <TouchableOpacity onPress={() => Alert.alert(
                'Không cần',
                'Hiện tại là không cần, bây giờ bạn đã sử dụng đầy đủ chức năng.'
              )}>
                <Text style={[
                  StylesCommon.textPrimary,
                  StylesCommon.textUnderLine,
                ]}>update to pro here</Text>
              </TouchableOpacity>

              <MyHr text="Pravicy policy" />
              <MatirialIcon color={COLORS.text_primary} size={70} name="policy" />
              <Text style={[
                StylesCommon.textPrimary,
                StylesCommon.marginBottom,
              ]}>Read bellow :</Text>

              <Text style={[
                StylesCommon.w100,
                StylesCommon.textLeft,
                StylesCommon.textPrimary,
                StylesCommon.padding,
              ]}>
                1. Ứng dụng hoạt động offline.
              </Text>

              <Text style={[
                StylesCommon.w100,
                StylesCommon.textLeft,
                StylesCommon.textPrimary,
                StylesCommon.padding,
              ]}>
                2. Ứng dụng không xin bất cứ quyền gì.
              </Text>

              <Text style={[
                StylesCommon.w100,
                StylesCommon.textLeft,
                StylesCommon.textPrimary,
                StylesCommon.padding,
              ]}>
                3. Ứng dụng không thu thập bất cứ thông tin gì từ người dùng.
              </Text>

              <Text style={[
                StylesCommon.textPrimary,
                StylesCommon.padding,
                StylesCommon.fwBold,
                StylesCommon.textUnderLine,
              ]}>
                By me a cup <MatirialIcon size={20} name="local-cafe" />: MOMO 0398768860
              </Text>

            </View>
          </ScrollView>
        </DialogContent>
      </Dialog>
    </View>
  );
}

export default AboutPopup;

const styles = StyleSheet.create({
  container: {

  },
  dialogStyle: {
    backgroundColor: COLORS.background_primary,
  },
  dialogStyleHeader: {
    padding: 10,
    paddingHorizontal: 20,
  },
  DialogContent: {
    flex: 1,
    alignItems: 'center',
  },
});
