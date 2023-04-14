import { StyleSheet } from "react-native";
import { COLORS, CONFIG_BY_PLATFORM } from "./Consts";

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
  textUnderLine: {
    textDecorationLine: 'underline',
  },
  textSmall: {
    fontSize: 10,
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
  paddingTop: {
    paddingTop: 6,
  },
  paddingBottom: {
    paddingBottom: 6,
  },
  paddingTopPlatform: {
    paddingTop: CONFIG_BY_PLATFORM.paddingTop,
  },

  border: {
    borderStyle: 'solid',
    borderColor: COLORS.border_secondary,
    borderWidth: 1,
  },
  borderDot: {
    borderStyle: 'dotted',
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
  bgPrimary: {
    backgroundColor: COLORS.background_primary,
  },
  bgSecondary: {
    backgroundColor: COLORS.background_secondary,
  },
  textWhite: {
    color: COLORS.text_white,
  },
  textPrimary: {
    color: COLORS.text_primary,
  },
  textSecondary: {
    color: COLORS.text_secondary,
  },
  textBlack: {
    color: COLORS.text_black,
  }
});

export default StylesCommon;
