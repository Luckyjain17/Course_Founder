import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

const CardInfo = (props) => {
  const data = useSelector((state) => state.filter);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;
  const cardArr = useSelector((state) => state.card?.CardList);
  const FilterCardList = useSelector((state) => state.card?.FilterCardList);
  const isFilter = useSelector((state) => state.card?.isFilter);
  const [cardList, setCardList] = useState(cardArr);
  useEffect(() => {
    isFilter ? setCardList(FilterCardList) : setCardList(cardArr);
  }, [isFilter, FilterCardList]);
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(cardList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(cardList.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, cardList]);
  useEffect(() => {
    setCardList(cardArr);
  }, [cardArr]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % cardList.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {currentItems !== undefined && currentItems.length === 0 ? (
        <div className="loader-progress">No Data Found</div>
      ) : (
        <div
          className="card-info-section"
          style={{ height: currentItems.length === 0 ? "200px" : "auto" }}
        >
          <Grid container spacing={3}>
            {currentItems.map((obj, i) => {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <Card className="Info-data">
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <div
                          className="Info-firstleft"
                          style={{ fontSize: "20px" }}
                        >
                          {obj["Course Id"]}
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="date-col">
                          <div className="Info-firstright">
                            <CalendarMonthIcon />
                          </div>
                          <div
                            className="Info-righttext"
                            style={{ fontSize: "20px" }}
                          >
                            {obj["Next Session Date"]}
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                    <div className="Info-heading">Provider</div>
                    <div className="Info-thirdline">{obj["Provider"]}</div>
                    <div className="Info-heading">Course Name</div>
                    <div className="Info-fifthline">{obj["Course Name"]}</div>
                    <div className="Info-heading">
                      Universities/Institutions
                    </div>
                    <div className="Info-seventhline">
                      {obj["Universities/Institutions"]}
                    </div>

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <div className="Info-heading">Parent Subject</div>
                        <div className="Info-sub-value">
                          {obj["Parent Subject"]}
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="Info-sub">
                          <div className="Info-heading">Child Subject</div>
                          <div className="Info-sub-value">
                            {obj["Child Subject"]}
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
          />
        </div>
      )}
    </>
  );
};
export default CardInfo;
