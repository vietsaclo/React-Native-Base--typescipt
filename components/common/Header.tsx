import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux';
import { COLORS } from '../../common/Consts';

const Header = () => {
  const gptReducer = useSelector((state: any) => state.chatGPT);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Chat-GPT 
        <Text style={{color: COLORS.background_secondary}}>&nbsp;API</Text>
      </Text>

      {gptReducer.loading ? (
        <Text style={styles.headerTextCalling}>
          Calling..
        </Text>
      ) : ''}
    </View>
  )
}

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: COLORS.text_white,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text_black,
    width: '70%',
  },
  headerTextCalling: {
    color: COLORS.background_secondary,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
})
