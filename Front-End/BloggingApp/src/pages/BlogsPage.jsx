import React,{ useState, useEffect } from "react";
import "./BlogsPage.css";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function BlogsPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [user ,setUser] = useState(null);
  const navigate = useNavigate();

  const gotoCreationPage = () =>{
    navigate('/creation')
  }

  const gotoFullPost = () =>{
    navigate('/post')
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token');

      if(token){
        const decode = jwtDecode(token);
        console.log(decode)
        setUser(decode)

      }

      try {
        const response = await fetch("http://localhost:5500/api/posts/",{
          headers:{
            "Authorization":`Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });
        const data = await response.json();
        if (response.ok) {
          setPosts(data.posts);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div>
        <div className="navBar">
          <div className="logo">
            <h1>Blogify</h1>
          </div>

          <div className="searchIn">
            <input type="text" name="search" placeholder="Search" />
            <button className="SearchBtn">Search</button>
          </div>

          <div className="createBtn">
            <button onClick={gotoCreationPage}>create</button>
          </div>
        </div>

        <div className="AppBody">
          {loading && <p>Loading Posts ...</p>}
          {error && <p className="errorMessage"></p>}
          {!loading && !error && posts.length === 0 && <p>No posts Found.</p>}
          {!loading && !error && posts.length > 0 && (
            <div className="PostsContainer">
              {posts.map((p) => (
                <div className="post" key={p._id}>
                  <div className="postImg">
                    <img src="person1.jpeg" alt="" />
                  </div>

                  <div className="postInfos">
                    <div className="userInfos" >
                      <img src="person2.jpeg" alt="" />
                      <h3 >{user.name}</h3>
                    </div>
                    <div className="PostDes">
                      <h1>
                        <Link to={`/post/${p._id}`}>{p.title}</Link>
                      </h1>
                      <p>
                        {p.excerpt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
