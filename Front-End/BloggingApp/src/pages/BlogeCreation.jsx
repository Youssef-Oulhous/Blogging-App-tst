import './BlogsCreation.css'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function CreationBlog(){

    const [title,setTitle] = useState('');
    const [tags,setTags] = useState('');
    const [body,setBody] = useState('');
    const [message,setMsg] = useState('');
    const [color,setColor] = useState('');
    const [user , setUser] = useState('')
    const navigate = useNavigate();


    const handleCreate = async(e) =>{
            const token = localStorage.getItem('token');
            
                  if(token){
                    const decode = jwtDecode(token);
                    console.log(decode)
                    setUser(decode)
            
                  }

            e.preventDefault();

        try{
            
            const response = await fetch('http://localhost:5500/api/posts/',{
                method:"POST",
                headers: {
                    "Authorization":`Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({title,tags: tags.split(',').map(tag => tag.trim()),body})
            });

            if(response.ok){
                const result = await response.json();
                setMsg(result.message);
                setColor('green');
                setTimeout(() => navigate("/posts"), 1000);
            } else{
                const result = await response.json();
                setMsg(result.message)
                setColor('red');
            }

        } catch(err) {
            console.error(err);
            setMsg("Something went wrong!");
            setColor('red');
        }
    }



    return(
        <>
        <div className="CreationPage">
            <div className="logo">
                <h1>Blogify</h1>
            </div>

            <div className="CreationForm">
                <div className="UserInfo">
                    
                </div>
                <div className='inputs'>
                    <form onSubmit={handleCreate}>
                        <div className='user'>
                            <img src="person1.jpeg" alt="" />
                            <h3>{user.name}</h3>
                        </div>

                        <input type="text" placeholder="Title" className="title" onChange={(e)=> setTitle(e.target.value)} />
                        <input type="text" placeholder="tags" className="tags"  onChange={(e)=> setTags(e.target.value)}/>
                        <textarea cols="20" rows="4"  className='content' placeholder='content'  onChange={(e)=> setBody(e.target.value)}></textarea>

                        <button type='submit'>Create</button>                        
                        <p className='message' style={{color: color}}>{message}</p>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}