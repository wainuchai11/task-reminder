"use client";

import { useEffect, useState } from "react";
import { ActionModalType, CreateTaskItem, deleteItem } from "../../../../type";
import {
  DatePicker,
  DatePickerProps,
  Flex,
  Input,
  Modal,
  Progress,
} from "antd";
import styles from "./actionModal.module.css";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addTask, deleteTask } from "@/store/slices/taskSlice";

function ActionModal({ visible, type, deleteItem, onClose }: ActionModalType) {
  const dispatch = useDispatch();
  const [isvisible, setIsVisible] = useState<boolean>(visible);
  const [taskItem, setTaskItem] = useState<CreateTaskItem>({
    title: "",
    description: "",
    date: "",
    id: "",
  });
  const [countdown, setCountdown] = useState<number>(15);

  useEffect(() => {
    setIsVisible(visible);
    if (visible && type === "delete") setCountdown(15);
  }, [visible]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (visible) {
      timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [visible, countdown]);

  useEffect(() => {
    if (countdown === 0) {
      handleReset(() => {
        handleCancelBtn();
      });
    }
  }, [countdown]);

  const handleOkBtn = (type: string, deleteItem?: deleteItem) => {
    if (type === "add") {
      dispatch(
        addTask({
          ...taskItem,
          id: uuidv4(),
          status: "",
          isChecked: false,
        })
      );
    }
    if (type === "delete") {
      dispatch(deleteTask(deleteItem?.id ?? ""));
    }

    console.log(taskItem);
    handleReset(() => {
      onClose();
    });
  };

  const handleCancelBtn = () => {
    handleReset(() => {
      onClose();
    });
  };

  const handleReset = (cb: () => void) => {
    setTaskItem({
      title: "",
      description: "",
      date: "",
      id: "",
    });
    cb();
  };

  const handleModalTitle = (type: string) => {
    switch (type) {
      case "add":
        return "Add Task";
      case "delete":
        return "Do you want to delete this task?";
      default:
        return;
    }
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskItem({ ...taskItem, title: e.target.value });
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskItem({ ...taskItem, description: e.target.value });
  };

  const onChangeDate: DatePickerProps["onChange"] = (
    dateObject,
    dateString
  ) => {
    setTaskItem({ ...taskItem, date: dateString.toString() });
  };

  return (
    <Modal
      title={handleModalTitle(type)}
      open={isvisible}
      onOk={() => handleOkBtn(type, deleteItem)}
      onCancel={handleCancelBtn}
    >
      {type === "delete" && (
        <Flex className={styles.deleteContainer} vertical gap="middle">
          <p>
            {deleteItem?.title} - {deleteItem?.date}
          </p>
          <Progress
            percent={(countdown / 15) * 100}
            status="active"
            showInfo={false}
          />
          <p>Time left: {countdown} seconds</p>
        </Flex>
      )}
      {type === "add" && (
        <Flex className={styles.addContainer} vertical gap="middle">
          <Input
            placeholder="Title"
            value={taskItem.title}
            showCount
            maxLength={50}
            onChange={onChangeTitle}
          />
          <Input.TextArea
            placeholder="Description"
            value={taskItem.description}
            showCount
            maxLength={100}
            onChange={onChangeDescription}
          />
          <DatePicker onChange={onChangeDate} />
        </Flex>
      )}
    </Modal>
  );
}

export default ActionModal;
