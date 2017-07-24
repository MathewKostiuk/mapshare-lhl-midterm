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

/////////////////////////////////////////////////////
/////                                             ///
//// obj1 and obj2 are in format {column, value} ////
///                                             /////
/////////////////////////////////////////////////////
const deleteFromTable = (table, obj1, obj2) => {
  console.log('deleting');
  if (!obj2) {
    return knex(table)
      .where(obj1)
      .del();
  } else {
    return knex(table)
      .del()
      .where(obj1)
      .andWhere(obj2);
  }
}

const updateTable = (table, checkArr, newObj) => {
  console.log('updating');
  return knex(table)
    .update(newObj)
    .where(checkArr[0], checkArr[1]);
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



module.exports = {knex, viewTable, findInTable, addToTable, generateRandomString, deleteFromTable, updateTable};
