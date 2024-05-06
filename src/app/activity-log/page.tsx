"use client";
import { Flex, Timeline } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

function ActivityLog() {
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    const activityLogString = localStorage.getItem("activityLog");
    if (activityLogString) {
      setActivityLog(JSON.parse(activityLogString));
    }
  }, []);

  return (
    <Flex gap="middle" vertical>
      <h1>Activity Log</h1>
      <div className={styles.timelineContainer}>
        {activityLog.length === 0 && <p>No activity log</p>}
        <Timeline items={activityLog} />
      </div>
    </Flex>
  );
}

export default ActivityLog;
