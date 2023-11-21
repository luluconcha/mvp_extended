import { useState } from 'react' 


export default function CreateStoryPoint() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("") 
  const [children, setChildren] = useState("")
  const [inputTitle, setInputTitle] =useState("")
  const [inputContent, setInputContent] =useState("")


  async function createStoryPoint() {
    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: inputTitle,
          content: inputContent,
  
        })
      });
      if (!response.ok)
        throw new Error(`Oops! ${response.status} ${response.statusText}`);
      const nextPoint = await response.json();
      return nextPoint;
    } catch (error) {
      setError(error.message);
      console.log("error in addStudent function");
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

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    setError("");
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
          onChange={e => handleChange(e)}
        ></input>
        <br />
        <br />
        content: {" "}
        <input
          type="text"
          value={inputContent}
          onChange={e => handleChange(e)}
        ></input>
        <br />
        <br />
        <button type="submit" onClick={e => handleSubmit(e)}>
          {" "}
          submit{" "}
        </button>
      </form>
 

    </div>
  

  )
}
