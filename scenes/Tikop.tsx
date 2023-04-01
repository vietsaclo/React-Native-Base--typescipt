import { StyleSheet, View } from "react-native";
import HeaderTikop from '../components/tikop/Header';
import BodyContentTikop from "../components/tikop/BodyContent";

const Tikop = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <HeaderTikop />
      <BodyContentTikop startDate={new Date(2023, 4, 1)} stopDate={new Date(2023, 4, 30)} />
    </View>
  )
}

export default Tikop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 7,
  }
});
