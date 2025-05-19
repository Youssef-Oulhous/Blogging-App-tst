useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5500/api/posts/');
        const data = await response.json();
        if (response.ok) {
          setPosts(data.posts);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Something went wrong!');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);



  <div className="post">

            <div className="postImg">
                <img src="person1.jpeg" alt="" />
            </div>

            <div className="postInfos">
              <div className="userInfos">
                <img src="person2.jpeg" alt="" />
                <h3>user</h3>
              </div>
              <div className="PostDes">
                <h1>this the test posts</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem mollitia, hic deleniti ut molestiae recusandae saepe corrupti non quae maiores accusantium quod libero. Animi consectetur sed non numquam modi et!</p>

              </div>

            </div>
          </div>




  