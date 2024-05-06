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
import ActionModal from "../ActionModal/ActionModal";
import { useDispatch } from "react-redux";
import { checkTask } from "@/store/slices/taskSlice";

function TodoCard({
  id,
  title,
  description,
  date,
  status,
  isChecked,
}: CardType) {
  const dispatch = useDispatch();

  const [checkedBox, setCheckedBox] = useState<boolean>(isChecked);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string>(id);

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
    dispatch(checkTask(currentId));
  };

  const isOpenDeleteModal = () => {
    setIsModalVisible(true);
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

            <p>Due date : {date}</p>
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
      <ActionModal
        visible={isModalVisible}
        type="delete"
        onClose={() => setIsModalVisible(false)}
        deleteItem={{ id, title, date }}
      />
    </div>
  );
}

export default TodoCard;
