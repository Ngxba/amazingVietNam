import React, { createContext, Component } from "react";

export const UserContext = createContext(null);

class UserContextProvider extends Component {
  state = {
    userName: "",
    userEmail: "",
    userRoll: "",
  };

  onChangeContext = (name, email, roll) => {
    this.setState({ userName: name, userEmail: email, userRoll: roll });
  };

  componentDidMount(){
    const userName = localStorage.getItem('name');
    const userEmail = localStorage.getItem("email");
    const userRoll = localStorage.getItem("roll");
    if (userName && userEmail){
      this.onChangeContext(userName, userEmail, userRoll)
    }
  }

  render() {
    return (
      <UserContext.Provider
        value={{ ...this.state, onChangeContext: this.onChangeContext }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
