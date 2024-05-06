"use client";
import { Button, Flex, Select } from "antd";
import styles from "./page.module.css";
import { Options, TodoData } from "../../constant";
import CardList from "./components/CardList/CardList";

export default function Home() {
  const handleFilter = (value: string) => {
    console.log(value);
  };

  return (
    <div className={styles.container}>
      <Flex className={styles.header} justify="space-between" align="center">
        <h2 className={styles.text}>Task Reminder List</h2>
        <Flex
          className={styles.actions}
          justify="space-between"
          gap="middle"
          align="center"
        >
          <Select
            className={styles.selector}
            options={Options}
            defaultValue="all"
            onChange={handleFilter}
          />
          <div>
            <Button type="primary">Add Task</Button>
          </div>
        </Flex>
      </Flex>
      <CardList data={TodoData} />
    </div>
  );
}
