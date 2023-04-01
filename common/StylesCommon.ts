import { StyleSheet } from "react-native";
import { COLORS } from "./Consts";

const StylesCommon = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  w100:{
    width: '100%',
  },
  h100: {
    height: '100%',
  },
  upper: {
    textTransform: 'uppercase',
  },
  fwBold: {
    fontWeight: 'bold',
  },

  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  textLineThrough: {
    textDecorationLine: 'line-through',
  },
  padding: {
    padding: 6,
  },
  margin: {
    margin: 6,
  },
  marginVc: {
    marginVertical: 6,
  },
  marginHz: {
    marginHorizontal: 6,
  },
  border: {
    borderStyle: 'solid',
    borderColor: COLORS.text_black,
    borderWidth: 1,
  },
  bderRadius0: {
    borderRadius: 0,
  },
  bderRadius: {
    borderRadius: 6,
  },

  bgThird: {
    backgroundColor: COLORS.background_third,
  },
  textWhite: {
    color: COLORS.text_white,
  },
});

export default StylesCommon;
