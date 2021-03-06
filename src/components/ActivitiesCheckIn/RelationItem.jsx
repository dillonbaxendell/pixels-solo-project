import React from "react";
import { useSelector } from "react-redux";
import Chip from "@material-ui/core/Chip";

//This is the chip component for the relationship list in Activities Check In
function RelationItem({ relation, classes, selectRelationship }) {
  const selectedRelation = useSelector(
    (store) => store.relationshipAssociations
  );

  return (
    <>
      <li
        key={relation.id}
        onClick={() => {
          selectRelationship({
            id: relation.id,
            name: relation.name,
            relationship_to_user: relation.relationship_to_user,
          });
        }}
      >
        <Chip
          color={
            selectedRelation.name === relation.name ? "primary" : "default"
          }
          label={relation.name}
          className={classes.chip}
        ></Chip>
      </li>
    </>
  );
}

//export function
export default RelationItem;
