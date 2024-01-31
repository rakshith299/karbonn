import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const FileUpload = ({setResult}) => {
    const [file, setFile] = useState();

    const navigate = useNavigate();

    function handleFileChange(event){
        setFile(event.target.files[0]);
    }

    function handleSubmit(){
        if(file){

            const formdata = new FormData();
            formdata.append("file", file);

            fetch("http://localhost:8001/upload", {
            method: 'POST',
            body: formdata,
            })
            .then((response) => {
            response.text();
            })
            .then((res) => {
                console.log(res);
                setResult(res);
                setTimeout(() => {
                    navigate("/result");
                }, 1000);
            })
            .catch((err) => {
            alert(err);
            })


        }else{
            alert("Select file to upload");
        }
        
    }

    return(
        <div>  
            <h1>Upload File</h1>
            <div className="file-cont">
                <input type = "file" onChange={handleFileChange}/>
                <button type = "submit" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default FileUpload;