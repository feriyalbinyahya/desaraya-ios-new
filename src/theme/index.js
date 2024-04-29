import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";


export const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
  // dependencies: {
  //   'linear-gradient': LinearGradient
  // }
};

export const colorModeManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async (value) => {
    try {
      await AsyncStorage.setItem('color-mode', value);
    } catch (e) {
      console.log(e);
    }
  },
};

export const FontConfig = StyleSheet.create({
  bodyOne: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 16
  },
  bodyTwo: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 14,
    lineHeight: 20
  },
  bodyThree: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 12,
    letterSpacing: 0.4,
    lineHeight: 16
  },
  bodyFive: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 11,
    letterSpacing: 0.4,
    lineHeight: 16
  },
  bodyFour: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 14,
    letterSpacing: 0.4,
    lineHeight: 16
  },
  buttonZero: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 10,
  },
  buttonOne: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 16,
    letterSpacing: 0.5
  },
  buttonZeroTwo: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 14,
  },
  buttonThree: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 12,
    letterSpacing: 0.4
  },
  captionZero: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 10,
  },
  bodySix: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 12,
    letterSpacing: 0.4
  },
  captionOne: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 11,
    lineHeight: 16
  },
  captionTwo: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 12
  },
  captionThree: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 16,
    lineHeight: 22
  },
  captionFour: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 14,
    lineHeight: 22
  },
  captionUpperOne: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 10
  },
  captionUpperTwo: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 12
  },
  headingOne: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 28
  },
  headingTwo: {
    fontFamily: 'WorkSans-Bold',
    fontSize: 24,
    lineHeight: 32,
  },
  headingThree: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 18,
    lineHeight: 22,
  },
  headingFour: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 16
  },
  titleFour: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1
  },
  titleSemiBoldFour: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.1
  },
  titleSeven: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 14,
  },
  linkOne:{
    fontFamily: 'WorkSans-Regular',
    fontSize: 14,
    letterSpacing: 0.25
  },
  titleOne: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 20,
  },
  titleTwo: {
    fontFamily: 'WorkSans-Bold',
    fontSize: 16,
    letterSpacing: 0.1,
    lineHeight: 22
  },
  titleThree: {
    fontFamily: 'WorkSans-Bold',
    fontSize: 14,
    letterSpacing: 0.1,
    lineHeight: 20
  },
  titleFive: {
    fontFamily: 'WorkSans-Bold',
    fontSize: 10,
  },
  titleSix: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 24,
    lineHeight: 30,
    width: '90%'
  },
});
/* font sizes */
export const FontSize = {
  linkButtonButtonThree_size: 12,
  bodyBodyTwo_size: 14,
  bodyBodyOne_size: 16,
  headingHeadingTwo_size: 24,
};
/* Colors */
export const Color = {
  danger:'#CB3A31',
  disable: '#BFBFBF',
  divider: '#F0F0F0',
  neutralZeroOne: "#ffff",
  neutralZeroTwo: '#f5f5f5',
  neutralZeroFour: '#E0E0E0',
  neutralZeroSeven: '#757575',
  neutralZeroFive: '#C2C2C2',
  neutralEleven: '#1F1F1F',
  neutralZeroSix: '#9E9E9E',
  neutralTen: '#0A0A0A',
  linear: '#E02638',
  primaryMain: "#00AB5D",
  primaryText: '#262626',
  neutralColorGrayThirteen: "#000",
  neutralColorGrayEight: "#595959",
  neutralColorGrayNine: "#434343",
  secondaryText: "#8c8c8c",
  secondaryMain: '#624FA1',
  lightBorder: '#d9d9d9',
  grayOne: '#FFFFFF',
  grayFour: '#F0F0F0',
  graySix: '#BFBFBF',
  graySeven: '#8c8c8c',
  grayNine: '#434343',
  grayEight: '#595959',
  grayTen: '#262626',
  grayThirteen: '#000000',
  grayTwelve: '#141414',
  redOne: '#FFF2F0',
  title: '#262626',
  warning: '#FAAD14',
  click: '#027FC2',
  surface: '#ECE9F3',
  warningSurface: '#FFFBE6',
  grayTwo: '#FAFAFA',
  focus: '#FB4141',
  border: '#D9D9D9',
  error: '#DC2626',
  successMain: '#22C55E',
  successPressed: '#087839',
  successSurface: '#F0FFF3',
  goldSix: '#FAAD14',
  neutralZeroThree: '#EDEDED',
  purple: '#624FA1',
  magenta: '#E0195E',
  hitam: '#000000',
  putih: '#FFFFFF',
  blue: '#3785C7',
  purpleSurface: '#F7F2FF',
  pink: '#E8519E'
};
/* Paddings */
export const Padding = {
  p_xs: 8,
  p_sm: 10,
  p_md: 20,
  p_lg: 24,
};
/* Margins */
export const Margin = {
  m_xs: 4,
  m_sm: 8,
  m_md: 12,
  m_lg: 20,
  m_xl: 24,
};
/* border radiuses */
export const Border = {
  br_sm: 4,
  br_md: 14,
  br_lg: 20,
};