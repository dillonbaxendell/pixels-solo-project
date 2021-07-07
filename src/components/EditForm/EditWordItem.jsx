import Chip from "@material-ui/core/Chip";


function EditWordItem ({word, classes, setWord, editWord}) {

    return (
        <>
              <li
                key={word.id}
                onClick={() => {
                  setWord({ id: word.id, word_name: word.word_name });
                }}
              >
                <Chip
                  color={ editWord.word_name === word.word_name ? 'primary' : 'default'}
                  label={word.word_name}
                  className={classes.chip}
                ></Chip>
              </li>
        </>
    )
}

export default EditWordItem