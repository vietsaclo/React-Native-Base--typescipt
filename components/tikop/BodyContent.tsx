import { ScrollView, StyleSheet } from "react-native"
import StylesCommon from "../../common/StylesCommon";
import CheckItem from "./CheckItem";
import { PropsWithChildren } from "react";
import Pubs from "../../common/Pubs";

type bodyProps = PropsWithChildren<{
  startDate: Date,
  stopDate: Date,
}>

const BodyContent = (props: bodyProps): JSX.Element => {
  const renderCheckItems = () => {
    const currentDate = props.startDate;
    const result = [];
    let dateText = '';
    let index = 0;
    do {
      dateText = Pubs.toDateFormat(currentDate);
      result.push(<CheckItem key={dateText} isChecked={index < 10} textDisplay={dateText} />);
      console.log(dateText, Pubs.toDateFormat(props.stopDate), ' | ', index);
      currentDate.setDate(currentDate.getDate() + 1);
      if (index++ > 365 * 3) break;

    }while(dateText !== Pubs.toDateFormat(props.stopDate));

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
