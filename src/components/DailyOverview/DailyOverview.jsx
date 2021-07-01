import { useDispatch, useSelector } from "react-redux";

function DailyOverview () {
const moodValue = useSelector( store => store.moodValue);
const activities = useSelector( store => store.activityAssociations);
const words = useSelector( store => store.wordAssociations);
const relationships = useSelector( store => store.relationshipAssociations);


    return (
        <>
            <h2>how does this look?</h2>
            <p>Mood Value: {moodValue}</p>
            <p>Word Associations:</p>
            <ul>
                {words.map((word) => {
                    return <li key={word.id}>{word.word_name}</li>
                })}
            </ul>
            <p>what you were doing</p>
            <ul>
            {activities.map((activity) => {
                return <li key={activity.id}>{activity.activity_name}</li>
            })}
            </ul>
            <p>who you were with</p>
            <ul>
            {relationships.map((relationship) => {
                return <li key={relationship.id}>{relationship.name}</li>
            })}
</ul>
            

        </>
    )
}

export default DailyOverview;