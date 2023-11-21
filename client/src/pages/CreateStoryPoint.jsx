import { useState } from 'react' 
import { useNavigate } from 'react-router-dom'

export default function CreateStoryPoint({id}) {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [inputTitle, setInputTitle] =useState("")
  const [inputContent, setInputContent] =useState("")


  async function createStoryPoint() {
    try {
      const response = await fetch("api/storypoints/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: inputTitle,
          content: inputContent,
          ParentID: id,
        })
      });
      if (!response.ok) throw new Error(`Oops! ${response.status} ${response.statusText}`);
      console.log(response)
      const nextPoint = await response.json();
      return nextPoint
    } catch (error) {
      setError(error.message);
      console.log("error in addStorypoint function");
    } finally {
      setLoading(false);
    }
  }

  const handleContent = event => {
    setInputContent(event.target.value);
  };

  const handleTitle = event => {
    setInputTitle(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    setError("");
    await createStoryPoint()
    
  };


  return (
    <div>
      <form className="createstorypoint">
        
        <br />
        <br />
        title:{" "}
        <input
          type="text"
          value={inputTitle}
          onChange={e => handleTitle(e)}
        ></input>
        <br />
        <br />
        content: {" "}
        <input
          type="text"
          value={inputContent}
          onChange={e => handleContent(e)}
        ></input>
        <br />
        <br />
        <button type="submit" onClick={e => handleSubmit(e)}>
          {" "}
          add storypoint{" "}
        </button>
      </form>
 

    </div>
  

  )
}
