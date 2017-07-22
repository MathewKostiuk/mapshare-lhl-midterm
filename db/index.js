require("dotenv").config();

const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);

//////////////////////////////////////////////////////////////////
//////                                                         ///
///// utility functions to communicate with database,         ////
////  exported to server.js, intended to be passed to routes /////
///                                                         //////
//////////////////////////////////////////////////////////////////
const viewTable = (table) => {
  return knex.select().from(table)
    .catch((err) => {
      if (err) {
        return console.error(err);
      }
    });
};

const findInTable = (table, column, match) => {
  console.log("searching");
  return knex.select().from(table)
    .where(column, match)
    .catch((err) => {
      if (err) {
        return console.error(err);
      }
    }).then((rows) => {
      return rows;
    });
};

////////////////////////////////////////////////////////////
/////                                                    ///
//// arr1 and arr2 are arrays in format [column, value] ////
///                                                    /////
////////////////////////////////////////////////////////////
const deleteFromTable = (table, arr1, arr2) => {
  if (!arr2) {
    return knex(table)
      .where(arr1[0], arr1[1])
      .del();
  } else {
    return knex(table)
      .where(arr1[0], arr1[1])
      .andWhere(arr2[0], arr2[1])
      .del();
  }
}

const updateTable = (table, checkArr, newObj) => {
  return knex(table)
    .where(checkArr[0], checkArr[1])
    .update(newObj);
}

////////////////////////////////////////////////////////////////
///////                                                      ///
////// takes an object of key value pairs in the format of: ////
/////  {keyname: value, otherkeyname: othervalue}          /////
////   these pairs will be added to specified table       //////
///                                                      ///////
////////////////////////////////////////////////////////////////
const addToTable = (table, keyValuePairs) => {
  console.log("updating");
  return knex.insert(keyValuePairs)
    .into(table)
    .catch((err) => {
      if (err) {
        return console.error(err);
      }
    })
    .then(() => {
      console.log("updated");
    });
};

///////////////////////////////////////////////////////////
/////                                                   ///
//// other helper functions for database communication ////
///                                                   /////
///////////////////////////////////////////////////////////
const generateRandomString = () => {
  let output = "";
  const base = "0123456789";
  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * base.length);
    output += base[index];
  }
  return output;
};



module.exports = {knex, viewTable, findInTable, addToTable, generateRandomString};
