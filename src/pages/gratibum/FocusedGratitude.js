import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const FocusedGratitude = () => {
    const { id } = useParams();

    const gratibums = JSON.parse(localStorage.getItem("gratibums"));

    let gratitudes = [];
    for (var key in gratibums) {
      if (gratibums.hasOwnProperty(key)) {
        gratitudes.push( gratibums[key] );
      }
    }

    let focused = gratitudes.filter( gratitude => gratitude.date.seconds === parseInt(id) );


    console.log( focused );
  
    return (
        <div
            className="focused-gratitude"
        >
            <h1>{focused[0].title}</h1>
        </div>
    );
}

export default FocusedGratitude;