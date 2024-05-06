"use client";
import React, { use, useEffect, useState } from "react";
import { Button, Flex, Select } from "antd";
import styles from "./page.module.css";
import { Options } from "../../constant";
import CardList from "./components/CardList/CardList";
import ActionModal from "./components/ActionModal/ActionModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  autoUpdateDelayedTask,
  filterTaskStatus,
  getTaskList,
} from "@/store/slices/taskSlice";

export default function Home() {
  const dispatch = useDispatch();
  const taskItems = useSelector((state: RootState) => state.task);
  console.log(taskItems);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getTaskList());
    dispatch(autoUpdateDelayedTask());
  }, []);

  const handleFilter = (value: string) => {
    dispatch(filterTaskStatus(value));
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
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
            <Button type="primary" onClick={handleOpenModal}>
              Add Task
            </Button>
          </div>
        </Flex>
      </Flex>
      <CardList data={taskItems} />
      <ActionModal
        visible={isOpenModal}
        type="add"
        onClose={() => setIsOpenModal(false)}
      />
    </div>
  );
}
