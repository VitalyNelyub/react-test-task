import { Component } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import css from "../Users/Users.module.css";

class Users extends Component {
  state = {
    usersList: [],
    page: 1,
  };

componentDidMount() {
  this.getUsers(this.state.page);
}

  getUsers = async (page) => {
    const url = new URL("https://6463ed7b127ad0b8f8947a58.mockapi.io/users");
    url.searchParams.append("page", `${page}`);
    url.searchParams.append("limit", 3);

    try {
      const res = await axios.get(url);
      const users = res.data;
      console.log("fetch");
      this.setState((prevState) => ({
        usersList: [...prevState.usersList, ...users],
      }));
    } catch (error) {
      console.error("error");
    }
  };

  handleLoadMore = () => {
    console.log("load more");
    this.setState((prevState) => ({ page: prevState.page + 1 }));
    this.getUsers(this.state.page + 1);
  };

  render() {
    return (
      <div className={css.userCardsPage}>
        <ul className={css.usersList}>
          {this.state.usersList.map(({ name, avatar, followers, tweets }) => (
            <li key={nanoid()} className={css.userItem}>
              <h2>{name}</h2>
              <img src={avatar} alt={name}  className={css.userPhoto}/>
              <p className={css.userRattingInfo}>{followers} FOLLOWERS </p>
              <p className={css.userRattingInfo}>{tweets} TWEETS</p>
              <button>FOLLOW</button>
            </li>
          ))}
        </ul>
        <button onClick={this.handleLoadMore}>LOAD MORE</button>
      </div>
    );
  }
}

export default Users;
