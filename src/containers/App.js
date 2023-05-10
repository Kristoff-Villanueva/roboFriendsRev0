import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import "./App.css";

import { setSearchField, requestRobots } from "../actions";

const mapStateToProps = (state) => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots(dispatch)),
	};
};

function App(props) {
	const [robots, setRobots] = useState([]);
	const [count, setCount] = useState(0); // for demo purposes
	const { onSearchChange, searchField } = props;

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) => response.json())
			.then((users) => {
				setRobots(users);
			});
		// console.log(count)
	}, []); // if you add count, only run if count changes.

	const filteredRobots = robots.filter((robot) => {
		return robot.name.toLowerCase().includes(searchField.toLowerCase());
	});

	return !robots.length ? (
		<h1>Loading</h1>
	) : (
		<div className="tc">
			<h1 className="f1">RoboFriends</h1>
			<button className="main-btn" onClick={() => setCount(count + 1)}>
				Click Me!
			</button>
			<SearchBox searchChange={onSearchChange} />
			<Scroll>
				<CardList robots={filteredRobots} />
			</Scroll>
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
