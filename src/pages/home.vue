<template>
  <f7-page name="home"
           @page:beforein="init">
    <!-- Top Navbar -->
    <f7-navbar>
      <f7-button round
                 @click="loadData()">load data
      </f7-button>
    </f7-navbar>
    <div v-for="(item, index) in items"
         :key="index">
      <h1>{{ item.name }}</h1>
    </div>
  </f7-page>
</template>
<script>
import dbService from '../js/db-service';

const displayData = async () =>
    new Promise(function(resolve) {
      dbService.execSQL('select * from DemoTable').then(function(result) {
        let results = [];
        for (let i = 0; i < result.rows.length; i++) {
          results.push(result.rows.item(i));
        }
        resolve(results);
      });
    });

const createTable = async () => {
  await dbService.execSQL('CREATE TABLE IF NOT EXISTS DemoTable (name, score)');
  await dbService.execSQL('INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101]);
  await dbService.execSQL('INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202]);
  console.log('table created.');
};

export default {
  name: 'Home',
  props: {
    f7router: Object,
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    init() {
      dbService.isTableExists('DemoTable').then(displayData).catch(createTable);
    },
    loadData() {
      displayData().then(x => this.items = x);
    },
  },
};
</script>
