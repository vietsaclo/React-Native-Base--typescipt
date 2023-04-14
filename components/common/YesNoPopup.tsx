import { PropsWithChildren } from "react";
import { StyleSheet, Text } from "react-native"
import Dialog, { DialogFooter, DialogButton, DialogContent, SlideAnimation } from 'react-native-popup-dialog';
import StylesCommon from "../../common/@core/StylesCommon";

type yesNoProps = PropsWithChildren<{
  visible: boolean,
  onSubmit: Function,
}>

const YesNoPopup = (props: yesNoProps): JSX.Element => {
  return (
    <Dialog
      visible={props.visible}
      footer={
        <DialogFooter>
          <DialogButton
            text="Thôi"
            onPress={() => props.onSubmit(false)}
            textStyle={StylesCommon.textPrimary}
          />
          <DialogButton
            text="Được"
            onPress={() => props.onSubmit(true)}
            textStyle={StylesCommon.textPrimary}
          />
        </DialogFooter>
      }
      dialogTitle={<Text style={[StylesCommon.padding, StylesCommon.textCenter, styles.title]}>Thông Báo</Text>}
      dialogStyle={[styles.dialog, StylesCommon.bderRadius]}
      dialogAnimation={new SlideAnimation({
        slideFrom: 'bottom',
      })}
    >
      <DialogContent>
        <Text style={[StylesCommon.fwBold, StylesCommon.padding]}>
          Bạn có chắc muốn rút tiền hôm nay ?
        </Text>
      </DialogContent>
    </Dialog>
  )
}

export default YesNoPopup;

const styles = StyleSheet.create({
  dialog: {
    width: '90%',
    borderRadius: 0,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
