import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import CheckBox from "./CheckBox";

const LineByQuarter = ({ data, filter0 }) => {
  let lineArray = data.sessionsData;

  //Make an array of x values
  const keysArray = Object.keys(filter0.selectableOptions);
  // console.log(filter0);
  // console.log(keysArray);
  // console.log(typeof keysArray);
  //make checkboxes for graph
  const checkboxesQtr = [];
  for (let i = 0; i < keysArray.length; i++) {
    checkboxesQtr.push({
      name: keysArray[i],
      key: `checkbox[i]`,
      label: keysArray[i]
    });
  }

  //get selected Table ColumnName
  const selectedTableColumnName = filter0.selectedTableColumnName;

  // 1. eliminate null values
  const lineNonNull = [];

  for (let i = 0; i < lineArray.length; i++) {
    //console.log(lineArray[i][selectedTableColumnName])
    if (lineArray[i][selectedTableColumnName] !== null) {
      lineNonNull.push(lineArray[i]);
    }
  }

  // console.log(lineNonNull);

  //2. convert date to year-month
  lineNonNull.map(item => {
    item["created_date"] = item.created_date.substring(0, 7);
  });
  //console.log(typeof lineNonNull);

  //3. Group together by year-month
  // const reduceBy = (objectArray, property) => {
  //   return objectArray.reduce(function(total, obj) {
  //     let key = obj[property];
  //     if (!total[key]) {
  //       total[key] = [];
  //     }
  //     total[key].push(obj);
  //     return total;
  //   }, {});
  // };
  // let groupedPeople = reduceBy(lineNonNull, "created_date");
  // console.log(groupedPeople);

  //Makes Array of dates
  // let dateObj = {};
  // let dateArray = [];
  // function mObj(o) {
  //   for (let key of Object.keys(o)) {
  //     dateArray.push({ date: key });
  //     // dateObj[key] = mapper(o[key])
  //   }
  // }

  // mObj(groupedPeople);

  //console.log(dateArray);

  //3. Group categories together with date
  const reduceBy1 = (objectArray, property, property1) => {
    return objectArray.reduce(function(total, obj) {
      let key = obj[property] + obj[property1];
      //combine date and cat type to make a new key

      //make a new object if the year-mo and category not existing
      if (!total[key]) {
        total[key] = [];
      }
      //if year-mo, then push obj
      total[key].push(obj);
      return total;
    }, {});
  };
  let groupedPeople1 = reduceBy1(
    lineNonNull,
    "created_date",
    selectedTableColumnName
  );

  console.log(lineNonNull);
  //created_date: "2017-06"  -> 2017-Q2
  //|| month === '02' || month || '03'
  let byQuarter = [];
  for (let i = 0; i < lineNonNull.length; i++) {
    let month = lineNonNull[i]["created_date"].slice(5, 7);
    let item = lineNonNull[i];
    if (month === "01" || month === "02" || month === "03") {
      item["created_date"] = item["created_date"].slice(0, 5);
      item["created_date"] = item["created_date"].concat("Q1");
      byQuarter.push(item);
    } else if (month === "04" || month === "05" || month === "06") {
      item["created_date"] = item["created_date"].slice(0, 5);
      item["created_date"] = item["created_date"].concat("Q2");
      byQuarter.push(item);
    } else if (month === "07" || month === "08" || month === "09") {
      item["created_date"] = item["created_date"].slice(0, 5);
      item["created_date"] = item["created_date"].concat("Q3");
      byQuarter.push(item);
    } else if (month === "10" || month === "11" || month === "12") {
      item["created_date"] = item["created_date"].slice(0, 5);
      item["created_date"] = item["created_date"].concat("Q4");
      byQuarter.push(item);
    }
  }
  console.log(lineNonNull);
  //3. Put categories together by Quarter
  const catByQtr = (objectArray, property, property1) => {
    return objectArray.reduce(function(total, obj) {
      let key = obj[property] + obj[property1];
      //combine date and cat type to make a new key

      //make a new object if the year-mo and category not existing
      if (!total[key]) {
        total[key] = [];
      }
      //if year-qtr, then push obj
      total[key].push(obj);
      return total;
    }, {});
  };

  console.log(`selectedTableColumnName`, selectedTableColumnName);
  let groupedItems = catByQtr(
    lineNonNull,
    "created_date",
    selectedTableColumnName
  );
  console.log(groupedItems);

  //4.  get total amount per item in each quarter
  //map through obj and get length of arrays
  let qtrAmounts = {};

  function mapObj(mapper, o) {
    for (let key of Object.keys(o)) {
      qtrAmounts[key] = mapper(o[key]);
    }
  }

  mapObj(function length(val) {
    return val.length;
  }, groupedItems);

  console.log(qtrAmounts);

  //5. combine categories by quarter
  let currentYM = "2017-Q1";
  let qtrObj = {};
  const dateCatArray = [];
  let objectCombined = {};
  function combineAmountsToQtr(o) {
    for (let key of Object.keys(o)) {
      let yearQtr = key.slice(0, 7);
      let cat = key.slice(7, 100);
      let obj = {};
      obj["date"] = yearQtr;
      obj[cat] = o[key];

      dateCatArray.push(obj);
      // }
    }
  }

  combineAmountsToQtr(qtrAmounts);
  // console.log(datesAmounts);
  console.log(dateCatArray);
  console.log(Object.values(dateCatArray));

  //6. combine together to create object for Monthly data
  let usedDates = [];
  let itemDate = {};
  let allCombined = [];
  for (let i = 0; i < dateCatArray.length; i++) {
    let date = dateCatArray[i].date;

    if (usedDates.includes(date)) {
      //console.log("included");
      itemDate = {
        ...itemDate,
        ...dateCatArray[i]
      };
      allCombined.push(itemDate);
      //console.log(itemDate);
    } else {
      // allCombined.push(itemDate);
      console.log("not included");
      let arraykeys = Object.keys(dateCatArray[i]);
      let arrayValues = Object.values(dateCatArray[i]);
      // console.log(arraykeys);
      let newDate = {};
      newDate["date"] = date;
      newDate[arraykeys[1]] = arrayValues[1];
      //console.log(newDate);
      itemDate = newDate;
      usedDates.push(date);
      allCombined.push(itemDate);
    }
  }
  console.log(`allCombined`, allCombined);

  //6. update array
  const updatedQtr = [];
  for (let i = 0; i < allCombined.length; i++) {
    if (
      i + 1 < allCombined.length &&
      allCombined[i].date !== allCombined[i + 1].date
    ) {
      updatedQtr.push(allCombined[i]);
    }
  }
  console.log(updatedQtr);
  console.log(itemDate);

  const [checkedItemsQtr, setCheckedItemsQtr] = useState([]);

  let display = [];
  if (Object.entries(checkedItemsQtr).length > 0) {
    for (let i = 0; i < Object.entries(checkedItemsQtr).length; i++) {
      let bbb = Object.entries(checkedItemsQtr)[i];
      if (bbb.includes(true)) {
        display.push(bbb[0]);
      }
    }
  }

  // items to display on line chart
  const zero = display[0];
  const one = display[1];
  const two = display[2];
  const three = display[3];
  const four = display[4];
  const five = display[5];

  const handleChangeQtr = event => {
    setCheckedItemsQtr({
      ...checkedItemsQtr,
      [event.target.name]: event.target.checked
    });
  };

  return (
    <>
      <LineChart
        width={1000}
        height={400}
        data={updatedQtr}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={zero}
          stroke="blue"
          dot={false}
          // activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey={one} stroke="purple" dot={false} />
        <Line type="monotone" dataKey={two} stroke="orange" dot={false} />
        <Line type="monotone" dataKey={three} stroke="green" dot={false} />
        <Line type="monotone" dataKey={four} stroke="red" dot={false} />
      </LineChart>

      <React.Fragment>
        {checkboxesQtr.map(option => (
          <label key={option.key}>
            <CheckBox
              name={option.name}
              checked={checkedItemsQtr[option.name]}
              onChange={handleChangeQtr}
            />
            {option.name}
          </label>
        ))}
      </React.Fragment>
    </>
  );
};
export default LineByQuarter;