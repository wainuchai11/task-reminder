import { Flex } from "antd";
import styles from "./cardList.module.css";
import { CardListType } from "../../../../type";
import TodoCard from "../TodoCard/TodoCard";

function CardList({ data }: CardListType) {
  return (
    <Flex
      className={styles.container}
      gap="middle"
      justify="space-between"
      align="center"
      wrap
    >
      {data?.length === 0 && <h1>No Task</h1>}
      {data?.map((item) => (
        <TodoCard
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          date={item.date}
          status={item.status}
          isChecked={item.isChecked}
        />
      ))}
    </Flex>
  );
}

export default CardList;
