import React, { useState, useEffect } from "react";
import "../Style/Course.css";
import Header from "./Header";
import Filter from "./Filter";
import CardInfo from "./CardInfo";
import axios from "axios";
import { addCardData, filterCardData } from "../action/cardAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const Course = () => {
  const [course, setCourse] = React.useState("");
  const [childSubject, setChildSubject] = React.useState("");
  const [date, setDate] = React.useState(null);
  const [isLable, setIsLable] = React.useState(false);
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const cardArr = useSelector((state) => state.card?.CardList);
  
  let data = "Self Paced";
  useEffect(() => {
    axios
      .get("https://nut-case.s3.amazonaws.com/coursessc.json")
      .then((res) => {
        dispatch(addCardData(res.data));
      })
      .catch((err) => {});
  }, []); 
  useEffect(()=>{
    checkValidation();
  },[course, childSubject, date, isLable])
  const checkValidation =() =>{
   
    if (
      course === "" &&
      childSubject === "" &&
      date === null &&
      isLable === false
    ){
      setIsDisabled(true);
      dispatch(filterCardData(cardArr))
    }
    else{
      setIsDisabled(false);
    }
  };
  const handleChange =  (e, type) => {
    checkValidation();
    if (type === "course Name") {
      setCourse(e.target.value);
    } else if (type === "childSubject") {
        setChildSubject(e.target.value);
    } else if (type === "date") {
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
        <Filter label={data} cardObj={cardObj} handleChange={handleChange} disableButton={isDisabled}/>
      </div>

      <CardInfo />
    </div>
  );
};

export default Course;
