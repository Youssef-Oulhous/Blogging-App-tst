import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './Post.css';

export default function Post () {
    const {id} = useParams();
    const [error,setError] = useState(null);
    const [post , setPost] = useState('');

    useEffect(()=>{
        const fetchData = async () =>{
            
            try{
                const response = await fetch(`http://localhost:5500/api/posts/${id}`);
                const data = await response.json();

                console.log("Post ID from URL:", id);

                if(response.ok){
                    setPost(data.posts)
                } else{
                    setPost(data.message)
                }

            }catch(err){
                setError('somethings went wrong')
            }
        }

        if (id) fetchData();
    },[id])

    if (error) return <p>{error}</p>;
    if (!post) return <p>Loading post...</p>;

    return(

        <>  
            <div className='Logo'>
              <h1>Blogify</h1>
            </div> 
          <div className="bodyPost">

          <div className="postPage">
                <div className='Post'>
                    <div className="userInfo">
                        <img src="person2.jpeg" alt="" />
                        <h3>user</h3>
                    </div>
                    <div className="content">
                        <h3>{post.title}</h3>
                        <p>{post.excerpt}</p>
                        <p className='tags'>#tags , #react ,#dev</p>
                    </div>
                    <div className='contentImg'>
                        <img src="post.png" alt="" />
                    </div>
                    
                </div>
               
            </div>
          </div>
            
            <div><br /> 
            <br /></div>
        </>
    )



}