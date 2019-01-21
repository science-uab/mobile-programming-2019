import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Sentiment from 'sentiment'
import { GiftedChat } from 'react-native-gifted-chat'

export default class App extends React.Component {
  state = {sentiment: new Sentiment(), score:0,messages: [],clientId:0};
  componentWillMount(){

    this.socket = new WebSocket('ws://10.0.1.149:8080/');
    this.socket.onmessage = ({data}) => {
      let initResp=JSON.parse(data)
      
      if(initResp.id){
        this.state.clientId=initResp.id
        this.forceUpdate()
          return
      }

      initResp=JSON.parse(initResp)
      if (initResp.messages){
        this.state.messages=[]
        this.state.messages=initResp.messages;
        this.forceUpdate()
          return
        }
    };


    this.state.messages=[
      {
        _id: 1,
        text: 'Hello developer ',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]
   
  }
  componentDidMount() {

}
  onSend(messages = []) {
  
    messages.forEach((message)=>{
      message.text="user: "+message.user._id+"score  :"+this.state.sentiment.analyze(message.text).score +" message:"+ message.text
    })
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),() => {
      this.socket.send(JSON.stringify({messages:this.state.messages}))
   
    })
  }
  render() {
    return (

      <GiftedChat
      messages={this.state.messages}
      user={{
        _id: this.state.clientId,
      }}
      onSend={messages => this.onSend(messages)}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
