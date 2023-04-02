import { ScrollView, StyleSheet } from "react-native"
import StylesCommon from "../../common/StylesCommon";
import CheckItem from "./CheckItem";
import { PropsWithChildren } from "react";
import Pubs from "../../common/Pubs";

type bodyProps = PropsWithChildren<{
  totalDate: number;
}>

const BodyContent = (props: bodyProps): JSX.Element => {
  const renderCheckItems = () => {
    const result = [];
    const currentDate = Pubs.getCurrentDate();
    for (let i = 0; i < props.totalDate; i++) {
      result.push(
        <CheckItem
          onPress={() => false}
          key={i}
          isChecked={i < 10}
          textDisplay={Pubs.toDateFormat(currentDate)}
        />);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
  }

  return (
    <ScrollView style={[
      StylesCommon.flex1,
      StylesCommon.w100,
      StylesCommon.h100,
      styles.container,
    ]}>
      {renderCheckItems()}
    </ScrollView>
  )
}

export default BodyContent;

const styles = StyleSheet.create({
  container: {
    marginTop: 7,
  },
});
