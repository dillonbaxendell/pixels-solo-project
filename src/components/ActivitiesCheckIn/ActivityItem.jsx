import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Chip from "@material-ui/core/Chip";

function ActivityItem({ activity, classes, selectActivity }) {
  const selectedActivity = useSelector((store) => store.activityAssociations);

  return (
    <>
      <li
        key={activity.id}
        onClick={() => {
          selectActivity({
            id: activity.id,
            activity_name: activity.activity_name,
          });
        }}
      >
        <Chip
          color={
            selectedActivity.activity_name === activity.activity_name ? "primary" : "default"
          }
          label={activity.activity_name}
          className={classes.chip}
        ></Chip>
      </li>
    </>
  );
}

export default ActivityItem;
