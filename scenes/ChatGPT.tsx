import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../components/common/Header';
import BodyContent from '../components/home/BodyContent';
import Footer from '../components/home/Footer';
import { COLORS } from '../common/@core/Consts';

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <Header />

        <BodyContent />

        <Footer />
      </View>
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background_primary,
    padding: 7,
    paddingTop: 40,
  },
  containerInner: {
    flex: 1,
    backgroundColor: COLORS.background_secondary,
  }
});
