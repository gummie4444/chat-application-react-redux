  export const getPrivateChatName = (userArray, name) => {
    return userArray.indexOf(name) === 0 ? userArray[1] : userArray[0];
  }
