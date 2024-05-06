import styles from "./todoCard.module.css";
import { CardType } from "../../../../type";
import {
  Button,
  Card,
  Checkbox,
  CheckboxProps,
  Flex,
  Tag,
  Tooltip,
} from "antd";
import {
  DeleteOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import { useState } from "react";

function TodoCard({
  id,
  title,
  description,
  date,
  status,
  isChecked,
}: CardType) {
  const [checkedBox, setCheckedBox] = useState(isChecked);

  const handleIcon = (status: string) => {
    switch (status) {
      case "todo":
        return <SyncOutlined spin />;
      case "done":
        return <CheckCircleOutlined />;
      case "delayed":
        return <FieldTimeOutlined />;
      default:
        return;
    }
  };

  const handleTagColor = (status: string) => {
    switch (status) {
      case "todo":
        return "warning";
      case "done":
        return "success";
      case "delayed":
        return "error";
      default:
        return;
    }
  };

  const handleCheckbox: CheckboxProps["onChange"] = (e) => {
    setCheckedBox(e.target.checked);
  };

  const isOpenDeleteModal = () => {
    console.log("Delete Modal");
  };

  return (
    <div className={styles.container}>
      <Card bordered={false} hoverable>
        <Flex
          className={styles.cardContainer}
          gap="middle"
          justify="space-between"
          align="center"
        >
          <Checkbox onChange={handleCheckbox} checked={checkedBox} />
          <div className={styles.contentContainer}>
            <Flex className={styles.cardHeader} gap="small" align="center">
              <h2>{title}</h2>
              <Tag icon={handleIcon(status)} color={handleTagColor(status)}>
                {status.toUpperCase()}
              </Tag>
            </Flex>

            <Tooltip title={description}>
              <p className={styles.desc}>{description}</p>
            </Tooltip>

            <p>{date}</p>
          </div>
          <Tooltip title="delete">
            <Button
              shape="circle"
              danger
              icon={<DeleteOutlined />}
              onClick={isOpenDeleteModal}
            />
          </Tooltip>
        </Flex>
      </Card>
    </div>
  );
}

export default TodoCard;
