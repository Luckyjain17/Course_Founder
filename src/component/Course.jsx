import React, { useState, useEffect } from "react";
import "../Style/Course.css";
import Header from "./Header";
import Filter from "./Filter";
import CardInfo from "./CardInfo";
import axios from "axios";
import { addCardData } from "../action/cardAction";
import { useDispatch } from "react-redux";

const Course = () => {
  const [course, setCourse] = React.useState("");
  const [childSubject, setChildSubject] = React.useState("");
  const [date, setDate] = React.useState(null);
  const [isLable, setIsLable] = React.useState(false);
  const dispatch = useDispatch();
  const [cardList, setCardList] = useState([]);

  let data = "Self Paced";
  useEffect(() => {
    axios
      .get("https://nut-case.s3.amazonaws.com/coursessc.json")
      .then((res) => {
        setCardList(res.data);
        dispatch(addCardData(res.data));
      })
      .catch((err) => {});
  }, []);

  const handleChange = (e, type) => {
    if (type === "course Name") {
      // let value =
      //   e.target.value == "" ? null : e.target.value !== null && e.target.value;
      setCourse(e.target.value);
    } else if (type === "childSubject") {
      // let value =
      //   e.target.value == "" ? null : e.target.value !== null && e.target.value;
      setChildSubject(e.target.value);
    } else if (type === "date") {
      // var string = moment(e, "DD/MM/YYYY").format("Do MMM, YYYY");
      setDate(e);
    } else if (type === "lable") {
      setIsLable(e.target.checked);
    }
  };
  let cardObj = { course, childSubject, date, isLable };
  return (
    <div className="course-section">
      <div className="header-filter-wrapper">
        <Header />
        <Filter label={data} cardObj={cardObj} handleChange={handleChange} />
      </div>

      <CardInfo />
    </div>
  );
};

export default Course;
