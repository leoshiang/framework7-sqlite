const DB_NAME = 'MyDatabase';
const db = window.sqlitePlugin.openDatabase(
    {name: DB_NAME, location: 'default'});
const execSQL = (sql, params) =>
    new Promise(function(resolve, reject) {
      db.transaction(function(tx) {
        tx.executeSql(sql, params, (tx, result) => resolve(result));
      }, error => reject(error.message));
    });

const isTableExists = (tableName) =>
    new Promise(function(resolve, reject) {
      db.transaction(function(tx) {
        tx.executeSql(`select * from ${tableName}`, [],
            (tx, rs) => resolve(true));
      }, () => reject(false), () => resolve(true));
    });

export default {
  execSQL,
  isTableExists,
};
