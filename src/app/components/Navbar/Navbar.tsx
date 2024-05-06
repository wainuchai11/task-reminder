"use client";

import { Button, Flex } from "antd";
import styles from "./navbar.module.css";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();

  return (
    <Flex className={styles.container} justify="space-between" align="center">
      <h3 className={styles.logo} onClick={() => router.push("/")}>
        Task Reminder
      </h3>
      <Flex className={styles.actions} gap="middle" align="center">
        <Button
          className={styles.btn}
          type="text"
          onClick={() => router.push("/")}
        >
          Task List
        </Button>
        <Button
          className={styles.btn}
          type="text"
          onClick={() => router.push("/activity-log")}
        >
          Activity log
        </Button>
      </Flex>
    </Flex>
  );
}

export default Navbar;
