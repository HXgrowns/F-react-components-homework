import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  handleChatMessage = (text)  => {

    const customerMessage = {
      text: [text],
      "role": "CUSTOMER",
    }

    setTimeout(() => {
      const messages = this.state.messages.concat(customerMessage);
      this.setState({
        messages,
      });
    }, 500);

    const chatMessage = answersData.find((answer) => {
      const regex = new RegExp(answer.tags)
      return regex.exec(text);
    });

    if (chatMessage === undefined) {
      return;
    }
  
    const messages = this.state.messages.concat(customerMessage).concat(chatMessage);
    setTimeout(() => {
      this.setState({
        messages,
      });
    }, 1000);
  }

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput handleChatMessage={this.handleChatMessage}/>
      </main>
    );
  }
}

export default Chat;
