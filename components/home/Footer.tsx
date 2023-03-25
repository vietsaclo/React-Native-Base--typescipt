import React, { useState } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import ChatGPT from '../../actions/ChatGPT';
import { COLORS } from '../../common//Consts';
import { ActionTypes } from '../../common/ActionTypes';

const chatGPT = new ChatGPT();

const Footer = () => {
  const [text, onChangeText] = useState('');
  const gptReducer = useSelector((state: any) => state.chatGPT);
  const dispatch = useDispatch();

  const handleSendMessage = () => {
    dispatch({
      type: ActionTypes.CHAT_GPT.ME,
      payload: {
        message: text,
      }
    });
    dispatch({
      type: ActionTypes.CHAT_GPT.LOADING,
      payload: {
        loading: true,
      }
    });
    chatGPT.reply(text, (message: string) => {
      dispatch({
        type: ActionTypes.CHAT_GPT.GPT,
        payload: {
          message,
        }
      });
    });

    onChangeText('');
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={onChangeText}
        style={styles.input} placeholder={gptReducer.loading ? 'Please wait....' : 'Typing...'} />
      <TouchableOpacity onPress={handleSendMessage}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Footer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 7,
    backgroundColor: COLORS.white,
  },
  input: {
    width: '85%',
    backgroundColor: COLORS.white,
    padding: 7,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: COLORS.background_1,
    borderRadius: 4,
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
