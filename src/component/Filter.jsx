import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch } from "react-redux";
import { addFilterData } from "../action/filterAction";
import { filterCardData } from "../action/cardAction";
import { useSelector } from "react-redux";
import moment from "moment";
function Filter(props) {

  
  const cardArr = useSelector((state) => state.card?.CardList);
  const dispatch = useDispatch();

  const handleSearch = () => {
   
   
      const data = {
        course: props.cardObj.course,
        childSubject: props.cardObj.childSubject,
        date: props.cardObj.date,
        selfPaced: props.cardObj.isLable,
      };

      dispatch(addFilterData(data));

      const filterData = cardArr.filter((obj, i) => {
        let selfPacedLabel = props.cardObj.isLable ? "Self paced" : false;
        var string = moment(props.cardObj.date, "DD/MM/YYYY").format(
          "Do MMM, YYYY"
        );

        return (
          obj["Course Name"].toLowerCase() ===
            (props.cardObj.course !== "" &&
              props.cardObj.course.toLowerCase()) ||
          obj["Child Subject"].toLowerCase() ===
            (props.cardObj.childSubject !== "" &&
              props.cardObj.childSubject.toLowerCase()) ||
          obj["Next Session Date"] === selfPacedLabel ||
          obj["Next Session Date"] === string
        );
      });
      console.log("filterData value done", filterData);

      dispatch(filterCardData(filterData));
    
  };

  return (
    <Card className="filter-component">
      <Card className="card-data">
        <ImportContactsIcon />
        <input
          type="text"
          name="course name"
          placeholder="Course"
          value={props.cardObj.course}
          style={{ borderColor: "transparent" }}
          className="input-field"
          onChange={(e) => props.handleChange(e, "course Name")}
        ></input>
      </Card>
      <Card className="card-data">
        <SwitchAccountIcon />
        <input
          type="text"
          name="childSubject"
          placeholder="Child Subject"
          style={{ borderColor: "transparent" }}
          value={props.cardObj.childSubject}
          onChange={(e) => props.handleChange(e, "childSubject")}
        ></input>
      </Card>
      <Card className="card-data">
        <CalendarMonthIcon />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            className="date-picker-filter"
            label="Date"
            animateYearScrolling
            value={props.cardObj.date}
            onChange={(newValue) => props.handleChange(newValue, "date")}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Card>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              value={props.cardObj.isLable}
              onChange={(e) => props.handleChange(e, "lable")}
            />
          }
          label={props.label}
        />
      </FormGroup>
      <Button
        disabled={props.disableButton}
        variant="contained"
        size="small"
        onClick={handleSearch}
        className={props.disableButton? "button-disable" :"button-color" }
      >
        Search
      </Button>
    </Card>
  );
}

export default Filter;
