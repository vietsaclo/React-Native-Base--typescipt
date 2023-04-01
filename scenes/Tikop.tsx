import { StyleSheet, View } from "react-native";
import HeaderTikop from '../components/tikop/Header';

const Tikop = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <HeaderTikop />
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
