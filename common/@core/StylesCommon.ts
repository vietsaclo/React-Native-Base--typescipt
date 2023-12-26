import { StyleSheet } from "react-native";
import { COLORS, CONFIG_BY_PLATFORM } from "./Consts";

const NUMBER_SET_VALUE = 6;
const FONT_SIZE_LARGE = 25;
const FONT_SIZE_MIDDLE = 20;

const StylesCommon = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  w100: {
    width: '100%',
  },
  h100: {
    height: '100%',
  },
  fullScreen: {
    width: '100%',
    height: '100%',
  },
  upper: {
    textTransform: 'uppercase',
  },

  fwBold: {
    fontWeight: 'bold',
  },
  fzLarge: {
    fontSize: FONT_SIZE_LARGE,
  },
  fzMiddle: {
    fontSize: FONT_SIZE_MIDDLE,
  },

  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  textLeft: {
    textAlign: 'left',
  },
  textLineThrough: {
    textDecorationLine: 'line-through',
  },
  textUnderLine: {
    textDecorationLine: 'underline',
  },
  textUpperCase: {
    textTransform: 'uppercase',
  },
  textCapitalize: {
    textTransform: 'capitalize',
  },
  textSmall: {
    fontSize: 10,
  },

  padding: {
    padding: NUMBER_SET_VALUE,
  },
  margin: {
    margin: NUMBER_SET_VALUE,
  },
  marginVc: {
    marginVertical: NUMBER_SET_VALUE,
  },
  marginHz: {
    marginHorizontal: NUMBER_SET_VALUE,
  },
  marginHz20: {
    marginHorizontal: 20,
  },
  marginTop20: {
    marginTop: 20,
  },
  marginLeft: {
    marginLeft: NUMBER_SET_VALUE,
  },
  marginRight: {
    marginRight: NUMBER_SET_VALUE,
  },
  marginTop: {
    marginTop: NUMBER_SET_VALUE,
  },
  marginBottom: {
    marginBottom: NUMBER_SET_VALUE,
  },
  paddingTop: {
    paddingTop: NUMBER_SET_VALUE,
  },
  paddingLeft: {
    paddingLeft: NUMBER_SET_VALUE,
  },
  paddingBottom: {
    paddingBottom: NUMBER_SET_VALUE,
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
    borderRadius: NUMBER_SET_VALUE,
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
  bgBlack: {
    backgroundColor: '#000',
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
  },

  tableStyle: {
    borderWidth: 1,
    borderColor: COLORS.border_secondary,
  },

  centerElement: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  flexRow: {
    flexDirection: 'row',
  },

  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  letterSpacing: {
    letterSpacing: 4,
  },
});

export default StylesCommon;
