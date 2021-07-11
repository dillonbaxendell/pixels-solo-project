import Chip from "@material-ui/core/Chip";


function ActivityItem ({activity, classes, setActivity, editActivity}) {

    return (
        <>
              <li
                key={activity.id}
                onClick={() => {
                  setActivity({ id: activity.id, activity_name: activity.activity_name });
                }}
              >
                <Chip
                  color={editActivity.activity_name === activity.activity_name ? 'primary' : 'default'}
                  label={activity.activity_name}
                  className={classes.chip}
                ></Chip>
              </li>
        </>
    )
}

export default ActivityItem