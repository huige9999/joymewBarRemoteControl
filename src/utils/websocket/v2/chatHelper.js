// 处理chat消息
// handleMessage 事件名规则：必须以 chat- 开头
const handleMessage = (message, bus) => {
  if (message.type === 'wsya' || message.type === 'liwu') {
    bus.$emit('chat-message', message.data);
  }
};
export default handleMessage;
