import Chip from "@material-ui/core/Chip";


function EditRelationItem ({relation, classes, setRelation, editRelation}) {

    return (
        <>
              <li
                key={relation.id}
                onClick={() => {
                  setRelation({ id: relation.id, name: relation.name });
                }}
              >
                <Chip
                  color={ editRelation.name === relation.name ? 'primary' : 'default'}
                  label={relation.name}
                  className={classes.chip}
                ></Chip>
              </li>
        </>
    )
}

export default EditRelationItem