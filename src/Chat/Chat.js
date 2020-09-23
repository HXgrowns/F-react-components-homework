import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';
import { ROLE } from '../constants';

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

  handlerobotMessage = (text) => {
    let robotMessage = answersData.find((answer) => {
      answer.tags.forEach(tag => {
        const regex = new RegExp(tag);
        if (regex.test(text)) {
          return regex.exec(text);
        }
      });
      
      // const regex = new RegExp(answer.tags);
      // return regex.exec(text);
    });

    if (robotMessage === undefined) {
      robotMessage = {
        role:ROLE.ROBOT,
        text:"对不起，我没有理解你的问题，需要联系人工吗？电话：888888",
      }
    }

    return robotMessage;
  }

  handlerCustomerMessage = (text) => {
    const customerMessage = {
      text: [text],
      role: ROLE.CUSTOMER,
    }
    return customerMessage;
  }

  handleSetState = (message, time) => {
    setTimeout(() => {
      const newMessages = this.state.messages.concat(message);
      this.setState({
        messages: newMessages,
      });
    }, time);
  }

  handleChatMessage = (text) => {
    const customerMessage = this.handlerCustomerMessage(text);
    const robotMessage = this.handlerobotMessage(text);
    this.handleSetState(customerMessage, 500);
    this.handleSetState(robotMessage, 1000);
  }

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput handleChatMessage={this.handleChatMessage} />
      </main>
    );
  }
}

export default Chat;
